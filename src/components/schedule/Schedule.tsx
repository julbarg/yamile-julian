import React from 'react'
import { Activity } from '../../types/Types'
import './Schedule.scss'

const Schedule = () => {
  const activities: Activity[] = [
    {
      id: 'ceremony',
      activity: 'La Ceremonia',
      description:
        'Veniam consectetur magna quis anim exercitation esse pariatur incididunt fugiat ea. Irure tempor exercitation commodo adipisicing excepteur et culpa proident eu quis sint proident commodo. Quis non et et minim aute in elit mollit sit aliquip sunt. Ex sit aute voluptate non enim in. Proident deserunt tempor irure in non quis pariatur irure veniam id.',
      icon: './img/wedding-rings.png',
      hour: '3:00pm',
    },
    {
      id: 'cheers',
      activity: 'El Brindis',
      description:
        'Veniam consectetur magna quis anim exercitation esse pariatur incididunt fugiat ea. Irure tempor exercitation commodo adipisicing excepteur et culpa proident eu quis sint proident commodo. Quis non et et minim aute in elit mollit sit aliquip sunt. Ex sit aute voluptate non enim in. Proident deserunt tempor irure in non quis pariatur irure veniam id.',
      icon: './img/champagne.png',
      hour: '5:00pm',
    },
    {
      id: 'eat',
      activity: 'La Comida',
      description:
        'Veniam consectetur magna quis anim exercitation esse pariatur incididunt fugiat ea. Irure tempor exercitation commodo adipisicing excepteur et culpa proident eu quis sint proident commodo. Quis non et et minim aute in elit mollit sit aliquip sunt. Ex sit aute voluptate non enim in. Proident deserunt tempor irure in non quis pariatur irure veniam id.',
      icon: './img/dinner.png',
      hour: '7:00pm',
    },
    {
      id: 'party',
      activity: 'La Fiesta',
      description:
        'Veniam consectetur magna quis anim exercitation esse pariatur incididunt fugiat ea. Irure tempor exercitation commodo adipisicing excepteur et culpa proident eu quis sint proident commodo. Quis non et et minim aute in elit mollit sit aliquip sunt. Ex sit aute voluptate non enim in. Proident deserunt tempor irure in non quis pariatur irure veniam id.',
      icon: './img/disco-ball.png',
      hour: '7:00pm',
    },
  ]

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
