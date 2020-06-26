import React,{ useState } from 'react';
import './header.css'

const Header = props => {
    return(
    <h1 className="header">{props.title}</h1>
    );
}
export default Header;