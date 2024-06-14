import { Gym } from '@prisma/client'

export interface GymsRepository {
  create: (gym: Gym) => Promise<void>
  findById: (id: string) => Promise<Gym | null>
}
