import React from 'react';
import './headersIcons.css';
// import { ReactComponent as Dog } from './icons/DogIcon.svg';
// import { ReactComponent as Heart } from './icons/Favorites.svg';
// import { ReactComponent as Cart } from './icons/ic-cart.svg';
import {
    BalloonHeart,
    BalloonHeartFill,
    BagHeart,
    BagHeartFill,
    PersonCircle,
    BuildingUp,
    BuildingDown,
} from 'react-bootstrap-icons';

const HeaderIcons = ({ user, upd }) => {
    const login = () => {
        localStorage.setItem('user12', 'Vasya');
        upd('Vasya');
    };

    const logout = () => {
        localStorage.removeItem('user12');
        upd('');
    };
    return (
        <nav className="header__menu">
            {user ? (
                <>
                    <a href="/">
                        <BalloonHeart title="Избранное" />
                    </a>
                    <a href="/">
                        <BagHeart title="Корзина" />
                    </a>
                    <a href="/">
                        <PersonCircle title="Личный кабинет" />
                    </a>
                </>
            ) : (
                ''
            )}
            <span>
                {!user ? <BuildingUp title="Вход" onClick={login} /> : ''}
                {user ? <BuildingDown title="Выход" onClick={logout} /> : ''}
            </span>
        </nav>
    );
};

export default HeaderIcons;
