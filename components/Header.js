import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { authContext } from '../context/auth/authContext';

export default function Header() {
    // Todo: Extrae el usuario autenticado del Storage
    const AuthContext = useContext( authContext  );  
    const { usuario, usuarioAutenticado } = AuthContext;

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    return (
        <header className='py-8 flex flex-col md:flex-row item-center justify-between'>
            <Link href='/' passHref>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className='w-64 mb-8 md:mb-0 cursor-pointer' src='logo.svg' alt='logo.svg'/>
            </Link>

            <div className='flex item-center'>
                {
                    usuario ? 
                    ( <p>Hola { usuario.nombre }</p>) :
                    (
                        <>
                            <Link href='/_login'>
                                <a className='bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2'>
                                    Iniciar Sesión
                                </a>
                            </Link>

                            <Link href='/_crearcuenta'>
                                <a className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'>
                                    Crear Cuenta
                                </a>
                            </Link>
                        </>
                    )
                }
            </div>
        </header>
    );
}
