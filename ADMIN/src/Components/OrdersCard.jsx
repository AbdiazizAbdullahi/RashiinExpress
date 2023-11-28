import React from 'react'
import axios from 'axios'

const OrdersCard = () => {

  const handlefetch = () => {

  }

  return (
    <div className='flex justify-between p-1 m-2 shadow-md rounded-md bg-LightGrey gap-2'>
      <div className='grid grid-cols-3 gap-2 text-center bg-transparent font-semibold'>
        <h2 className=' col-span-2'>Halima Abdirahman</h2>
        <h3>15 Items</h3>
        <h3>Ksh 35,600 </h3>
        <h3>South C </h3>
        <h3>Mukaram</h3>
      </div>
      <div className='grid grid-cols-1'>
        <h2 className='font-bold'>
          <span>PAID: </span>
          True
        </h2>
        <button className='bg-DeepGreen text-LightGrey rounded-lg hover:bg-DarkGrey'>Next Step</button>
      </div>
    </div>
  )
}

export default OrdersCard