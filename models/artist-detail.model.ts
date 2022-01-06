export interface ArtistDetail {
  id: string;
  username?: string;
  email: string;
  phone?: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: number;
  gender: string;
  status: string;
  avatar: string;
  bio: string;
  price: number;
  rate: number | null;
  studio: boolean;
  createDate?: Date;
  updateDate?: Date;
  updatedBy?: string;
  voiceStyles: string[];
  countries: string[];
}
