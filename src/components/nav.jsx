import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loggedInSelect, logout } from "../login_slice";
import NavLiLink from "./nav_li_link";

export default function Nav() {
  const loggedIn = useSelector(loggedInSelect);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#myNavbar"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to={"/"}>
            WebSiteName
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav">
            <NavLiLink to={"/"}>Home</NavLiLink>
            <NavLiLink to={"/users"}>Users</NavLiLink>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <NavLiLink to={"#"}>
              <i className="glyphicon glyphicon-user"></i> Sign Up
            </NavLiLink>
            {loggedIn ? (
              <NavLiLink
                to={""}
                onClick={() => {
                  dispatch(
                    logout("", () => {
                      navigate("/users");
                    })
                  );
                }}
              >
                <i className="glyphicon glyphicon-log-out"></i> Logout
              </NavLiLink>
            ) : (
              <NavLiLink to={"/login"}>
                <i className="glyphicon glyphicon-log-in"></i> Login
              </NavLiLink>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
