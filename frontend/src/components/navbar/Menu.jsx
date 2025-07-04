import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link, useLocation } from 'react-router';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Divider from '@mui/material/Divider';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

export default function Menu() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  

  const location = useLocation()
  const path = location.pathname
  return (
    <>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          List All
        </ListSubheader>
      }
    >
      <Divider />

      <ListItemButton onClick={handleClick} component={Link} to="/" selected={path === "/"}>
        <ListItemIcon>
          <ListAltOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Show all objects" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/league/listAll/" selected={path === "/league/listAll/"}>
            <ListItemIcon>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary="League" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} component={Link} to="/country/listAll/" selected={path === "/country/listAll/"}>
            <ListItemIcon>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary="Contry" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} component={Link} to="/characteristic/listAll/" selected={path === "/characteristic/listAll/"}>
            <ListItemIcon>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary="Characteristic" />
          </ListItemButton>

        </List>
      </Collapse>
    </List>
    
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Create Objects
        </ListSubheader>
      }
    >
      <Divider />
      <ListItemButton onClick={handleClick} component={Link} to="/create" selected={path === "/create"}>
        <ListItemIcon>
          <LibraryAddOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="All objects" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={!open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/league" selected={path === "/league"}>
              <ListItemIcon>
                  <PlaylistAddIcon />
              </ListItemIcon>
              <ListItemText primary="Create League" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/country" selected={path === "/country"}>
            <ListItemIcon>
                <PlaylistAddIcon />
            </ListItemIcon>
            <ListItemText primary="Create Country" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/characteristic" selected={path === "/characteristic"}>
            <ListItemIcon>
                <PlaylistAddIcon />
          </ListItemIcon>
          <ListItemText primary="Create Characteristic" />
        </ListItemButton>
      </List>
      
      </Collapse>
    </List>

    <List
    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    component="nav"
    aria-labelledby="nested-list-subheader"
    subheader={
    <ListSubheader component="div" id="nested-list-subheader">
        Creating Records
    </ListSubheader>
    }
    >
    <Divider />
    <ListItemButton component={Link} to="/create/footballClub" selected={path === "/create/footballClub"}>
        <ListItemIcon>
            <LibraryAddIcon/>
        </ListItemIcon>
        <ListItemText primary="Create Clubs" />
    </ListItemButton>
    </List>
    <List
    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    component="nav"
    aria-labelledby="nested-list-subheader"
    subheader={
    <ListSubheader component="div" id="nested-list-subheader">
        Reports and Charts
    </ListSubheader>
    }
    >
      <Divider />
      <ListItemButton component={Link} to="/footballClub/piechart" selected={path === "/footballClub/piechart"}>
        <ListItemIcon>
            <WaterfallChartIcon />
        </ListItemIcon>
        <ListItemText primary="Football Club Chart" />
    </ListItemButton>
    
    </List>
    <List
    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    component="nav"
    aria-labelledby="nested-list-subheader"
    subheader={
    <ListSubheader component="div" id="nested-list-subheader">
        Calendar
    </ListSubheader>
    }
    >
      <Divider />
      <ListItemButton component={Link} to="/calendar1" selected={path === "/calendar1"}>
        <ListItemIcon>
            <CalendarMonthOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Game calendars" />
    </ListItemButton>
    
    </List>
    </>
  );
}
