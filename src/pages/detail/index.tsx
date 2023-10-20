import { Avatar, Grid, Paper, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Stats } from "../../components/Stats/Stats";
import { OHLCChart } from "../../components/OHLCChart/OHLCChart";
import { AppDispatch, RootState } from "../../stores/stores";
import {
  fetchOHLCCoin,
  fetechDetailCoin,
} from "../../features/token/tokenAction";
import { ReadMoreText } from "../../components/ReadMoreText/ReadMoreText";
import { ChartType } from "../../types/enum";
export const Detail: React.FC = () => {
  const [currentChart, setCurrentChart] = useState<ChartType>(
    ChartType.OHLC_CHART
  );
  const [daysOHLCChart, setDaysOHLCChart] = useState<number>(365);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const coin = useSelector((state: RootState) => state.tokens.coin);
  const ohlc = useSelector((state: RootState) => state.tokens.ohlc);

  useEffect(() => {
    dispatch(fetechDetailCoin({ tokenId: id }));
  }, []);

  useEffect(() => {
    dispatch(fetchOHLCCoin({ tokenId: id, days: daysOHLCChart }));
  }, [daysOHLCChart]);

  const renderChart = () => {
    switch (currentChart) {
      case ChartType.OHLC_CHART:
        return (
          <Grid container spacing={2} alignItems="center">
            <Grid>
              <OHLCChart width={600} height={400} data={ohlc} />
            </Grid>
            <Grid>
              <Button
                variant="outlined"
                style={{ margin: 10 }}
                onClick={() => setDaysOHLCChart(7)}
              >
                7 days
              </Button>
              <Button
                variant="outlined"
                style={{ margin: 10 }}
                onClick={() => setDaysOHLCChart(14)}
              >
                14 days
              </Button>
              <Button
                variant="outlined"
                style={{ margin: 10 }}
                onClick={() => setDaysOHLCChart(30)}
              >
                30 days
              </Button>
              <Button
                variant="outlined"
                style={{ margin: 10 }}
                onClick={() => setDaysOHLCChart(365)}
              >
                1 year
              </Button>
            </Grid>
          </Grid>
        );
      case ChartType.PRICE_CHART:
        return <p>Hello</p>;
      default:
        break;
    }
  };

  if (coin) {
    return (
      <div style={{ padding: 20 }}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Avatar src={coin.image.thumb} alt={coin.name} />
              <Typography variant="h5">{coin.name}</Typography>
              <ReadMoreText text={coin.description.en} />
              <Stats market_data={coin.market_data} />
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={3} style={{ padding: 20, margin: 10 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid margin={2} item xs={12}>
              <Button
                variant="outlined"
                style={{ margin: 2 }}
                onClick={() => setCurrentChart(ChartType.OHLC_CHART)}
              >
                OHLC Chart
              </Button>
              <Button
                variant="outlined"
                style={{ margin: 2 }}
                onClick={() => setCurrentChart(ChartType.PRICE_CHART)}
              >
                Price Chart
              </Button>
            </Grid>
          </Grid>
          {renderChart()}
        </Paper>
      </div>
    );
  }
};
