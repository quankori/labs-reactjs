import {
  Avatar,
  Grid,
  Paper,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import { useParams } from "react-router-dom";
import { Stats } from "../components/Stats/Stats";
import { OHLCChart } from "../components/Chart/OHLCChart";
import { AppDispatch, RootState } from "../stores/stores";
import {
  fetchOHLCCoin,
  fetechDetailCoin,
  fetchPriceCoin,
} from "../features/token/tokenAction";
import { ReadMoreText } from "../components/ReadMoreText/ReadMoreText";
import { ChartTypeEnums, DaysEnums } from "../types/enum";
import { formatDate } from "../utils/format";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { isAfter, isBefore } from "date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { LineChart } from "../components/Chart/LineChart";
import { CircleLoading } from "../components/Loading/Loading";

export const Detail: React.FC = () => {
  const [currentChart, setCurrentChart] = useState<ChartTypeEnums>(
    ChartTypeEnums.OHLC_CHART
  );

  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);

  const [daysOHLCChart, setDaysOHLCChart] = useState<number>(365);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { coin, ohlc, price, loading, error } = useSelector(
    (state: RootState) => state.tokens
  );
  const [fromDate, setFromDate] = useState(lastMonth.getTime());
  const [toDate, setToDate] = useState(today.getTime());

  useEffect(() => {
    id && dispatch(fetechDetailCoin({ tokenId: id }));
  }, []);

  useEffect(() => {
    id && dispatch(fetchOHLCCoin({ tokenId: id, days: daysOHLCChart }));
  }, [daysOHLCChart]);

  useEffect(() => {
    id && dispatch(fetchPriceCoin({ tokenId: id, fromDate, toDate }));
  }, [fromDate, toDate]);

  const handleFromShouldDisableDate = (date: MaterialUiPickersDate) => {
    if (!date) return false;
    if (toDate) {
      const [year, month, day] = formatDate(toDate).split("-").map(Number);
      return isAfter(date, new Date(year, month - 1, day));
    }
    return false;
  };

  const handleToShouldDisableDate = (date: MaterialUiPickersDate) => {
    if (!date) return false;
    if (fromDate) {
      const [year, month, day] = formatDate(fromDate).split("-").map(Number);
      return isBefore(date, new Date(year, month - 1, day));
    }
    return false;
  };

  const renderChart = () => {
    switch (currentChart) {
      case ChartTypeEnums.OHLC_CHART:
        return (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              {[
                DaysEnums.A_WEEK,
                DaysEnums.TWO_WEEK,
                DaysEnums.THIRTY_DAYS,
                DaysEnums.A_YEAR,
              ].map((day: DaysEnums, index: number) => {
                return (
                  <Button
                    key={index}
                    variant="outlined"
                    style={{ margin: 10 }}
                    onClick={() => setDaysOHLCChart(day)}
                  >
                    {day} days
                  </Button>
                );
              })}
            </Grid>
            <Grid item xs={12}>
              <OHLCChart data={ohlc} />
            </Grid>
          </Grid>
        );
      case ChartTypeEnums.PRICE_CHART:
        return (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  margin="normal"
                  id="from-date-picker"
                  label="From"
                  format="yyyy/MM/dd"
                  value={fromDate}
                  minDate={lastMonth}
                  maxDate={today}
                  shouldDisableDate={handleFromShouldDisableDate}
                  onChange={(newValue) => {
                    if (newValue) setFromDate(newValue.getTime());
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  margin="normal"
                  id="to-date-picker"
                  label="To"
                  format="yyyy/MM/dd"
                  value={toDate}
                  minDate={lastMonth}
                  maxDate={today}
                  shouldDisableDate={handleToShouldDisableDate}
                  onChange={(newValue) => {
                    if (newValue) setToDate(newValue.getTime());
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <LineChart data={price} />
            </Grid>
          </Grid>
        );
      default:
        break;
    }
  };

  if (!loading) {
    return (
      <>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Avatar src={coin?.image.thumb} alt={coin?.name} />
              <Typography variant="h5">{coin?.name}</Typography>
              <ReadMoreText text={coin?.description.en} />
              <Stats market_data={coin?.market_data} />
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={3} style={{ padding: 20, margin: 10 }}>
          {coin && renderChart()}
          <Grid container spacing={2} alignItems="center">
            <Grid margin={2} item xs={12}>
              <Button
                variant="outlined"
                style={{ margin: 2 }}
                onClick={() => setCurrentChart(ChartTypeEnums.OHLC_CHART)}
              >
                OHLC Chart
              </Button>
              <Button
                variant="outlined"
                style={{ margin: 2 }}
                onClick={() => setCurrentChart(ChartTypeEnums.PRICE_CHART)}
              >
                Price Chart
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  } else {
    return <CircleLoading />;
  }
};
