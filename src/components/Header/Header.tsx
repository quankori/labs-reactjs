import React from "react";
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
import { useNavigate } from "react-router-dom";

const StyledAppBar = styled(AppBar)`
  background-color: #eff4fd;
  color: black;
`;

export const Header: React.FC = () => {
  const options = ["Option 1", "Option 2", "Option 3"];
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
          <Button color="inherit">Trade</Button>
          <Button color="inherit">Connect Wallet</Button>
        </div>
        <div>
          <Autocomplete
            sx={{ width: 300 }}
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Search"
                margin="normal"
                fullWidth
              />
            )}
          />
        </div>
      </Toolbar>
    </StyledAppBar>
  );
};
