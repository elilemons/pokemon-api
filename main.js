$(() => {
  function getPokemon() {
    let pokemon = ['bulbasaur', 'charmander', 'squirtle']; // An array of the Pokemon we want

    $.each(pokemon, index => {
      if (localStorage.getItem(`${pokemon[index]}`)) { // If the pokemon are aleady available, don't waste the API call
        setupStarter(JSON.parse(localStorage.getItem(`${pokemon[index]}`)));
      } else {
        $.get(`https://pokeapi.co/api/v2/pokemon/${pokemon[index]}`, (pokemon) => { // Grab the Pokemon
          setupStarter(pokemon);
        });
      }
    });
  }

  function setupStarter(pokemon) {
    cacheInLocalStorage(pokemon.name, pokemon); // Cache the Pokemon
    $('#app').append($(`<div id="${pokemon.name}-card" class="card"/>`));
    $(`#${pokemon.name}-card`).append($('<img class="card-img-top" />').attr('src', pokemon.sprites.front_default));
    $(`#${pokemon.name}-card`).append($(`<div id="${pokemon.name}-card-body" class="card-body"/>`));
    $(`#${pokemon.name}-card-body`).append($('<h5 class="card-title" />').text(pokemon.name));
    $(`#${pokemon.name}-card`).append($(`<div id="${pokemon.name}-card-footer" class="card-footer" />`));
    $(`#${pokemon.name}-card-footer`).append($(`<button class="btn btn-dark stretched-link" id="${pokemon.name}-select" />`).text('Select'));

    $(`#${pokemon.name}-select`).on('click', () => {
      selectCard(pokemon);
    });
  }

  function selectCard(pokemon) {
    $(`.card`).removeClass('bg-warning');
    $(`#${pokemon.name}-card`).toggleClass('bg-warning');
  }

  function cacheInLocalStorage(pokemonName, pokemon) {
    localStorage.setItem(`${pokemonName}`, JSON.stringify(pokemon));
  }

  getPokemon();

});