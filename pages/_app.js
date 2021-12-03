import React from 'react';
import { AuthState } from '../context/auth/authState';

export default function MyApp({ Component, pageProps }) {
    return (
        <AuthState>
            <Component { ...pageProps } />
        </AuthState>
    );
}