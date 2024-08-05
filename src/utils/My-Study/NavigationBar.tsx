// components/NavigationBar.tsx
import React, { MouseEvent } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem, IconButton } from '@mui/material';
import { GridOn, ArrowDropDown } from '@mui/icons-material';

const NavigationBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElMegaMenu, setAnchorElMegaMenu] = React.useState<null | HTMLElement>(null);

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMegaMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElMegaMenu(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElMegaMenu(null);
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <IconButton color="inherit">
          <GridOn />
        </IconButton>
        <Button color="inherit" endIcon={<ArrowDropDown />} onClick={handleMenuClick}>
          Categories
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Category 1</MenuItem>
          <MenuItem onClick={handleClose}>Category 2</MenuItem>
          <MenuItem onClick={handleClose}>Category 3</MenuItem>
        </Menu>
        <Button color="inherit" endIcon={<ArrowDropDown />} onClick={handleMegaMenuClick}>
          Home
        </Button>
        <Menu anchorEl={anchorElMegaMenu} open={Boolean(anchorElMegaMenu)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Sub Option 1</MenuItem>
          <MenuItem onClick={handleClose}>Sub Option 2</MenuItem>
          <MenuItem onClick={handleClose}>Sub Option 3</MenuItem>
        </Menu>
        <Button color="inherit" endIcon={<ArrowDropDown />} onClick={handleMegaMenuClick}>
          Mega Menu
        </Button>
        <Menu anchorEl={anchorElMegaMenu} open={Boolean(anchorElMegaMenu)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Sub Option 1</MenuItem>
          <MenuItem onClick={handleClose}>Sub Option 2</MenuItem>
          <MenuItem onClick={handleClose}>Sub Option 3</MenuItem>
        </Menu>
        <Button color="inherit" endIcon={<ArrowDropDown />} onClick={handleMegaMenuClick}>
          Full Screen Menu
        </Button>
        <Menu anchorEl={anchorElMegaMenu} open={Boolean(anchorElMegaMenu)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Sub Option 1</MenuItem>
          <MenuItem onClick={handleClose}>Sub Option 2</MenuItem>
          <MenuItem onClick={handleClose}>Sub Option 3</MenuItem>
        </Menu>
        <Button color="inherit" endIcon={<ArrowDropDown />} onClick={handleMegaMenuClick}>
          Pages
        </Button>
        <Menu anchorEl={anchorElMegaMenu} open={Boolean(anchorElMegaMenu)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Sub Option 1</MenuItem>
          <MenuItem onClick={handleClose}>Sub Option 2</MenuItem>
          <MenuItem onClick={handleClose}>Sub Option 3</MenuItem>
        </Menu>
        <Button color="inherit" endIcon={<ArrowDropDown />} onClick={handleMegaMenuClick}>
          User Account
        </Button>
        <Menu anchorEl={anchorElMegaMenu} open={Boolean(anchorElMegaMenu)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Sub Option 1</MenuItem>
          <MenuItem onClick={handleClose}>Sub Option 2</MenuItem>
          <MenuItem onClick={handleClose}>Sub Option 3</MenuItem>
        </Menu>
        <Button color="inherit" endIcon={<ArrowDropDown />} onClick={handleMegaMenuClick}>
          Vendor Account
        </Button>
        <Menu anchorEl={anchorElMegaMenu} open={Boolean(anchorElMegaMenu)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Sub Option 1</MenuItem>
          <MenuItem onClick={handleClose}>Sub Option 2</MenuItem>
          <MenuItem onClick={handleClose}>Sub Option 3</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
