const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')
const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const next = document.querySelector('.btn-next')
const prev = document.querySelector('.btn-prev')

let searchPokemon = 1

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(APIResponse.status === 200) {
        const data = await APIResponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'
    pokemonImage.src = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAyOWI4YmQ5LWNiNWEtNDFlNC05YzdlLWVlNTE2ZmFjZTliYlwvZGF5bzNvdy03YWM4NmMzMS04YjJiLTQ4MTAtODlmMi1lNjEzNGNhZjFmMmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ooubhxjHp9PIMhVxvCFHziI6pxDAS8glXPWenUeomWs'
    const data = await fetchPokemon(pokemon)
    if(data){
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        searchPokemon = data.id
        if(data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] == null){
            pokemonImage.src = 'https://thumbs.gfycat.com/AmbitiousInfantileIndochinesetiger-max-1mb.gif'
        } else {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        }
    } else {
        pokemonName.innerHTML = 'Not Found!'
        pokemonNumber.innerHTML = ''
        pokemonImage.src = 'https://thumbs.gfycat.com/AmbitiousInfantileIndochinesetiger-max-1mb.gif'
    }
    input.value = ''
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

next.addEventListener('click', () => {
    searchPokemon++
    if(searchPokemon > 905) {
        searchPokemon = 905
        return;
    }
    renderPokemon(searchPokemon.toString())
})

prev.addEventListener('click', () => {
    searchPokemon--
    if(searchPokemon <= 0) {
        searchPokemon = 1
        return
    }
    renderPokemon(searchPokemon.toString())
})

renderPokemon(searchPokemon.toString())