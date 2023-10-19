import { Avatar, Grid, Paper, Tabs, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Stats } from "../../components/Stats/Stats";
import { MainChart } from "../../components/MainChart/MainChart";
import { AppDispatch, RootState } from "../../stores/stores";
import { fetechDetailCoin } from "../../features/token/tokenAction";
import { ReadMoreText } from "../../components/ReadMoreText/ReadMoreText";
export const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const coin = useSelector((state: RootState) => state.tokens.coin);

  useEffect(() => {
    dispatch(fetechDetailCoin({ tokenId: id }));
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
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} style={{ padding: 20, margin: 10 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <MainChart />
            </Grid>
            <Grid item xs={6}>
              <Stats market_data={coin.market_data} />
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
};
