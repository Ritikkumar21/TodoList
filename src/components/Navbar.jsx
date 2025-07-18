import React from 'react'

const Navbar = () => {
  return (
   <nav className='flex justify-between bg-indigo-900 text-white py-2'>
   <div className="logo font-bold text-xl mx-8">iTask</div>
    <ul className='flex gap-2 mx-9'>
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Task</li>
    </ul>
   </nav>
  )
}

export default Navbar
