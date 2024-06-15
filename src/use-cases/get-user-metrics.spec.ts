import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get user check in metrics use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository) // sut -> system under test
  })

  it('should be able to get user check-in metrics', async () => {
    await checkInsRepository.create({
      user_id: 'user-id-01',
      gym_id: 'gym-id-01',
    })

    await checkInsRepository.create({
      user_id: 'user-id-01',
      gym_id: 'gym-id-02',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-id-01',
    })

    expect(checkInsCount).toBe(2)
  })
})
