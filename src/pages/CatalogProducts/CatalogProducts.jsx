import React from 'react';
import { CardList } from '../../components/CardList/CardList';
import './catalogProduct.css';
import { Link, NavLink, Navigate } from 'react-router-dom';
import SortCards from '../../components/SortCards/SortCards';

const CatalogProducts = ({ cards, user, changeLikeCard, search, onSort }) => {
    const getEndings = (num) => {
        const res = num % 10;
        if (res === 1) {
            return ' товар';
        } else if (1 < res && res < 5) {
            return ' товара';
        } else if (num > 5 || !num) {
            return ' товаров';
        }
    };

    return (
        <>
            {search ? (
                <p className="search__info">
                    По запросу <b>{search}</b>
                    {cards.length === 1 ? ' найден' : ' найдено'}{' '}
                    <b>{cards.length}</b>
                    {getEndings(cards.length)}
                </p>
            ) : (
                ''
            )}
            {search && cards.length === 0 ? (
                <Navigate to="/notfoundProduct"></Navigate>
            ) : (
                ''
            )}
            <SortCards onSort={onSort} />
            <CardList
                cards={cards}
                userId={user._id}
                changeLikeCard={changeLikeCard}
            />
        </>
    );
};

export default CatalogProducts;
