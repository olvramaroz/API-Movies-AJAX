const apiKey = 'b1e3eec6badf8d3df7fd027c7d4dd4f1';
const baseURL = 'https://api.themoviedb.org/3';
const trendingWeekly = '/trending/movie/week?api_key='
const apiURL = baseURL + trendingWeekly + apiKey;
const imagePoster = 'https://image.tmdb.org/t/p/w500'
const main = document.getElementById('main');

const form = document.getElementById('form');
const search = document.getElementById('search');
const searchURL = baseURL + '/search/movie';

function getMovies() {
    $.ajax({
		url: apiURL,
		method: "GET",
		dataType: "JSON",
		data: {}
	})
    .done(showMovies)
	.fail(function() {
		console.log("error")
	});
}

function showMovies(data) {
    let movie = data.results;

    for(let i = 0; i < movie.length; i++) {
        let movieList = '';
        movieList += `
            <section class="cards">
                <section class="card">
                    <section class="front">
                        <img class="images" src="${imagePoster+movie[i].poster_path}" alt="${movie[i].title}">
                        <div class="title-rating">
                            <h2 class="title">${movie[i].title}</h2>
                            <p class="rating">${movie[i].vote_average}</p>
                        </div>
                    </section>
                    <section class="back">
                        <p class="description">${movie[i].overview}</p>
                        <p class="date">Date de sortie : ${movie[i].release_date}</p>
                    </section>
                </section>
            </section>
        `
        $('#main').append(movieList);
    }
}


getMovies();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(searchURL+'&query='+searchTerm);
    } else {
        getMovies();
    }
})