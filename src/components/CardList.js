import React from 'react';
import { useState } from 'react';
import Cards from './Card';
import SearchBar from './SearchBar';

export const CardList = ({ contacts }) => {
    const [searchValue, setSearchValue] = useState(""); // searchValue is the state, setSearchValue is the function to update the state
    return (
        <div>
            <SearchBar onSearch={setSearchValue} value={searchValue}/>
            <div className="card__container">
                {contacts.filter(contact => contact.nombre.toLowerCase().includes(searchValue.toLowerCase())).map(contact => <Cards contact={contact} />)}
            </div>
        </div>
    )
}

export default CardList;