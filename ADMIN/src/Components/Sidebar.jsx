import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
        <div 
            className="p-2 flex flex-col 
            justify-between items-center w-36 h-screen 
             bg-DarkGrey ">
            <div className="h-20 bg-DarkGrey">
                <img src="" alt="Adeego" className="w-10 h-10 text-DeepGreen bg-DarkGrey"/>
            </div>
            <div className="flex flex-col bg-DarkGrey">
                <Link className='p-2 bg-DarkGrey text-DeepGreen no-underline font-extrabold mb-7' to={'/'}>Home</Link>
                <Link className='p-2 bg-DarkGrey text-DeepGreen no-underline font-extrabold mb-7' to={'/products'}>Products</Link>
                <Link className='p-2 bg-DarkGrey text-DeepGreen no-underline font-extrabold mb-7' to={'/orders'}>Orders</Link>
                <Link className='p-2 bg-DarkGrey text-DeepGreen no-underline font-extrabold mb-7' to={'/customers'}>Customers</Link>
            </div>
            <div className='bg-DarkGrey'>
                <Link className='text-DeepGreen bg-DarkGrey no-underline font-extrabold text-center' to={'/logout'}>Logout</Link>
            </div>
        </div>
    </div>
  )
}

export default Sidebar