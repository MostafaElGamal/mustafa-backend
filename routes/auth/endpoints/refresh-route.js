import { httpAdapter, validate } from '../../../middleware/index.js';
import { refreshTokenValidation } from '../validation.js';
import { extractTokenFromHeader } from '#utils';

export function refreshRoute(router) {
  /**
   * @openapi
   * /auth/refresh:
   *  post:
   *    description: Refresh a token
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              refreshToken:
   *                type: string
   *    responses:
   *      200:
   *        description: Returns a new token and a refresh token
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/RefreshTokenResponse'
   *      400:
   *        $ref: '#/components/responses/BadRequest'
   *      401:
   *        $ref: '#/components/responses/Unauthorized'
   */
  router.post('/refresh', validate(refreshTokenValidation), httpAdapter((req) => {
    return req.api.refreshToken(extractTokenFromHeader(req), req.body.refreshToken);
  }));
}
