import { UserCredsDto } from './userCreds';

export interface UserDto extends UserCredsDto {
  id: string;
  token: string;
}
