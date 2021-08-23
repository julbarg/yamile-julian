import React, { FunctionComponent } from 'react'
import { Activity } from '../../types/Types'
import './Schedule.scss'

const Schedule: FunctionComponent<{ activities: Activity[] }> = ({
  activities,
}) => {
  return (
    <div className="schedule" id="shcedule">
      <h2>Yamile & Julian</h2>
      <p className="location">Diciembre 19, 2020</p>
      <p>Hacienda La Vicotoria. Subachoque, Cundinamarca</p>
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
    </div>
  )
}

export default Schedule
