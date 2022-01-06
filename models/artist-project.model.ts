export interface ArtistInProject {
  artistId: string;
  artistFirstName: string;
  artistLastName: string;
  artistAvatar: string;
  invitedDate: Date | null;
  requestedDate: Date | null;
  joinedDate: Date | null;
  canceledDate: Date | null;
  finishedDate: Date | null;
  status: string;
}

export interface ProjectInArtist {
  projectId: string;
  projectName: string;
  customerId: string;
  customerLastName: string;
  customerFirstName: string;
  customerAvatar: string;
  invitedDate: Date | null;
  requestedDate: Date | null;
  joinedDate: Date | null;
  canceledDate: Date | null;
  finishedDate: Date | null;
  status: string;
}
