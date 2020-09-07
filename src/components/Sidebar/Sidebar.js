
import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "logo.png";
import { Link} from 'react-router-dom';

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.sidebar = React.createRef();
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    const access=sessionStorage.getItem('access');
    if(sessionStorage.getItem('access') === null){
      this.props.history.push({ pathname:'/Login' });
  }
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  logout = () => {
    console.log("logout")
    sessionStorage.removeItem('access');
    if(sessionStorage.getItem('access') === null){
      this.props.history.push({ pathname: '/Login' });
    }
}
  render() {
    return (
      <div
        className="sidebar"
        data-color={"white"}
        data-active-color={this.props.activeColor}
      >
        <div className="logo">

          <img src={logo} alt="react-logo" />

        </div>
        <div className="sidebar-wrapper" ref={this.sidebar}>
         
          <Nav>
             {this.props.routes.map((prop, key) => {
              return (
                <li
                  className={
                    this.activeRoute(prop.path) +
                    (prop.pro ? " active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                  
                </li>
              );
            })}
        {/*<li style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
          
          <Link to="/Dashboard">
          <i className="nc-icon nc-icon nc-bank" />
          DASHBOARD
             </Link>       
</li>
<li style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
          
          <Link to="">
          <i className="nc-icon nc-cart-simple" />
          NEW ORDERS
             </Link>       
</li>
<li style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
          
          <Link to="">
          <i className="nc-icon nc-cart-simple" />
            ORDERS
             </Link>       
</li>
<li style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
          
          <Link to="">
          <i className="nc-icon nc-chart-bar-32" />
             REPORTS
             </Link>       
</li>
<li style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
          
          <Link to="">
          <i className="nc-icon nc-bullet-list-67" />
             MENU
             </Link>       
</li>
<li style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
          
          <Link to="" >
          <i className="nc-icon nc-shop" />
             OUTLETS
             </Link>       
</li>
<li style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
          
          <Link to="" >
          <i className="nc-icon  nc-single-02" />
             USER PROFILES
             </Link>       
          </li>*/}
            
          <li style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
          
                     <Link to="" onClick={this.logout}>
                     <i className="nc-icon nc-button-power" />
                        LOG OUT
                        </Link>       
          </li>
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
