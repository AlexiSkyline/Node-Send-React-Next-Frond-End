import React from 'react';
import Link from 'next/link';

export default function Header() {
    return (
        <header className='py-8 flex flex-col md:flex-row item-center justify-between'>
            <Link href='/' passHref>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className='w-64 mb-8 md:mb-0 cursor-pointer' src='logo.svg' alt='logo.svg'/>
            </Link>

            <div className='flex item-center'>
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
            </div>
        </header>
    );
}
