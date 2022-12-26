const pokemonContainer = document.getElementById('pokemon-container');
const inputSearch = document.getElementById('input-search');
const btnSearch = document.getElementById('btn-search');
const btnFavorite = document.getElementById("btn-card-detalhar")

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
  <div class='card'>
    <div class='img-container'>
      <img src='${sprites.other.home.front_default}' alt='Pokemon ${name}'/>
    </div>
    <div class='info'>
      <div class='text-info'>
        <span class='pokemon-id'>${id}</span>
        <h3 class='pokemon-name'>${name}</h3>
      </div>
      <div class='btn-info'>
        <button type='button' class='btn-detalhar' id='btn-card-detalhar' alt='Para obter mais informações'>Detalhar</button>
        <button type='button' class='btn-favorite-card' id='btn-card-favorite' alt='Favorite seu pokemon preferido'>Favorite</button>
    </div>
    </div>
  </div>
  `
  pokemonElement.innerHTML = pokemonInnerHtml
  pokemonContainer.appendChild(pokemonElement)
  console.log(btnFavorite)
}

btnSearch.addEventListener('click', async () => {
  let searchResults = pokemonContainer
  let searchTerm = inputSearch.value
  
  const url = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
  const res = await fetch(url)
  const pokemon = await res.json()

  const {name,types,sprites,id} = pokemon
  
  searchResults.innerHTML = `
  <div class='card'>
    <div class='img-container'>
      <img src='${sprites.other.home.front_default}' alt='${name}'/>
    </div>
    <div class='info'>
      <div class='text-info'>
        <span class='pokemon-id'>#${id}</span>
        <h3 class='pokemon-name'>${name}</h3>
      </div>
      <div class='btn-info'>
        <button type='button' class='btn-detalhar' id='btn-card-detalhar'>Detalhar</button>
        <button type='button' class='btn-favorite-card' id='btn-card-favorite'>Favorite</button>
      </div>
    </div>
  </div>
  `
});

fetchPokemons()
