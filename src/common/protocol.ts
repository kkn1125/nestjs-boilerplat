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
  AlreadyExistsUserError: {
    code: -102,
    message: 'already exists user',
  },
  PasswordNotMatchError: {
    code: -103,
    message: 'password not match',
  },
  EmailAlreadyExistsError: {
    code: -104,
    message: 'email already exists',
  },
  SessionDeletionError: {
    code: -105,
    message: 'session deletion error',
  },
  SessionStorageError: {
    code: -106,
    message: 'session storage error',
  },
  NotFoundSessionError: {
    code: -107,
    message: 'not found session',
  },
  SessionRefreshError: {
    code: -108,
    message: 'session refresh error',
  },
  PasswordRequiredError: {
    code: -109,
    message: 'password required',
  },
  ChangePasswordRequiredError: {
    code: -110,
    message: 'change password required',
  },
  EmailRequiredError: {
    code: -111,
    message: 'email required',
  },
  UsernameRequiredError: {
    code: -112,
    message: 'username required',
  },
  RoleRequiredError: {
    code: -113,
    message: 'role required',
  },
  RequiredError: {
    code: -114,
    message: 'required error',
  },
  InvalidRoleError: {
    code: -115,
    message: 'invalid role',
  },
  UnauthorizedError: {
    code: -116,
    message: 'unauthorized',
  },
  InvalidTokenError: {
    code: -117,
    message: 'invalid token',
  },
} as const;
export type ResponseProtocol = typeof ResponseProtocol;
