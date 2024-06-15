import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('fetch nearby gym use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gym', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      latitude: -18.9221205,
      longitude: -48.2493067,
    })

    await gymsRepository.create({
      title: 'Far 2',
      latitude: -18.794968,
      longitude: -48.1124632,
    })

    const { gyms } = await sut.execute({
      userLatitude: -18.9221205,
      userLongitude: -48.2493067,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})
