import React from 'react';
import './header.css';
import Logo from '../Logo/Logo';
import Search from './Search/Search';
import HeaderIcons from './HeaderIcons/HeaderIcons';
import { useState } from 'react';

export const Header = (props) => {
    const [user, setUser] = useState(localStorage.getItem('user12'));
    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <Logo />
                    <Search setSearch={() => {}} />
                    <HeaderIcons user={user} upd={setUser} />
                </div>
            </div>
        </header>
    );
};
