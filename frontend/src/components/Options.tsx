interface OptionProps {
  title: string;
  value: 1 | 99 | 98 | 97 | 0;
}

interface Props {
  options: OptionProps[];
  onClick: (value: 1 | 99 | 98 | 97 | 0) => void;
}

const Options = ({ options, onClick }: Props) => {
  return (
    <div className="flex flex-col my-2 gap-2 border-1">
      {options.map(({ title, value }: OptionProps, index) => (
        <p
          key={index}
          onClick={() => onClick(value)}
          className="cursor-pointer border-2 hover:blur-sm px-2 py-1 font-semibold text-xs text-white rounded-sm"
        >
          Select {value} to {title}
        </p>
      ))}
    </div>
  );
};

export default Options;
