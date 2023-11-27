import { Form, Input, InputNumber, Button, Space } from 'antd'
import type { FormInstance } from 'antd/lib/form'

interface UserFormProps {
  onSubmit: () => Promise<void>
  onCancel: () => Promise<void>
  form: FormInstance<User>
}

export const AddUserForm: React.FC<UserFormProps> = ({
  form,
  onSubmit,
  onCancel
}) => {
  return (
    <Form form={form} name='User Form' layout='vertical' >
      <Form.Item label='Branch ID' name='branchId' rules={[{ required: true, message: 'Branch ID is required' }]}>
        <InputNumber placeholder='Branch ID' style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label='Username' name='userName' rules={[{ required: true, message: 'Username is required' }]}>
        <Input placeholder='Username' />
      </Form.Item>
      <Form.Item label='First Name' name='firstName' rules={[{ required: true, message: 'First Name is required' }]}>
        <Input placeholder='First Name' />
      </Form.Item>
      <Form.Item label='Middle Name' name='middleName' rules={[{ required: true, message: 'Middle Name is required' }]}>
        <Input placeholder='Middle Name' />
      </Form.Item>
      <Form.Item label='Last Name' name='lastName' rules={[{ required: true, message: 'Last Name is required' }]}>
        <Input placeholder='Last Name' />
      </Form.Item>
      <Form.Item label='Position' name='position' rules={[{ required: true, message: 'Position is required' }]}>
        <Input placeholder='Position' />
      </Form.Item>
      <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Password is required' }]}>
        <Input.Password placeholder='Password' />
      </Form.Item>
      <Space>
        <Button onClick={onCancel}>RESET</Button>
        <Button onClick={onSubmit}>ADD</Button>
      </Space>
    </Form>
  )
}
