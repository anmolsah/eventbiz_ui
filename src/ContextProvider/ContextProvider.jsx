import React, { useEffect, useState } from "react";


export const Context=React.createContext();



const ContextProvider=(props)=>{
    const [showstuform,setShowstuform]=useState(false);
    const [showfacform,setShowfacform]=useState(false);
     const [showeveform,setShoweveform]=useState(false);
    const [studentsList, setStudentsList] = useState([]);
    const [facultyList,setFacultyList]=useState([]);
    const [events,setEvents] = useState( []);
    const [registerdata,setRegisterdata]=useState([])

  useEffect(() => {
  const fetchStudents = async () => {
    try {
      const getRes = await fetch('https://eventbiz.up.railway.app/api/students');
      const updatedList = await getRes.json();
      setStudentsList(updatedList);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  }

  const fetchFaculty=async()=>{
    try{
      const getres=await fetch('https://eventbiz.up.railway.app/api/faculty')
      const updatedlist=await getres.json();
      setFacultyList(updatedlist)
    }catch(error){
      console.error('Failed to fetch Faculty:', error);
    }
  }

  const fetchevents=async()=>{
    try{
      const getres=await fetch('https://eventbiz.up.railway.app/api/events');
      const resdata=await getres.json();
      setEvents(resdata)

    }catch(err){
      console.log('failing to fetch events',err)
    }
  }

  const fetchregisterdata=async()=>{
    try{
      const data=await fetch('https://eventbiz.up.railway.app/api/register')
    const resdata=await data.json();
    setRegisterdata(resdata);

    }catch (err){
      console.log('failing to fetch register data',err)
    }
    
  }

  fetchStudents();
  fetchFaculty();
  fetchevents();
  fetchregisterdata()
}, []);







  //rendenring
    return (
    <Context.Provider value={{ studentsList, setStudentsList,facultyList,setFacultyList,setEvents,events,showstuform,setShowstuform,setShowfacform,showfacform,setShoweveform,showeveform,registerdata,setRegisterdata }}>
      {props.children}
    </Context.Provider>
  );

}

export default ContextProvider;

