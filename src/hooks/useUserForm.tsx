import { Form } from 'antd'

import { useUserListMutations } from './useUserListMutations'

export const useUserForm = () => {
  const [form] = Form.useForm<User>()
  const { addUser, deleteUser, isLoading } = useUserListMutations()

  const onCancel = async () => {
    form.resetFields()
  }

  const onSubmit = async () => {
    const todo = await form.validateFields()

    const payload: User = {
      ...todo,
    }

    addUser(payload)

    form.resetFields()
  }

  const onDelete = async (id: number) => {
    deleteUser(id)
  }

  return {
    form: {
      instance: form,
      isLoading,
      onDelete,
      onSubmit,
      onCancel
    }
  }
}
