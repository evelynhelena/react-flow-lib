import { createContext, useState, ReactNode, useContext, useCallback } from 'react';

interface DrawerRightProps {
    children: ReactNode
}

interface DrawerRightData {
    state: boolean;
    toggleDrawer: (open: boolean) => void;
}

export const DrawerRightContext = createContext<DrawerRightData>({} as DrawerRightData);


export function DrawerRightProvider({ children }: DrawerRightProps) {
    const [state, setState] = useState(false);

    const toggleDrawer = useCallback((open: boolean) => {
        console.log("entrar")
        setState(open);
    }, [])

    return (
        <DrawerRightContext.Provider value={{ state, toggleDrawer }}>
            {children}
        </DrawerRightContext.Provider>
    )
}

export function useDrawerRight() {
    const context = useContext(DrawerRightContext);
    return context;
}