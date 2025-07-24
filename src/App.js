
import './App.css';
import { Link, Route,Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Admin from './Pages/Admin/Admin';
import { useState } from 'react';
import { Faculty } from './Components/Faculty/Faculty';
import Showdata from './Pages/Showdata/Showdata';

function App() {
  const [id,setId]=useState(0);
  const nav_list_data=[
    {
      id:0,
      Name:'Home',
      path:'/',
      bg_color:'',
      color:'white'
    },
     {
      id:1,
      Name:'Faculty',
      path:'/faculty',
      bg_color:'',
      color:'white'
    },
     {
      id:2,
      Name:'Admin',
      path:'/admin',
      bg_color:'',
      color:'white'
    }
  ]
  return (
    <div className="App">
      <div className='navbar'>

       
      
         <div className='nav_list'>

          {nav_list_data.map((list)=>{
            return <Link to={list.path}><p>{list.Name}</p></Link>
          })}
        </div>
      </div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/faculty' element={<Showdata />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
