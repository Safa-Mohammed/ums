import  { useContext, useState } from 'react'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaUserPlus } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { ImProfile } from 'react-icons/im';
import { IoLogOutOutline } from 'react-icons/io5';
import { TiHome } from 'react-icons/ti';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import './sideBar.css'
import { AuthContext } from '../context/AuthContext';
export default function SideBar() {
  let {userData}:any=useContext(AuthContext)
  let [collapsed ,setCollapsed] =useState(false)
  let toggleCollapsed=()=>{
    setCollapsed(! collapsed)
  }
  return (
    
    < div className='sidebarContainer vh-100'>
      <Sidebar className='sidebarContainer vh-100 ' collapsed={collapsed}>
        {collapsed ?<FaArrowAltCircleRight size={25}  className='mx-3' onClick={toggleCollapsed}/>
       : <FaArrowAltCircleLeft size={25}  className='mx-3' onClick={toggleCollapsed}/>}
      <div className='text-center '>
 <img src={userData.image} alt="profile"  className='rounded-circle w-50 p-2'/>
 <h5>{userData.firstName}</h5>
 <h6 className='text-warning'>Admin</h6>
      </div>

  <Menu
    menuItemStyles={{
      button: {
        // the active class will be added automatically by react router
        // so we can use it to style the active menu item
        [`&.active`]: {
          backgroundColor: '#13395e',
          color: '#b6c8d9',
        },
      },
    }}
  >
    <MenuItem icon={<TiHome />} component={<Link to="/dashboard" />}> Home</MenuItem>
    <MenuItem  icon={<FiUsers />} component={<Link to="/dashboard/users-list" />}> Users</MenuItem>
    <MenuItem icon={<FaUserPlus />} component={<Link to="/dashboard/add-user" />}>Add User</MenuItem>
    <MenuItem icon={<ImProfile  />} component={<Link to="/dashboard/Profile" />}>Profile</MenuItem>
    <MenuItem  icon={<IoLogOutOutline  />} component={<Link to="/" />}>Logout</MenuItem>
  </Menu>
</Sidebar>
    </div>
  )
}
