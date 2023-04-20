import React from 'react';


function SearchForm({term, searchKeyword}){
    function handleSearch(evt){
        searchKeyword(evt.target.value)
    }
    return(
        <>
        <input className='input-field' type='text' value={term} placeholder='Enter a book name'
        onChange={handleSearch}>

        </input>
        </>
    )
}

export default SearchForm