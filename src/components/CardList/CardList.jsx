import React from 'react';
import css from './CardList.css';
import Card from '../Card/Card';

export const CardList = ({ cards, userId, changeLikeCard }) => {
    return (
        <div className="cards">
            {cards.map((elem) => {
                return (
                    <>
                        <Card
                            key={elem._id}
                            {...elem}
                            product={elem}
                            userId={userId}
                            changeLikeCard={changeLikeCard}
                        />
                    </>
                );
            })}
        </div>
    );
};
