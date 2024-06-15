import { useState } from "react";
import MenuItem from "./MenuItem";
import Options from "./Options";
import Item from "./Item";

interface Props {
  menus: { title: string; price: number; imageUrl: string }[];
  onClick: (index: number) => void;
  sendOption: (index: 1 | 99 | 98 | 97 | 0 | 69) => void;
  menuOptions?: {
    title: string;
    value: 1 | 99 | 98 | 97 | 0 | 69;
  }[];
}

interface selection {
  imageUrl: string;
  itemCount: number;
  index: number;
}

const Menu = ({ menus, onClick, menuOptions, sendOption }: Props) => {
  const [selections, setSelections] = useState<selection[]>([]);

  const updateSelections = (index: number) => {
    const indexIndexInSelections = selections.findIndex(
      (selection) => selection.index === index
    );
    if (indexIndexInSelections !== -1) {
      selections[indexIndexInSelections].itemCount++;
      return setSelections(selections);
    }
    setSelections((prev) => [
      ...prev,
      {
        imageUrl: menus[index].imageUrl,
        itemCount: 1,
        index,
      },
    ]);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div style={{ display: selections.length ? "block" : "none" }}>
        <div className="text-xs text-white font-semibold">Selected Items:</div>
        <div className="flex gap-2 flex-wrap mt-1">
          {selections.map(({ imageUrl, itemCount }, i) => (
            <Item key={i} imageUrl={imageUrl} itemCount={itemCount} />
          ))}
        </div>
      </div>
      <div>
        {menus?.map(({ title, price, imageUrl }, index) => {
          return (
            <MenuItem
              key={index}
              index={index}
              title={title}
              price={price}
              imageUrl={imageUrl}
              onClick={(index) => {
                updateSelections(index);
                onClick(index);
              }}
            />
          );
        })}
      </div>
      <Options options={menuOptions} onClick={sendOption} />
    </div>
  );
};

export default Menu;
