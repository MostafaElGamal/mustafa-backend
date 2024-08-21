import { auth, httpAdapter } from '../../../middleware/index.js';

export function userRoute(router) {
  /**
   * @openapi
   * /auth/me:
   *  get:
   *    description: Gets the current logged user
   *    responses:
   *      200:
   *        description: Returns a user object
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UserResponse'
   *      401:
   *        $ref: '#/components/responses/Unauthorized'
   */
  router.get('/me', auth(), httpAdapter((req) => req.user));
}
