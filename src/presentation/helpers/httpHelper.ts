import { HttpResponse } from '../protocols/Https'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})
