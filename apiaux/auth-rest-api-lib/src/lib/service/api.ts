export * from './token.service';
import { TokenService } from './token.service';
export * from './user.service';
import { UserService } from './user.service';
export const APIS = [TokenService, UserService];
