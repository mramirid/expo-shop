export interface AuthInputPayload {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface UserAuth {
  userId: string | null;
  token: string | null;
  expirationDate: number | null;
}

export interface FireAuthResBody {
  idToken: string;
  expiresIn: string;
  localId: string;
}
