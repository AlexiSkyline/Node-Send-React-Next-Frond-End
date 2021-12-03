import React, { useReducer } from 'react';
import { authContext } from "./authContext";

export const AuthState = ( props ) => {
    
    return (
        <authContext.Provider
            value={{

            }}
        >
            { props.children }
        </authContext.Provider>
    );
}