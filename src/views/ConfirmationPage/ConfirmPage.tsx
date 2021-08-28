import React from 'react'
import Confirm from '../../components/confirm/Confirm'
import Footer from '../../components/layout/footer/Footer'
import Header from '../../components/layout/header/Header'
import './ConfirmPage.scss'

const ConfirmPage = () => {
  return (
    <div className="confirm-page" id="confirm-page">
      <Header isMain={false} />
      <Confirm />
      <Footer />
    </div>
  )
}

export default ConfirmPage
