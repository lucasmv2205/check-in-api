import { hash } from 'bcryptjs'
import { prisma } from '../lib/prisma'

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(
    private usersRepository: {
      create: (arg0: {
        name: string
        email: string
        password_hash: string
      }) => Promise<unknown>
    },
  ) {}

  async execute({ name, email, password }: RegisterUseCaseProps) {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('User with same email already exists')
    }

    const passwordHash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })

    return user
  }
}
