/**
 * Social media links and footer menu configuration.
 *
 * This module exports two constants: `socialLink` and `footerMenu`.
 * `socialLink` is an array of objects containing social media icons.
 * `footerMenu` is an array of objects containing footer menu items with labels and routes.
 *
 */
import React from "react";
import Path from "../../Routing/Constant/RoutePaths";
import {
  Telegram,
  Twitter,
} from "../../assets/StoreAsset/StoreAsset";
import { env } from "../../utils/appConstants";

export const socialLink = [
  { label: <Twitter />, to: env?.twitter },
  { label: <Telegram /> ,to: env?.telegram},
];

export const footerMenu = [
  { label: "About Us", to: Path.ABOUT },
  // { label: "Contact Us", to: Path?.CONTACTUS },
];
