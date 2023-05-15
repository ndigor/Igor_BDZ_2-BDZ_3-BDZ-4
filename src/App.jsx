import React, { useEffect, useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { api, editLikeCard } from './utils/api';
import { CardContext } from './context/cardContext';
import { Route, Routes } from 'react-router-dom';
import CatalogProducts from './pages/CatalogProducts/CatalogProducts';
import {NotFoundPage} from './pages/NotFoundPage/NotFoundPage';
import FavoritePage from './pages/FavoritePage/FavoritePage';
import ProductView from './components/ProductView/ProductView';


function App() {
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState(undefined);
    const [user, setUser] = useState({});

    const filterCards = (cards) => {
        return cards.filter(
            (item) => item.author._id === '622bd81b06c7d323b8ae4614'
        );
    };

    const changeLikeCard = async (product, cardLiked) => {
        const updateLikeInCard = await editLikeCard(product, cardLiked);

        const newCard = cards.map((item) =>
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

const cardsValue={
    cards, user, changeLikeCard, 
    search,

}

    return (
        <div className="App">
            <CardContext.Provider value={cardsValue}>
            <Header setSearch={setSearch}></Header>
            <Routes>
                <Route path='/' element={<CatalogProducts />}/>
                <Route path='/product/:id' element={<ProductView/>} />
                <Route path='/favorites' element={<FavoritePage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
            <Footer />
            </CardContext.Provider>
        </div>
    );
}

export default App;
