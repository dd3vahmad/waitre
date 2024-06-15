import MenuItem from "./MenuItem";
import Options from "./Options";

interface Props {
  menus: { title: string; price: number; imageUrl: string }[];
  onClick: (index: number) => void;
  sendOption: (index: 1 | 99 | 98 | 97 | 0 | 69) => void;
  menuOptions?: {
    title: string;
    value: 1 | 99 | 98 | 97 | 0 | 69;
  }[];
}

const Menu = ({ menus, onClick, menuOptions, sendOption }: Props) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div>List of selected items</div>
      <div>
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
      <Options options={menuOptions} onClick={sendOption} />
    </div>
  );
};

export default Menu;
