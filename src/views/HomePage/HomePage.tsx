import React from 'react'
import Faq from '../../components/faq/Faq'
import Header from '../../components/layout/header/Header'
import Poll from '../../components/poll/Poll'
import Schedule from '../../components/schedule/Schedule'
import { activities, faqs, questions } from './data/Data'
import './HomePage.scss'

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <Faq faqs={faqs} />
      <Schedule activities={activities} />
      <Poll questions={questions} />
    </div>
  )
}

export default HomePage
