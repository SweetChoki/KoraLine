import  { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export const Home = () => {
    const { user } = useContext(UserContext);

  return (
    <div className='mt-40'>
        <div className='w-full py-5'>
            <h1 className='font-bold text-4xl text-center'>Bienvenido {user}</h1>
        </div>
    </div>
  )
}
