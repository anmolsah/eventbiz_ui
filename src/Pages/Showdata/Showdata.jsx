import React, { useContext } from 'react';
import './Showdata.css';
import { Context } from '../../ContextProvider/ContextProvider';

const Showdata = () => {
    const {events,setEvents}=useContext(Context);
    const {studentsList, setStudentsList} = useContext(Context);
    const branches=['Mechanical','Civil','Electrical','AI/ML','Computer science','Information Technology'];
    const {registerdata,setRegisterdata}=useContext(Context);

    console.log(registerdata)

   
  return (
    <div style={{padding:'10px 20px'}}>
        <h4>Students that are registred for the events</h4>
        <div className='data_main'>

            <div>
                <select name="" id="">
                    <option value="">All</option>
                    {branches.map((branch)=>{
                        return <option value={branch}>{branch}</option>
                    })}
                </select>
            </div>
            <div>
                <select name="" id="">
                    <option value="">All</option>
                    {events.map((eve)=>{
                        return <option>{eve.name}</option>
                    })}
                </select>

            </div>

            <div>
                <button>search</button>
            </div>

        </div>
        <div>

            <table>
                <thead>
                    <tr>
                        <th>Roll number</th>
                        <th>Branch</th>
                        <th>email id</th>
                        <th>event name</th>
                    </tr>
                </thead>
                <tbody>
                    {registerdata.map((details)=>{
                        return <tr>
                            <td>{details.roll_no}</td>
                            <td>{details.branch}</td>
                            <td>{details.email}</td>
                            <td>{details.event}</td>
                        </tr>
                    })}
                </tbody>
            </table>

        </div>
    </div>
  )
}

export default Showdata