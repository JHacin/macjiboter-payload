import { CollectionConfig } from "payload/types";

export const CatPhotoCollection: CollectionConfig = {
  slug: "muce-slike",
  labels: {
    singular: "Slika muce",
    plural: "Muce - slike",
  },
  admin: {
    useAsTitle: "alt",
  },
  upload: {
    staticURL: "/uploads/muce-slike",
    staticDir: "uploads/cat-photos",
    imageSizes: [
      {
        name: "thumbnail",
        width: 350,
        height: 350,
        crop: "centre",
      },
      {
        name: "card",
        width: 720,
        height: 720,
        crop: "centre",
      },
      {
        name: "full",
        width: 1024,
        height: 1024,
        crop: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Naslov",
      required: true,
      admin: {
        description: "Pomožno besedilo za čitalce zaslona.",
      },
    },
  ],
};
