import React from 'react'
import { appContext } from './appContext';

export const AppState = ( props ) => {

    return (
        <appContext.Provider
            value={{

            }}
        >
            { props.children}
        </appContext.Provider>
    );
}
