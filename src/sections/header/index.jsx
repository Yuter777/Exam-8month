import { useContext, useState } from "react";
import { Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Sidebar from "../../components/sidebar";
import DataContext from "../../context/DataContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#87CEEB",
      dark: "#50c7f7",
      contrastText: "#000",
    },
  },
});

const Header = () => {
  const { setCurrency } = useContext(DataContext);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-[#14161A] shadow-md shadow-[#00000033] fixed w-full z-10">
        <div className="container flex mx-auto justify-between items-center xl:px-52 sm:px-10 px-5 py-3">
          <a href="/" className="text-xl font-bold text-main-color">
            CRYPTOFOLIO
          </a>
          <div className="flex gap-[15px] items-center">
            <div>
              <select
                className="bg-[#14161A] text-white pl-3 pr-2 cursor-pointer outline-none"
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="usd">USD</option>
                <option value="rub">RUB</option>
                <option value="eur">EUR</option>
              </select>
            </div>
            <div className="">
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ boxShadow: "#0000001F" }}
                  onClick={() => setOpen(true)}
                >
                  WATCH LIST
                </Button>
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
};

export default Header;
