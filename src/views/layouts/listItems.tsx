import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Orders" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Customers" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Reports" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>

            </ListItemIcon>
            <ListItemText primary="Integrations" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>

            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>

            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>

            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItemButton>
    </React.Fragment>
);