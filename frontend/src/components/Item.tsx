import numeral from "numeral";
import { IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  imageUrl: string;
  itemCount: number;
  index: number;
  onClick: (index: number, updateType: string) => void;
}

const Item = ({ imageUrl, itemCount, index, onClick }: Props) => {
  return (
    <div className="flex justify-center items-center w-fit rounded-full overflow-hidden border bg-white">
      <span className="font-semibold px-1">{numeral(itemCount).format()}</span>
      <img className="w-8 h-8 object-cover" src={imageUrl} alt="Item Image" />
      <span
        onClick={() => onClick(index, "remove")}
        className="font-semibold px-1 cursor-pointer duration-300 hover:bg-rose-100 py-1 rounded-full text-red-500 hover:text-red-700"
      >
        <IoRemoveCircleOutline size={15} />
      </span>
    </div>
  );
};

export default Item;
