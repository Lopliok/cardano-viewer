import React, { createContext, useContext, useState, ReactNode } from "react";

// Definujeme typy pro stav
interface StoreState<T> {
    state: T;
    setState: React.Dispatch<React.SetStateAction<T>>;
}

// Vytvoření kontextu s výchozí hodnotou null
const StoreContext = createContext<StoreState<any> | null>(null);

// Provider komponenta
export const StoreProvider = <T,>({ children, initialState }: { children: ReactNode; initialState: T }) => {
    const [state, setState] = useState<T>(initialState);

    const set = (updated: T) => {
        setState(prev => ({ ...prev, ...updated }))
    }

    return (
        <StoreContext.Provider value={{ state, setState: set }}>
            {children}
        </StoreContext.Provider>
    );
};

// Custom hook pro snadný přístup ke kontextu
export const useStore = <T,>() => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useStore must be used within a StoreProvider");
    }
    return context as StoreState<T>;
};