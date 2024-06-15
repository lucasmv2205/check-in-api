import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearbyProps {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  create: (gym: Prisma.GymCreateInput) => Promise<Gym>
  findById: (id: string) => Promise<Gym | null>
  searchMany: (query: string, page: number) => Promise<Gym[]>
  findManyNearby: (params: FindManyNearbyProps) => Promise<Gym[]>
}
