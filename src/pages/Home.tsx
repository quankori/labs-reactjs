import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../stores/stores";
import { setPage } from "../features/token/tokenSlice";
import { TableSimple } from "../components";
import { Grid, Pagination } from "@mui/material";
import { fetchCoins } from "../features/token/tokenAction";
import { Cards } from "../components/Cards/Cards";
import { CircleLoading } from "../components/Loading/Loading";

export const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { perPage, page, loading, data } = useSelector(
    (state: RootState) => state.tokens
  );

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch, perPage, page]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    dispatch(setPage(newPage));
  };

  return (
    <>
      {!loading ? (
        <>
          <Grid container spacing={2}>
            {[{}, {}, {}, {}].map((_data, index: number) => {
              return (
                <Grid key={index} item xs={3}>
                  <Cards />
                </Grid>
              );
            })}
          </Grid>
          <div style={{ marginTop: "50px" }}>
            <TableSimple coins={data} />
          </div>
          <Pagination
            style={{ marginTop: "20px" }}
            count={100}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </>
      ) : (
        <CircleLoading />
      )}
    </>
  );
};
