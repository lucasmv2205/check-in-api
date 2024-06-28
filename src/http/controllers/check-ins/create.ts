import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInParamsSchema.parse(req.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(req.body)

  const createCheckInUseCase = makeCheckInUseCase()

  const gym = await createCheckInUseCase.execute({
    userId: req.user.sub,
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  reply.status(201).send(gym)
}
