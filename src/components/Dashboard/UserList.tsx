import { Button, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table';

interface UserListProps {
  onDelete: (id: number) => void
  users: User[]
}

interface UserTableColumnProps {
  onDelete: (id: number) => void
}

const makeColumns = ({ onDelete }: UserTableColumnProps): ColumnsType<User> => {
  return [
    {
      title: '#',
      render: (item, record, index) => <p>{index + 1}</p>
    },
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
  users,
  onDelete
}) => {
  return (
    <Table
      rowKey={record => record.branchId}
      columns={makeColumns({ onDelete })}
      dataSource={users}
      bordered
    />
  )
}
