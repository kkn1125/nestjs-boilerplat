export const ResponseProtocol = {
  UnknownError: {
    code: -9999,
    message: 'unknown error',
  },
  NoCreateUserError: {
    code: -100,
    message: 'no create user',
  },
  NotFoundUserError: {
    code: -101,
    message: 'not found user',
  },
  PasswordNotMatchError: {
    code: -102,
    message: 'password not match',
  },
} as const;
export type ResponseProtocol = typeof ResponseProtocol;
