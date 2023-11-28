import React from 'react'
import ProductsTable from '../Components/ProductsTable'

const Products = () => {
  return (
    <div className='p-2 grid w-full bg-LightGrey'>
      <section className='bg-LightGrey text-white p-1 m-1 h-48 flex justify-between w-full'>
        <div className='h-46 w-1/3 m-2 p-1 bg-white rounded-lg shadow-md'></div>
        <div className='h-46 w-1/3 m-2 p-1 bg-white rounded-lg shadow-md'></div>
        <div className='h-46 w-1/3 m-2 p-1 bg-white rounded-lg shadow-md'></div>
      </section>
      <section className='bg-LightGrey text-white p-1 m-1 h-128 flex justify-between w-full'>
        <div className='m-2 p-1 bg-white w-full rounded-lg shadow-md'>
          <ProductsTable/>
        </div>
      </section>
    </div>
  )
}

export default Products