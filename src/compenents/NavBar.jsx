import { Link, useNavigate } from "react-router-dom";
import { getAccessTokenSession, removeTokensSession } from "../utils/utitlity";
import { useContext } from "react";
import { TimerContext } from "../services/TimerContext";

function NavigationBar() {
  const token = getAccessTokenSession()
  const navigate = useNavigate();
  const { resetTimer } = useContext(TimerContext);

  const HandleLogout = () => {
    resetTimer()
    removeTokensSession()
    navigate("/login")
  }
  return (
    <nav className="navbar  navbar-expand-lg navbar-light bg-light ">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to={"/dashboard"}>Dashboard <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item ml-3">
            <Link className="nav-link" to={'/task-table'}>All Tasks</Link>
          </li>
        </ul>
        <ul className="navbar-nav ">
        <li className="nav-item">
          <Link className="nav-link" to={'/settings'}>Settings</Link>
        </li>
        </ul>
        <ul className="navbar-nav ">
          <li className="nav-item">
            {token ? <a className="nav-link" onClick={HandleLogout} href="#">Logout</a> : <Link className="nav-link" to={"/login"}>Login</Link>}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;