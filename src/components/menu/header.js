import React, { useEffect, useState } from "react";
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import { Link } from '@reach/router';
import useOnclickOutside from "react-cool-onclickoutside";
import 'tachyons';
import MxcBalanceButton from "../mycomponents/tools/MxcBalanceButton";

setDefaultBreakpoints([
  { xs: 0 },
  { l: 1199 },
  { xl: 1200 }
]);

const NavLink = props => (
  <Link 
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? 'active' : 'non-active',
      };
    }}
  />
);



const Header= function() {

    const [openMenu, setOpenMenu] = React.useState(false);
    const [openMenu1, setOpenMenu1] = React.useState(false);
    const [openMenu2, setOpenMenu2] = React.useState(false);
    const handleBtnClick = (): void => {
      setOpenMenu(!openMenu);
    };
    const handleBtnClick1 = (): void => {
      setOpenMenu1(!openMenu1);
    };
    const handleBtnClick2 = (): void => {
      setOpenMenu2(!openMenu2);
    };
    const closeMenu = (): void => {
      setOpenMenu(false);
    };
    const closeMenu1 = (): void => {
      setOpenMenu1(false);
    };
    const closeMenu2 = (): void => {
      setOpenMenu2(false);
    };
    const ref = useOnclickOutside(() => {
      closeMenu();
    });
    const ref1 = useOnclickOutside(() => {
      closeMenu1();
    });
    const ref2 = useOnclickOutside(() => {
      closeMenu2();
    });

    const [showmenu, btn_icon] = useState(false);
    useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
        btn_icon(false);
        if (window.pageYOffset > sticky) {
          header.classList.add("sticky");
          totop.classList.add("show");
          
        } else {
          header.classList.remove("sticky");
          totop.classList.remove("show");
        } if (window.pageYOffset > sticky) {
          closeMenu();
        }
      });
      return () => {
        window.removeEventListener("scroll", scrollCallBack);
      };
    }, []);
    return (
    <header id="myHeader" className='navbar white'>
     <div className='container'>
       <div className='row w-100-nav'>
          <div className='logo px-0'>
              <div className='navbar-title navbar-item'>
                <NavLink to="/">
                <img
                    src="./img/logo-3.png"
                    className="img-fluid d-block"
                    alt="#"
                    width="40%"
                    height="40%"
                  />
                  <img
                    src="./img/logo-3.png"
                    className="img-fluid d-3"
                    alt="#"
                    height="40%"
                    width="40%"
                  />
                  <img
                    src="./img/logo-light.png"
                    className="img-fluid d-none"
                    alt="#"
                    height="40%"
                    width="40%"
                  />
                </NavLink>
              </div>
          </div>
                    
              <BreakpointProvider>
                <Breakpoint l down>
                  {showmenu && 
                  <div className='menu'>
                    <div className='navbar-item'>
                      <div ref={ref}>
                        <div className="dropdown-custom dropdown-toggle btn" 
                          onClick={handleBtnClick}
                          >
                          My Assets
                        </div>
                        {openMenu && (
                          <div className='item-dropdown'>
                            <div className="dropdown" onClick={closeMenu}>
                              <NavLink to="/myship">Ship</NavLink>
                              <NavLink to="/myitem">Item</NavLink>
                              <NavLink to="/myplanet">Celestial Body</NavLink>
                              <NavLink to="/mymine">Mine</NavLink>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='navbar-item'>
                      <div ref={ref1}>
                        <div className="dropdown-custom dropdown-toggle btn" 
                          onClick={handleBtnClick1}
                          >
                          Marketplace
                        </div>
                        {openMenu1 && (
                          <div className='item-dropdown'>
                            <div className="dropdown" onClick={closeMenu1}>
                              <NavLink to="/indev">Ship</NavLink>
                              <NavLink to="/indev">Celestial Body</NavLink>
                              <NavLink to="/indev">Galaxy</NavLink>
                              <NavLink to="/indev">Mine</NavLink>
                              <NavLink to="/indev">Equipment</NavLink>
                              <NavLink to="/indev">Other</NavLink>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='navbar-item'>
                      <div ref={ref2}>
                        <div className="dropdown-custom dropdown-toggle btn" 
                          onClick={handleBtnClick2}
                          >
                          Combat
                        </div>
                        {openMenu2 && (
                          <div className='item-dropdown'>
                            <div className="dropdown" onClick={closeMenu2}>
                            <NavLink to="/indev">Fleet</NavLink>
                              <NavLink to="/indev">Event</NavLink>
                              <NavLink to="/indev">News</NavLink>
                              <NavLink to="/indev">Pirate</NavLink>
                              <NavLink to="/indev">BattleHall</NavLink>
                              <NavLink to="/indev">Leaderboard</NavLink>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='navbar-item'>
                      <NavLink to="/home" onClick={() => btn_icon(!showmenu)}>
                        Home
                      </NavLink>
                    </div>
                  </div>
                  }
                </Breakpoint>

                <Breakpoint xl>
                  <div className='menu'>
                    <div className='navbar-item'>
                        <div ref={ref}>
                          <div className="dropdown-custom dropdown-toggle btn" 
                             onMouseEnter={handleBtnClick} onMouseLeave={closeMenu}>
                            My Assets
                            <span className='lines'></span>
                            {openMenu && (
                            <div className='item-dropdown'>
                              <div className="dropdown" onClick={closeMenu}>
                                <NavLink to="/myship">Ship</NavLink>
                                <NavLink to="/myitem">Item</NavLink>
                                <NavLink to="/myplanet">Celestial Body</NavLink>
                                <NavLink to="/mymine">Mine</NavLink>
                              </div>
                            </div>
                          )}
                          </div>
                          
                        </div>
                    </div>
                    <div className='navbar-item'>
                      <div ref={ref1}>
                          <div className="dropdown-custom dropdown-toggle btn" 
                             onMouseEnter={handleBtnClick1} onMouseLeave={closeMenu1}>
                            Marketplace
                            <span className='lines'></span>
                            {openMenu1 && (
                            <div className='item-dropdown'>
                              <div className="dropdown" onClick={closeMenu1}>
                              <NavLink to="/indev">Ship</NavLink>
                              <NavLink to="/indev">Celestial Body</NavLink>
                              <NavLink to="/indev">Galaxy</NavLink>
                              <NavLink to="/indev">Mine</NavLink>
                              <NavLink to="/indev">Equipment</NavLink>
                              <NavLink to="/indev">Other</NavLink>
                              </div>
                            </div>
                          )}
                          </div>
                          
                        </div>
                    </div>
                    <div className='navbar-item'>
                      <div ref={ref2}>
                          <div className="dropdown-custom dropdown-toggle btn" 
                             onMouseEnter={handleBtnClick2} onMouseLeave={closeMenu2}>
                            Combat
                            <span className='lines'></span>
                            {openMenu2 && (
                            <div className='item-dropdown'>
                              <div className="dropdown" onClick={closeMenu2}>
                              <NavLink to="/indev">Fleet</NavLink>
                              <NavLink to="/indev">Event</NavLink>
                              <NavLink to="/indev">News</NavLink>
                              <NavLink to="/indev">Pirate</NavLink>
                              <NavLink to="/indev">BattleHall</NavLink>
                              <NavLink to="/indev">Leaderboard</NavLink>
                              <NavLink to="/elegantIcons">elegantIcons</NavLink>
                              </div>
                            </div>
                          )}
                          </div>
                        </div>
                    </div>
                    <div className='navbar-item'>
                      <NavLink to="/home">
                      Home
                      <span className='lines'></span>
                      </NavLink>
                    </div>
                  </div>
                </Breakpoint>
              </BreakpointProvider>

              <div className='mainside'>
                <MxcBalanceButton />
              </div>
                  
      </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>

      </div>     
    </header>
    );
}
export default Header;