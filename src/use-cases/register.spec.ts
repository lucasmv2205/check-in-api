import { it, describe, expect } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositories'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register use case', () => {
  it('should hash user password upon registration', async () => {
    const prismaUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    const isPasswordHashed = await compare('123456', user.password_hash)

    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const prismaUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    const email = 'johndoe@email.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(
      async () =>
        await registerUseCase.execute({
          name: 'John Doe',
          email,
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to able to register', async () => {
    const prismaUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    const email = 'johndoe@email.com'

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(user).toMatchObject({
      name: 'John Doe',
      email,
    })
  })
})
