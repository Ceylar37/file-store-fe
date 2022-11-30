export interface AuthInitialState {
  profile: Profile | null
}

export interface Profile {
  login: string;
  id: string;
}