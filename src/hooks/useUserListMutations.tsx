import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import useLocalStorage from './useLocalStorage'
import { redirect } from 'react-router-dom'

interface UserListMutations {
  addUser: (user: User) => void
  deleteUser: (id: number) => void,
  isLoading: Boolean
}

export const userListAction = (queryClient: QueryClient) => async () => {
  return (queryClient.getQueryData(['users']) ?? await queryClient.invalidateQueries({ queryKey: ['users'] }))
}

export const useUserListMutations = (): UserListMutations => {
  const queryClient = useQueryClient()
  const { value, setValue } = useLocalStorage('users')

  async function addUserFn(user: User) {
    const updatedData = [...value, user]
    setValue(updatedData)
    return updatedData
  }

  async function deleteUserFn(id: number) {
    const updatedData = value.filter((v: User) => v.branchId != id)
    setValue(updatedData)
  }

  const { mutateAsync: addUser, isPending: isAddLoading } = useMutation({
    mutationFn: addUserFn,
    onSuccess: async () => {
      message.success('User added successfully!')
      await queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  const { mutateAsync: deleteUser, isPending: isDeleteLoading } = useMutation({
    mutationFn: deleteUserFn,
    onSuccess: async () => {
      message.success('User deleted successfully!')
      await queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  return {
    addUser,
    deleteUser,
    isLoading: isAddLoading || isDeleteLoading
  }
}
