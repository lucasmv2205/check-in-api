import { FastifyRequest, FastifyReply } from 'fastify'
import { registerUseCase } from '../../use-cases/register'

import { z } from 'zod'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    const user = await registerUseCase({ name, email, password })
    reply.status(201).send(user)
  } catch (error) {
    return reply.status(409).send(error)
  }
}
