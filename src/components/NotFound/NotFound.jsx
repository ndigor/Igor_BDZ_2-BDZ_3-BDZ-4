import React from 'react';
import svg from './404.svg';
import './NotFound.css';

const 404 = (props) => {
    return (
        <>
            <div className="container">
                <div className="404__wrapper">
                    <img
                        className="404__img"
                        src={svg}
                        alt="sad smile"
                    />
                    <h2 className="404__title">
                        Извините, данная страничка сломалась либо больше не существует.
                    </h2>
                    <button className="404__btn">На главную</button>
                </div>
            </div>
        </>
    );
};

export default 404;
