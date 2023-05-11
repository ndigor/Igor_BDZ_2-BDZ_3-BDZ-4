import React, { useEffect, useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { CardList } from './components/CardList/CardList.jsx';
import { api, editLikeCard } from './utils/api';
import CatalogProducts from './pages/CatalogProducts/CatalogProducts';
import PageProduct from './pages/PageProduct/PageProduct';
import NotFoundPage from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import FavoritePage from './pages/FavoritePage/FavoritePage';
import RouterAuth from './route/RouterAuth/RouterAuth';
import NotFoundProductPage from './NotFound/NotFound.jsx';

function App() {
    const [card, setCards] = useState([]);
    const [search, setSearch] = useState(undefined);
    const [user, setUser] = useState({});

    const filterCards = (card) => {
        return card.filter(
            (item) => item.author._id === '622bd81b06c7d323b8ae4614'
        );
    };

    const changeLikeCard = async (product, cardLiked) => {
        const updateLikeInCard = await editLikeCard(product, cardLiked);

        const newCard = card.map((item) =>
            item._id === updateLikeInCard._id ? updateLikeInCard : item
        );
        setCards([...newCard]);
        // const deleteUpdatedCard = () => {
        //     const newCard = card.map((item) =>
        //         item._id === updateLikeInCard._id ? updateLikeInCard : item
        //     );
        //     setCards([...newCard]);
        // };

        // const addUpdatedCard = () => {
        //     const newCard = card.map((item) =>
        //         item._id === updateLikeInCard._id ? updateLikeInCard : item
        //     );
        //     setCards([...newCard]);
        // };
        // cardLiked ? deleteUpdatedCard() : addUpdatedCard();
    };

    useEffect(() => {
        if (search === undefined) return;
        api.searchProducts(search).then((data) => setCards(filterCards(data)));
    }, [search]);

    useEffect(() => {
        api.getAllProducts().then((res) => setCards(filterCards(res.products)));
        api.getUserInfo().then((data) => setUser(data));
    }, []);

    return (
        <div className="App">
            <Header setSearch={setSearch}></Header>
            <main>
                <div className="container">
                    <CardList
                        cards={card}
                        userId={user._id}
                        changeLikeCard={changeLikeCard}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default App;
