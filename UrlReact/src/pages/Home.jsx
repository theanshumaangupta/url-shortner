import React, { useState } from 'react'
import { Link, useParams }from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
function Home() {
    const {slug} = useParams()
    const [response, setResponse] = useState();
    const [Loading, setLoading] = useState(true); 
    const [thetoken, setthetoken] = useState("");
    const [inputValue, setinputValue] = useState("");


    function createToken(givenUrl){

        let a = {
            url : givenUrl
        } 
        axios.post('https://url-shortner-0f1f.onrender.com/',a).then(res=>(setthetoken(res.data)))
        setinputValue("") 
      
    }

    // sending slug token and getting the original url and saving it into response variable
    useEffect(() => {
        if (slug) {    
            axios.get(`https://url-shortner-0f1f.onrender.com/?key=${slug}`).then((res)=>(res.data)).then(data => {
                setResponse(data)
                setLoading(false)
            })
        }
    }, []);
    
    // if there is no token show the awesome home page .....else redirect to url  
    if(!slug){
        return (
          <section className='w-screen h-screen bg-gray-900 flex items-center justify-center'>
              <div className='w-[30rem] h-[23rem] bg-gray-800 text-gray-100 rounded-lg border-2 border-white-800 p-[2rem] flex flex-col justify-between'>
                  <div className='w-full'>
                      <h1 className='text-4xl font-bold text-white-800 mb-4'>URL Shortener</h1>
                      <p>Enter a long to get shortened version</p>
                  </div>
                  <div className=' w-full'>
                      <p>Long URL</p>
                      
                      <input type="text" className='w-full h-[3rem] my-4 text-black outline-none px-3'  onChange={(e)=>setinputValue(e.target.value)} value={inputValue}/>
                      
                      <button className='w-full p-[1rem] border-2 border-white' onClick={()=>createToken(inputValue)} >Generate Link</button>
                      
                  </div>
                  <div>{thetoken && <p>Your ShortenURL&nbsp;&nbsp;&nbsp;{thetoken}</p> }</div>
              </div>
          </section>
        )
    }

    // redirecting to url
    else{
        if (Loading) {
            return <h1>Loading...</h1>
        }
    return window.location.href = response.url
    }


}

export default Home;