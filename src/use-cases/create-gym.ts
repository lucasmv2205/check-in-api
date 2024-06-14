import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface CreateGymUseCaseProps {
  title: string
  latitude: number
  longitude: number
  description: string | null
  phone: string | null
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    latitude,
    longitude,
    description,
    phone,
  }: CreateGymUseCaseProps): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      latitude,
      longitude,
      description,
      phone,
    })

    return { gym }
  }
}
