'use client'

import { loginWidthCredentialsAction } from '@/app/(auth)/action'
import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

const LoginForm: React.FC = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const login = async (formData: any) => {
    setLoading(true)

    try {
      const { token, error } = await loginWidthCredentialsAction(formData)

      if (error) {
        setLoading(false)
        toast.error(error)
        return
      }

      router.push('/workflows')
      toast.success(token)

      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      throw new Error(error)
    }
  }

  return (
    <Form
      name="login"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={login}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
