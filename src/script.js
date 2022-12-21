const pokemonContainer = document.getElementById('pokemon-container');
const inputSearch = document.getElementById('input-search');
const btnSearch = document.getElementById('btn-search');
const pokemonNumber = 30;

const fetchPokemons = async () =>{
  for(let i= 1; i<=pokemonNumber; i++){
    await getPokemon(i)
  }
}

const getPokemon = async (id) =>{
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`

  const res = await fetch(url)
  const pokemon = await res.json()
  pokemonCard(pokemon)
}

const pokemonCard = (pokemon) =>{
  const {name,types,sprites,id} = pokemon

  const pokemonElement = document.createElement('div')
  pokemonElement.classList.add('pokemon')

  const pokemonInnerHtml = `
  <div class='img-container'>
  <img src='${sprites.other.home.front_default}' alt='${name}'/>
  </div>
  <div class='info'>
  <span class='pokemon-id'>#${id}</span>
  <h3 class='pokemon-name'>${name}</h3>
  </div>
  <div class='btn-info'>
  <button type='button' class='btn-detalhar'>Detalhar</button>
  <button type='button' class='btn-favorite'> <img class="icon-favorite" 
  id="pokemon-favorite" src="./assets/icons8-favorite-48.png" alt="Favorito">
  </button>
  </div>
  `
  pokemonElement.innerHTML = pokemonInnerHtml
  pokemonContainer.appendChild(pokemonElement)
}

btnSearch.addEventListener('click', async () => {
  let searchResults = pokemonContainer
  let searchTerm = inputSearch.value
  
  const url = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
  const res = await fetch(url)
  const pokemon = await res.json()

  const {name,types,sprites,id} = pokemon

  searchResults.innerHTML = ""
  
  searchResults.innerHTML = `
  <div class='img-container'>
  <img src='${sprites.other.home.front_default}' alt='${name}'/>
  </div>
  <div class='info'>
  <span class='pokemon-id'>#${id}</span>
  <h3 class='pokemon-name'>${name}</h3>
  </div>
  <div class='btn-info'>
  <button type='button' class='btn-detalhar'>Detalhar</button>
  <button type='button' class='btn-favorite'> <img class="icon-favorite" 
  id="pokemon-favorite" src="./assets/icons8-favorite-48.png" alt="Favorito">
  </button>
  </div>
  `
});

fetchPokemons()
