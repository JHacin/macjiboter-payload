import { CollectionConfig } from "payload/types";
import {
  CAT_GENDER_SELECT_OPTIONS,
  CAT_STATUS_SELECT_OPTIONS,
  DEFAULT_DATE_FORMAT,
} from "@macjiboter/shared-constants";
import { CatStatus } from "@macjiboter/shared-types";
import { CollectionSlug } from "../../types";
import { generateSlugOnNameChange } from "./hooks/generate-slug-on-name-change";

export const CatCollection: CollectionConfig = {
  slug: CollectionSlug.Cats,
  labels: {
    singular: "Muca",
    plural: "Muce",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "status"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "slug",
      type: "text",
      label: "Identifikator na spletni strani z opisom",
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
    {
      name: "name",
      type: "text",
      required: true,
      label: "Ime",
      hooks: {
        beforeChange: [generateSlugOnNameChange],
      },
    },
    {
      name: "gender",
      type: "radio",
      label: "Spol",
      options: CAT_GENDER_SELECT_OPTIONS,
      required: true,
    },
    {
      name: "status",
      type: "select",
      label: "Status",
      options: CAT_STATUS_SELECT_OPTIONS,
      required: true,
      defaultValue: CatStatus.NotSeekingSponsors,
    },
    {
      name: "isGroup",
      type: "checkbox",
      label: "Skupina?",
    },
    {
      name: "summary",
      type: "text",
      required: true,
      label: "Kratek opis",
    },
    {
      name: "description",
      type: "richText",
      label: "Zgodba",
    },
    {
      name: "dateOfBirth",
      type: "date",
      label: "Datum rojstva",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: DEFAULT_DATE_FORMAT,
          maxDate: new Date(),
        },
      },
    },
    {
      name: "dateAcceptedToShelter",
      type: "date",
      label: "Datum sprejema v Mačjo hišo",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: DEFAULT_DATE_FORMAT,
          maxDate: new Date(),
        },
      },
    },
    {
      name: "dateAcceptedToSponsorshipProgram",
      type: "date",
      label: "Datum vstopa v botrstvo",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: DEFAULT_DATE_FORMAT,
          maxDate: new Date(),
        },
      },
    },
    {
      name: "photos",
      type: "array",
      label: "Slike",
      maxRows: 5,
      fields: [
        {
          name: "photo",
          type: "upload",
          relationTo: CollectionSlug.CatPhotos,
        },
      ],
    },
  ],
};
