import React, { useEffect } from 'react'
import { formatToLocalTime } from '../services/services'
import AOS from 'aos';
import 'aos/dist/aos.css';

const TimeLocation = ({weather: {dt, timezone, name, country}}) => {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div>
    <div data-aos="fade" data-aos-delay="100" className='flex items-center justify-center my-6 p-5 rounded-xl bg-gray-800'>

        <p className='text-white md:text-xl text-center font-light text-sm'>
            {formatToLocalTime(dt, timezone)}
        </p>

    </div>
    <div data-aos="fade-up" className='flex items-center justify-center my-3'>
        <p className='text-white text-3xl font-medium'>
            {`${name}, ${country}`}
        </p>
    </div>
    </div>
  )
}

export default TimeLocation