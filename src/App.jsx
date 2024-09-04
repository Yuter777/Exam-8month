import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DataProvider from "./context/DataProvider";
import CryptoDetails from "./page/CryptoDetails";
import Home from "./page/Home";
import Error from "./page/Error";
import Header from "./sections/header";

const App = () => {
  return (
    <DataProvider>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crypto-details/:id" element={<CryptoDetails />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;
