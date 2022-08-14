import { buildConfig } from "payload/config";
import path from "path";
import { SponsorCollection } from "./app/collections/sponsor";
import { DEFAULT_DATE_FORMAT } from "@macjiboter/shared-constants";

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
    dateFormat: DEFAULT_DATE_FORMAT,
  },
  collections: [SponsorCollection],
});
