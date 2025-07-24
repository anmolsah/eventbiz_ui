import React, { useContext, useState,useEffect, useRef } from 'react';
import { Context } from '../../ContextProvider/ContextProvider';
import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark,faClock,faCalendarDays, faChartLine, faBars,faPenToSquare } from '@fortawesome/free-solid-svg-icons';


const Home = () => {

  const [data,setdata]=useState('true');
  const {events,setEvents}=useContext(Context);
  const {studentsList, setStudentsList} = useContext(Context);
   const branches=['Mechanical','Civil','Electrical','AI/ML','Computer science','Information Technology'];
   const {registerdata,setRegisterdata}=useContext(Context);

  const [visible,setVisible]=useState(false);

  const [displayform,setDisplayform]=useState(true)

  const reg_roll=useRef('');
  const reg_branch=useRef('');
  const reg_emailid=useRef('');
  const reg_event=useRef('');


  const [pageid,setPageid]=useState(0);
  
  const noofdivs=3;
  
  const noofpages=Math.ceil(events.length / noofdivs)-1;
  const data_new=events.slice(0,noofdivs);
  const [reseve,setReseve]=useState(data_new);
  
  function decrease(){
    if(pageid>0){
      setPageid(pageid-1);
    }
  }
  
  function increase(){
    if(pageid<noofpages){
      setPageid(pageid+1)
    }
  }
  useEffect(() => {
  if (events.length > 0) {
    const startIndex = pageid * noofdivs;
    const sliced = events.slice(startIndex, startIndex + noofdivs);
    setReseve(sliced);
  }
}, [events, pageid]);



  const statusColor = {
  completed: 'red',
  ongoing: 'rgb(3, 166, 68)',
  upcoming: 'rgba(169, 39, 230, 1)'
};

 async function  submitform(){

    const datanew={
      roll_no:reg_roll.current.value,
      branch:reg_branch.current.value,
      event:reg_event.current.value,
      email:reg_emailid.current.value
    }

    console.log(datanew)

    try{

      const datareg=await fetch('https://eventbiz.up.railway.app/api/register',{
        method:'POST',
         headers:{
                     'Content-Type': 'application/json',
                },
                body:JSON.stringify(datanew)
      })

      console.log(datareg)
      if(datareg.ok){
        const newdatareg=await fetch('https://eventbiz.up.railway.app/api/register');
        const res=await newdatareg.json()
        setRegisterdata(res);
        
      }

      


      reg_roll.current.value=''
      reg_branch.current.value=''
      reg_event.current.value=''
      reg_emailid.current.value=''


    }catch(err){
      console.log('unable to submit the data',err);
    }

    setVisible(true)
    setTimeout(()=>{

      setVisible(false)
      
    },1000)

  }

  

  return <div>

    <div className={data?'pageup':'pagedown'}>

      <img className='main_image' src='https://rare-gallery.com/uploads/posts/519127-academic-baltimore.jpg' style={{width:'100vw',height:'100vh'}} alt="" />
      <button className='main_button' onClick={()=>{setdata(!data)}}>Explore the Events <FontAwesomeIcon icon={faChartLine} /> </button>

    </div>

    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px 30px'}}>
      <h1>Welecome to EventBizz</h1>
      <FontAwesomeIcon onClick={()=>setDisplayform(false)} style={{fontSize:'25px',cursor:'pointer',display: displayform ? 'block' : 'none'}} icon={faBars} />
    </div>

    <div style={{display:'flex'}}>
      <img id='main_image_home' style={{ display: displayform ? 'block' : 'none' }} src="https://img.freepik.com/premium-vector/back-views-people-sitting-together-outside-people-sitting-relax-park_726330-225.jpg" alt="" srcset="" />
      <div>
        <div style={{marginBottom:'15px'}}>
          <input type="text" placeholder='Search your event here'  />
          
        </div>
      <div className='event_grid_home'>
                      {reseve.map((event,i)=>{
                          return <div key={i} className='grid_item_home'>
                              <div className='event_status_home'>
                                  <p id='event_status_id_home' style={{background:`${statusColor[event.status]}`}}>{event.status}</p>
                              </div>
                              <div>
                                  <h4>{event.name}</h4>
                                  <p id='event_desc_home'>{event.desc}</p>
                                  <p className='icon_event'><FontAwesomeIcon id='date_data' icon={faCalendarDays}/>{event.date}</p>
                              </div>
                              <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px',marginBottom:'20px'}}>
                                <button id='home_join_btn'>JOIN NOW</button>
                              </div>
                          </div>
                      })}
        </div>
          <div className='pagnination_sec'>

                <div className='pagin_sec'>
                <button id='page_btn' onClick={decrease}>PREV</button>
                <p id='pagination_num'>{pageid}</p>
                <button id='page_btn' onClick={increase}>NEXT</button>
            </div>

            </div>
        </div>
        <div style={{ display: displayform ? 'none' : 'block' }} className='Home_page_form'>

      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px'}}><h3>Registration Form</h3>
      <FontAwesomeIcon onClick={()=>setDisplayform(true)} style={{fontSize:'20px',cursor:'pointer', display: displayform ? 'none' : 'block'}} icon={faXmark} />
      </div>

      <div className='flex_input'>
        <label htmlFor="">Roll No.</label>
        <select name="" id="" ref={reg_roll}>
          <option value="">Select your id</option>
          {studentsList.map((stu,i)=>{
            return <option key={i} value={stu.stu_id}>{stu.stu_id}</option>
          })}
        </select>
      </div>

      <div className='flex_input'>
        <label htmlFor="">Branch</label>
        <select name="" id="" ref={reg_branch}>
          {branches.map((branch)=>{
            return <option value={branch}>{branch}</option>
          })}
        </select>
      </div>

      <div className='flex_input'>
        <label htmlFor="">Email Id</label>
        <input type="email" ref={reg_emailid} />
      </div>

      <div className='flex_input'>
        <label htmlFor="">Select your Event</label>
        <select name="" id="" ref={reg_event}>
          {events.map((e)=>{
            return <option value={e.name}>{e.name}</option>
          })}
        </select>
      </div>

      <div className='home_submit'>
        <button onClick={submitform}>SUBMIT</button>
      </div>

      {visible && (

        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}><p>Your form is submitted succesfully</p> </div>

      )}

      

    </div>
      </div>
    </div>

    

}

export default Home