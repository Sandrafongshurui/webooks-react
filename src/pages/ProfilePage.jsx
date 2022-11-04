import React from 'react'
import { ProfileHeader } from '../components/Headers'
import { Profile } from '../components/Profile'
import { Footer } from '../components/Footer'
import globalStyle from '../global.module.css'

export const ProfilePage = () => {
  return (
    <div className={globalStyle.flexwrapper }>
      <ProfileHeader />
      <Profile />
      <div className={globalStyle.footer}><Footer /></div>
    </div>
  )
}
