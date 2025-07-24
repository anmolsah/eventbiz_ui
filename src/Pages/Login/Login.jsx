import React from 'react'
import './Login.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser,faLaptop,faUserLock ,faGraduationCap} from
 '@fortawesome/free-solid-svg-icons'



const Login = () => {

  const role=[{

    id:0,
    role_name:'Student',
    icon:faUser,
    color:'rgb(84, 84, 244)'

  },{
     id:0,
    role_name:'Faculty',
    icon:faLaptop,
    color:'rgb(3, 166, 68)'

  },{
     id:2,
    role_name:'Admin',
    icon:faUserLock,
    color:'rgb(255, 1, 1)'

  }
] ;

console.log(role)
  return (
    <div className='main'>
        <div className='login_main'>
            <div className='login_container'>

                <div className='login_head'>
                    <FontAwesomeIcon icon={faGraduationCap} id='login_cap_icon' />
                     <h3 id='login_head_name'>EventBizz</h3>
                    <p id='login_head_para'>Event Management System</p>
                </div>

               

                <div>
                    <div className='input_dets'>
                        <label htmlFor="">Student Id</label>
                        <input type="text" placeholder='enter your id here' />
                    </div>

                    <div className='input_dets'>
                        <label htmlFor="">Password</label>
                        <input type="password" name="" id="" placeholder='enter your password'/>
                    </div>
                    

                    

                    <div className='select'>
                        <p id='login_select_name'>Select</p>
                        <div className='login_Select_icons'>
                        {role.map((role,index)=>{

                            

                            return <div className='login_select'>
                               <FontAwesomeIcon id='login_icon' icon={role.icon} style={{color:`${role.color}`}} />
                                <p style={{color:`${role.color}`}}>{role.role_name}</p>
                            </div>

                        })}
                        </div>
                    </div>
                    <button id='signin_btn'>Sign In</button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Login