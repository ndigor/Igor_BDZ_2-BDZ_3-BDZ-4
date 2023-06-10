import React, { useEffect, useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { api, editLikeCard } from './utils/api';
import CatalogProducts from './pages/CatalogProducts/CatalogProducts';
import PageProduct from './pages/PageProduct/PageProduct';
import {NotFoundPage} from './pages/NotFoundPage/NotFoundPage';
import { Route, Routes } from 'react-router-dom';
import FavoritePage from './pages/FavoritePage/FavoritePage';
import RegistrationForm from './components/Forms/RegistrationForm/RegistrationForm';
import AuthorizationForm from './components/Forms/AuthorizationForm/AuthorizationForm';
import PasswordRecoveryForm from './components/Forms/PasswordRecoveryForm/PasswordRecoveryForm';
import Modal from './components/Modal/Modal';
import {RouterAuth} from './route/RouterAuth';
import NotFoundProductPage from './pages/NotFoundProductPage/NotFoundProductPage';
import { CardContext } from './context/cardContext';


function App() {
    const localStorage = window.localStorage;
    const localStorageCards = JSON.parse(localStorage.getItem('card'));
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState(undefined);
    const [user, setUser] = useState({});
    const [isAuth, setAuth] = useState(true);

    const myCards = (card) => {
        return card.filter(
            (item) => item.author._id === 'IgorN'
        );
    };

    const changeLikeCard = async (product, cardLiked) => {
        const updateLikeInCard = await editLikeCard(product, cardLiked).catch(
            (error) => console.log(error)
        );

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
        api.searchProducts(search)
            .then((data) => setCards(myCards(data)))
            .catch((error) => console.log(error));
    }, [search]);

    useEffect(() => {
        api.getAllProducts()
            .then((res) => {
                setCards(myCards(res.products));
                localStorage.setItem(
                    'card',
                    JSON.stringify(myCards(res.products))
                );
            })
            .catch((error) => console.log(error));
        api.getUserInfo()
            .then((data) => setUser(data))
            .catch((error) => console.log(error));
    }, []);

    const onSort = (sortId) => {
        if (sortId === 'all') {
            const newCard = localStorageCards.map((elem) => elem);
            setCards([...newCard]);
        }
        if (sortId === 'lowPrice') {
            const newCards = localStorageCards.sort(
                (a, b) => a.price - b.price
            );
            setCards([...newCards]);
        }
        if (sortId === 'highPrice') {
            const newCards = localStorageCards.sort(
                (a, b) => b.price - a.price
            );
            setCards([...newCards]);
        }
        if (sortId === 'sale') {
            const newCards = localStorageCards
                .filter((a) => a.discount)
                .sort((a, b) => a.discount - b.discount);
            setCards([...newCards]);
        }
        if (sortId === 'new') {
            const newCards = localStorageCards.filter((a) =>
                a.tags.includes('new')
            );
            setCards([...newCards]);
        }
        if (sortId === 'popular') {
            const newCards = localStorageCards
                .filter((a) => a.likes)
                .sort((a, b) => b.likes.length - a.likes.length);
            setCards([...newCards]);
        }
    };

    const ProjectValue={
        cards, user, changeLikeCard, search, onSort
    }

    return (
        <div className="App">
            <Header setSearch={setSearch}></Header>
            <CardContext.Provider value={ProjectValue}>
            <main className="main">
                {/* <button onClick={() => setAuth(!isAuth)}>Click me now!</button> */}
                <div className="container">
                    {isAuth ? (
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <CatalogProducts
                                        setSearch={setSearch}
                                        search={search}
                                        cards={cards}
                                        user={user}
                                        changeLikeCard={changeLikeCard}
                                        onSort={onSort}
                                    />
                                }
                            />
                            <Route
                                path="/product/:id"
                                element={<PageProduct />}
                            />
                            <Route
                                path="/favorite"
                                element={<FavoritePage />}
                            />
                            <Route path="*" element={<NotFoundPage />} />
                            <Route
                                path="/notfoundProduct"
                                element={
                                    <NotFoundProductPage
                                        setSearch={setSearch}
                                    />
                                }
                            />
                        </Routes>
                    ) : (
                        <Routes>
                            <Route path="/" element={ <RouterAuth/>}></Route>
                        </Routes>
                       
                    )}
                </div>
            </main>
            </CardContext.Provider>
            <Footer />
        </div>
    );
}

export default App;
