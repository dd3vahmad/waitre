import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Message from "./Message";

const socket = io("http://localhost:5000");

interface Menu {
  title: string;
  price: number;
  imageUrl: string;
}

interface Option {
  title: string;
  value: 1 | 99 | 98 | 97 | 0;
}

interface Message {
  text: string | number;
  menu?: Menu[];
  options?: Option[];
  sentBy: 0 | 1;
  sentAt: Date | string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello there, how may I help you?",
      sentAt: new Date(),
      options: [
        {
          title: "place an order",
          value: 1,
        },
        {
          title: "checkout an order",
          value: 99,
        },
        {
          title: "see order history",
          value: 98,
        },
        {
          title: "see current order",
          value: 97,
        },
        {
          title: "cancel order",
          value: 0,
        },
      ],
      sentBy: 0,
    },
  ]);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  const sendOption = (value: 0 | 99 | 98 | 97 | 1) => {
    socket.emit("option", value);
  };

  return (
    <div className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-md">
      <div className="min-h-72 min-w-96 overflow-y-auto mb-4 flex flex-col gap-5">
        {messages.map(({ text, sentAt, sentBy, menu, options }, index) => (
          <Message
            key={index}
            text={text}
            sentAt={sentAt}
            sentBy={sentBy}
            options={options}
            onClick={sendOption}
            menu={menu}
          />
        ))}
        <div ref={messageEndRef} />
      </div>
    </div>
  );
};

export default Chat;
