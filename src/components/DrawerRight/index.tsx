import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useDrawerRight } from '../../hooks/useDrawerRight';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import { useContentReactFlow } from '../../hooks/useContentReactFlow';

export function DrawerRight() {
    const { state, toggleDrawer } = useDrawerRight();
    const { nodeSelected } = useContentReactFlow();
    const [operation, setOperation] = useState("default");
    const [name, setName] = useState<string | undefined>("");

    console.log(nodeSelected)
    if (!nodeSelected) {
        //setName(nodeSelected?.component);
    }

    const handleChangeOperation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOperation(event.target.value);
    };

    const list = () => (
        <Box
            sx={{ width: 260, display: 'flex', justifyContent: 'center', padding: "1rem", flexDirection: 'column', }}
            role="presentation"
        >
            <Box sx={{ justifyContent: 'end', display: 'inherit' }}>
                <IconButton
                    color="inherit"
                    aria-label="close drawer"
                    onClick={() => toggleDrawer(false)}
                    edge="start"
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box component="form">
                <InputLabel sx={{ fontSize: '14px', color: '#333333', paddingBottom: 1 }}>Nome</InputLabel>
                <TextField
                    id="name"
                    size="small"
                    sx={{ width: "100%", fontSize: "14px", marginBottom: "20px" }}
                    placeholder="Digite o nome"

                //value={name}
                //onChange={handleChange}
                />

                <InputLabel sx={{ fontSize: '14px', color: '#333333', paddingBottom: 1 }}>Descrição</InputLabel>
                <TextField
                    id="description"
                    sx={{ width: "100%", fontSize: "14px", marginBottom: "20px" }}
                    multiline
                    rows={3}
                    placeholder="Digite uma descrição"
                />


                <InputLabel sx={{ fontSize: '14px', color: '#333333', paddingBottom: 1 }}>Operações</InputLabel>
                <TextField
                    id="outlined-select-currency"
                    select
                    size="small"
                    value={operation}
                    onChange={handleChangeOperation}
                    sx={{ width: "100%", fontSize: "14px", marginBottom: "20px" }}
                >
                    {nodeSelected?.data.operations.map((option: any) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>


        </Box>
    );

    return (

        <Drawer
            anchor="right"
            open={state}
        //onClose={() => toggleDrawer(false)}
        >
            {list()}
        </Drawer>

    );
}