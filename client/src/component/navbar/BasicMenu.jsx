import * as React from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

export default function BasicMenu({ handleLogOut, name }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const nevigate = useNavigate();
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
      <p style={{ size: "10px", marginRight: "5px" }}>{name}</p>
      {/* <Button onClick={handleClick}>Dashboard</Button> */}
      <Avatar
        sx={{ width: 35, height: 35 }}
        alt={name}
        src="/broken-image.jpg"
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={() => nevigate("/userorder")}>Orders</MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
