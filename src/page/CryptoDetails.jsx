"use client";
import ApexChart from "../components/coinChart";
import CoinDesc from "../components/coinDesc";
import Button from "../components/buttons";

const CryptoDetails = () => {
  return (
    <div className="pt-20 text-white">
      <div className=" grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-1">
          <CoinDesc />
        </div>
        <div className="col-span-2 border-t-2 py-4 sm:py-0 sm:border-t-0 sm:border-l-2 border-[#808080] w-full mt-4">
          <ApexChart />
          <Button />
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
