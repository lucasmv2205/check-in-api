import { it, describe, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('validate check in use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository) // sut -> system under test

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate check in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      user_id: 'user-id',
      gym_id: 'gym-id',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toBeDefined()
    expect(checkInsRepository.items[0].validated_at).toBeDefined()
    expect(checkIn.validated_at).toBeInstanceOf(Date)
  })

  it('should not be able to validate inexistent check in', async () => {
    await checkInsRepository.create({
      user_id: 'user-id',
      gym_id: 'gym-id',
    })

    await expect(
      sut.execute({
        checkInId: 'invalid-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate check in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40)) // utc

    const createdCheckIn = await checkInsRepository.create({
      user_id: 'user-id',
      gym_id: 'gym-id',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
