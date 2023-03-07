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
              {/* Account... */}
              <small id="account">{this.props.account}</small>
            </small>
            {/* Return Account&Identicon... */}
            {/* <b className="text-white">0x0</b> */}
            {
              this.props.account ?
                <img
                  className='ml-2'
                  width='30'
                  height='30'
                  src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                  alt="Logo"
                /> :
                <span></span>
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;