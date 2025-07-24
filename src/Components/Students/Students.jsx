import React, { useContext, useEffect, useRef, useState } from 'react'
import './Students.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faChildDress, faMagnifyingGlass, faPenToSquare, faPeopleRoof, faTrash } from '@fortawesome/free-solid-svg-icons'
import {Context} from '../../ContextProvider/ContextProvider'
import Addstudent from '../Addstudent/Addstudent'

const Students = () => {

    const {studentsList, setStudentsList} = useContext(Context);

    const [selectedstu,setSelectedstu]=useState(studentsList[0]);

    const [selectid,setSelectid]=useState(studentsList[0]?.id);

    const {showstuform,setShowstuform}=useContext(Context)

const subjects=['Mechanics','Thermodyanmics','Heat Transfer','Chemistry'];

async function deletestudent(id){

    try {
    // 🔥 Delete student from backend
    const delRes = await fetch(`https://eventbiz.up.railway.app/api/students/${id}`, {
      method: 'DELETE',
    });

    if (delRes.ok) {
      console.log(`Deleted student with ID: ${id}`);

      // 🔄 Fetch updated student list
      const getRes = await fetch('https://eventbiz.up.railway.app/api/students');
      const updatedList = await getRes.json();

      setStudentsList(updatedList); // ✨ Sync UI
    } else {
      console.error('Failed to delete student');
    }
  } catch (error) {
    console.error('Error deleting student:', error);
  }


}


useEffect(()=>{

    
    setSelectid(studentsList[0]?.id)
    setSelectedstu(studentsList[0]);

},studentsList)

  return (
    <div>
        <div className='form_adjust'>
        <div className='Add_student'>
                <h2 id='add_student'>Students DashBoard</h2>
                <button id='add_stu_btn' onClick={()=>setShowstuform(true)}>+ Add Student</button>
        </div>

        <div className='student_con'>

        

            
           
            <div className='student_left'>
                <div className='stu_input'><input id='stu_inp' type="text" placeholder='search student here' /></div>
                <div className='stu_list_items'>
                    {studentsList?.map((stu,i)=>{
                        return <div key={stu.id} onClick={()=>{setSelectedstu(stu);setSelectid(stu.id)}} className='stu_list_item'

                        style={{background: selectid===stu.id?'rgba(197, 197, 228, 1)':'white',cursor:'pointer'}}
                        >
                            <p>{i+1}</p>
                            <div>
                                <p id='stu_name_item' style={{color:'rgb(100, 100, 247'}}>{stu.name}</p>
                                <p id='course_name'>{stu.course}</p>

                            </div>
                            
                            <div className='stu_icons'>
                                <FontAwesomeIcon icon={faPenToSquare} style={{color:'rgb(100, 100, 247',cursor:'pointer'}}/>
                                <FontAwesomeIcon onClick={()=>{deletestudent(stu._id)}} id='btn_delete_dash' icon={faTrash} />
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div className='student_right'>

                <div className='stu_img_con'>
                    <FontAwesomeIcon id='stu_img' icon={faChildDress}/>
                    <div className='stu_dets_main'>
                        <p id='stu_name_item'>{selectedstu?.name}</p>
                        <p id='course_name'>Course: {selectedstu?.course}</p>
                        <h5>Student Id: {selectedstu?.stu_id}</h5>
                    </div>
                    </div>
                <div>
                    
                    
                    <p>Gender: <em>{selectedstu?.gender}</em></p>
                    
                   
                    <p id='course_name'>currently Pursuing: Semester {selectedstu?.semester}</p>
                    <div>
                        <div className='prec_list'>
                            <p id='perc_tag'>CGPA Percentage <strong>{selectedstu?.cgpa}</strong></p>
                        <p id='perc_tag'>Attendance Percentage <strong>{selectedstu?.attendance}</strong></p>

                        </div>
                        
                        <div className='subject_con'>
                            <h2 id='add_student'>Subjects <FontAwesomeIcon id='family_icon' icon={faBook} /></h2>
                            <div className='subject_list'>
                                {subjects.map((sub,i)=>{
                                    return <p className='sub_item' key={i}>
                                        {sub}
                                    </p>
                                })}
                            </div>
                        </div>
                        <div className='subject_con'>
                            <h2 id='add_student'>Parents details
                                <span><FontAwesomeIcon id='family_icon' icon={faPeopleRoof}/></span>
                            </h2>
                            <div className='stu_dets_list'>
                            <p>Father: <em id='course_name'>{selectedstu?.father_name}</em> </p>
                            <p>Mother: <em id='course_name'>{selectedstu?.mother_name}</em> </p>
                            <p>Emergency Contact Number: <strong>{selectedstu?.emergency_contact}</strong></p>

                            </div>
                            
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </div>
        <div className='student_form'style={{display:showstuform?'block':'none'}}>
            <Addstudent />
        </div>
        
    </div>
  )
}

export default Students