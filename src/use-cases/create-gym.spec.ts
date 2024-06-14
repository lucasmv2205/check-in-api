import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create gym use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gyn', async () => {
    const { gym } = await sut.execute({
      title: 'Gym 1',
      latitude: 10,
      longitude: 20,
      description: 'Description',
      phone: '123456789',
    })

    expect(gym.id).toBeDefined()
    expect(gym.title).toBe('Gym 1')
  })
})
