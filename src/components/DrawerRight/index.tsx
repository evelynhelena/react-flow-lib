import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useDrawerRight } from '../../hooks/useDrawerRight';
import { Button, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import { useContentReactFlow } from '../../hooks/useContentReactFlow';

export function DrawerRight() {
    const { state, toggleDrawer } = useDrawerRight();
    const { nodeSelected, updateNode } = useContentReactFlow();
    const [operation, setOperation] = useState("default");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState("");

    const setValues = useCallback(() => {
        if (nodeSelected) {
            setName(nodeSelected.data.component);
            setDescription(nodeSelected.data.description);
            setId(nodeSelected.data.id);
        }
    }, [nodeSelected])

    useEffect(() => {
        setValues();
    }, [setValues])

    const handleChangeOperation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOperation(event.target.value);
    };

    const list = () => (
        <Box
            sx={{ width: 260, display: 'flex', justifyContent: 'center', flexDirection: 'column', }}
            role="presentation"
        >
            <Box sx={{ justifyContent: 'end', display: 'inherit', padding: "1rem" }}>
                <IconButton
                    color="inherit"
                    aria-label="close drawer"
                    onClick={() => toggleDrawer(false)}
                    edge="start"
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box component="form" sx={{ padding: "0 1rem" }}>
                <InputLabel sx={{ fontSize: '14px', color: '#333333', paddingBottom: 1 }}>Nome</InputLabel>
                <TextField
                    id="name"
                    size="small"
                    sx={{ width: "100%", fontSize: "14px", marginBottom: "20px" }}
                    placeholder="Digite o nome"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                />

                <InputLabel sx={{ fontSize: '14px', color: '#333333', paddingBottom: 1 }}>Descrição</InputLabel>
                <TextField
                    id="description"
                    sx={{ width: "100%", fontSize: "14px", marginBottom: "20px" }}
                    multiline
                    rows={3}
                    placeholder="Digite uma descrição"
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
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
                    {nodeSelected?.data.operations.map((option: string) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <InputLabel sx={{ fontSize: '14px', color: '#333333', paddingBottom: 1 }}>Configurações</InputLabel>
                {nodeSelected?.data.configs.map((config: string) => (
                    <Box sx={{ fontSize: '13px', color: '#333333', paddingBottom: 1 }} key={config}>{config}</Box>
                ))}
            </Box>
            <Divider />
            <Box sx={{ padding: "1rem" }}>
                <Button sx={{ width: "100%" }} variant="outlined" onClick={() => updateNode(name, description, id)}>Atualizar</Button>
            </Box>
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