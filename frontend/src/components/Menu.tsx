import { useState } from "react";
import MenuItem from "./MenuItem";
import Item from "./Item";

interface Props {
  menus: { title: string; price: number; imageUrl: string }[];
  onClick: (index: number, type: string) => void;
}

interface selection {
  imageUrl: string;
  itemCount: number;
  index: number;
}

const Menu = ({ menus, onClick }: Props) => {
  const [selections, setSelections] = useState<selection[]>([]);

  const updateSelections = (index: number, updateType: string) => {
    const indexIndexInSelections = selections.findIndex(
      (selection) => selection.index === index
    );
    if (indexIndexInSelections !== -1 && updateType === "add") {
      selections[indexIndexInSelections].itemCount++;
      return setSelections(selections);
    }
    if (indexIndexInSelections !== -1 && updateType === "remove") {
      if (selections[indexIndexInSelections].itemCount <= 1) {
        const newSelections = selections.filter(
          (selection) => selection.index !== index
        );
        return setSelections(newSelections);
      }
      selections[indexIndexInSelections].itemCount--;
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
          {selections.map(({ imageUrl, itemCount, index }, i) => (
            <Item
              key={i}
              imageUrl={imageUrl}
              itemCount={itemCount}
              index={index}
              onClick={(index: number, updateType: string): void => {
                updateSelections(index, updateType);
                onClick(index, "remove");
              }}
            />
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
              onClick={(index: number, updateType: string): void => {
                updateSelections(index, updateType);
                onClick(index, "add");
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
