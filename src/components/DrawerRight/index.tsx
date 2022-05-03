import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useDrawerRight } from '../../hooks/useDrawerRight';

export function DrawerRight() {
    const { state, toggleDrawer } = useDrawerRight();

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => toggleDrawer(false)}
            onKeyDown={() => toggleDrawer(false)}
        >
            <h1>Ola mundo</h1>
        </Box>
    );

    return (

        <Drawer
            anchor="right"
            open={state}
            onClose={() => toggleDrawer(false)}
        >
            {list()}
        </Drawer>

    );
}