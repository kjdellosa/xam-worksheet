import z from 'zod'

export const userSchema = z.object({
  branchId: z.number(),
  userName: z.string().min(1),
  password: z.string().min(1),
  firstName: z.string().min(1),
  middleName: z.string().min(1),
  lastName: z.string().min(1),
  position: z.string().min(1)
})
