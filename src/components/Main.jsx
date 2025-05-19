import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Context } from '../context/context'


const Main = () => {


  // useEffect(() => {
  //   console.log(apiKey);
  // }, [])


  const { onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input
  } = useContext(Context)

  // useEffect(()=> {
  //   onSent("what is react js")
  // },[])


  return (
    <div className='flex-1 min-h-[100vh] pb-[15vh] relative'>
      {/* nav */}
      <div className='flex items-center justify-between text-2xl p-5 text-[#585858]'>
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user" className='w-10 rounded-full' />
      </div>
      {/* Main container */}
      <div className='max-w-[900px] m-auto'>

        {!showResult ?
          <>
            <div className='my-10 text-5xl text-[#c4c7c5] font-medium p-5'>
              <p><span className='title-span'>Hello,Dev.</span></p>
              <p>How I can help you today?</p>
            </div>
            {/* cards */}
            <div className='grid cards'>
              {/* card */}
              <div className='card'>
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>

              {/* card */}
              <div className='card'>
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>

              {/* card */}
              <div className='card'>
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>

              {/* card */}
              <div className='card'>
                <p>Tell me about React js and React native</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
          :
          // Result
          <div className='result'>
            <div className='my-10 flex items-center gap-5'>
              <img src={assets.user_icon} alt="" className='w-10 rounded-full' />
              <p>{recentPrompt}</p>
            </div>

            {/* Result Data */}
            <div className='flex items-start gap-5'>
              <img src={assets.gemini_icon} alt="" className='w-12' />
              {loading ?
                <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div> :
                <p className='text-xl font-light '
                  dangerouslySetInnerHTML={{ __html: resultData }}></p>}
            </div>
          </div>

        }



        {/* Main Bottom */}
        <div className='absolute bottom-0 w-full max-w-[900px] py-0 px-5 m-auto'>
          {/* Search Box */}
          <div className='search-box'>
            <input type="text"
              placeholder='Enter a prompt here'
              className='flex-1 bg-transparent outline-0 p-2 text-xl max-md:flex-none w-40'
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <div className='flex gap-3.5 items-center'>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input
                ? <img src={assets.send_icon} alt=""
                  onClick={() => onSent(input)}
                /> : null
              }
            </div>
          </div>
          {/* Bottom Info */}
          <p className='text-sm my-3.5 mx-auto text-center font-light'>
            Gemini may display inaccurate
            info, including about people,
            so double-check its responses.
            Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main