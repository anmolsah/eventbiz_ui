import React, { useContext ,useEffect, useRef} from 'react'
import './Addstudent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import {Context} from '../../ContextProvider/ContextProvider';

const Addstudent = () => {

    const semesters=[1,2,3,4,5,6,7,8];
     const {showstuform,setShowstuform}=useContext(Context);
     const {studentsList, setStudentsList} = useContext(Context);

    const course=['Civil','Mechanical','Computer Science','Electrical','Electronics','AI/ML'];
    const roll_no=useRef('')
    const inp_name=useRef('');
    const inp_father=useRef('');
    const inp_mother=useRef('');
    const inp_gender=useRef('');
    const inp_dob=useRef('');
    const inp_contact=useRef('');
    const inp_cgpa=useRef('');
    const inp_attendance=useRef('');
    const inp_course=useRef('');
    const inp_sem=useRef('');

useEffect(() => {
  const handleEsc = (event) => {
    if (event.key === 'Escape') {
      setShowstuform(false); // 👈 Replace with your own close handler
    }
  };

  window.addEventListener('keydown', handleEsc);

  return () => {
    window.removeEventListener('keydown', handleEsc);
  };
}, [setShowstuform]);

async function  submitstudent(e){
      e.preventDefault();

    const newdata={
    stu_id: roll_no.current.value,
    name:inp_name.current.value,
    father_name:inp_father.current.value,
    mother_name:inp_mother.current.value,
    gender:inp_gender.current.value,
    dob:inp_dob.current.value,
    emergency_contact:inp_contact.current.value,
    semester:inp_sem.current.value,
    course:inp_course.current.value,
    cgpa:inp_cgpa.current.value,
    attendance:inp_attendance.current.value,  
    }

    console.log(newdata);

    try {
    const response = await fetch('https://eventbiz.up.railway.app/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newdata),
    });

    // const result = await response.json();
    // console.log('Success:', result);

     if (response.ok) {
      // ✅ Once student is added, fetch updated list
      const getRes = await fetch('https://eventbiz.up.railway.app/api/students');
      const updatedList = await getRes.json();
      setStudentsList(updatedList); // ← updates state in UI
    }


    // Optional: Clear form or show a success message
  } catch (error) {
    console.error('Error:', error);
  }




     inp_name.current.value=''
     inp_father.current.value=''
     inp_mother.current.value=''
     inp_gender.current.value=''
     inp_dob.current.value=''
     inp_contact.current.value=''
     inp_cgpa.current.value=''
     inp_attendance.current.value=''
     inp_course.current.value=''
     inp_sem.current.value=''
     roll_no.current.value=''

     setShowstuform(false)


      console.log(inp_dob.current.value)

}




  return (
    <div className='stu_form'>
        <div className='stu_form_con'>
            <p id='cross_icon' onClick={()=>setShowstuform(false)}><FontAwesomeIcon  icon={faXmark}/></p>
            <form onSubmit={submitstudent}>
              <div className='name_form'>
                <label htmlFor="">Roll Number</label>
                <input type="text" ref={roll_no} />
              </div>
                <div className='name_form'>
                    <label htmlFor="">Full Name</label>
                    <input type="text" ref={inp_name} />
                </div>
                <div className='parents_con'>
                    <div className='name_form'>
                        <label htmlFor="">Father's Name</label>
                        <input type="text" ref={inp_father} />
                     </div>
                    <div className='name_form'>
                         <label htmlFor="">Mother's Name</label>
                         <input type="text" ref={inp_mother} />
                    </div>
                </div>
                <div className='parents_con'>
                    <div className='name_form'><label htmlFor="">Gender</label><select ref={inp_gender} name="" id="">
                        <option value="female">FEMALE</option>
                        <option value="male">MALE</option>
                        </select>
                    </div>

                    <div className='name_form'>
                    <label htmlFor="">Date of birth</label>
                    <input type="date" name="" id="" ref={inp_dob}/>
                </div>

                     


                </div>

                <div className='name_form'>
                       <label htmlFor="">Emergency Contact Number</label>
                       <input type="number" ref={inp_contact}/>
                      </div>
                
               
                

                <div className='parents_con'>
                    <div className='name_form'>
                    
                    <label htmlFor="">Semester Details</label>

                      <select name="" id="" ref={inp_sem}>
                        {semesters.map((sem,i)=>{
                        return <option value={sem}>
                           Semester {sem}
                        </option>
                    })}

                      </select>
                     </div>
                     <div className='name_form'>
                        <label htmlFor="">Course Details</label>
                      <select name="" id="" ref={inp_course}>
                        {course.map((course,i)=>{
                            return <option value={course}>{course} Engineering</option>
                        })}
                      </select>
                     </div>

                </div>
                
                <div className='parents_con'>
                     <div className='name_form'>
                        <label htmlFor="">CGPA Percentage</label>
                        <input type="number" ref={inp_cgpa} />
                    </div>
                     <div className='name_form'>
                        <label htmlFor="">Attendance Percentage</label>
                        <input type="number" ref={inp_attendance}/>
                   </div>

                </div>

               
                <div className='button_submit'>

                    <button id='stu_submit' type="submit">Submit</button>

                </div>

                

            </form>
        </div>
    </div>
  )
}

export default Addstudent