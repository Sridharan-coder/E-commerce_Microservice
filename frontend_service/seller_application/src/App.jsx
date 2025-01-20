
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Seller from './Seller/Seller';
import Maintance from './Maintance/Maintance';


function App() {


  return (
    <>
      <Routes>
        <Route path="/Seller" element={<Seller />} />
        <Route path="/maintance" element={<Maintance/>} />
      </Routes>
    </>
  )

}

export default App;
