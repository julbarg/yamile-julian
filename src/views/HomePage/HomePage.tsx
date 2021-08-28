import Faq from '../../components/faq/Faq'
import Introduction from '../../components/introduction/Introduction'
import Header from '../../components/layout/header/Header'
import Poll from '../../components/poll/Poll'
import Schedule from '../../components/schedule/Schedule'
import './HomePage.scss'

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <Introduction />
      <Faq />
      <Schedule />
      <Poll />
    </div>
  )
}

export default HomePage
