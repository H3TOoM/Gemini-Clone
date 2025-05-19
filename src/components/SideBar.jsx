import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Context } from '../context/context';

const SideBar = () => {

    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context)

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }


    return (
        <div className='min-h-[100vh] inline-flex flex-col justify-between bg-[#f0f4f9] px-6 py-3.5 sidebar'>
            {/* top */}
            <div>
                <img
                    src={assets.menu_icon}
                    alt="menu"
                    className='block ml-2.5 cursor-pointer'
                    onClick={() => setExtended(prev => !prev)}
                />
                {/* New Chat */}
                <div 
                className='mt-10 inline-flex items-center gap-2.5 px-3 py-2 bg-[#e6eaf1] text-lg text-gray-600 cursor-pointer rounded-full hover:opacity-[.7]'
                onClick={()=> newChat()}
                >
                    <img src={assets.plus_icon} alt="plus-icon" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ? (
                    // Recent
                    <div className='flex flex-col'>
                        <p className='my-6'>Recent</p>
                        {prevPrompts.map((item, index) => (
                            <div className='recent-entry' onClick={() => loadPrompt(item)}>
                                <img src={assets.message_icon} alt="message-icon" />
                                <p>{item.slice(0, 18)} ...</p>
                            </div>
                        ))}
                    </div>
                ) : null
                }
            </div>
            {/* Bottom */}
            <div className='flex flex-col'>
                {/* Bottom Items */}
                <div className='recent-entry bottom-item'>
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>

                <div className='recent-entry bottom-item'>
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>

                <div className='recent-entry bottom-item'>
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Setting</p> : null}
                </div>
            </div>
        </div>
    )
}

export default SideBar