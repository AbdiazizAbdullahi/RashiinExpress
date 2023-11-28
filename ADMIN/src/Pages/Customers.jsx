import React from 'react'
import CustomersTable from '../Components/CustomersTable'

const Customers = () => {
  return (
    <div className='p-2 grid w-full bg-LightGrey'>
      <section className='bg-LightGrey p-1 m-1 h-48 flex justify-between w-full'>
        <div className='h-46 w-1/3 m-2 p-1 rounded-lg shadow-md bg-white'></div>
        <div className='h-46 w-1/3 m-2 p-1 rounded-lg shadow-md bg-white'></div>
        <div className='h-46 w-1/3 m-2 p-1 rounded-lg shadow-md bg-white'></div>
      </section>
      <section className='bg-LightGrey p-1 m-1 h-128 flex justify-between w-full'>
        <div className='bg-white rounded-lg shadow-md m-2 p-1 w-full'>
          <CustomersTable/>
        </div>
      </section>
    </div>
  )
}

export default Customers