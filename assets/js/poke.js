const capitalize = (string) =>
string[0].toUpperCase() + string.slice(1);


//evolution chain request
const requestURL = `http://pokeapi.co/api/v2/evolution-chain/${window.location.search.slice(1)}/`;
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();


//evolution chain response handler
request.onload = () => {
    const evolution1 = request.response;

    //evolutions requests
    const req1 = new XMLHttpRequest();
    const req2 = new XMLHttpRequest();
    const req3 = new XMLHttpRequest();
    req1.open('GET', `http://pokeapi.co/api/v2/pokemon/${evolution1.chain.species.name}`);
    req1.responseType = 'json';
    req1.send();

    const evolution2 = evolution1.chain.evolves_to[0];
    if (evolution2 != undefined) {
        name2 = evolution2.species.name;
        req2.open('GET', `http://pokeapi.co/api/v2/pokemon/${evolution2.species.name}`);
        req2.responseType = 'json';
        req2.send();

        const evolution3 = evolution2.evolves_to[0];
        if (evolution3 != undefined) {
            req3.open('GET', `http://pokeapi.co/api/v2/pokemon/${evolution3.species.name}`);
            req3.responseType = 'json';
            req3.send();
        }
        else {
            $('#evolution3')[0].style.display = 'none';
        }
    }
    else {
        $('#evolutions')[0].style.display = 'none';
        $('#evolution2')[0].style.display = 'none';
        $('#evolution3')[0].style.display = 'none';
    }

    //evolutions response handlers
    req1.onload = () => {
        const pokemon = req1.response;
        $('#img1')[0].src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
        $('#name1')[0].innerHTML = capitalize(pokemon.name);
        $('#hp1')[0].innerHTML      = pokemon.stats[5].base_stat;
        $('#speed1')[0].innerHTML   = pokemon.stats[0].base_stat;
        $('#attack1')[0].innerHTML  = pokemon.stats[4].base_stat;
        $('#defense1')[0].innerHTML = pokemon.stats[3].base_stat;
    };
    req2.onload = () => {
        const pokemon = req2.response;
        $('#img2')[0].src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
        $('#name2')[0].innerHTML = capitalize(pokemon.name);
        $('#hp2')[0].innerHTML      = pokemon.stats[5].base_stat;
        $('#speed2')[0].innerHTML   = pokemon.stats[0].base_stat;
        $('#attack2')[0].innerHTML  = pokemon.stats[4].base_stat;
        $('#defense2')[0].innerHTML = pokemon.stats[3].base_stat;
    };
    req3.onload = () => {
        const pokemon = req3.response;
        $('#img3')[0].src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
        $('#name3')[0].innerHTML = capitalize(pokemon.name);
        $('#hp3')[0].innerHTML      = pokemon.stats[5].base_stat;
        $('#speed3')[0].innerHTML   = pokemon.stats[0].base_stat;
        $('#attack3')[0].innerHTML  = pokemon.stats[4].base_stat;
        $('#defense3')[0].innerHTML = pokemon.stats[3].base_stat;
    };
};
