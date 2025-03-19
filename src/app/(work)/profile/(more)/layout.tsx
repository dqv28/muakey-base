import { getMe } from '@/libs/data'
import React from 'react'
import ProfileLayout from '../components/ProfileLayout'

const ProfileMoreLayout: React.FC<
  Readonly<{
    children: React.ReactNode
  }>
> = async ({ children }) => {
  const user = await getMe({
    include: 'profile',
  })

  return <ProfileLayout user={user}>{children}</ProfileLayout>
}

export default ProfileMoreLayout
