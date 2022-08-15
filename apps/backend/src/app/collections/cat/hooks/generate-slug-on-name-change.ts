import { FieldHook } from "payload/types";
import { Cat } from "@macjiboter/shared-types";
import payload from "payload";
import slugify from "slugify";
import { CollectionSlug } from "../../../types";

export const generateSlugOnNameChange: FieldHook<Cat, string> = async ({
  data,
  value: name,
  originalDoc,
}) => {
  const slugIsAlreadyTakenByAnotherDoc = async (slug: string) => {
    const existing = await payload.find({
      collection: CollectionSlug.Cats,
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
