import { CatGender, CatStatus, SelectOption } from "@macjiboter/shared-types";
import { $enum } from "ts-enum-util";

export const CAT_GENDER_LABELS: Record<CatGender, string> = {
  [CatGender.Male]: "Samček",
  [CatGender.Female]: "Samička",
};

export const CAT_GENDER_SELECT_OPTIONS: SelectOption[] = $enum(CatGender).map((gender) => ({
  label: CAT_GENDER_LABELS[gender],
  value: gender,
}));

export const CAT_STATUS_LABELS: Record<CatStatus, string> = {
  [CatStatus.SeekingSponsors]: "išče botre",
  [CatStatus.TempNotSeekingSponsors]: "trenutno ne išče botrov",
  [CatStatus.NotSeekingSponsors]: "ne išče botrov",
  [CatStatus.Adopted]: "v novem domu",
  [CatStatus.RIP]: "RIP",
};

export const CAT_STATUS_SELECT_OPTIONS: SelectOption[] = $enum(CatStatus).map((status) => ({
  label: CAT_STATUS_LABELS[status],
  value: status,
}));
