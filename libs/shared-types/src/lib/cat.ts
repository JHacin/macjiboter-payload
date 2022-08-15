import { MongoDocument } from "./shared";

export interface Cat extends MongoDocument {
  name: string;
  gender: CatGender;
  status: CatStatus;
  summary: string;
  description: any[]; // Todo: slateJS type
  dateOfBirth: Date | null;
  dateAcceptedToShelter: Date | null;
  dateAcceptedToSponsorshipProgram: Date | null;
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
