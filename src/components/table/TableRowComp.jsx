/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";
import eye from "../../assets/Eye.png";
import eyeActive from "../../assets/Eye-active.png";

const TableRowComp = ({ data, currency }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  const handleLink = (id) => {
    navigate(`/crypto-details/${id}`);
  };
  const handleButton = (e, data) => {
    e.stopPropagation();
    active ? setActive(false) : setActive(true);
    const watchStore = JSON.parse(localStorage.getItem("watchData")) || [];
    if (active) {
      const newData = watchStore.filter((dt) => dt.id !== data.id);
      localStorage.setItem("watchData", JSON.stringify(newData));
    } else {
      const newWatchStore = watchStore && [...watchStore, data];
      localStorage.setItem("watchData", JSON.stringify(newWatchStore));
    }
  };
  return (
    <TableRow
      key={data.name}
      sx={{
        ":hover": {
          backgroundColor: "#313131",
          transition: "all .2s ease",
        },
        cursor: "pointer",
      }}
      onClick={() => handleLink(data.id)}
    >
      <TableCell component="th" scope="row" sx={{ py: "16px" }}>
        <div className="flex gap-[15px]">
          <img src={data.image} alt={data.id} className="w-[50px] h-[50px]" />
          <div className="flex flex-col justify-center">
            <h2 className="text-[20px] text-white uppercase">{data.symbol}</h2>
            <p className="text-md text-[#A9A9A9]">{data.name}</p>
          </div>
        </div>
      </TableCell>

      <TableCell
        align="right"
        sx={{
          color: "white",
          fontSize: "14px",
        }}
      >
        <span className="text-[16.67px]">
          {currency == "usd" && "$ "}
          {currency == "rub" && "₽ "}
          {currency == "eur" && "€ "}
        </span>
        {Intl.NumberFormat("en-US").format(data.current_price.toFixed(2))}
      </TableCell>
      <TableCell>
        <div className="flex gap-4 items-center justify-end">
          <button onClick={(e) => handleButton(e, data)}>
            {active ? (
              <img src={eyeActive} alt="Eye active img" />
            ) : (
              <img src={eye} alt="Eye img" />
            )}
          </button>
          <div
            className={`flex items-start text-sm ${
              data.price_change_percentage_24h > 0
                ? "text-[#0ECB81]"
                : "text-red-500"
            }`}
          >
            <span className="leading-5">
              {data.price_change_percentage_24h > 0 && "+"}
            </span>
            {data.price_change_percentage_24h.toFixed(2)}%
          </div>
        </div>
      </TableCell>
      <TableCell align="right" sx={{ color: "white", fontSize: "14px" }}>
        <span className="text-[16.67px]">
          {currency == "usd" && "$ "}
          {currency == "rub" && "₽ "}
          {currency == "eur" && "€ "}
        </span>
        {Intl.NumberFormat("en-US").format(
          (data.market_cap / 1000000).toFixed(0)
        )}
        M
      </TableCell>
    </TableRow>
  );
};

export default TableRowComp;
