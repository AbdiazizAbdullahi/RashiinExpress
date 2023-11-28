import { useState, useEffect} from 'react'
// import axios from 'axios'

const CustomersTable = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/all');
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


  return (
    <table className="table-auto w-full ">
        <thead className="table-header-group font-extrabold text-DeepGreen bg-slate-300">
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
            </tr>
        </thead>
        <tbody className='m-2'>
            {data.map((users) =>(
                <tr className='' key={users.id}>
                    <td className='text-DarkGrey p-1 text-center' >{users.name}</td>
                    <td className='text-DarkGrey p-1 text-center' >{users.email}</td>
                    <td className='text-DarkGrey p-1 text-center' >{users.phone}</td>
                    <td className='text-DarkGrey p-1 text-center' >{users.role}</td>
                </tr>
            ))}

        </tbody>
    </table>
  )
}

export default CustomersTable