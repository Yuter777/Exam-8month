import { useContext, useEffect } from "react";
import DataContext from "../../context/DataContext";
import { useParams } from "react-router-dom";

const CoinDesc = () => {
  const { currency, singleData, fetchSingleData, loading } =
    useContext(DataContext);
  const { id } = useParams();

  useEffect(() => {
    fetchSingleData(id);
  }, [id]);

  useEffect(() => {
    if (singleData?.name) {
      document.title = `${singleData.name} - Crypto Details`;
    } else {
      document.title = "Crypto Details - Default Title";
    }

    const faviconLink =
      document.querySelector("link[rel='icon']") ||
      document.createElement("link");
    faviconLink.rel = "icon";
    faviconLink.type = "image/png";

    if (singleData?.image?.large) {
      faviconLink.href = singleData.image.large;
    } else {
      faviconLink.href = "/path/to/default-favicon.png";
    }

    document.head.appendChild(faviconLink);

    return () => {
      if (document.head.contains(faviconLink)) {
        document.head.removeChild(faviconLink);
      }
    };
  }, [singleData]);

  return (
    <>
      {loading && (
        <div role="status" className="p-4 shadow animate-pulse md:p-6">
          <div className="flex items-center justify-center w-[100px] h-[100px] mb-4 bg-gray-300 rounded mx-auto"></div>
          <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-4 mx-auto"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full"></div>
          <div className="flex items-center mt-4">
            <div>
              <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-2"></div>
              <div className="w-48 h-2 bg-gray-200 rounded-full mb-2"></div>
              <div className="w-48 h-2 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {singleData && (
        <div className="flex flex-col px-5">
          <div className="w-[100px] mx-auto">
            <img src={singleData?.image?.large} alt={singleData?.name} />
          </div>
          <h2 className="text-center font-bold text-3xl my-3">
            {singleData?.name}
          </h2>
          <p className="line-clamp-4 text-sm tracking-[0.15px]">
            {singleData?.description.en}
          </p>
          <div className="flex flex-col gap-2 mt-4">
            <h3 className="font-bold text-xl">
              Rank:{" "}
              <span className="font-normal">{singleData?.market_cap_rank}</span>
            </h3>
            <h3 className="font-bold text-xl">
              Current Price:{" "}
              <span className="font-normal">
                {currency === "usd" && "$ "}
                {currency === "rub" && "₽ "}
                {currency === "eur" && "€ "}
                {Intl.NumberFormat("en-US").format(
                  singleData?.market_data.current_price[currency].toFixed(2)
                )}
              </span>
            </h3>
            <h3 className="font-bold text-xl">
              Market Cap:{" "}
              <span className="font-normal">
                {currency === "usd" && "$ "}
                {currency === "rub" && "₽ "}
                {currency === "eur" && "€ "}
                {Intl.NumberFormat("en-US").format(
                  (
                    singleData?.market_data.market_cap[currency] / 1000000
                  ).toFixed(0)
                )}
                M
              </span>
            </h3>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinDesc;
