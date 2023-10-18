import React from "react";
import { AppBar, Toolbar, Button, IconButton, styled, Avatar } from "@mui/material";
import logo from '../../assets/icon.png';

const StyledAppBar = styled(AppBar)`
  background-color: #EFF4FD;
  color: black;
`;

export const Header: React.FC = () => {
  return (
    <StyledAppBar position="static" elevation={0}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Avatar src={logo} alt="" />
        </IconButton>
        <Button color="inherit">Trade</Button>
        <Button color="inherit">Connect Wallet</Button>
      </Toolbar>
    </StyledAppBar>
  );
};

