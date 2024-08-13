/**
 * Validation schema for the files having forms.
 *
 */
import * as Yup from "yup";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { maxBetAmount, minBetAmount, msgs, regexChecks } from "./appConstants";
dayjs.extend(customParseFormat);

/**
 * Validation schema for user profile.
 */
export const profile = {
  initialValues: () => {
    return {
      userName: "",
      img: "",
      chainId: "",
    };
  },
  validationSchema: Yup.object({
    userName: Yup.string()
      .matches(regexChecks.name, msgs.pleaseEnterValid + " username")
      .min(3, msgs.pleaseEnter + msgs.min3?.toLocaleLowerCase())
      .max(15, msgs.pleaseEnter + msgs.max15?.toLocaleLowerCase())
      .transform((value, originalValue) => originalValue?.toUpperCase()),
    img: Yup.string(),
    chainId: Yup.string().matches(
      regexChecks.name,
      msgs.pleaseEnterValid + " chain id"
    ),
  }),
};

/**
 * Validation schema for creating a market.
 *
 */
export const creatMarket = {
  initialValues: (props) => {
    return {
      coin: props?.coins ?? null,
      priceLevel: props?.priceLevel ?? null,
      targetDate: props?.targetDate ?? "",
      eventDurationDays: 1,
      eventDurationHours: props?.eventDurationHours ?? null,
      closureTime: props?.closureTime ?? "",
    };
  },
  validationSchema: () =>
    Yup.object({
      coin: Yup.string()
        .required(msgs.pleaseSelect + " a crypto")
        .transform((value, originalValue) => originalValue?.toUpperCase()),
      priceLevel: Yup.number()
        .required(msgs.pleaseEnter + " price level")
        .min(0.1, "Minimum price level is 0.1"),
      targetDate: Yup.date().required(
        msgs.pleaseSelect + " target date & time"
      ),
      closureTime: Yup.date(),
      eventDurationDays: Yup.number()
        .required(msgs.pleaseEnter + " days")
        .max(365, "Maximum 365 days are allowed"),
      eventDurationHours: Yup.number()
        .required(msgs.pleaseEnter + " hours")
        .max(24, "Please enter within in 24 hours"),
    }),
};

/**
 * Validation schema for raising a dispute.
 *
 */
export const raiseDisput = {
  initialValues: () => ({
    event: null,
    category: null,
    email: "",
    description: "",
    img: [],
    charachterCount: 0,
    eventDetails: null,
    imgIndex: [],
  }),
  validationSchema: Yup.object({
    email: Yup.string()
      .matches(regexChecks?.email, msgs.pleaseEnterValid + " " + " email")
      .required(msgs.pleaseEnter + " email")
      .max(300, "Maximum 300 charachters are allowed"),
    img: Yup.array().min(1, msgs.pleaseUpload + " image"),
    description: Yup.string()
      .required(msgs.pleaseEnter + " description")
      .min(100, msgs.pleaseEnter + " " + msgs.min100)
      .max(300, msgs.pleaseEnter + " " + msgs.max300),
    category: Yup.string().required(msgs.pleaseSelect + " category"),
    event: Yup.string().required(msgs.pleaseSelect + " event"),
  }),
};

/**
 * Validation schema for palcing a bet.
 *
 */
export const bet = {
  initialValues: (betOn) => ({
    amount: null,
    betOn,
  }),
  validationSchema: (walletBalance) =>
    Yup.object({
      amount: Yup.number()
        .required(msgs.pleaseEnter + " amount")
        .max(
          walletBalance >= maxBetAmount
            ? maxBetAmount
            : Math.min(walletBalance - 1, maxBetAmount),
          "Insufficient balance"
        )
        .min(
          minBetAmount,
          minBetAmount == 0
            ? "Insufficient balance"
            : `Minimum bet amount must be ${minBetAmount} ${msgs.azero}`
        ),
      betOn: Yup.string().required(msgs.pleaseSelect + " Yes/No"),
    }),
};
