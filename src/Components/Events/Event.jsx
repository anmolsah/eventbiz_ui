import React, { useContext,useEffect, useRef, useState } from 'react'
import './Event.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faClock, faPenToSquare, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import {Context} from '../../ContextProvider/ContextProvider'

const Event = () => {

  const eve_name=useRef('');
  const eve_desc=useRef('');
  const eve_date=useRef('');
  const eve_id=useRef('');

  const {events,setEvents}=useContext(Context);
  const {showeveform,setShoweveform}=useContext(Context);

  const statusColor = {
  completed: 'red',
  ongoing: 'rgb(3, 166, 68)',
  upcoming: 'rgba(169, 39, 230, 1)'
};

console.log(events.length);

const [pageid,setPageid]=useState(0);
const noofdivs=6;

const noofpages=Math.floor(events.length/noofdivs);
const data=events.slice(0,noofdivs);
const [reseve,setReseve]=useState(data);
console.log(reseve)

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
  const startIndex = pageid * noofdivs;
  const sliced = events.slice(startIndex, startIndex + noofdivs);
  setReseve(sliced);
}, [pageid, events]); // ⬅️ important: include events

console.log(reseve)

async function deleteEvent(id){
 try{

  const deletedata=await fetch(`https://eventbiz.up.railway.app/api/events/${id}`,{
    method:'DELETE'
  })

  if(deletedata.ok){
    console.log('data deleted succesfully')
    const fetchdata=await fetch('https://eventbiz.up.railway.app/api/events');
    const data=await fetchdata.json();
    setEvents(data)
  }
  else{
    console.log('unable to delete the data')
  }

 }catch(err){
  console.log('unable to delete the data')
 }
}

useEffect(() => {
  const handleEsc = (event) => {
    if (event.key === 'Escape') {
      setShoweveform(false); // 👈 Replace with your own close handler
    }
  };

  window.addEventListener('keydown', handleEsc);

  return () => {
    window.removeEventListener('keydown', handleEsc);
  };
}, []);

async function eventformsubmit(e){
  e.preventDefault();

  const newdata={
    id:eve_id.current.value,
    name:eve_name.current.value,
    desc:eve_desc.current.value,
    status:'upcoming',
    date:eve_date.current.value,
  }

  try{

    const addeventtodb=await fetch('https://eventbiz.up.railway.app/api/events',{
      method:'POST',
      headers:{
                     'Content-Type': 'application/json',
                },
      body:JSON.stringify(newdata)
    })

    if(addeventtodb.ok){
      const getevent=await fetch('https://eventbiz.up.railway.app/api/events');
      const resevent=await getevent.json();
      setEvents(resevent);
    }


  }catch(err){
    console.log('unable to add the event')
  }

  eve_name.current.value='';
  eve_desc.current.value='';
  eve_date.current.value='';
  eve_id.current.value='';

  setShoweveform(false)


}
 

  return (
    <div>
      <div className='form_adjust'>

      
        <div className='add_event'>
                <h2 id='add_event'>Events DashBoard</h2>
                <button id='add_eve_btn'onClick={()=>{setShoweveform(true)}} >+ Add Event</button>
        </div>
        <div>
            <div className='event_grid'>
                {reseve.map((event,i)=>{
                    return <div key={i} className='grid_item'>
                        <div className='event_status'>
                            <p id='event_status_id' style={{background:`${statusColor[event.status]}`}}>{event.status}</p>
                            <p className='stu_icons'><FontAwesomeIcon style={{color:'rgb(100, 100, 247',cursor:'pointer'}} icon={faPenToSquare} /><FontAwesomeIcon onClick={()=>deleteEvent(event._id)} id='btn_delete_dash' icon={faTrash} /></p>
                        </div>
                        <div>
                            <h4>{event.name}</h4>
                            <p id='event_desc_id'>{event.desc}</p>
                            <p className='icon_event'><FontAwesomeIcon id='date_data' icon={faCalendarDays}/>{event.date}</p>
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

        </div>
        <div className='student_form'style={{display:showeveform?'block':'none'}}>
          <div className='event_form_main'>
            <div className='event_form_com'>
                <p onClick={()=>{setShoweveform(false)}} ><FontAwesomeIcon icon={faXmark} style={{float:'right',color:'white',cursor:'pointer'}} /></p>
                <form onSubmit={eventformsubmit}>

                  <div className='name_form'>
                    <label htmlFor="">Event id</label>
                    <input type="text" ref={eve_id}/>
                  </div>

                    <div className='name_form'>
                        <label htmlFor="">Event Name</label>
                        <input type="text" ref={eve_name}/>
                    </div>

                    <div className='name_form'>
                        <label htmlFor="">Event Overview</label>
                        <textarea name="" id="" ref={eve_desc}></textarea>
                    </div>
                    <div className='name_form'>
                        <label htmlFor="">Date</label>
                        <input type="date" ref={eve_date} />
                    </div>

                    <div className='button_submit'>
                        <button id='event_submit'>Submit</button>
                    </div>

                </form>

            </div>
            
        </div>

        </div>
        
    </div>
  )
}

export default Event