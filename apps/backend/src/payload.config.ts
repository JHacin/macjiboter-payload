import { buildConfig } from "payload/config";
import { COUNTRY_SELECT_OPTIONS, DEFAULT_COUNTRY_SELECT_VALUE } from "@macjiboter/shared-constants";
import path from "path";

const LIB_KEYS = ["shared-constants", "shared-types"];

const LIB_ALIASES: Record<string, string> = LIB_KEYS.reduce((acc, curr) => {
  const makeLibAlias = (name: string) => ({
    key: `@macjiboter/${name}`,
    modulePath: path.resolve(__dirname, `../../../libs/${name}/src/index.ts`),
  });

  const { key, modulePath } = makeLibAlias(curr);

  acc[key] = modulePath;

  return acc;
}, {});

export default buildConfig({
  admin: {
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          ...LIB_ALIASES,
        },
      },
    }),
  },
  collections: [
    {
      slug: "botri",
      labels: {
        singular: "Boter",
        plural: "Botri",
      },
      admin: {
        useAsTitle: "email",
        disableDuplicate: true,
        defaultColumns: ["email", "firstName", "lastName", "createdAt"],
      },
      fields: [
        {
          name: "email",
          type: "email",
          required: true,
          label: "Email",
        },
        {
          type: "row",
          fields: [
            {
              name: "firstName",
              type: "text",
              required: true,
              label: "Ime",
            },
            {
              name: "lastName",
              type: "text",
              required: true,
              label: "Priimek",
            },
          ],
        },
        {
          name: "dateOfBirth",
          type: "date",
          label: "Datum rojstva",
          admin: {
            date: {
              pickerAppearance: "dayOnly",
              displayFormat: "d MMM, yyy",
              maxDate: new Date(),
            },
          },
        },
        {
          name: "gender",
          type: "radio",
          label: "Spol",
          options: [
            { label: "Moški", value: "m" },
            { label: "Ženska", value: "f" },
          ],
          required: true,
        },
        {
          name: "address",
          type: "group",
          label: "Naslov",
          required: true,
          fields: [
            {
              name: "streetAndHouseNumber",
              type: "text",
              label: "Ulica in hišna številka",
              required: true,
            },
            {
              type: "row",
              fields: [
                {
                  name: "zipCode",
                  type: "text",
                  label: "Poštna številka",
                  required: true,
                },
                {
                  name: "city",
                  type: "text",
                  label: "Kraj",
                  required: true,
                },
              ],
            },
            {
              name: "country",
              type: "select",
              label: "Država",
              required: true,
              options: COUNTRY_SELECT_OPTIONS,
              defaultValue: DEFAULT_COUNTRY_SELECT_VALUE,
            },
          ],
        },
      ],
    },
  ],
});
