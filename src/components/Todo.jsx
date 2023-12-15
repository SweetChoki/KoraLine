import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Fragment } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Todo = () => {
    const [todos, setTodos] = useState([])
    const [done, setDone] = useState(false)
    const [mensaje, setMensaje] = useState('')

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fecha, setFecha] = useState('')

    const { url, user } = useContext(UserContext)
    const history = useNavigate();

    const getTodos = async() => {    
        await axios.get(url + '/ToDo').then(function(res){
            console.log(res.data);
            setTodos(res.data);
        }).catch(function(err){
            console.log(err);
        })
    }

    const createTodo = async() => {
        await axios.post(url + '/ToDo',{
            Nombre: nombre,
            Descripcion: descripcion,
            Estado: false,
            Fecha: fecha,
            CreadoPor: user
        }).then(function(res){
            if(res.status == 201){
                setOpen(false);
                setDone(!done);
                setMensaje('Se creó la tarea con éxito');
            }
        }).catch(function(err){
            console.log();
        })
    }

    const doneTodo = async(id, estado, e) => {
        e.preventDefault()
        await axios.put(url + 'ToDo/' + id,{
            Estado: !estado
        }).then(function(res){
            if(res.status == 200){
                setDone(!done);
                setMensaje('Se editó la tarea exitosamente')
            }
        }).catch(function(err){
            console.log(err);
        })
    }

    const deleteTodo = async(id, e) => {
        e.preventDefault()
        await axios.delete(url + 'ToDo/' + id).then(function(res){
            if(res.status == 200){
                setDone(!done);
                setMensaje('Se eliminó la tarea exitosamente')
            }
        }).catch(function(err){
            console.log(err);
        })
    }

    const [open, setOpen] = useState(false)

    useEffect(() => {
        getTodos()
    }, [done])
    

  return (

    <div className='mt-40 px-10'> 
        {mensaje && (
            <div className='w-full px-5 mb-5 bg-green-300 text-green-900 inline-flex items-center justify-between h-10'>
                {mensaje}
                <button className='text-green-900' onClick={() => setMensaje('')}>X</button>
            </div>
        )}  
        {!user ? (<div className='w-full'>
            <h1 className='text-5xl font-bold text-black text-center'>NECESITAS LOGUEARTE</h1>
            <div className='w-full flex justify-center '><button onClick={() => history('/login')} className=' mt-5 rounded-md bg-fuchsia-900 text-fuchsia-100 py-2 px-3'>Ir al login</button></div>
        </div>) : 
        (<>
            <button className='rounded-md bg-fuchsia-900 text-fuchsia-100 py-2 px-3' onClick={() => setOpen(!open)}>Crear nueva tarea</button>
            <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                        <div>
                            
                            <p>Nueva tarea</p>
                            <div className="mt-3 text-center sm:mt-5 space-y-5">
                                <div>
                                    <label className="text-left block text-sm font-medium leading-6 text-gray-900">
                                        Nombre
                                    </label>
                                    <div className="relative mt-2">
                                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}  className="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6 text-left" placeholder="Nombre" />
                                        <div className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600" aria-hidden="true" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-left block text-sm font-medium leading-6 text-gray-900">
                                        Descripcion
                                    </label>
                                    <div className="relative mt-2">
                                        <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6 text-left" placeholder="Descripcion" />
                                        <div className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600" aria-hidden="true" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-left block text-sm font-medium leading-6 text-gray-900">
                                        Ingrese fecha
                                    </label>
                                    <div className="relative mt-2">
                                        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value) } className="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6 text-left" />
                                        <div className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600" aria-hidden="true" />
                                    </div>
                                </div>
                                <div>
                                    {/* <div className="relative flex items-start">
                                        <div className="flex h-6 items-center">
                                            <input  type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                        </div>
                                        <div className="ml-3 text-sm leading-6">
                                            <label className="font-medium text-gray-900">
                                                Se realizó ?
                                            </label>
                                            <p className="text-gray-500">
                                                Marcar si está realizada la tarea
                                            </p>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6">
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={createTodo}
                            >
                                Crear nueva tarea
                            </button>
                        </div>
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
            </Transition.Root>
            <div className='mt-10 border p-3'>
                {todos.length != 0 ? (
                    <ul role="list" className="divide-y divide-gray-100">
                    {todos.map((todo) => (
                        <li key={todo.id} className="flex items-center justify-between gap-x-6 py-5">
                        <div className="min-w-0">
                            <div className="flex items-start gap-x-3">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{todo.Nombre}</p>
                                <p className="text-sm font-semibold leading-6 text-gray-900">- {todo.Descripcion}</p>
                                <p
                                    className={`${todo.Estado ? 'text-green-700 bg-green-50 ring-green-600/20' : 'text-gray-600 bg-gray-50 ring-gray-500/10' } rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset`}
                                >
                                    {todo.Estado ? 'Realizada' : 'Sin hacer'}
                                </p>
                                </div>
                                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                <p className="whitespace-nowrap">
                                    Tarea para la fecha: {todo.Fecha}
                                </p>
                                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                    <circle cx={1} cy={1} r={1} />
                                </svg>
                                <p className="truncate">Created by {todo.CreadoPor}</p>
                            </div>
                        </div>
                        <div className="flex flex-none items-center gap-x-4">
                            
                            <Menu as="div" className="relative flex-none">
                            <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                <span className="sr-only">Open options</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </Menu.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                
                                <Menu.Item>
                                    {({ active }) => (
                                    <button
                                        onClick={(e) => doneTodo(todo.id, todo.Estado, e)}
                                        className={classNames(
                                        active ? 'bg-gray-50' : '',
                                        'block px-3 py-1 text-sm leading-6 text-gray-900'
                                        )}
                                    >
                                        Marcar como {todo.Estado ? 'sin hacer' : 'finalizada'}<span className="sr-only">, {todo.Nombre}</span>
                                    </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                    <button
                                        onClick={(e) => deleteTodo(todo.id, e)}
                                        className={classNames(
                                        active ? 'bg-gray-50' : '',
                                        'block px-3 py-1 text-sm leading-6 text-gray-900'
                                        )}
                                    >
                                        Eliminar<span className="sr-only">, {todo.Nombre}</span>
                                    </button>
                                    )}
                                </Menu.Item>
                                </Menu.Items>
                            </Transition>
                            </Menu>
                        </div>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <div className='w-full'>
                        <h1 className='text-2xl font-semibold text-center'>No hay tareas creadas</h1>
                    </div>
                )}
            </div>
        </>)}
    </div>
    )
}
