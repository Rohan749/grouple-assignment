import React, { useEffect } from 'react'
import {
    UilArrowUp,
    UilArrowDown,
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset
} from "@iconscout/react-unicons"
import { formatToLocalTime, urlIconCreator } from '../services/services'
import AOS from 'aos';
import 'aos/dist/aos.css';

const TempAndDetails = ({weather: {
    details, icon, temp, temp_min, temp_max, tempFormat, sunrise, sunset, speed, humidity, feels_like, timezone
}}) => {

    useEffect(() => {
        AOS.init();
      }, [])

  return (
    <div data-aos="fade-up">
        <div className='flex items-center justify-center md:py-3 text-2xl text-cyan-300'>
            <p data-aos="fade-up">{details}</p>
        </div>
        <div className='flex sm:flex-row flex-col justify-between items-center text-white py-3'>
            <img src={urlIconCreator(icon)} alt='sun' className='w-20'/>
            <p className='text-5xl mb-4 sm:mb-0'>{`${temp}`}&deg;{`${tempFormat}`}</p>
            <div className='flex flex-col space-y-2'>
                <div className='flex items-center font-light text-sm justify-center'>
                    <UilTemperature size={18} className="mr-1"/>
                    Feels Like:
                    <span className='font-medium ml-1'>{`${feels_like.toFixed()}`}&deg;{`${tempFormat}`}</span>
                </div>

                <div className='flex items-center font-light text-sm justify-center'>
                    <UilTear size={18} className="mr-1"/>
                    Humidity:
                    <span className='font-medium ml-1'>{`${humidity.toFixed()}`}%</span>
                </div>
                <div className='flex items-center font-light text-sm justify-center'>
                    <UilWind size={18} className="mr-1"/>
                    Wind:
                    <span className='font-medium ml-1'>{`${speed.toFixed()}`}km/hr</span>
                </div>
                
            </div>
        </div>

        <div className='flex flex-row items-center justify-center space-x-2 text-white text-sm py-3'>
            <UilSun />
            <p className='font-light'>
                Rise: <span className='font-medium ml-1'>{formatToLocalTime(sunrise, timezone, 'hh:mm a')}</span>
            </p>
            <p className='font-light'>|</p>

            <UilSunset />
            <p className='font-light'>
                Set: <span className='font-medium ml-1'>{formatToLocalTime(sunset, timezone, 'hh:mm a')}</span>
            </p>
            
            </div>
            <div className='flex flex-row items-center justify-center space-x-2 text-white text-sm py-3'>
            <UilArrowUp />
            <p className='font-light'>
                High: <span className='font-medium ml-1'>{`${temp_max.toFixed()}`}&deg;{`${tempFormat}`}</span>
            </p>
            <p className='font-light'>|</p>

            <UilArrowDown />
            <p className='font-light'>
                Low: <span className='font-medium ml-1'>{`${temp_min.toFixed()}`}&deg;{`${tempFormat}`}</span>
            </p>
        </div>
    </div>
  )
}

export default TempAndDetails