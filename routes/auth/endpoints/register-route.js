import { httpAdapter, validate } from '../../../middleware/index.js';
import { registerValidation } from '../validation.js';
import { statusCodes } from '#utils';

export function registerRoute(router) {
  /**
   * @openapi
   * /auth/register:
   *  post:
   *    description: Register a user
   *    security: []   # No security
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              name:
   *                type: string
   *                minimum: 3
   *                maximum: 255
   *                example: 'john'
   *              email:
   *                type: string
   *                example: 'john@doe.com'
   *              password:
   *                type: string
   *                minimum: 1
   *                maximum: 255
   *    responses:
   *      201:
   *        description: Returns a user object with tokens
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AuthenticatedResponse'
   *      400:
   *        $ref: '#/components/responses/BadRequest'
   */
  router.post('/register', validate(registerValidation), httpAdapter((req) => {
    const { name, email, password } = req.body;
    return req.api.register(name, email, password);
  }, statusCodes.created));
}
