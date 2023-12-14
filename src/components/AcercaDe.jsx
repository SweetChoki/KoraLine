import React, {useContext} from 'react'
import { UserContext } from '../context/UserContext'

export const AcercaDe = () => {

    const { user } = useContext(UserContext);
    
  return (
    <div className='mt-40 w-full text-center'>Usuario: {user}</div>
  )
}
