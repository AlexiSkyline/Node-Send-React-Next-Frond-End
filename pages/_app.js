import React from 'react';
import { AppState } from '../context/app/appState';
import { AuthState } from '../context/auth/authState';

export default function MyApp({ Component, pageProps }) {
    return (
        <AuthState>
            <AppState>
                <Component { ...pageProps } />
            </AppState>
        </AuthState>
    );
}