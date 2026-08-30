import { getMovieDetails } from "./api.js";
import { addToCollection } from "./storage.js";
import { getCollection } from "./storage.js";

const cardsContainer = document.querySelector("#movie-cards-container")
const moviePage = document.querySelector(".movie-page-main")
const searchResultsContainer = document.querySelector("#search-results-container")

export function renderUserMovies() {

    const collection = getCollection();

    console.log(collection)

    collection.forEach((movie)=>{
        const cardWrapper = document.createElement("a")
        cardWrapper.href = `movie.html?id=${Number(movie.id)}`
        const movieCard = document.createElement("article")
        movieCard.classList.add("movie-card")
        const moviePoster = document.createElement("img")
        moviePoster.src = movie.posterPath;
        moviePoster.alt = `Poster of $${movie.title}`

        movieCard.append(moviePoster);
        cardWrapper.append(movieCard);
        cardsContainer.append(cardWrapper);

    })

}

export async function renderMoviePage() {

    const movieId = new URLSearchParams(window.location.search).get("id")
    const movie = await getMovieDetails(movieId)

    const hero = document.createElement("div")
    hero.id = "movie-page-hero"
    hero.style = `background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${movie.backdropPath}) center / cover no-repeat;`
    const container = document.createElement("article")
    container.classList.add("movie-page-container")
    const poster = document.createElement("img")
    poster.classList.add("movie-page-poster")
    poster.src = movie.posterPath;
    poster.alt = `Poster of ${movie.title}`
    const info = document.createElement("div")
    info.classList.add("movie-page-info")
    const title = document.createElement("h2")
    title.classList.add("movie-page-title")
    title.textContent = movie.title;
    const genres = document.createElement("p")
    genres.classList.add("movie-page-genres")
    movie.genres.forEach(genre => {
        const genreSpan = document.createElement("span")
        genreSpan.textContent = genre.name
        genres.append(genreSpan)
    })
    const tagline = document.createElement("p")
    tagline.classList.add("movie-page-tagline")
    tagline.textContent = movie.tagline
    const overview = document.createElement("p")
    overview.classList.add("movie-page-overview")
    overview.textContent = movie.overview

    info.append(title,genres,tagline,overview)
    container.append(poster,info)
    hero.append(container)

    moviePage.append(hero);

}

export function renderSearchResults(results) {

    results.forEach(movie => {

        const resultItem = document.createElement("article")
        resultItem.classList.add("search-result-item")

        const poster = document.createElement("img")
        poster.classList.add("search-result-poster")
        poster.src = movie.posterPath;
        poster.alt = `Poster of ${movie.title}`

        const infoWrapper = document.createElement("div")
        infoWrapper.classList.add("search-result-info")
        const infoTitle = document.createElement("p")
        infoTitle.classList.add("search-result-title")
        infoTitle.textContent = movie.title + " "
        const infoYear = document.createElement("p")
        infoYear.classList.add("search-result-year")
        infoYear.textContent = `(${movie.releaseDate.split("-")[0]})`
        const infoOverview = document.createElement("p")
        infoOverview.classList.add("search-result-overview")
        infoOverview.textContent = movie.overview

        const buttonsWrapper = document.createElement("div")
        buttonsWrapper.classList.add("result-buttons-container")
        const addMovieButton = document.createElement("button")
        addMovieButton.classList.add("add-to-collection-button")
        addMovieButton.textContent = "Add to Collection"
        addMovieButton.addEventListener("click", async ()=>{
            await addToCollection(movie.id)
        })
        const viewDetailsButton = document.createElement("a")
        viewDetailsButton.classList.add("view-details-button")
        viewDetailsButton.href = `movie.html?id=${Number(movie.id)}`
        viewDetailsButton.textContent = "View Details"

        buttonsWrapper.append(addMovieButton,viewDetailsButton)
        infoWrapper.append(infoTitle,infoYear,infoOverview)
        resultItem.append(poster,infoWrapper,buttonsWrapper)

        searchResultsContainer.append(resultItem)

    })
}

export function clearSearchResults () {

    searchResultsContainer.replaceChildren()

}


