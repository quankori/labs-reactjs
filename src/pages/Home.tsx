import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../stores/stores";
import { setPage } from "../features/token/tokenSlice";
import { TableSimple } from "../components";
import { Grid, Pagination } from "@mui/material";
import { fetchCoins } from "../features/token/tokenAction";
import { Cards } from "../components/Cards/Cards";

export const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const coins = useSelector((state: RootState) => state.tokens.data);
  const perPage = useSelector((state: RootState) => state.tokens.perPage);
  const page = useSelector((state: RootState) => state.tokens.page);

  useEffect(() => {
    dispatch(fetchCoins());
  }, [perPage, page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    dispatch(setPage(newPage));
  };

  return (
    <>
      <Grid container spacing={2}>
        {[{}, {}, {}, {}].map((data, index: number) => {
          return (
            <Grid key={index} item xs={3}>
              <Cards />
            </Grid>
          );
        })}
      </Grid>
      <div style={{ marginTop: "50px" }}>
        <TableSimple coins={coins} />
      </div>
      <Pagination
        style={{ marginTop: "20px" }}
        count={100}
        page={page}
        onChange={handlePageChange}
        color="primary"
      />
    </>
  );
};
