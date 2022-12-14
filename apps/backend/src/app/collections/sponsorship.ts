import { CollectionConfig } from "payload/types";
import { PAYMENT_TYPE_SELECT_OPTIONS } from "../../../../../libs/shared-constants/src/lib/sponsorship";
import { PaymentType } from "@macjiboter/shared-types";
import { DEFAULT_DATE_FORMAT } from "@macjiboter/shared-constants";
import { CollectionSlug } from "../types";

export const SponsorshipCollection: CollectionConfig = {
  slug: CollectionSlug.Sponsorships,
  labels: {
    singular: "Botrstvo",
    plural: "Botrstva",
  },
  admin: {
    defaultColumns: [
      "id",
      "cat",
      "sponsor",
      "isGift",
      "monthlyAmount",
      "isActive",
      "requestedDuration",
      "endedAt",
    ],
  },
  fields: [
    {
      name: "cat",
      type: "relationship",
      relationTo: CollectionSlug.Cats,
      label: "Muca",
      required: true,
    },
    {
      name: "sponsor",
      type: "relationship",
      relationTo: CollectionSlug.Sponsors,
      label: "Boter",
      required: true,
    },
    {
      name: "payer",
      type: "relationship",
      relationTo: CollectionSlug.Sponsors,
      label: "Plačnik",
    },
    {
      name: "isGift",
      type: "checkbox",
      label: "Podarjeno",
      defaultValue: false,
    },
    {
      name: "isAnonymous",
      type: "checkbox",
      label: "Anonimno",
      defaultValue: false,
    },
    {
      name: "isActive",
      type: "checkbox",
      label: "Aktivno",
      defaultValue: false,
    },
    {
      name: "monthlyAmount",
      type: "number",
      label: "Mesečni znesek",
      required: true,
      min: 0,
    },
    {
      name: "paymentType",
      type: "radio",
      label: "Način plačevanja",
      options: PAYMENT_TYPE_SELECT_OPTIONS,
      defaultValue: PaymentType.BankTransfer,
      required: true,
    },
    {
      name: "requestedDuration",
      type: "number",
      label: "Trajanje (v mesecih)",
      min: 0,
    },
    {
      name: "endedAt",
      type: "date",
      label: "Datum konca",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: DEFAULT_DATE_FORMAT,
        },
      },
    },
  ],
};
