
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Seller from './Seller/Seller';


function App() {


  return (
    <>
      <Routes>
        <Route path="/Seller" element={<Seller />} />
      </Routes>
    </>
  )

}

export default App;
