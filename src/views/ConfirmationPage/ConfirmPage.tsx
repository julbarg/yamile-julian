import React from 'react'
import Confirm from '../../components/confirm/Confirm'
import Header from '../../components/layout/header/Header'
import './ConfirmPage.scss'

const ConfirmPage = () => {
  return (
    <div className="confirm-page">
      <Header isMain={false} />
      <Confirm />
    </div>
  )
}

export default ConfirmPage
