import { CollectionConfig, FieldHook } from "payload/types";
import {
  CAT_GENDER_SELECT_OPTIONS,
  CAT_STATUS_SELECT_OPTIONS,
  DEFAULT_DATE_FORMAT,
} from "@macjiboter/shared-constants";
import { Cat, CatStatus } from "@macjiboter/shared-types";
import slugify from "slugify";
import payload from "payload";

const generateSlugOnNameChange: FieldHook<Cat, string> = async ({
  data,
  value: name,
  originalDoc,
}) => {
  const slugIsAlreadyTakenByAnotherDoc = async (slug: string) => {
    const existing = await payload.find({
      collection: "muce",
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            id: {
              not_equals: originalDoc.id,
            },
          },
        ],
      },
    });

    return existing.totalDocs > 0;
  };

  const generateUniqueSlug = async () => {
    const separator = "-";
    const originalSlug = slugify(name, { replacement: separator, lower: true });
    let suffix = 1;
    let resultSlug = originalSlug;

    while (await slugIsAlreadyTakenByAnotherDoc(resultSlug)) {
      resultSlug = `${originalSlug}${separator}${suffix}`;
      suffix += 1;
    }

    return resultSlug;
  };

  const nameHasChanged = originalDoc.name !== name;
  const noSlugYet = !data.slug;

  if (nameHasChanged || noSlugYet) {
    data.slug = await generateUniqueSlug();
  }

  return name;
};

export const CatCollection: CollectionConfig = {
  slug: "muce",
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
          relationTo: "muce-slike",
        },
      ],
    },
  ],
};
