import { useState } from "react";
import chefImg from "../assets/pngtree-cute-little-boy-chef-holding-a-silver-tray-png-image_6021308.png";

interface Props {
  setUsername: (name: string) => void;
}

const NameInput = ({ setUsername }: Props) => {
  const [name, setName] = useState<string>("");

  return (
    <div className="flex flex-col gap-1 bg-white p-2 rounded-sm">
      <div className="flex justify-center items-center">
        <img className="h-64" src={chefImg} alt="Chef Img" />
      </div>
      <h2 className="text-sm font-semibold">
        Yay!, welcome to{" "}
        <span className="font-bold text-green-500">Chop N' Go</span> restaurant
      </h2>
      <span className="text-xs font-semibold">
        Kindly input your name to begin your actions
      </span>
      <input
        className="border-0 outline-none bg-slate-50 p-2 text-xs rounded-sm"
        type="text"
        name="name"
        alt="Name Input"
        placeholder="Input your name here"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => setUsername(name)}>Continue</button>
    </div>
  );
};

export default NameInput;
