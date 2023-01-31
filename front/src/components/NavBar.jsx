import { ReactSession }  from 'react-client-session';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
function NavBar() {
  const [checkUser, SetcheckUser] = useState(false);
  let user = localStorage.getItem("username");
  console.log('localStorage',user)
  useEffect(() => {
    const checkData = () => {
      if (user!= null) {
        console.log('user',user)
        SetcheckUser(true);
      }
    };
    checkData();
  }, []);

  return (
    <div className="topbar">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="full">
          <button type="button" id="sidebarCollapse" className="sidebar_toggle">
            <i className="fa fa-bars"></i>
          </button>
          <div className="logo_section">
            <a>
              <img
                className="img-responsive"
                src="http://localhost:3000/images/logo/logo.png"
                alt="#"
              />
            </a>
          </div>
          <div className="right_topbar">
            <div className="icon_info">
              <ul className="user_profile_dd">
              {checkUser? 
                    (
                      <li>
                      <a className="dropdown-toggle" data-toggle="dropdown" >

                        <img
                          className="img-responsive rounded-circle"
                          src="http://localhost:3000/images/layout/user-profile.png"
                          alt="#"
                        />
                         <span className="name_user">{user}</span>
                      </a>
                      <div className="dropdown-menu">
                        <Link to ={'/logout'} className="dropdown-item" href="#">
                          <span>Log Out</span> <i className="fa fa-sign-out"></i>
                        </Link>
                      </div>
                    </li>
                    ) :
                    <li className='lilogin'>
                    <Link to ={'/login'}>
                      <img
                        className="img-responsive rounded-circle"
                        src="http://localhost:3000/images/layout/loginIcon.png"
                        alt="#"
                      />
                       <span className="name_user">Login</span>
                    </Link>
                  </li>
                     }
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default NavBar;
