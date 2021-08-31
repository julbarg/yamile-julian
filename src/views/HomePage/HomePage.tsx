import Credits from '../../components/credits/Credits'
import Faq from '../../components/faq/Faq'
import Introduction from '../../components/introduction/Introduction'
import Footer from '../../components/layout/footer/Footer'
import Header from '../../components/layout/header/Header'
import Place from '../../components/place/Place'
import Poll from '../../components/poll/Poll'
import Schedule from '../../components/schedule/Schedule'
import './HomePage.scss'

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <Introduction />
      <Place />
      <Faq />
      <Schedule />
      <Poll />
      <Credits />
      <Footer />
    </div>
  )
}

export default HomePage
