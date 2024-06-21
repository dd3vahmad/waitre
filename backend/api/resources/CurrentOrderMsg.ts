import { CurrentOrder } from "./CurrentOrder";

export const CurrentOrderMsg = true
  ? {
      text: "No current order",
      sentAt: new Date(),
      menuOptions: [
        {
          title: "see all options",
          value: 69,
        },
        {
          title: "place a new order",
          value: 1,
        },
      ],
    }
  : {
      text: "Here is your order current order",
      sentAt: new Date(),
      orderHistory: [CurrentOrder],
      menuOptions: [
        {
          title: "see all options",
          value: 69,
        },
        {
          title: "place a new order",
          value: 1,
        },
      ],
    };
