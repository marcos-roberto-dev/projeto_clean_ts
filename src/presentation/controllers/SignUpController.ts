import { HttpRequest, HttpResponse } from '../protocols/Https'
import { EmailValidator } from '../protocols/EmailValidator'
import { MissingParamError } from '../errors/MissingParamError'
import { InvalidParamError } from '../errors/InvalidParamError'
import { badRequest } from '../helpers/httpHelper'

export class SignUpController {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields: string[] = ['name', 'email', 'password', 'passwordConfirm']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
    }
    const isEmailValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isEmailValid) return badRequest(new InvalidParamError('email'))
  }
}
