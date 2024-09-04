import { useEffect, useState } from "react";
import DataContext from "./DataContext";

const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [singleData, setSingleData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [days, setDays] = useState("24h");
  const [dataAll, setDataAll] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllData = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&sparkline=false&price_change_percentage=24h`
      );
      const data = await res.json();
      setDataAll(data);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };
  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`
      );
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const fetchSingleData = async (id) => {
    setSingleData(null);
    setLoading(true);
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
      const data = await res.json();
      setSingleData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };
  const fetchChartData = async (id) => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      const data = await res.json();
      setChartData(data.prices);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [currency]);
  useEffect(() => {
    fetchData();
  }, [currency, page]);

  return (
    <DataContext.Provider
      value={{
        data,
        singleData,
        page,
        currency,
        chartData,
        days,
        dataAll,
        filtered,
        loading,
        setFiltered,
        setDataAll,
        setDays,
        setCurrency,
        setPage,
        fetchSingleData,
        fetchChartData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
