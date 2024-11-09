import React from 'react'
import LoginForm from './components/LoginForm'

const LoginPage: React.FC = () => {
  return (
    <div className='flex items-center justify-center pt-[160px] flex-col gap-[24px]'>
      <h1 className='text-[28px] font-[500]'>Đăng nhập</h1>
      <LoginForm />
    </div>
  )
}

export default LoginPage
