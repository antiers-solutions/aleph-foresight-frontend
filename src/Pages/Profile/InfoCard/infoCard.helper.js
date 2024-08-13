/**
 * Card data for profile display
 *
 * This array of objects provides the necessary data for rendering
 * cards on the profile, including the icon, card name, and key.
 *
 */

import {
  Eventstraded,
  NetPosition,
  Volumetraded,
} from "../../../assets/StoreAsset/StoreAsset";

export const cardData = [
  {
    icon: <NetPosition />,
    cardName: "P&L",
    key: "netPosition",
  },
  {
    icon: <Volumetraded />,
    cardName: "Volume Traded",
    key: "volumeTraded",
  },
  {
    icon: <Eventstraded />,
    cardName: "Events Traded",
    key: "eventsTraded",
  },
];
