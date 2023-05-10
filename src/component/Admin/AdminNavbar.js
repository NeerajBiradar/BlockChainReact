import React from 'react';
import { Link } from 'react-router-dom'; 

const AdminNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand active" to="/Admin">Admin</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px' }}>
            <li className="nav-item">
              <Link className="nav-link" to="/PatchRequest">Patch Request</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ApprovedPatches">Approved Patches</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/RejectedPatches">Rejected Patch</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/DeployedPatches">Deployed Patches</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Login">Logout</Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
