import React, { useContext, useEffect, useState } from 'react'
import './Faculty.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faPersonChalkboard,faGraduationCap,faPhoneVolume, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import {Context} from '../../ContextProvider/ContextProvider'
import Addfaculty from '../Addfaculty/Addfaculty'
export const Faculty = () => {
    const {facultyList,setFacultyList}=useContext(Context);
    const [facultydata,setFacultydata]=useState(facultyList[0]);
    const [facultyid,setFacultyid]=useState(facultyList[0]?.faculty_id);

     const {showfacform,setShowfacform}=useContext(Context);

     

   async function deletfaculty(id){

    try{
        const deletefac=await fetch(`https://eventbiz.up.railway.app/api/faculty/${id}`,{
            method:'DELETE'
        });
        if(deletefac.ok){
             console.log(`Deleted faculty with ID: ${id}`);
             const getdata=await fetch('https://eventbiz.up.railway.app/api/faculty');
             const resdata=await getdata.json();
             setFacultyList(resdata)
        }else{
            console.log('failed to delete')
        }




    }catch(error){
        console.log(error)
    }

        

    }
    useEffect(()=>{

        setFacultyid(facultyList[0]?.faculty_id);
        setFacultydata(facultyList[0])


    },[facultyList])
  return (
    <div>
        <div className='form_adjust'>

        
       <div className='add_faculty'>
                <h2 id='add_faculty'>Faculty DashBoard</h2>
                <button id='add_fac_btn' onClick={()=>setShowfacform(true)}>+ Add Faculty</button>
        </div>
        <div className='faculty_con'>
            <div className='faculty_left'>
                <div className='stu_input'><input id='stu_inp' type="text" placeholder='search faculty here' /></div>
                <div className='fac_sec_list_datas'>
                    {facultyList?.map((fac,i)=>{
                        return <div className='fac_sec_list_data' onClick={()=>{setFacultydata(fac);setFacultyid(fac?.faculty_id)}} 
                        style={{background: facultyid===fac?.faculty_id ? 'rgb(14, 209, 46)': 'white', color: facultyid===fac?.faculty_id? 'white':'black'}}
                         key={i}>
                            <p>{fac?.faculty_id}</p>
                            <div>
                                <p>{fac?.faculty_name}</p>
                                <p>{fac?.role}-{fac?.subject}</p>
                            </div>
                            <div className='stu_icons'>
                                <FontAwesomeIcon icon={faPenToSquare} />
                                <FontAwesomeIcon onClick={()=>{
                                    deletfaculty(fac?._id)
                                }} icon={faTrash} />

                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div className='faculty_right'>
                <div className='faculty_nav'>
                    <FontAwesomeIcon id='fac_icon_id' icon={faPersonChalkboard} />
                    <div className='fac_main_dets'>
                        <p id='fac_nav_name'>{facultydata?.faculty_name}</p>
                        <p id='fac_nav_role'>Role: {facultydata?.role}</p>
                        <p>Faculty Id: <strong id='fac_id'>{facultydata?.faculty_id}</strong></p>
                    </div>
                </div>
                <div className='faculty_sec'>

                    <p><FontAwesomeIcon id='fac_icons_data' icon={faCalendar} />Date of Joining <span>{facultydata?.date_of_joining}</span></p>
                    <p><span>3</span> Years of Experience</p>

                    <p style={{color:'green',fontWeight:'700'}}><FontAwesomeIcon id='fac_icons_data' icon={faGraduationCap} />{facultydata?.qualification} at {facultydata?.college} </p>

                    <p>Specialisation: <span>{facultydata?.subject}</span></p>

                    <p><FontAwesomeIcon id='fac_icons_data' icon={faPhoneVolume} />Emergency Contact Number <span>{facultydata?.emergency_contact}</span></p>

                </div>
            </div>
        </div>
        </div>
        <div className='student_form' style={{display:showfacform?'block':'none'}}>
            <Addfaculty  />
        </div>
    </div>
  )
}
