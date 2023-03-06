import React, { Component } from 'react';
import Identicon from 'identicon.js';
import dvs_web from '../dvideo.png'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow text-monospace">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="https://github.com/ShivaKanchi/DVS_WEB"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={dvs_web} width="30" height="30" className="d-inline-block align-top" alt="" />
          &nbsp;DVS
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{/* Account... */}</small>
            </small>
            {/* Return Account&Identicon... */}
            <b className="text-white">0x0</b>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;