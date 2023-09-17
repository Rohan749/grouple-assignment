import React, { useEffect } from 'react'
import { urlIconCreator } from '../services/services'
import { UilArrowUp, UilArrowDown } from "@iconscout/react-unicons"
import AOS from 'aos';
import 'aos/dist/aos.css';

const Forcast = ({weather: {title, list, icon, tempFormat}}) => {

    useEffect(() => {
        AOS.init();
      }, [])

  return (
    <div data-aos="fade-down" data-aos-anchor-placement="top-bottom">
        <div className='flex items-center justify-start mt-6'>
            <p className='text-white font-medium uppercase'>
                title
            </p>
        </div>
        <hr className='my-2'/>

        <div className='flex flex-row items-center justify-between md:justify-evenly text-white'>
            {list.map((item) => (
            <div key={Math.random()} className='flex flex-col items-center justify-center'>
            <p className='font-light text-sm'>
                {item.title}
            </p>
            <img src={urlIconCreator(item.icon)} className='w-12 my-1' alt='icon'/>
            <p className='font-medium'>{`${item.temp}`}&deg;{`${tempFormat}`}</p>
            <div className='md:flex items-center'>
            <div className='flex items-center'>
            <UilArrowUp className="text-xs"/>
            <div className='text-xs'>{`${item.min_temp.toFixed()}`}&deg;{`${tempFormat}`}</div>
            </div>
            <p className='md:pl-1 md:block hidden'>|</p>
            <div className='flex items-center'>
            <UilArrowDown />
            <div className='text-xs'>{`${item.max_temp.toFixed()}`}&deg;{`${tempFormat}`}</div>
            </div>
            </div>

        </div>
            ))}        
        </div>
    </div>
  )
}

export default Forcast