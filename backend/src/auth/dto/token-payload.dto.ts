// TODO: analisar mantenho como class(dto) ou transformo em interface
export class TokenPayloadDto {
  sub: string;
  email: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}
