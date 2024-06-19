interface Order {
  title: string;
  price: number;
  imageUrl: string;
  itemCount: number;
}

interface Props {
  order: Order;
}
const Order = ({ order }: Props) => {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      <div className="flex justify-center items-center my-1">
        <img
          className="border w-5 h-5 rounded-full"
          src={order.imageUrl}
          alt="Food Image"
        />
      </div>
      <div className="flex gap-1 justify-between flex-1">
        <span className="text-sm">{order.title}</span>
        <span className="text-xs text-white">
          {order.itemCount + `(${"$" + order.price * order.itemCount})`}
        </span>
      </div>
    </div>
  );
};

export default Order;
