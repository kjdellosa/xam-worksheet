import { useEffect, useState } from 'react'
import { useAuth } from '@hooks'
import { Form, Input, Card, InputNumber, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export const Login: React.FC = () => {
  const { authenticated, authenticate } = useAuth()
  const [form] = Form.useForm<User>()
  const [loginError, setLoginError] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (authenticated) navigate('/dashboard')
  }, [authenticated])

  const handleLogin = async () => {
    setLoginError(false)
    const loginData = await form.validateFields()

    try {
      const isValid = authenticate(loginData)
      if (isValid) navigate('/dashboard')
      else setLoginError(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='m-auto flex flex-col h-[100vh] items-center justify-center space-y-2'>
      <div className='text-2xl font-bold text-gray-900'>
        Login
      </div>
      <Card>
        <Form form={form} name='Login Form' layout='vertical' onChange={() => setLoginError(false)}>
          <Form.Item label='Branch ID' name='branchId' rules={[{ required: true, message: 'Branch ID is required' }]}>
            <InputNumber placeholder='Branch ID' style={{ width: '100% ' }} />
          </Form.Item>
          <Form.Item label='Username' name='userName' rules={[{ required: true, message: 'Username is required' }]}>
            <Input placeholder='Username' />
          </Form.Item>
          <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Password is required' }]}>
            <Input.Password placeholder='Password' />
          </Form.Item>
          <Button onClick={() => handleLogin()} className='w-[100%]'>Login</Button>
          {loginError && <p className='text-red-500 pt-5'>User not found.</p>}
        </Form>
      </Card>
    </div>
  )
}
