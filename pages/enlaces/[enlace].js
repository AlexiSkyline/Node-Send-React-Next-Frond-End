import { useState, useContext, useEffect } from 'react';
import { Alerta } from '../../components/Alerta';
import Layout from '../../components/Layout';
import { clienteAxios } from '../../config/axios';
import { appContext } from '../../context/app/appContext';

export async function getServerSideProps({ params }) {
    const { enlace } = params;
    const resultado = await clienteAxios.get( `/api/enlaces/${ enlace }` );

    return {
        props: {
            enlace: resultado.data
        }
    }
}

export async function getServerSidePaths() {
    const enlaces = await clienteAxios.get( '/api/enlaces' );
        
    return {
        paths: enlaces.data.enlaces.map( enlace => ( {
            params: { enlace : enlace.url }
        })),
        fallback: true
    }
}

export default function enlaces({ enlace }) {
    const AppContext = useContext( appContext );
    const { mensajeArchivo, hasPassword, verificarPassword } = AppContext;

    const [ tienePassword, setTienePassword ] = useState( enlace.password );
    const [ password, setPassword ] = useState('');

    const obtenerPassword = ( e ) => {
        e.preventDefault();
        const data = { password }

        verificarPassword( enlace.enlace, data );
    }

    useEffect(() => {
        if( hasPassword == false ) {
            setTienePassword( false );
        }
    }, [hasPassword]);

    return (
        <Layout>
           {
               tienePassword ?
               (
                    <>
                        <p className='text-center'>Este enlace esta protegido por un password, colocalo a continuación</p>

                        { mensajeArchivo && <Alerta /> }

                        <div className='flex justify-center mt-5'>
                            <div className='w-full max-w-lg'>
                                <form
                                    className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                                    onSubmit={ e => obtenerPassword( e ) }
                                >
                                    <div className='mb-4'>
                                        <label 
                                            className='block text-black text-sm font-bold mb-2'
                                            htmlFor='password'
                                        >
                                            Password    
                                        </label>
                                        <input 
                                            type='password' 
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='password'
                                            placeholder='Ingrese el password del enlace'     
                                            value={ password }
                                            onChange={ e => setPassword( e.target.value ) }
                                        />
                                    </div> 

                                    <input
                                        type='submit'
                                        className='bg-red-500 hover:bg-red-700 w-full p-2 text-white uppercase font-bold cursor-pointer'
                                        value='Validar Password'
                                    />
                                </form>
                            </div>
                        </div>
                    </>
               )    
                 :
                (
                    <>
                        <h1 className='text-4xl text-center text-gray-700'>Descarga tu archivo:</h1>
                        <div className='flex items-center justify-center mt-10'>
                            <a 
                                href={ `${ process.env.backendURL }/api/archivos/${ enlace.archivo }`} 
                                className='bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer'
                                download
                            >
                                Aquí
                            </a>
                        </div>
                    </>
                )
           }
        </Layout>
    );
}