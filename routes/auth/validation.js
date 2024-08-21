export const registerValidation = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 3, maxLength: 255 },
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 1, maxLength: 255 },
    },
    additionalProperties: false,
  },
};

export const loginValidation = {
  body: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 1, maxLength: 255 },
    },
    additionalProperties: false,
  },
};

export const refreshTokenValidation = {
  body: {
    type: 'object',
    properties: {
      refreshToken: { type: 'string' },
    },
    additionalProperties: false,
  },
};
