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
import { formatDate } from "../../utils/format";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { isAfter, addMonths, isBefore } from "date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import DateFnsUtils from "@date-io/date-fns";

export const Detail: React.FC = () => {
  const [currentChart, setCurrentChart] = useState<ChartType>(
    ChartType.OHLC_CHART
  );

  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);

  const [daysOHLCChart, setDaysOHLCChart] = useState<number>(365);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const coin = useSelector((state: RootState) => state.tokens.coin);
  const ohlc = useSelector((state: RootState) => state.tokens.ohlc);
  const [fromDate, setFromDate] = useState(formatDate(lastMonth.getTime()));
  const [toDate, setToDate] = useState(formatDate(today.getTime()));

  useEffect(() => {
    dispatch(fetechDetailCoin({ tokenId: id }));
  }, []);

  useEffect(() => {
    dispatch(fetchOHLCCoin({ tokenId: id, days: daysOHLCChart }));
  }, [daysOHLCChart]);

  // useEffect(() => {
  //   if (!validateDates()) {
  //     console.log("ss");
  //     return;
  //   }
  //   console.log("ok");
  // }, [fromDate, toDate]);

  const handleFromShouldDisableDate = (date: MaterialUiPickersDate) => {
    if (!date) return false;
    if (toDate) {
      const [year, month, day] = toDate.split("-").map(Number);
      return isAfter(date, new Date(year, month - 1, day));
    }
    return false;
  };

  const handleToShouldDisableDate = (date: MaterialUiPickersDate) => {
    if (!date) return false;
    if (fromDate) {
      const [year, month, day] = fromDate.split("-").map(Number);
      return isBefore(date, new Date(year, month - 1, day));
    }
    return false;
  };

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
        return (
          <Grid container spacing={2} alignItems="center">
            <Grid>
              <OHLCChart width={600} height={400} data={ohlc} />
            </Grid>
            <Grid item xs={6}>
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
                    if (newValue) setFromDate(formatDate(newValue.getTime()));
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6}>
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
                    if (newValue) setToDate(formatDate(newValue.getTime()));
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        );
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
