import * as CryptoJS from 'crypto-js';

export class PasswordEncoder {
  private static readonly SALT_ROUNDS = 10;

  public static encode(password: string): string {
    return CryptoJS.SHA256(password).toString();
  }

  public static matches(rawPassword: string, encodedPassword: string): boolean {
    return this.encode(rawPassword) === encodedPassword;
  }
}
