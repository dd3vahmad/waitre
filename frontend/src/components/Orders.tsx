import Order from "./Order";

interface OrderProps {
  title: string;
  price: number;
  imageUrl: string;
  itemCount: number;
}

interface OrdersProps {
  orders: OrderProps[];
}

interface Props {
  Orders: OrdersProps;
  index: number;
}

const Orders = ({ Orders, index }: Props) => {
  return (
    <div className="flex gap-1 items-start">
      <span className="flex justify-center items-center bg-white w-5 h-5 rounded-full text-xs font-bold">
        {index + 1}
      </span>
      <div className="border px-2 rounded-sm">
        {Orders.orders?.map((order) => {
          return <Order order={order} />;
        })}
      </div>
    </div>
  );
};

export default Orders;
