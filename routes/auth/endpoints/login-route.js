import { httpAdapter, validate } from '../../../middleware/index.js';
import { loginValidation } from '../validation.js';

export function loginRoute(router) {
  /**
   * @openapi
   * /auth/login:
   *  post:
   *    description: Login a user with credentials
   *    security: []   # No security
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              email:
   *                type: string
   *                example: 'john@doe.com'
   *              password:
   *                type: string
   *                minimum: 1
   *                maximum: 255
   *    responses:
   *      200:
   *        description: Returns a user object with tokens
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AuthenticatedResponse'
   *      400:
   *        $ref: '#/components/responses/BadRequest'
   *      401:
   *        $ref: '#/components/responses/Unauthorized'
   */
  router.post('/login', validate(loginValidation), httpAdapter((req) => {
    const { email, password } = req.body;
    return req.api.login(email, password);
  }));
}
