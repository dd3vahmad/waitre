import MenuItem from "./MenuItem";

interface Props {
  menus: { title: string; price: number; imageUrl: string }[];
  onClick: (index: number) => void;
}

const Menu = ({ menus, onClick }: Props) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div>List of selected items</div>
      {menus?.map(({ title, price, imageUrl }, index) => {
        return (
          <MenuItem
            key={index}
            index={index}
            title={title}
            price={price}
            imageUrl={imageUrl}
            onClick={onClick}
          />
        );
      })}
    </div>
  );
};

export default Menu;
