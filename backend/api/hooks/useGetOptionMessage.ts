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

    default:
      break;
  }

  return message;
};

export default useGetOptionMessage;
