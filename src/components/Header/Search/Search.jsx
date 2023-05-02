import React from 'react';
import './search.css';

const Search = ({ setSearch }) => {
    return (
        <div class="search">
            <input
                className="search__input"
                placeholder="Поиск..."
                onChange={(e) => setSearch(e.target.value)}
            />
            <i class="fas fa-search"></i>
        </div>
    );
};

export default Search;
