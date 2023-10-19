import { Avatar, Grid, Paper, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
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
export const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const coin = useSelector((state: RootState) => state.tokens.coin);
  const ohlc = useSelector((state: RootState) => state.tokens.ohlc);

  useEffect(() => {
    dispatch(fetechDetailCoin({ tokenId: id }));
    dispatch(fetchOHLCCoin({ tokenId: id, days: 365 }));
  }, []);

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
            <Grid>
              <Button variant="outlined" style={{ margin: 10 }}>
                24 hours
              </Button>
              <Button variant="outlined" style={{ margin: 10 }}>
                7 days
              </Button>
              <Button variant="outlined" style={{ margin: 10 }}>
                14 days
              </Button>
              <Button variant="outlined" style={{ margin: 10 }}>
                30 days
              </Button>
            </Grid>
            <Grid item xs={12}>
              <OHLCChart width={1000} height={400} data={ohlc} />
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
};
