/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import "./style.css"

const Sidebar = ({ open, setOpen }) => {
  const data = JSON.parse(localStorage.getItem("watchData"));
  const [watchList, setWatchList] = useState();
  useEffect(() => {
    setWatchList(data);
  }, [open]);

  const handleDelete = (id) => {
    const newData = data.filter((dt) => dt.id !== id);
    setWatchList(newData);
    localStorage.setItem("watchData", JSON.stringify(newData));
  };
  return (
    <div className="">
      <div
        className={`fixed z-10 w-full top-0 h-screen ${
          open ? "block" : "hidden"
        }`}
        onClick={() => setOpen(false)}
      ></div>
      <div
        className={`fixed z-10 top-0 right-0 w-3/4 sm:w-[511px] h-screen bg-[#515151] ${
          open ? "translate-x-0 transition" : "translate-x-full transition-all"
        }`}
      >
        <div className="flex flex-col gap-6 items-center font-medium text-white tracking-[0.4px] p-5">
          <h3 className="text-3xl">WATCHLIST</h3>
          <div className="flex flex-wrap justify-center sm:flex-row gap-10 overflow-y-scroll h-[470px] no-scrollbar">
            {watchList ?
              watchList?.map((data) => (
                <div
                  key={data.id}
                  className="w-[198px] bg-black h-60 rounded-3xl flex flex-col items-center justify-between p-[15px] font-normal"
                >
                  <div className="w-[100px]">
                    <img src={data.image} alt={data.name} />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <h3>
                      <span className="text-[16.67px]">₹</span>{" "}
                      {Intl.NumberFormat("en-US").format(data.current_price)}
                    </h3>
                    <button
                      onClick={() => handleDelete(data.id)}
                      className="bg-[#FF0000] px-4 pb-[5px] pt-1 text-xl tracking-[0.15px]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )):<div></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
