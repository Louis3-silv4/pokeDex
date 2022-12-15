const pokemonContainer = document.getElementById('pokemon-container');
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
  const type = types[0].type.name
  const pokemonElement = document.createElement('div')
  pokemonElement.classList.add('pokemon')
  const pokemonInnerHtml = `
  <div class='img-container'>
    <img src='${sprites.other.home.front_default}' alt='${name}'/>
  </div>
  <div class='pokemon-info'>
    <span class='pokemon-id'>#${id}</span>
    <h3 class='pokemon-name'>${name}</h3>
    <span class='pokemon-type'>${type}</span>
  </div>
  `
  pokemonElement.innerHTML = pokemonInnerHtml
  pokemonContainer.appendChild(pokemonElement)
}

fetchPokemons()