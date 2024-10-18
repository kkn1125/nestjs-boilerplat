export class OkResponse {
  ok: boolean;
  code: number;
  data: any;

  constructor(code: number, data: any) {
    this.ok = [200, 201].includes(code);
    this.code = code;
    this.data = data;
  }
}
