const pokemonContainer = document.getElementById('pokemon-container');
const inputSearch = document.getElementById('input-search');
const btnSearch = document.getElementById('btn-search')
const modalContainer = document.querySelector('#modal-container')
const favoritos = document.getElementById('btn-favorite')

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

fetchPokemons()

const detalharCard = (pokemon)=>{
  const {name,sprites,id,stats,types,height,weight}  = pokemon

  const modalEl = document.createElement('div')
  modalEl.classList.add('pokemon-modal')  

  modalEl.innerHTML= '';

  const modalHtml = `
  <div class="modal">
    <div class="modal-header">
      <div>#${id}</div>
      <div>${name}</div>
      <div class="close-modal">X</div>
    </div>
    <div class="modal-Content">
      <div class="stats-left">
        <div class="stat-row">
          <div class="stat">Type</div>
          <div class="stat-desc">${types[0].type.name}</div>
        </div>
        <div class="stat-row">
          <div class="stat">Peso</div>
          <div class="stat-number">${weight}Kg</div>
        </div>
        <div class="stat-row">
          <div class="stat">Altura</div>
          <div class="stat-number">${height} cm</div>
        </div>
      </div>
      <img class="modal-img" src='${sprites.other.home.front_default}' alt="Pokemon ${name}">
      <div class="stats-right">
        <div class="stat-row">
          <div class="stat">HP</div>
          <div class="stat-bar">
            <progress class="progress-bar" max="100" value="${stats[0].base_stat}"></progress>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat">Attack</div>
          <div class="stat-bar">
            <progress class="progress-bar" max="100" value="${stats[1].base_stat}"></progress>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat">Defense</div>
          <div class="stat-bar">
            <progress class="progress-bar" max="100" value="${stats[2].base_stat}"></progress>
          </div>
        </div>
      </div>
    </div>
  </div>
  `


  modalEl.innerHTML = modalHtml
  modalContainer.appendChild(modalEl)
  modalEl.style.display = 'block';
  modalEl.style.width = '100%';
  modalEl.style.height = '100%';

  const closeButton = modalEl.querySelector('.close-modal')
  closeButton.addEventListener('click', () => {
    modalEl.style.display = 'none'
  })

  console.dir(pokemon)
}
favoritos.addEventListener('click',  () => {
  const favorites = JSON.parse(localStorage.getItem('favorites'))
  const favoriteHTML = favorites.map(pokemon=>{
    const {name,sprites,id} = pokemon
    return `
    <div class='card'>
      <div class='img-container'>
        <img src='${sprites.other.home.front_default}' alt='Pokemon ${name}'/>
      </div>
      <div class='info'>
        <div class='text-info'>
          <span class='pokemon-id'>#${id}</span>
          <h3 class='pokemon-name'>${name}</h3>
        </div>
        <div class='btn-info'>
          <button onclick='detalharCard(${JSON.stringify(pokemon)})' class='btn-detalhar' id='btn-card-detalhar' alt='Para obter mais informações'>Detalhar</button>
          <button onclick='unFavoriteCard(${JSON.stringify(pokemon)})' class='btn-favorite-card' id='btn-card-favorite' alt='Favorite seu pokemon preferido'>Desfavoritar</button>
        </div>
      </div>
    </div>`
    })
    pokemonContainer.innerHTML = favoriteHTML.join('')
});

const isFavorite = (pokemonId) => {
  const favorites = JSON.parse(localStorage.getItem('favorites'))
  if (favorites) {
    const result = favorites.findIndex((item) => item.id === pokemonId)
    return result > -1
  }
  return false
}

const favoriteCard = (pokemon)=>{
  if(isFavorite(pokemon.id)){
    return alert(`${pokemon.name} já foi favoritado`)
  }
  const favorites = JSON.parse(localStorage.getItem('favorites')) || []
  favorites.push(pokemon)
  localStorage.setItem('favorites', JSON.stringify(favorites))

}

const unFavoriteCard = (index) => {
  const favorites = JSON.parse(localStorage.getItem('favorites'))
  if (favorites) {
    favorites.splice(index, 1)
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
}
const pokemonCard = (pokemon) =>{
  const {name,sprites,id} = pokemon

  const pokemonElement = document.createElement('div')
  pokemonElement.classList.add('pokemon')

  const pokemonInnerHtml = `
  <div class='card'>
    <div class='img-container'>
      <img src='${sprites.other.home.front_default}' alt='Pokemon ${name}'/>
    </div>
    <div class='info'>
      <div class='text-info'>
        <span class='pokemon-id'>#${id}</span>
        <h3 class='pokemon-name'>${name}</h3>
      </div>
      <div class='btn-info'>
        <button onclick='detalharCard(${JSON.stringify(pokemon)})' class='btn-detalhar' id='btn-card-detalhar' alt='Para obter mais informações'>Detalhar</button>
        <button onclick='favoriteCard(${JSON.stringify(pokemon)})' class='btn-favorite-card' id='btn-card-favorite' alt='Favorite seu pokemon preferido'>Favorite</button>
      </div>
    </div>
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
  
  const {name,sprites,id} = pokemon
  if (searchTerm === " ") {
    searchResults.innerHTML = `<div class="search-error"> Por favor, preencha o campo de busca </div>`
  } else {
    
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
      <button onclick='detalharCard(${JSON.stringify(pokemon)})' class='btn-detalhar' id='btn-card-detalhar' alt='Para obter mais informações'>Detalhar</button>
      <button onclick='favoriteCard(${JSON.stringify(pokemon)})' class='btn-favorite-card' id='btn-card-favorite' alt='Favorite seu pokemon preferido'>Favorite</button>
      </div>
      </div>
      </div>
    `
  }

});


