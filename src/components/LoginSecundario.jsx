import React, { useState } from 'react'

export const Login = () => {

  const [isLogged, setIsLogged] = useState(false)
    
  return (
    <div>
        <h1 className='text-4xl text-white underline mb-4'>Login</h1>
        {isLogged ? (
            <div className='flex-col'>
                <h1 className='text-9xl text-white mb-8'>Inicio de sesión exitoso.</h1>
                <button onClick={() => setIsLogged(false)}>Desloguearme</button>
            </div>
        ) : (
            <div className='flex-col space-y-5'>
                <div className=''>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" />
                </div>
                <div className=''>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" />
                </div>

                <button type="submit" onClick={() => setIsLogged(true)} className='text-gray-800 bg-gray-400 rounded-md px-3 py-2'>Loguearse</button>
                
            </div>
        )}
    </div>
  )
}
