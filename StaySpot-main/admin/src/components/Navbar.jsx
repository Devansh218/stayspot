import React from 'react'

const Navbar = ({setOpenSidebar}) => {
  return (
    <div className='px-10 pt-4'>
        <i onClick={() => setOpenSidebar(prev => !prev)} className="ri-menu-line text-white text-2xl font-semibold cursor-pointer"></i>
    </div>
  )
}

export default Navbar