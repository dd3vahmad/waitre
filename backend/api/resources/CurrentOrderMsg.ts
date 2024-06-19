import { CurrentOrder } from "./CurrentOrder";

export const CurrentOrderMsg = true
  ? {
      text: "No current order",
      sentAt: new Date(),
      menuOptions: [
        {
          title: "to place a new order",
          value: 69,
        },
        {
          title: "to see all options",
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
          title: "to see all options",
          value: 69,
        },
      ],
    };
