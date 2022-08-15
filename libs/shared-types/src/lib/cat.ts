import { CollectionItemResponseBase } from "./shared";

export interface Cat extends CollectionItemResponseBase {
  name: string;
  slug: string;
  gender: CatGender;
  status: CatStatus;
  summary: string;
  description: any[]; // Todo: slateJS type
  dateOfBirth: string | null;
  dateAcceptedToShelter: string | null;
  dateAcceptedToSponsorshipProgram: string | null;
  photos: any[]; // Todo
}

export enum CatGender {
  Male = "1",
  Female = "2",
}

export enum CatStatus {
  SeekingSponsors = "1",
  TempNotSeekingSponsors = "2",
  NotSeekingSponsors = "3",
  Adopted = "4",
  RIP = "5",
}
