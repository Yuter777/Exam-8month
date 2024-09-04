import { useContext } from "react";
import DataContext from "../../context/DataContext";

const buttonText = [
  { id: "24h", text: "24 Hours" },
  { id: "30d", text: "30 Days" },
  { id: "90d", text: "3 Months" },
  { id: "1y", text: "1 Year" },
];

const Button = () => {
  const { days, setDays } = useContext(DataContext);
  return (
    <div className="px-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
      {buttonText?.map((data) => (
        <button
          key={data.id}
          className={`outline-none font-bold text-left text-sm border border-main-color rounded-md py-2 px-4 cursor-pointer hover:bg-main-color hover:text-black focus:bg-main-color focus:text-black ${
            days == data.id && "bg-main-color text-black"
          }`}
          onClick={() => setDays(data.id)}
        >
          {data.text}
        </button>
      ))}
    </div>
  );
};

export default Button;
