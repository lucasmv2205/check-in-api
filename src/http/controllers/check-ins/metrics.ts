import { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'

export async function metrics(req: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: req.user.sub,
  })

  reply.status(200).send({ checkInsCount })
}
