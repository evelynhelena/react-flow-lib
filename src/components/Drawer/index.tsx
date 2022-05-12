import { useCallback, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import LogoTopaz from "../../assets/trn21-top-left-logo.png"
import { useContentReactFlow } from '../../hooks/useContentReactFlow';
/* import bgImage from "../../assets/bgImage.svg";*/
import fundoPontilhado1920 from "../../assets/fundoPontilhado_1920.svg";
import { DrawerRight } from '../DrawerRight';
import { ReactFlowComponent } from '../reactFlow';
import { useDrawerRight } from '../../hooks/useDrawerRight';
import { Button, ButtonProps } from '@mui/material';
import { useReactFlow } from 'react-flow-renderer';
import { ModalComponent } from '../Modal';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

interface ItemMenu {
    id: string;
    component: string;
    description: string;
    operations: Array<string>;
    configs: Array<string>;
    icon: string;
}

type ListItemMenu = ItemMenu[];

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));



export function PersistentDrawerLeft() {
    const { addNode, nodes, edges, clearAll } = useContentReactFlow();
    const { state } = useDrawerRight();

    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const { setViewport, zoomIn, zoomOut } = useReactFlow();
    const handleTransform = useCallback(
        () => {
            setViewport({ x: 160, y: 160, zoom: 1 }, { duration: 800 });
        },
        [setViewport]
    );

    const ColorButton = styled(Button)<ButtonProps>(() => ({
        '&:hover': {
            backgroundColor: "#67BDE4",
        },
    }));

    const dataItemMenu: ListItemMenu = [
        {
            id: "1",
            component: "random-id",
            description: "Componente para gerar um Id aleatório",
            operations: ["default", "randomId1632", "randomIdUUID"],
            icon: "ri-swap-line",
            configs: ["outputField1", "inputTeste", "verContaOutput"]
        },
        {
            id: "2",
            component: "connector-http",
            description: "Componente para fazer conexão http",
            operations: ["default", "Connector", "Connector 2", "Connector 3"],
            icon: "ri-links-line",
            configs: ["outputField2", "testeOutput", "httpInput"]
        },
        {
            id: "3",
            component: "connector-database",
            description: "Componente para conectar ao banco de dados",
            operations: ["default", "database 1", "database 2", "database 3"],
            icon: "ri-database-2-fill",
            configs: ["outputField3", "verExtratoOutput", "verExtratoInput"]
        },
    ];

    return (
        <Box
            sx={{
                display:
                    'flex',
                backgroundColor:
                    "#EDF7FD",
                backgroundImage: `url(${fundoPontilhado1920})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ backgroundColor: "#009FD7", padding: 2 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        <img src={LogoTopaz} alt="Logo Topaz" title="Logo Topaz" />
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {dataItemMenu.map((data) => (
                        <ListItem button key={data.id} onClick={() => addNode(data)}>
                            <ListItemIcon>
                                <Typography
                                    variant="inherit"
                                    component="i"
                                    className={data.icon}
                                    sx={{ fontSize: '20px' }}
                                />
                            </ListItemIcon>
                            <ListItemText primary={data.component} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <ReactFlowComponent />
                {state && <DrawerRight />}

            </Main>
            <Box sx={
                {
                    backgroundColor: "#fff",
                    padding: 3, position: "fixed",
                    bottom: 0,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 4,
                }
            }
            >
                <Box sx={{ paddingRight: 3 }}>

                    <Button onClick={() => zoomOut({ duration: 800 })}>
                        <Typography
                            sx={{
                                color:
                                    '#0B1641',
                                fontSize:
                                    '20px',
                                paddingBottom:
                                    '3px'
                            }}
                            variant="inherit"
                            component="i"
                            className="ri-zoom-out-line"
                        />
                    </Button>

                    <Button onClick={handleTransform}>
                        <Typography
                            sx={{
                                color:
                                    '#0B1641',
                                fontSize:
                                    '20px',
                                paddingBottom:
                                    '3px'
                            }}
                            variant="inherit"
                            component="i"
                            className="ri-fullscreen-fill"
                        />
                    </Button>
                    <Button onClick={() => zoomIn({ duration: 800 })}>
                        <Typography
                            sx={{
                                color:
                                    '#0B1641',
                                fontSize:
                                    '20px',
                                paddingBottom:
                                    '3px'
                            }}
                            variant="inherit"
                            component="i"
                            className="ri-zoom-in-line"
                        />
                    </Button>
                </Box>


                <ColorButton variant="outlined" onClick={clearAll}
                    sx={
                        { marginRight: 2, borderColor: "#009FD7", color: "#009FD7" }
                    }
                >Limpar</ColorButton>
                <ColorButton variant="contained" onClick={handleOpen} sx={{ backgroundColor: "#009FD7" }}>Ver Json</ColorButton>
            </Box>
            <ModalComponent
                title="Json"
                nodeContest={nodes}
                edgeContest={edges}
                handleClose={handleClose}
                isOpen={openModal}
            />
        </Box>


    );
}
