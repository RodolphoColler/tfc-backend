import { Request } from 'express';
import { IUser } from './userInterface';

export default interface IRequestPayload extends Request{
  tokenPayload?: IUser
}
