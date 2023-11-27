import { useAuth } from '@hooks'
import { Card, Row, Col, Button } from 'antd'
import { AddUserForm } from './AddUserForm'
import { useUserForm } from '@hooks/useUserForm'
import { useUserList } from '@hooks/useUserList'
import { UserList } from './UserList'

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth()
  const { form } = useUserForm()
  const { list } = useUserList()

  return (
    <div className='m-5 flex-grow h-[80vh] items-center justify-center space-y-4'>
      <div className='text-2xl font-bold text-gray-900'>
        <Card title={user?.userName} extra={<Button onClick={logout}>Logout</Button>}>
          <Row>
            <Col span="6" className='p-5'>
              <AddUserForm
                form={form.instance}
                onCancel={form.onCancel}
                onSubmit={form.onSubmit}
              />
            </Col>
            <Col span="18" className='p-5'>
              <UserList
                list={list}
                onDelete={form.onDelete}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  )
}
