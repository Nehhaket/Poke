const capitalize = (string) =>
    string[0].toUpperCase() + string.slice(1);

//figurung out what page I'm in
let page;
if (window.location.search == "") { page = '1'; }
else { page = window.location.search.slice(1); }
//making sure page is within the limit
if (parseInt(page) < 1) { page = '1'; }
else if (parseInt(page) > 10) { page = '10'; }

//setting id for buttons and requests
let id = (parseInt(page)-1)*10;


//setting buttons urls
for(let i = 1; i <= 10; i++) {
    $(`#btn${i}`)[0].href = `poke.html?${id+i}`;
}


//evolution chains requests and handlers
for(let i = 1; i <= 10; i++) {
    //response
    const requestURL = `http://pokeapi.co/api/v2/evolution-chain/${id+i}/`;
    const request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    //handler
    request.onload = () => {
        const response = request.response;

        //pokemon request
        const reqURL = `http://pokeapi.co/api/v2/pokemon/${response.chain.species.name}`;
        const req = new XMLHttpRequest;
        req.open('GET', reqURL);
        req.responseType = 'json';
        req.send();

        //pokemon response handler
        req.onload = () => {
            const poke = req.response;
            $(`#name${i}`)[0].innerHTML = capitalize(poke.name);
            $(`#hp${i}`)[0].innerHTML = poke.stats[5].base_stat;
            $(`#img${i}`)[0].src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`
        };
    };
}


//setting pagination buttons
$(`#${page}`).addClass('active');
for (let i = 1; i <= 10; i++) {
    $(`#${i}`)[0].childNodes[0].href = `index.html?${i}`;
}
$('#previous')[0].childNodes[0].href = `index.html?${(page > 1) ? (parseInt(page)-1) : 1}`
$('#next')[0].childNodes[0].href = `index.html?${(page < 10) ? (parseInt(page)+1) : 10}`
