import React from 'react'
import ConfirmedList from '../../components/confirmedList/ConfirmedList'
import Footer from '../../components/layout/footer/Footer'
import Header from '../../components/layout/header/Header'
import './ConfirmedListPage.scss'

const ConfirmedListPage = () => {
  return (
    <div className="confirmed-list-page" id="confirmed-list-page">
      <Header isMain={false} />
      <ConfirmedList />
      <Footer />
    </div>
  )
}

export default ConfirmedListPage
