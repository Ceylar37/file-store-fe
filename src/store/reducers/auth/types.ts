export interface AuthInitialState {
  profile: Profile | null;
}

export interface Profile {
  login: string;
  id: string;
}

export interface ProfileCreds {
  login: string;
  id: string;
  token: string;
}
