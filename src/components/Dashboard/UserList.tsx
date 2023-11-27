import { Button, Table } from 'antd'

interface UserListProps {
  onDelete: (id: number) => void
  list: {
    users: User[]
    isLoading: boolean
  }
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
      render: (item: User) => {
        return (
          <p>{item.firstName} {item.middleName[0]}. {item.lastName}</p>
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
  list,
  onDelete
}) => {
  return (
    <Table
      columns={makeColumns({ onDelete })}
      dataSource={list.users}
      bordered
    />
  )
}
