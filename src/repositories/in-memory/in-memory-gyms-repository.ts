import { Gym } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async create(gym: Gym) {
    this.items.push(gym)
  }

  async findById(id: string) {
    return this.items.find((gym) => gym.id === id) || null
  }
}
