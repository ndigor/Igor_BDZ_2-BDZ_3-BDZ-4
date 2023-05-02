import React from 'react';
import { ReactComponent as LogoSvg } from './logo.svg';
import './logo.css';

const Logo = (props) => {
    return (
        <a href="/">
            <LogoSvg className="logo" />
        </a>
    );
};

export default Logo;
