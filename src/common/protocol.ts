export const ResponseProtocol = {
  NoCreateUserError: {
    code: -100,
    message: 'no create user',
  },
  NotFoundUserError: {
    code: -101,
    message: 'not found user',
  },
} as const;
export type ResponseProtocol = typeof ResponseProtocol;
