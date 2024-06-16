import numeral from "numeral";

interface Props {
  title: string;
  price: number;
  imageUrl: string;
  index: number;
  onClick: (index: number, updateType: string) => void;
}

const MenuItem = ({ title, price, imageUrl, onClick, index }: Props) => {
  return (
    <div
      onClick={() => onClick(index, "add")}
      className="flex gap-2 border p-1 rounded-sm hover:opacity-60 cursor-pointer"
    >
      <div className="flex justify-center items-center w-fit rounded-full overflow-hidden">
        <img
          className="w-12 h-12 object-cover"
          src={imageUrl}
          alt="Menu Item Image"
        />
      </div>
      <div className="flex flex-col justify-between w-fit py-1">
        <h2 className="text-sm font-bold">{title}</h2>
        <p className="text-xs font-semibold">
          ${numeral(price).format("0,0.00")}
        </p>
      </div>
    </div>
  );
};

export default MenuItem;
