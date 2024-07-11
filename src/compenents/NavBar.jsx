import { Link } from "react-router-dom";

function NavigationBar() {
  // const navigate = useNavigate();
//   const HandleLogout = () => {
//     removeTokensSession()
//     navigate("/login")
//   }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to={"/"}>Home <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/create-task'}>Create Task</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/task-list'}>Task List</Link>
          </li>
          {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">Disabled</a>
          </li> */}
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        <ul className="navbar-nav ">
          <li className="nav-item">
          <Link className="nav-link" to={"/login"}>Login</Link>
            {/* {token ? <a className="nav-link" onClick={HandleLogout} href="">Logout</a> : <Link className="nav-link" to={"/login"}>Login</Link>} */}

          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;