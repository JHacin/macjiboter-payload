import * as countries from "i18n-iso-countries";
import slovenianCountriesLocale from "i18n-iso-countries/langs/sl.json";

countries.registerLocale(slovenianCountriesLocale);

const I18N_LOCALE = "sl";

const COUNTRY_NAMES = countries.getNames(I18N_LOCALE);

export const DEFAULT_COUNTRY_SELECT_VALUE = "SI";

export const COUNTRY_SELECT_OPTIONS = Object.keys(COUNTRY_NAMES).map((code) => ({
  label: COUNTRY_NAMES[code],
  value: code,
}));