const dummyMovies = [
    {
        "id": 969681,
        "title": "Spider-Man: Brand New Day",
        "tagline": "A brand new day starts now.",
        "posterPath": "https://image.tmdb.org/t/p/w600_and_h900_face/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg",
        "backdropPath": "https://image.tmdb.org/t/p/w1280/pq1Mhdt9LbkQM5TOjuVZpcczbf.jpg",
        "genres": [
            { "id": 878, "name": "Science Fiction" },
            { "id": 28, "name": "Action" },
            { "id": 12, "name": "Adventure" }
        ],
        "overview": "Fighting crime full-time as Spider-Man in a world that doesn't remember him—and the pressure of seeing his old friends move on without him—sparks a change in Peter Parker he may not have the power to control.",
        "releaseDate": "2026-07-29"
    },
    {
        "id": 27205,
        "title": "Inception",
        "tagline": "Your mind is the scene of the crime.",
        "posterPath": "https://image.tmdb.org/t/p/w600_and_h900_face/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg",
        "backdropPath": "https://image.tmdb.org/t/p/w1280/pq1Mhdt9LbkQM5TOjuVZpcczbf.jpg",
        "genres": [
            { "id": 28, "name": "Action" },
            { "id": 878, "name": "Science Fiction" },
            { "id": 53, "name": "Thriller" }
        ],
        "overview": "A skilled thief who enters people's dreams is given a chance to erase his past by planting an idea inside the mind of a powerful target.",
        "releaseDate": "2010-07-16"
    },
    {
        "id": 157336,
        "title": "Interstellar",
        "tagline": "Mankind was born on Earth. It was never meant to die here.",
        "posterPath": "https://image.tmdb.org/t/p/w600_and_h900_face/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg",
        "backdropPath": "https://image.tmdb.org/t/p/w1280/pq1Mhdt9LbkQM5TOjuVZpcczbf.jpg",
        "genres": [
            { "id": 12, "name": "Adventure" },
            { "id": 18, "name": "Drama" },
            { "id": 878, "name": "Science Fiction" }
        ],
        "overview": "A group of explorers travels beyond the boundaries of our solar system in search of a new home for humanity.",
        "releaseDate": "2014-11-07"
    },
    {
        "id": 155,
        "title": "The Dark Knight",
        "tagline": "Welcome to a world without rules.",
        "posterPath": "https://image.tmdb.org/t/p/w600_and_h900_face/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg",
        "backdropPath": "https://image.tmdb.org/t/p/w1280/pq1Mhdt9LbkQM5TOjuVZpcczbf.jpg",
        "genres": [
            { "id": 18, "name": "Drama" },
            { "id": 28, "name": "Action" },
            { "id": 80, "name": "Crime" }
        ],
        "overview": "Batman faces a criminal mastermind whose chaotic methods push Gotham City and its heroes to their limits.",
        "releaseDate": "2008-07-18"
    },
    {
        "id": 120,
        "title": "The Lord of the Rings: The Fellowship of the Ring",
        "tagline": "One ring to rule them all.",
        "posterPath": "https://image.tmdb.org/t/p/w600_and_h900_face/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg",
        "backdropPath": "https://image.tmdb.org/t/p/w1280/pq1Mhdt9LbkQM5TOjuVZpcczbf.jpg",
        "genres": [
            { "id": 12, "name": "Adventure" },
            { "id": 14, "name": "Fantasy" },
            { "id": 28, "name": "Action" }
        ],
        "overview": "A young hobbit begins an epic journey to destroy a powerful ring before its dark creator can reclaim it.",
        "releaseDate": "2001-12-19"
    },
    {
        "id": 550,
        "title": "Fight Club",
        "tagline": "Mischief. Mayhem. Soap.",
        "posterPath": "https://image.tmdb.org/t/p/w600_and_h900_face/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg",
        "backdropPath": "https://image.tmdb.org/t/p/w1280/pq1Mhdt9LbkQM5TOjuVZpcczbf.jpg",
        "genres": [
            { "id": 18, "name": "Drama" },
            { "id": 53, "name": "Thriller" }
        ],
        "overview": "An unhappy office worker finds a new sense of purpose after meeting a mysterious man who introduces him to an underground fighting club.",
        "releaseDate": "1999-10-15"
    },
    {
        "id": 603,
        "title": "The Matrix",
        "tagline": "What is real?",
        "posterPath": "https://image.tmdb.org/t/p/w600_and_h900_face/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg",
        "backdropPath": "https://image.tmdb.org/t/p/w1280/pq1Mhdt9LbkQM5TOjuVZpcczbf.jpg",
        "genres": [
            { "id": 28, "name": "Action" },
            { "id": 878, "name": "Science Fiction" }
        ],
        "overview": "A computer hacker discovers that the reality he knows is an elaborate simulation and joins a rebellion against its creators.",
        "releaseDate": "1999-03-31"
    },
    {
        "id": 680,
        "title": "Pulp Fiction",
        "tagline": "Just because you are a character doesn't mean you have character.",
        "posterPath": "https://image.tmdb.org/t/p/w600_and_h900_face/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg",
        "backdropPath": "https://image.tmdb.org/t/p/w1280/pq1Mhdt9LbkQM5TOjuVZpcczbf.jpg",
        "genres": [
            { "id": 53, "name": "Thriller" },
            { "id": 80, "name": "Crime" }
        ],
        "overview": "Several interconnected stories unfold around criminals, a mysterious briefcase, and a series of unexpected encounters in Los Angeles.",
        "releaseDate": "1994-09-10"
    },
    {
        "id": 13,
        "title": "Forrest Gump",
        "tagline": "Life is like a box of chocolates.",
        "posterPath": "https://image.tmdb.org/t/p/w600_and_h900_face/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg",
        "backdropPath": "https://image.tmdb.org/t/p/w1280/pq1Mhdt9LbkQM5TOjuVZpcczbf.jpg",
        "genres": [
            { "id": 35, "name": "Comedy" },
            { "id": 18, "name": "Drama" },
            { "id": 10749, "name": "Romance" }
        ],
        "overview": "A kind-hearted man with a simple outlook on life finds himself unexpectedly involved in several major moments of American history.",
        "releaseDate": "1994-07-06"
    },
    {
        "id": 496243,
        "title": "Parasite",
        "tagline": "Act like you own the place.",
        "posterPath": "https://image.tmdb.org/t/p/w600_and_h900_face/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg",
        "backdropPath": "https://image.tmdb.org/t/p/w1280/pq1Mhdt9LbkQM5TOjuVZpcczbf.jpg",
        "genres": [
            { "id": 35, "name": "Comedy" },
            { "id": 53, "name": "Thriller" },
            { "id": 18, "name": "Drama" }
        ],
        "overview": "A struggling family gradually becomes involved with a wealthy household, leading to a chain of events that takes an increasingly dark turn.",
        "releaseDate": "2019-05-30"
    }
];