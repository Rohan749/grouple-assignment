import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

const TopButtons = ({setQuery}) => {

    useEffect(() => {
        AOS.init();
      }, [])

    const cities = [
        {
            id: 1,
            title: 'Jammu'
        },
        {
            id: 2,
            title: 'Assam'
        },
        {
            id: 3,
            title: 'Kerala'
        },
        {
            id: 4,
            title: 'Gujarat'
        },
        {
            id: 5,
            title: 'Jharkhand'
        },
    ]

  return (
    <div data-aos="fade" className='hidden md:flex items-center sm:justify-evenly my-6 '>
        {cities.map((city) => (
            <button onClick={() => {
                setQuery({ q: city.title })
            }} key={city.id} className='text-white hover:text-cyan-200 transition-colors text-sm font-medium md:textlg'>{city.title}</button>
        ))}
    </div>
  )
}

export default TopButtons