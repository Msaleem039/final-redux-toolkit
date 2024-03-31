import React, { useState } from 'react'
import data from '../data';

const About = () => {
  const [search , setSearch]=useState();
  return (
    <div>
    
    <div><input type='text' onChange={(e)=>setSearch(e.target.value)} placeholder='add tittle'/></div>
    {data.filter((x)=>{
      if(x == " "){
        return x
      }else if(x.title.toLowerCase().includes(search))
      {
        return x
      }
    }).map((x)=>{
      return(
        <div className='col-lg-3 my-2'>
        <div className="card" style={{width: '18rem'}}>
        <img src={x.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{x.title}</h5>
          <p className="card-text">{x.description.slice(0,50)}...</p>
        </div>
        </div>
        </div>
      )
    })}
    </div>
  )
}

export default About