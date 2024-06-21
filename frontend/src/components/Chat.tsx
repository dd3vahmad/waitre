import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Message from "./Message";

const socket = io("http://localhost:4000");

interface Menu {
  title: string;
  price: number;
  imageUrl: string;
}

interface Option {
  title: string;
  value: 1 | 99 | 98 | 97 | 0 | 69;
}

interface Order {
  title: string;
  price: number;
  imageUrl: string;
  itemCount: number;
}

interface Orders {
  orders: Order[];
}

interface Message {
  text: string | number;
  menu?: Menu[];
  menuOptions?: Option[];
  orderHistory?: Orders[];
  options?: Option[];
  sentBy: 0 | 1;
  sentAt: Date | string;
}

interface Props {
  username: string;
  botname: string;
}

const Chat = ({ username, botname }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Next is to checkout order
  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);
  // End of `Checkout order

  useEffect(() => {
    socket.emit("user-joined", username);
    socket.on("message", (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendOption = (value: 0 | 1 | 99 | 98 | 97 | 69) => {
    if (value === 99 && !selectedItems.length) {
      return socket.emit("no-order", true);
    }
    const optionMsg: Message = {
      text: value,
      sentBy: 1,
      sentAt: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, optionMsg]);
    socket.emit("option", value);
    if (value === 99) socket.emit("order-items", selectedItems);
    return setSelectedItems([]);
  };

  socket.off("optionMessage").on("optionMessage", (optionMessage: any) => {
    setMessages((prevMessages) => [...prevMessages, optionMessage]);
  });

  return (
    <div className="flex flex-col bg-red-300 rounded-lg shadow-2xl">
      <div className="p-2">
        <h2 className="text-md font-semibold">Welcome {username}</h2>
        <p className="flex items-center gap-0.5">
          <span className="text-sm font-semibold">{botname}</span>
          <span className="bg-green-500 w-1.5 h-1.5 rounded-full"></span>
        </p>
      </div>
      <div className="flex flex-col gap-5 bg-slate-50 rounded-lg p-6 overflow-y-scroll chat-height scroll-smooth no-scrollbar">
        {messages.map(
          (
            { text, sentAt, sentBy, menu, options, menuOptions, orderHistory },
            index
          ) => (
            <Message
              key={index}
              text={text}
              sentAt={sentAt}
              sentBy={sentBy}
              options={options}
              onClick={sendOption}
              setSelectedItems={(index: number, type: string) => {
                if (type === "add") {
                  return setSelectedItems([...selectedItems, index]);
                }
                const itemIndex = selectedItems.lastIndexOf(index);
                selectedItems.splice(itemIndex, 1);
                return setSelectedItems(selectedItems);
              }}
              menu={menu}
              menuOptions={menuOptions}
              OrderHistory={orderHistory}
            />
          )
        )}
        <div ref={messageEndRef} />
      </div>
    </div>
  );
};

export default Chat;
