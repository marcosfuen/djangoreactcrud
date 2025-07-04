import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link, useLocation } from 'react-router';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';


export default function ShortMenu() {
  const location = useLocation()
  const path = location.pathname
  return (
    <>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton component={Link} to="/" selected={path === "/"} sx={{display:'flex', justifyContent:'center'}}>
        <ListItemIcon sx={{display:'flex', justifyContent:'center'}}>
          <DashboardIcon />
        </ListItemIcon>
      </ListItemButton>
      <ListItemButton component={Link} to="/create" selected={path === "/create"} sx={{display:'flex', justifyContent:'center'}}>
        <ListItemIcon sx={{display:'flex', justifyContent:'center'}} >
            <AddBoxIcon />
        </ListItemIcon>
      </ListItemButton>
      <ListItemButton component={Link} to="/league" selected={path === "/league"} sx={{display:'flex', justifyContent:'center'}}>
        <ListItemIcon sx={{display:'flex', justifyContent:'center'}} >
            <LibraryAddIcon />
        </ListItemIcon>
      </ListItemButton>
      <ListItemButton component={Link} to="/country" selected={path === "/country"} sx={{display:'flex', justifyContent:'center'}}>
        <ListItemIcon sx={{display:'flex', justifyContent:'center'}} >
            <LibraryAddIcon />
        </ListItemIcon>
      </ListItemButton>
      <ListItemButton component={Link} to="/characteristic" selected={path === "/characteristic"} sx={{display:'flex', justifyContent:'center'}}>
        <ListItemIcon sx={{display:'flex', justifyContent:'center'}} >
            <LibraryAddIcon />
        </ListItemIcon>
      </ListItemButton>
    </List>
    </>
  );
}
