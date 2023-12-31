import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from '../../../assets/images/3.png'
import Modal from 'react-bootstrap/Modal';
import ChangePass from '../../../AuthModule/Components/ChangePass/ChangePass';

export default function SideBar() {
  let [isCollapsed, setIsCollapsed] = useState(false);
  let handleToggle = () => {
    setIsCollapsed(!isCollapsed)
  }
  let navigate = useNavigate();
  let logOut = () => {
    localStorage.removeItem("userToken");
    navigate("/login")
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div>
        <div className='sidebar-container'>

          <Modal show={show} onHide={handleClose}>

            <Modal.Body>
              <ChangePass handleClose={handleClose} />
            </Modal.Body>

          </Modal>

          <Sidebar collapsed={isCollapsed}>
            <Menu>
              <div className='img-logo '>
                <MenuItem onClick={handleToggle} icon={<img src={logo} ></img>} ></MenuItem>
              </div>
              {/* <MenuItem onClick={handleToggle} icon={<i className="fa-solid fa-bars"></i>} ></MenuItem> */}
              <div className='sidebarIcon'>
                <MenuItem icon={<i className="fa fa-home"></i>} component={<Link to="/dashboard" />}> Home</MenuItem>
                <MenuItem icon={<i className="fa-solid fa-utensils"></i>} component={<Link to="/dashboard/recipes" />}> Recipes</MenuItem>
                <MenuItem icon={<i className="fa-solid fa-heart"></i>} component={<Link to="/dashboard/favourites" />}>Favorites</MenuItem>
                <MenuItem onClick={handleShow} icon={<i className="fa-solid fa-unlock-keyhole"></i>}> Change password</MenuItem>
                <MenuItem onClick={logOut} icon={<i className="fa-solid fa-right-from-bracket"></i>} component={<Link to="/login" />}> Logout</MenuItem>
              </div>

            </Menu>
          </Sidebar>
        </div>

      </div>
    </>

  )
}
