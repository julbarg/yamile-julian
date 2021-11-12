import React, { FunctionComponent, useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'

import { db } from '../../config/firebase'
import { Activity } from '../../types/Types'
import Loading from '../loading/Loading'
import { useAuth } from '../../context/AuthContext'
import './Schedule.scss'

const Schedule: FunctionComponent = () => {
  const { user } = useAuth()
  const [activities, setActivities] = useState([] as Activity[])
  const [loading, setLoading] = useState(true)

  const getSchedule = async () => {
    try {
      const queryActivities: Activity[] = []
      const querySnapshot = await getDocs(collection(db, 'activity'))

      querySnapshot.forEach((activity) => {
        queryActivities.push({
          ...activity.data(),
            id: activity.id,
        })
      })
      setActivities(queryActivities)
    } catch (error) {
      console.log('🚀 ~ getFaqs ~ error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    user && getSchedule()
  }, [user])

  return (
    <div className="schedule" id="schedule">
      <h2>Yamile & Julian</h2>
      {loading ? (
        <Loading color="white" />
      ) : (
        <>
          <p className="location">Diciembre 19 del 2021</p>
          <p>Hacienda La Victoria. Subachoque, Cundinamarca</p>
          <div className="activities">
            {activities.map((activity) => (
              <div className="activity" key={activity.id}>
                <img src={activity.icon} alt={activity.icon} />
                <div className="activity-content">
                  <div className="activity-hour-name">
                    {activity.hour} - {activity.activity}
                  </div>
                  <div className="description">{activity.description}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Schedule
