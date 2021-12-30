import React from 'react'
import {Navbar, NavbarBrand, NavbarText} from "reactstrap";
import Identicon from 'identicon.js';

const TopBar = ({address}) => {
    return (
        <div>
            <Navbar
                color="dark"
                expand="md"
                dark
            >
                <NavbarBrand href="/">
                    Athena
                </NavbarBrand>
                <NavbarText>
                    <small className="m-2">Address : {address}</small>
                    {
                        address &&
                        <img alt="abc"
                             width="30"
                             height="30"
                             src={`data:image/png;base64,${new Identicon(address, 30).toString()}`}/>
                    }
                </NavbarText>
            </Navbar>
        </div>
    )
}

export default TopBar;
