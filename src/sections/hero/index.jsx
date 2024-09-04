import { useContext } from "react";
import DataContext from "../../context/DataContext";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { data, currency } = useContext(DataContext);
  const navigate = useNavigate();

  const handleNavigation = (id) => {
    navigate(`/crypto-details/${id}`);
  };

  return (
    <div className="bg-hero-bg bg-[center_top_60px] bg-no-repeat bg-cover pt-16">
      <div className="container mx-auto text-white flex flex-col items-center xl:px-52 sm:px-10 px-5 gap-16 py-10">
        <div className="text-center">
          <h1 className="text-main-color text-4xl leading-[50px] sm:text-6xl sm:leading-[72px] font-bold">
            CRYPTOFOLIO WATCH LIST
          </h1>
          <p className="text-[#A9A9A9] text-sm">
            Get all the Info regarding your favorite Crypto Currency
          </p>
        </div>
        <div className="flex w-full">
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            loop={true}
            centeredSlides={false}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            {data?.map((crypto) => (
              <SwiperSlide
                key={crypto.id}
                className="flex flex-col items-center text-center gap-4 w-96 cursor-pointer"
                onClick={() => handleNavigation(crypto.id)}
              >
                <div className="w-20 h-20">
                  <img src={crypto.image} alt={crypto.name} />
                </div>
                <div>
                  <h4 className="uppercase text-base flex gap-1">
                    {crypto.symbol}{" "}
                    <span
                      className={`flex items-start ${
                        crypto.price_change_percentage_24h > 0
                          ? "text-[#0ECB81]"
                          : "text-red-500"
                      }`}
                    >
                      <span className="leading-5">
                        {crypto.price_change_percentage_24h > 0 && "+"}
                      </span>
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </h4>
                  <div className="font-medium text-[21.83px] flex items-center justify-center gap-2">
                    <span className="text-[16.67px]">
                      {currency == "usd" && "$ "}
                      {currency == "rub" && "₽ "}
                      {currency == "eur" && "€ "}
                    </span>
                    {Intl.NumberFormat("en-US").format(
                      crypto.current_price.toFixed(2)
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Hero;
