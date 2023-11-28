import React from 'react'
import OrdersCard from '../Components/OrdersCard'
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import NewOrder from '../Components/NewOrder';

const Orders = () => {
  return (
    <div className='p-2 flex bg-LightGrey'>
      <div className='bg-white shadow-md rounded-lg p-2 m-1 w-100 '>
        <Popover placement="right">
          <PopoverTrigger>
            <button className='bg-DeepGreen text-LightGrey p-2 font-bold rounded-lg shadow-lg'>New Order</button>
          </PopoverTrigger>
          <PopoverContent>
            <NewOrder/>
          </PopoverContent>
        </Popover>
        <div className='mt-2 h-144 rounded-lg'>
          <h1>PENDING ORDERS </h1>
          <ul>
            <li>
              <OrdersCard/>
            </li>
          </ul>
        </div>
        
      </div>
      <div className='bg-white shadow-md rounded-lg p-2 m-1 w-100'></div>
      <div className='bg-white shadow-md rounded-lg p-2 m-1 w-100'></div>
    </div>
  )
}

export default Orders