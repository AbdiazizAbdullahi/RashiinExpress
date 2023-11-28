import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Products from './Pages/Products';
import Orders from './Pages/Orders';
import Customers from './Pages/Customers';
import Sidebar from './Components/Sidebar';

const App = () => {
  return (
    <div className='flex flex-row'>
      <Router>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/customers" element={<Customers/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;