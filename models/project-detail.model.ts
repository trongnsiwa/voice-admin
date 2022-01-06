import { ArtistInProject } from './artist-project.model';
import { Customer } from './customer.model';

export interface ProjectDetail {
  id: string;
  name: string;
  description: string;
  poster: Customer;
  minAge: number;
  maxAge: number;
  projectUsagePurposes: string[];
  createDate: Date;
  projectDeadline: Date;
  responseDeadline: Date;
  status: string;
  numOfResponse: number;
  price: number;
  projectVoiceStyles: string[];
  projectCountries: string[];
  projectGenders: string[];
  artistProject: ArtistInProject[];
}
