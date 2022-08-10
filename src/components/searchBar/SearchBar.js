import React from 'react';

import './SearchBar.scss';

function SearchBar({searchTerm, setSearchTerm, placeholder = "Search by name"}) {

    const updateSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <input 
            className="searchBar" 
            placeholder={placeholder}
            value={searchTerm} 
            onChange={updateSearchTerm}
        />
    );
}

export default SearchBar;