import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { makeSearchGymUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(req: FastifyRequest, reply: FastifyReply) {
  const createGymQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = createGymQuerySchema.parse(req.query)

  const searchGymUseCase = makeSearchGymUseCase()

  const { gyms } = await searchGymUseCase.execute({ query: q, page })

  reply.status(200).send({ gyms })
}
