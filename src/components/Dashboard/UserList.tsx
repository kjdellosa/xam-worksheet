import { Button, Table } from 'antd'

interface UserListProps {
  onDelete: (id: number) => void
  users: User[]
}

interface UserTableColumnProps {
  onDelete: (id: number) => void
}

const makeColumns = ({ onDelete }: UserTableColumnProps) => {
  return [
    {
      title: 'Username',
      dataIndex: 'userName',
    },
    {
      title: 'Name',
      render: (item: User, key: number) => {
        return (
          <p key={key}>{item.firstName} {item.middleName[0]}. {item.lastName}</p>
        )
      }
    },
    {
      title: 'Position',
      dataIndex: 'position',
    },
    {
      title: 'Action',
      render: (item: User) => {
        return (
          <Button key='edit' onClick={() => { onDelete(item.branchId) }}>Remove</Button>
        )
      }
    }
  ]
}

export const UserList: React.FC<UserListProps> = ({
  users,
  onDelete
}) => {
  return (
    <Table
      columns={makeColumns({ onDelete })}
      dataSource={users}
      bordered
    />
  )
}
