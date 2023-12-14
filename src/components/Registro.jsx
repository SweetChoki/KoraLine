import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { database } from '../firebaseconfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

export const Registro = () => {
  // console.log(database);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const {setUser} = useContext(UserContext)

  const history = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(e);
    console.log(password.length);


    if(email == '' || password == ''){
      setError('Complete los campos')
    }else if(password.length < 6){
      setError("La contraseña debe tener mínimo 6 caracteres")
    }else{
      createUserWithEmailAndPassword(database, email, password)
        .then(function(res){
          setUser(res.user.email);
          history('/login')
        }).catch(function(err){
          console.log(err);
          setError('Le pifiaste, wachin')
        })
    }
  }

  useEffect(() => {
    setError('')
  }, [email, password])
  

  return (
    <div className="font-sans antialiased bg-grey-lightest">
  {/* <!-- Top Nav --> */}
  
  {/* <!-- Content --> */}
  <div className="w-full bg-grey-lightest pt-4" >
    <div className="container mx-auto py-8">
      <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
            <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">Registrate, padre santo</div>
            <form onSubmit={handleSubmit}>
              <div className="py-4 px-8">
                  <div className="flex mb-4">
                      <div className="w-1/2 mr-1">
                          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="first_name">Nombre</label>
                          <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="first_name" type="text" placeholder="Your first name"/>
                      </div>
                      <div className="w-1/2 ml-1">
                          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="last_name">Apellido</label>
                          <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="last_name" type="text" placeholder="Your last name"/>
                      </div>
                  </div>
                  <div className="mb-4">
                      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">Email</label>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="email" placeholder="Your email address"/>
                  </div>
                  <div className="mb-4">
                      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">Constraseña</label>
                      <input value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="password" type="password" placeholder="Your secure password"/>
                      
                  </div>
                  {error && (
                    <p className='text-red-500 text-xs'>{error}</p>
                  )}
                  <div className="flex items-center justify-between mt-8">
                      <button className="bg-blue-600 w-full text-white hover:bg-blue-800 font-bold py-2 px-4 rounded-full" type="submit">
                          Sign Up
                      </button>
                  </div>
              </div>
            </form>
        </div>
        <p className="text-center my-4">
            <a href="#" className="text-grey-dark text-sm no-underline hover:text-grey-darker">Ya tengo una cuenta</a>
        </p>
    </div>
  </div>
</div>
  )
}
