import React, { FunctionComponent, useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { Activity } from '../../types/Types'
import Loading from '../loading/Loading'
import './Schedule.scss'

const Schedule: FunctionComponent = () => {
  const [activities, setActivities] = useState([] as Activity[])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const queryActivities: Activity[] = []

    db.collection('activity').onSnapshot(
      (activitySnapshot) => {
        activitySnapshot.forEach((activity) => {
          queryActivities.push({
            ...activity.data(),
            id: activity.id,
          })
        })

        setActivities(queryActivities)
      },
      (error) => {
        console.error(error)
      }
    )
  }, [])

  useEffect(() => {
    setLoading(activities.length == 0)
  }, [activities])

  return (
    <div className="schedule" id="shcedule">
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
