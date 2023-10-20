import React, { ChangeEvent, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  styled,
  Avatar,
  Autocomplete,
  TextField,
} from "@mui/material";
import logo from "../../assets/icon.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/stores";
import {
  fetchTrendCoins,
  fetechSearchCoin,
} from "../../features/token/tokenAction";
import { setSearch } from "../../features/token/tokenSlice";

const StyledAppBar = styled(AppBar)`
  background-color: #eff4fd;
  color: black;
`;

export const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const trendingCoins = useSelector(
    (state: RootState) => state.tokens.trending
  );
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    dispatch(fetchTrendCoins());
  }, [dispatch]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const textInput = event.target.value;
    setSearchText(textInput);
    if (textInput.length >= 3) {
      dispatch(setSearch(textInput));
      dispatch(fetechSearchCoin());
    } else if (textInput.length === 0) {
      dispatch(fetchTrendCoins());
    }
  };

  return (
    <StyledAppBar position="static" elevation={0}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <div>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Avatar src={logo} alt="" />
          </IconButton>
          <a href="/" style={{ color: "inherit" }}>
            <Button color="inherit">Home </Button>
          </a>
        </div>
        <div>
          {Array.isArray(trendingCoins) && (
            <Autocomplete
              sx={{ width: 300 }}
              options={trendingCoins}
              getOptionLabel={(trendingCoins) => trendingCoins.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Search"
                  onChange={handleSearchChange}
                  margin="normal"
                  fullWidth
                  value={searchText}
                />
              )}
              renderOption={(props, option) => (
                <a
                  href={`/${option.id}`}
                  style={{ color: "inherit" }}
                  key={option.id}
                >
                  <li {...props}>
                    <Avatar
                      alt={option.name}
                      src={option.image}
                      style={{ width: "30px", height: "30px" }}
                    />
                    {""}
                    {option.name}
                  </li>
                </a>
              )}
            />
          )}
        </div>
      </Toolbar>
    </StyledAppBar>
  );
};
