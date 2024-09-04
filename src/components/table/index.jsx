import { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Pagination, PaginationItem, Stack, styled } from "@mui/material";
import DataContext from "../../context/DataContext";
import TableRowComp from "./TableRowComp";

import "./style.css";

const CustomPaginationItem = styled(PaginationItem)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "#FFFFFF29",
    color: "#87CEEB",
    "&:hover": {
      backgroundColor: "#c3c3c329",
    },
  },
  "&:hover": {
    backgroundColor: "#FFFFFF29",
  },
  "&.MuiPaginationItem-page": {
    color: "#87CEEB",
  },
  "&.MuiPaginationItem-ellipsis": {
    color: "#87CEEB",
  },
  "&.MuiPaginationItem-previousNext": {
    color: "#87CEEB",
  },
}));

const TableComp = () => {
  const { filtered, data, dataAll, page, setPage, currency } =
    useContext(DataContext);
  const handlePage = (e, value) => {
    setPage(value);
  };

  return (
    <div className="">
      <Table
        sx={{ width: "100%", color: "white" }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead sx={{ backgroundColor: "#87CEEB" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, py: "19px" }}>Coin</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">
              Price
            </TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">
              24h Change
            </TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">
              Market Cap
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ backgroundColor: "#16171A" }}>
          {filtered.length > 0
            ? filtered?.map((data) => (
                <TableRowComp key={data.id} data={data} currency={currency} />
              ))
            : data?.map((data) => (
                <TableRowComp key={data.id} data={data} currency={currency} />
              ))}
        </TableBody>
      </Table>
      <div className="flex justify-center py-5">
        <Stack spacing={2}>
          <Pagination
            count={dataAll?.length / 10}
            page={page}
            onChange={handlePage}
            renderItem={(item) => <CustomPaginationItem {...item} />}
          />
        </Stack>
      </div>
    </div>
  );
};

export default TableComp;
