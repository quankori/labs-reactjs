import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
} from "@mui/material";
import React from "react";
import { Coin, TableProps } from "../../types/token";
import { formatCurrency } from "../../utils/format";
import { SparklineChart } from "./Chart";
import { useNavigate } from "react-router-dom";

export const TableSimple: React.FC<TableProps> = ({ coins }) => {
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>1h</TableCell>
            <TableCell>24h</TableCell>
            <TableCell>7d</TableCell>
            <TableCell>24h Volume</TableCell>
            <TableCell>Market Cap</TableCell>
            <TableCell>Chart 7 days</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin: Coin) => (
            <TableRow key={coin.id}>
              <TableCell>
                <Avatar alt={coin.name} src={coin.image} /> {coin.name}
              </TableCell>
              <TableCell>{coin.symbol.toUpperCase()}</TableCell>
              <TableCell>{formatCurrency(coin.current_price)}</TableCell>
              <TableCell
                style={{
                  color:
                    coin.price_change_percentage_1h_in_currency > 0
                      ? "green"
                      : "red",
                }}
              >
                {coin.price_change_percentage_1h_in_currency.toFixed(1)}%
              </TableCell>
              <TableCell
                style={{
                  color:
                    coin.price_change_percentage_24h_in_currency > 0
                      ? "green"
                      : "red",
                }}
              >
                {coin.price_change_percentage_24h_in_currency.toFixed(1)}%
              </TableCell>
              <TableCell
                style={{
                  color:
                    coin.price_change_percentage_7d_in_currency > 0
                      ? "green"
                      : "red",
                }}
              >
                {coin.price_change_percentage_7d_in_currency.toFixed(1)}%
              </TableCell>
              <TableCell>{formatCurrency(coin.total_volume)}</TableCell>
              <TableCell>{formatCurrency(coin.market_cap)}</TableCell>
              <TableCell>
                {Array.isArray(coin.sparkline_in_7d) ? (
                  <div>Empty</div>
                ) : (
                  <SparklineChart
                    data={coin.sparkline_in_7d.price}
                    color={
                      coin.price_change_percentage_7d_in_currency > 0
                        ? "green"
                        : "red"
                    }
                  />
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={() => navigate(coin.id)}
                >
                  Detail
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
