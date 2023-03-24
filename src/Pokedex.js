import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Pokedex = () => {
    // Set state for pokemon data
    const [pokemonData, setPokemonData] = useState([]);
    // Set state for the search
    const [searchTerm, setSearchTerm] = useState('');
    // Set states for pagination
    const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
    const [nextPageUrl, setNextPageUrl] = useState('');
    const [prevPageUrl, setPrevPageUrl] = useState('');
    const [loading, setLoading] = useState(true);

    // Set useEffect for our pagination
    useEffect(() => {
        setLoading(true);
        axios.get(currentPageUrl)
        .then((response) => {
            setLoading(false);
            setNextPageUrl(response.data.next);
            setPrevPageUrl(response.data.previous);
            setPokemonData(response.data.results);
        });
    }, [currentPageUrl])

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
        .then((response) => {
            setPokemonData(response.data.results);
        });
    }, [])

    // Handle search change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter the pokemon based on searchTerm
    const filteredPokemon = pokemonData.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    })

    const goToNextPage = () => {
        setCurrentPageUrl(nextPageUrl);
    };

    const goToPrevPage = () => {
        setCurrentPageUrl(prevPageUrl);
    };

    return (
        <div className='pokedex'>
            <h1>Pokedex</h1>
            <input type='text' value={searchTerm} onChange={handleSearchChange}/>
            <ul>
                {filteredPokemon.map((pokemon) => (
                    <li key={pokemon.name}>
                        <a href={`/#/pokemon/${pokemon.url.split('/')[6]}`}>
                            <li key={pokemon.name}>{pokemon.name.toUpperCase()}</li>
                        </a>
                    </li>
                ))}
                
            </ul>
            <button onClick={goToPrevPage} disabled={!prevPageUrl}>Previous</button>
            <button onClick={goToNextPage} disabled={!nextPageUrl}>Next</button>
        </div>
  )
}

export default Pokedex