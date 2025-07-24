import React, { useState } from 'react'
import './Admin.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUsers,faLaptop,faChartLine,faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import Dashboard from '../../Components/Dashboard/Dashboard'
import Students from '../../Components/Students/Students'
import Addstudent from '../../Components/Addstudent/Addstudent'
import { Faculty } from '../../Components/Faculty/Faculty'
import Addfaculty from '../../Components/Addfaculty/Addfaculty'
import Event from '../../Components/Events/Event'
const Admin = () => {

    const [activepanel,Setactivepanel]=useState('Dashboard');

    const admin_panel_list=[{
        id:0,
        name:'Dashboard',
        icon:faChartLine,
        bg_color:'rgba(241, 63, 63, 1)'
    },{
         id:1,
        name:'Students',
        icon:faUsers,
        bg_color:'rgb(100, 100, 247)'

    },{
         id:2,
        name:'Faculty',
        icon:faLaptop,
        bg_color:'rgb(3, 166, 68)'
    },
    {
          id:3,
        name:'Events',
        icon:faCalendarDays,
        bg_color:'rgba(169, 39, 230, 1)'

    }
]
  return (
    <div>
        <div className='admin_container'>
            <div className='admin_panel'>
                <h4 className='admin_heading'>Admin Panel</h4>
                <div>
                    {admin_panel_list.map((list,index)=>{
                        return <div key={index} onClick={()=>{Setactivepanel(list.name)}} className='list_item' style={{ '--bg-color': list.bg_color }}
>
                            <FontAwesomeIcon icon={list.icon} />
                            <p >{list.name}</p>
                        </div>
                    })}
                </div>
            </div>
            
            <div className='admin_dashboard'>

                <h4 className='admin_heading'>Dashboard Overview</h4>

                <div id='dashboard_container'>

                    {activepanel==='Dashboard' && <Dashboard />}
                    {activepanel==='Students' && <Students />}
                    {activepanel==='Faculty' && <Faculty />}
                    {activepanel==='Events' && <Event />}
            
                </div>

            </div>
            
        </div>
    </div>
  )
}

export default Admin