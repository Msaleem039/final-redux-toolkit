import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Product from './components/Product';
import Fakeapi from './components/Fakeapi';
import Detailpage from './components/Detailpage';
import Login from './components/Login';
import Register from './components/Register';
import ShoppingCard from './components/ShoppingCard';
import Success from './components/Success';
import { Cancel } from '@mui/icons-material';
import Checkout from './components/Checkout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterDetail from './components/RegisterDtail';

function App() {
  return (
    <div className="App">
   <Navbar/>
   <Routes>
    <Route path='/' element={<Home name="abhar"/>}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='/product' element={<Product/>}></Route>
    <Route path='/fakeapi' element={<Fakeapi/>}></Route>
    <Route path='/fakeapi/:id' element={<Detailpage/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/register/:id' element={<RegisterDetail/>}></Route>
    <Route path='/checkout' element={<Checkout/>}></Route>
    <Route path='/success' element={<Success/>}></Route>
    <Route path='/cancel' element={<Cancel/>}></Route>
    <Route path='/shoppingcard' element={<ShoppingCard/>}></Route>
   </Routes>
   <ToastContainer />
    </div>
  );
}

export default App;
