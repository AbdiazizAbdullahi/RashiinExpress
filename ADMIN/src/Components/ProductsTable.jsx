import { useState, useEffect } from 'react';
// import axios from 'axios';

const ProductsTable = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/product/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // The empty dependency array means this effect will run once when the component mounts

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log(data)
  
    return (
      <table className="table-auto w-full  rounded-md">
        <thead className="table-header-group font-extrabold text-DeepGreen bg-slate-300 rounded-md m-1">
          <tr className=''>
            <th>Name</th>
            <th>Quantity</th>
            <th>Stock</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody className='border border-separate'>
          {data.map((product) => (
            <tr className='' key={product.id}>
              <td className='text-DarkGrey p-1 text-center text'>{product.name}</td>
              <td className='text-DarkGrey p-1 text-center text'>{product.quantity}</td>
              <td className='text-DarkGrey p-1 text-center text'>{product.stock}</td>
              <td className='text-DarkGrey p-1 text-center text'>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default ProductsTable;
  