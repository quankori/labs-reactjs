import { Divider, Typography } from "@mui/material";
import React from "react";
import { MarketData } from "../../types/token";
import { formatCurrency } from "../../utils/format";

export interface MarketProps {
  market_data: MarketData;
}

export const Stats: React.FC<MarketProps> = ({ market_data }) => {
  return (
    <div>
      <Typography>
        Bitcoin Price: {formatCurrency(market_data.current_price.usd)}
      </Typography>
      <Divider style={{ margin: "8px 0" }} />
      <Typography>
        24h Low / 24h High: {formatCurrency(market_data.low_24h.usd)} /{" "}
        {formatCurrency(market_data.high_24h.usd)}
      </Typography>
      <Divider style={{ margin: "8px 0" }} />
      <Typography>Market Cap Rank: {market_data.market_cap_rank}</Typography>
      <Divider style={{ margin: "8px 0" }} />
      <Typography>
        Market Cap: {formatCurrency(market_data.market_cap.usd)}
      </Typography>
      <Divider style={{ margin: "8px 0" }} />
      <Typography>
        Volume: {formatCurrency(market_data.total_volume.usd)}
      </Typography>
      <Divider style={{ margin: "8px 0" }} />
    </div>
  );
};
