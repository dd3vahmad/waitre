import { Menu } from "../resources/Menu";

const useGetOptionMessage = (option: number) => {
  let message: any;

  switch (option) {
    case 1:
      message = Menu;
      break;

    default:
      break;
  }

  return message;
};

export default useGetOptionMessage;
