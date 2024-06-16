import useFormatDate from "../hooks/useFormatDate";
import Menu from "./Menu";
import ChatBotIcon from "../assets/chatbot-icon.png";
import Options from "./Options";

interface MenuProps {
  title: string;
  price: number;
  imageUrl: string;
}

interface OptionProps {
  title: string;
  value: 1 | 99 | 98 | 97 | 0 | 69;
}

interface Props {
  text: string | number;
  menu?: MenuProps[];
  menuOptions?: OptionProps[];
  options?: OptionProps[];
  onClick: (value: 1 | 99 | 98 | 97 | 0 | 69) => void;
  sentBy: 0 | 1;
  sentAt: Date | string;
  setSelectedItems: (index: number, type: string) => void;
}

const Message = ({
  text,
  menu,
  menuOptions,
  options = [],
  sentBy,
  sentAt,
  onClick,
  setSelectedItems,
}: Props) => {
  const UserIcon =
    "https://t4.ftcdn.net/jpg/08/14/64/71/240_F_814647190_f3gpsdVJKC89OxukLaZVQHIotS1s6LWz.jpg";

  return (
    <div
      className={`flex items-start gap-1 ${
        sentBy && "self-end flex-row-reverse"
      }`}
    >
      <div className="flex justify-center items-center rounded-full border w-8 h-8 overflow-hidden">
        <img
          className="w-8 h-8 object-cover rounded-full"
          src={sentBy ? UserIcon : ChatBotIcon}
          alt="Person Icon"
        />
      </div>
      <div
        className={`bg-green-500 w-fit px-3 py-1 rounded-b-lg ${
          sentBy ? "rounded-s-lg" : "rounded-e-lg"
        } flex flex-col items-end gap-1 max-w-64`}
      >
        <p className="text-slate-100 mb-0 font-bold text-xs italic underline">
          {text}
        </p>
        {menu?.length && (
          <Menu
            menuOptions={menuOptions}
            menus={menu}
            onClick={setSelectedItems}
            sendOption={onClick}
          />
        )}
        {options?.length ? (
          <Options options={options} onClick={onClick} />
        ) : null}
        <span
          className="font-semibold italic text-slate-100"
          style={{ fontSize: "10px" }}
        >
          {useFormatDate(sentAt)}
        </span>
      </div>
    </div>
  );
};

export default Message;
