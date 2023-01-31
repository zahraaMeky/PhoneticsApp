import background from "./background/pattern_h.png";
import { Link } from "react-router-dom";
import React from "react";
function SideBar() {
  return (
    <>
      <nav id="sidebar" style={{ backgroundImage: `url(${background})` }}>
        <div className="sidebar_blog_1">
          <div className="sidebar-header">
            <div className="logo_section">
              <a>
                <img
                  className="logo_icon img-responsive"
                  src="http://localhost:3000/images/logo/logo.png"
                  alt="#"
                />
              </a>
            </div>
          </div>
          <div className="sidebar_user_info">
            <div className="icon_setting"></div>
            <div className="user_profle_side">
              <div className="user_img">
                <img
                  className="img-responsive"
                  src="http://localhost:3000/images/logo/logo.png"
                  alt="#"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar_blog_2">
          <h4>Phonetics Dashboard</h4>
          <ul className="list-unstyled components">
            <li className="active">
            <Link to={'/'}>
                <img
                  style={{ marginRight: "5px" }}
                  src="http://localhost:3000/images/icons/to-do-list.png"
                />
                <span>Phonetics List</span>
              </Link>
              <ul className="list-unstyled mb-3" id="dashboard">
                <li>
                  <Link to={'/phoneticsexamples'}>
                    <span>Examples</span>
                  </Link>
                </li>
                <li>
                  <Link to={'/quiz-One'}>
                    <span>Quiz</span>
                    <span class="badge badge-light">1</span>
                  </Link>
                </li>
                <li>
                <Link to={'/quiz-two'}>
                    <span>Quiz</span>
                    <span class="badge badge-light">2</span>
                  </Link>
                </li>
                <li>
                <Link to={'/quiz-Three'}>
                    <span>Quiz</span>
                    <span class="badge badge-light">3</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
            <Link to={'/users'}>
                <img
                  style={{ marginTop: "-20px", marginRight: "5px" }}
                  src="http://localhost:3000/images/icons/001-programmer.png"
                />
                <span>Users</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
export default SideBar;
