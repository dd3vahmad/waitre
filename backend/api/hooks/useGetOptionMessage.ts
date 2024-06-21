import { CheckOutMsg } from "../resources/CheckOutMsg";
import { CurrentOrderMsg } from "../resources/CurrentOrderMsg";
import { HistoryMsg } from "../resources/HistoryMsg";
import { Menu } from "../resources/Menu";
import { Options } from "../resources/Options";

const useGetOptionMessage = (option: number) => {
  let message: any;

  switch (option) {
    case 1:
      message = Menu;
      break;
    case 69:
      message = Options;
      break;
    case 99:
      message = CheckOutMsg;
      break;
    case 98:
      message = HistoryMsg;
      break;
    case 97:
      message = CurrentOrderMsg;
      break;
    case 0:
      message = CurrentOrderMsg;
      break;

    default:
      break;
  }

  return message;
};

export default useGetOptionMessage;
