import React, { useContext } from 'react'
import './Dashboard.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUsers,faLaptop, faCalendarDays,faClipboard,faTrash, faClock} from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../ContextProvider/ContextProvider';



const Dashboard = () => {
    const {events,setEvents}=useContext(Context);
    const {studentsList, setStudentsList} = useContext(Context);
    const {facultyList,setFacultyList}=useContext(Context);
    const {registerdata,setRegisterdata}=useContext(Context);
    const all_list_data=[{
        id:0,
        name:'Total students',
        count:studentsList.length,
        icon:faUsers,
        color:'rgb(84, 84, 244)',
        bg_color: 'rgba(151, 214, 239, 1)'
    },{
         id:1,
        name:'Faculty Members',
        count:facultyList.length,
        icon:faLaptop,
        color:'rgb(3, 166, 68)',
        bg_color:'rgba(138, 243, 180, 1)'
    },{
         id:2,
        name:'Active events',
        count:events.length,
        icon:faCalendarDays,
        color:'rgba(169, 39, 230, 1)',
        bg_color:'rgba(231, 183, 254, 1)'
    },{
        id:3,
        name:'Total registrations',
        count:registerdata.length,
        icon:faClipboard,
        color:'rgb(255, 1, 1)',
        bg_color:'rgba(251, 187, 187, 1)'
    }
];

  return (
    <div>
        <div>
            <div className='dash_list_data'>
                {all_list_data.map((data,index)=>{
                    return <div className='dash_item' key={index}>
                        <div className='dash_list_item'>
                            <span id='dash_item_name'>{data.name}</span>
                            <span id='dash_item_count'>{data.count}</span>
                        </div>
                        <FontAwesomeIcon id='dash_list_icon' icon={data.icon} style={{backgroundColor:`${data.bg_color}`,color:`${data.color}`}} />
                    </div>
                })}
            </div>
        </div>

    <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'20px 30px'}}>
        <div style={{display:'flex',alignItems:'center'}}>
            <img src="https://img.freepik.com/premium-vector/back-views-people-sitting-together-outside-people-sitting-relax-park_726330-225.jpg" alt="" srcset="" />
            <div style={{marginTop:"-60px"}}>
                 <h2>Welcome to Admin Panel</h2>
                 <em>Manage the data...as you wish</em>
            </div>

            
           
        </div>

    </div>
        
    </div>
  )
}

export default Dashboard