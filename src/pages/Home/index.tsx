import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/stores";
import { fetchCoins, setPage } from "../../features/token/tokenSlice";
import { TableSimple } from "../../components";
import { Pagination } from "@mui/material";

export const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const coins = useSelector((state: RootState) => state.tokens.data);
  const perPage = useSelector((state: RootState) => state.tokens.perPage);
  const page = useSelector((state: RootState) => state.tokens.page);

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch, perPage, page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    dispatch(setPage(newPage));
  };

  return (
    <>
      <TableSimple coins={coins} />
      <Pagination
        count={100}
        page={page}
        onChange={handlePageChange}
        color="primary"
      />
    </>
  );
};
