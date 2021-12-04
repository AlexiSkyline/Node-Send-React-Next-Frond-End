import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { Dropzone } from '../components/Dropzone';

export default function Home() {
  return (
    <Layout>
        <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
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
        </div> 
    </Layout>
  );
}
