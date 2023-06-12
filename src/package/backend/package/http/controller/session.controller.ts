import type { CreateSessionDTO } from "../dto/session.dto";

export interface SessionController {
  handleSignIn(payload: CreateSessionDTO): Promise<Response>;
  handleSignUp(payload: CreateSessionDTO): Promise<Response>;
}
