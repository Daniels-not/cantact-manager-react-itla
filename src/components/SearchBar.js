import React from 'react'

const SearchBar = (props) => {
    return (
        <div className="container">
            <input type="text" placeholder="Search By Name ..." onChange={(e) => props.onSearch(e.target.value)} value={props.value} className="input__search"/>
        </div>
    )
}

export default SearchBar
