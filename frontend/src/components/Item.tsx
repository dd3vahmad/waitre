import numeral from "numeral";

interface Props {
  imageUrl: string;
  itemCount: number;
}

const Item = ({ imageUrl, itemCount }: Props) => {
  return (
    <div className="flex justify-center items-center w-fit rounded-full overflow-hidden border bg-white">
      <span className="font-semibold px-1">{numeral(itemCount).format()}</span>
      <img className="w-8 h-8 object-cover" src={imageUrl} alt="Item Image" />
    </div>
  );
};

export default Item;
