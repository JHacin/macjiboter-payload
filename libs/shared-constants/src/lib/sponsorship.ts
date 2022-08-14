import { PaymentType, SelectOption } from "@macjiboter/shared-types";
import { $enum } from "ts-enum-util";

export const PAYMENT_TYPE_LABELS: Record<PaymentType, string> = {
  [PaymentType.BankTransfer]: "Nakazilo",
  [PaymentType.DirectDebit]: "Trajnik",
};

export const PAYMENT_TYPE_SELECT_OPTIONS: SelectOption[] = $enum(PaymentType).map((type) => ({
  label: PAYMENT_TYPE_LABELS[type],
  value: type,
}));
