import { useQuery, QueryClient } from '@tanstack/react-query'
import useLocalStorage from './useLocalStorage'

interface UserList {
  list: {
    users: User[]
    isLoading: boolean
  }
}

function getUsers() {
  const { value } = useLocalStorage('users')

  return value
}

const userListQuery = () => ({
  queryKey: ['users'],
  queryFn: getUsers
})

export const userListLoader = (queryClient: QueryClient) => async () => {
  const query = userListQuery()
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}

export const useUserList = (): UserList => {
  const { data: users = [], isLoading } = useQuery(userListQuery())

  return {
    list: {
      users,
      isLoading
    }
  }
}
