import React,{ useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { Alerta } from '../components/Alerta';
import { Dropzone } from '../components/Dropzone';
import Link from 'next/link';
import { authContext } from '../context/auth/authContext';
import { appContext } from '../context/app/appContext';

export default function Home() {
    // Todo: Extrae el usuario autentucado del Storage
    const AuthContext = useContext( authContext  );  
    const { usuarioAutenticado } = AuthContext;

    // Todo: Extrae el mensaje del archivo
    const AppContext = useContext( appContext );
    const { mensajeArchivo, url } = AppContext;

    useEffect(() => {
        const token = localStorage.getItem( 'token' );

        if( token ) {
            usuarioAutenticado();
        }
    }, []);
    
    return (
        <Layout>
            <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>

                {
                    url ? 
                    (
                        <>
                            <p className='text-center text-2xl'>
                                <span className='font-bold text-red-700 text-3xl uppercase'>
                                    Tu URL es:
                                </span> 
                                { `${ process.env.frontendURL }/enlaces/${ url }` }
                            </p>

                            <button
                                type='button'
                                className='bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-8'
                                onClick={ () => navigator.clipboard.writeText( `${ process.env.frontendURL }/enlaces/${ url }` ) }
                            >
                                Copiar Enlace
                            </button>
                        </>
                    )
                    :
                    (
                        <>
                            {
                                mensajeArchivo && <Alerta />
                            }

                            <div className='lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10'>
                                <Dropzone />

                                <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0'>
                                    <h2 className='text-4xl font-sans font-bold text-gray-800 my-4'>
                                        Compartir archivos de formato sencilla y privada
                                    </h2>

                                    <p className='text-lg leading-loose'>
                                        <span className='text-red-500 font-bold'>ReactNodeSend</span> te permite compartir archivos con cifrado de 
                                        extremo a extremo y un arcivo que es eliinado después de ser descargadp. Así que puedes mantener lo que 
                                        compartes en privado y asegurarte de que tus cosas no permanezcan en línea para siempre
                                    </p>

                                    <Link href='/_crearcuenta'>
                                        <a className='text-red-500 font-bold text-lg hover:text-red-700'>Crea una cuenta para mayores baneficios</a>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )
                }
            </div> 
        </Layout>
    );
}