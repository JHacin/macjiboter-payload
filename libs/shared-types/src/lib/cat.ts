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
  photos: { photo: CatPhoto; id: string }[];
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

interface CatPhoto extends CollectionItemResponseBase {
  alt: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  url: string;
  sizes: Record<
    "thumbnail" | "card" | "full",
    {
      width: number;
      height: number;
      mimeType: string;
      filesize: number;
      filename: string;
      url: string;
    }
  >;
}
