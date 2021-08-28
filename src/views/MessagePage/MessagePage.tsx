import React from 'react'
import Footer from '../../components/layout/footer/Footer'
import Header from '../../components/layout/header/Header'
import Message from '../../components/message/Message'
import './MessagePage.scss'

const MessagePage = () => {
  return (
    <div className="message-page" id="message-page">
      <Header isMain={false} />
      <Message />
      <Footer />
    </div>
  )
}

export default MessagePage
