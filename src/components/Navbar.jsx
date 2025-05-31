import React from 'react'
import { FiSun } from "react-icons/fi";
import { LuMoon } from "react-icons/lu";
import '../index.css'

const Navbar = ({ toggleTheme, theme }) => {
  return (
   <nav className='flex justify-between text-white py-4 items-center ' style={{
        backgroundColor: theme === "dark" ? "#241b31" : "  #705591",
        color: theme === "dark" ? "white" : "white"
      }} >
    <div className="logo">
        <span className='font-bold text-2xl mx-9'>DailyDo</span>
    </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer' onClick={toggleTheme}><FiSun size={30} /></li>
            <li className='cursor-pointer' onClick={toggleTheme}><LuMoon size={30} /></li>
        </ul>
   </nav>
  )
}

export default Navbar

// style={{
//     backgroundColor: theme === "dark" ? "#241b31" : " #565058",
//     color: theme === "dark" ? "white" : "black"
//   }}