import { it, describe, expect, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository) // sut -> system under test

    const gym = {
      id: 'gym-id',
      title: 'Gym Name',
      description: 'Gym Description',
      phone: '123456789',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    }
    gymsRepository.items.push(gym)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date('2021-01-01T10:00:00'))

    await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(
      sut.execute({
        userId: 'user-id',
        gymId: 'gym-id',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date('2021-01-01T10:00:00'))

    const checkIn1 = await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date('2021-01-02T10:00:00'))

    const checkIn2 = await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn1.checkIn.id).toEqual(expect.any(String))
    expect(checkIn2.checkIn.id).toEqual(expect.any(String))
    expect(checkIn1.checkIn.id).not.toEqual(checkIn2.checkIn.id)
  })

  it('should be able to not check in on a distant gym', async () => {
    gymsRepository.items.push({
      id: 'distant-gym-id',
      title: 'Distant Gym',
      description: 'Distant Gym Description',
      phone: '123456789',
      latitude: new Decimal(-18.9025114),
      longitude: new Decimal(-48.2041598),
    })

    await expect(async () => {
      await sut.execute({
        userId: 'user-id',
        gymId: 'distant-gym-id',
        userLatitude: -18.9221205,
        userLongitude: -48.2493067,
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
