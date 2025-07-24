import React, { useContext, useEffect, useRef } from 'react'
import './Addfaculty.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import {Context} from '../../ContextProvider/ContextProvider'
 

const Addfaculty = () => {
    const fac_name=useRef('');
    const fac_College=useRef('');
    const fac_role=useRef('');
    const fac_sub=useRef('');
    const fac_qualif=useRef('');
    const fac_contact=useRef('');
    const fac_doj=useRef('');
    const fac_id=useRef('')

     const {facultyList,setFacultyList}=useContext(Context);
     const {showfacform,setShowfacform}=useContext(Context);
     useEffect(() => {
       const handleEsc = (event) => {
         if (event.key === 'Escape') {
           setShowfacform(false); // 👈 Replace with your own close handler
         }
       };
     
       window.addEventListener('keydown', handleEsc);
     
       return () => {
         window.removeEventListener('keydown', handleEsc);
       };
     }, []);

    async function submitfacultyform(e){
        e.preventDefault();

        const newdata={
    faculty_id: fac_id.current.value,
    faculty_name: fac_name.current.value,
    role: fac_role.current.value,
    subject: fac_sub.current.value,
    qualification: fac_qualif.current.value,
    college: fac_College.current.value,
    emergency_contact: fac_contact.current.value,
    date_of_joining: fac_doj.current.value
        }

        console.log(newdata)

        try{
            const response=await fetch('https://eventbiz.up.railway.app/api/faculty',{
                method:'POST',
                headers:{
                     'Content-Type': 'application/json',
                },
                body:JSON.stringify(newdata)
            })

            if(response.ok){
                const getfac=await fetch('https://eventbiz.up.railway.app/api/faculty');
                const getfac_res=await getfac.json();
                setFacultyList(getfac_res);
            }

        }catch(error){
             console.error('Error:', error);
        }



        fac_name.current.value=''
        fac_role.current.value=''
        fac_sub.current.value=''
        fac_qualif.current.value=''
        fac_College.current.value=''
        fac_contact.current.value=''
        fac_doj.current.value=''
        fac_id.current.value=''

        setShowfacform(false)
     }
  return (
    <div className='main_form_con'>
        <div className='form_main'>

       
        <div className=''>
            <p onClick={()=>{setShowfacform(false)}}><FontAwesomeIcon icon={faXmark} style={{float:'right',cursor:'pointer'}}/></p>
            <form  onSubmit={submitfacultyform}>
                
                <div className='form_container'>
                    <div className='flex_col'>
                         <label htmlFor="">Faculty id</label>
                        <input type="text" ref={fac_id}/>
                    </div>
                    <div className='flex_col'>
                        <label htmlFor="">Full Name</label>
                        <input type="text" ref={fac_name}/>
                    </div>
                    <div className='flex_col'>
                        <label htmlFor="">College</label>
                        <input type="text" ref={fac_College}/>
                    </div>
                    <div className='flex_col'>
                        <label htmlFor="">Subject</label>
                        <select name="" id="" ref={fac_sub}>
                            <option value="Maths">Maths</option>
                            <option value="Physics">Physcis</option>
                        </select>
                    </div>
                    <div className='flex_col'>
                        <label htmlFor="">Role</label>
                        <select name="" id="" ref={fac_role}> 
                            <option value="Professor">Professor</option>
                            <option value="HOD">HOD</option>
                        </select>
                    </div>
                     <div className='flex_col'>
                        <label htmlFor="">Date of Joining</label>
                        <input type="date" name="" id="" ref={fac_doj}/>
                    </div>
                    <div className='flex_col'>
                        <label htmlFor="">Highest Qualifiaction</label>
                        <select name="" id="" ref={fac_qualif}>
                            <option value="PHD">PHD</option>
                            <option value="M.Tech">M.Tech</option>
                        </select>

                    </div>
                    <div className='flex_col'>
                        <label htmlFor="">Emergency Contact Number</label>
                        <input type="number" ref={fac_contact}/>
                    </div>
                </div>
                 <div className='button_submit'>

                    <button id='stu_submit' type="submit">Submit</button>

                </div>
            </form>
        </div>
         </div>
    </div>
  )
}

export default Addfaculty