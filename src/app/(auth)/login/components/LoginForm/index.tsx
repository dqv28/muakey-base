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
      const { error } = await loginWidthCredentialsAction(formData)

      if (error) {
        setLoading(false)
        toast.error(error)
        return
      }

      router.push('/workflows')

      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      throw new Error(error)
    }
  }

  return (
    <Form
      className="w-[400px]"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={login}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Email không được bỏ trống.' }]}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Mật khẩu không được bỏ trống.' }]}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
