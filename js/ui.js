import { getMovieDetails } from "./api.js";
import { addToCollection, removeFromCollection } from "./storage.js";
import { getCollection } from "./storage.js";
import { findInCollection } from "./storage.js";

const cardsContainer = document.querySelector("#movie-cards-container")
const heroSection = document.querySelector(".movie-page-hero-section")
const addMoviesSearchBar = document.querySelector("#add-movies-search")
const searchResultsContainer = document.querySelector("#search-results-container")
const addMoviesModal = document.querySelector("#add-movies-modal")
const removeFromCollectionModal = document.querySelector(".remove-from-collection-modal")
const removeFromCollectionConfirm = document.querySelector(".remove-from-collection-confirm")
const removeFromCollectionCancel = document.querySelector(".remove-from-collection-cancel")

const castCardsContainer = document.querySelector(".cast-cards-container")

export function renderUserMovies() {

    cardsContainer.replaceChildren()

    const collection = getCollection();

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

export async function renderMoviePageHero(movieId) {

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
    const releaseDate = document.createElement("p")
    releaseDate.classList.add("movie-page-releasedate")
    releaseDate.textContent = `Release Date: ${movie.releaseDate}`

    const buttonsWrapper = document.createElement("div")
    buttonsWrapper.classList.add("movie-page-buttonswrapper")

    const addToCollectionButton = document.createElement("button")
    addToCollectionButton.classList = "movie-page-addtocollectionbutton"
    addToCollectionButton.textContent = "COLLECT"
    const addToCollectionButtonIcon = document.createElement("img")
    addToCollectionButtonIcon.src = "./assets/icons/plus-dark.svg"
    addToCollectionButton.append(addToCollectionButtonIcon)
    const removeFromCollectionButton = document.createElement("button")
    removeFromCollectionButton.classList = "movie-page-removefromcollectionbutton"
    removeFromCollectionButton.textContent = "COLLECT"
    const removeFromCollectionButtonIcon = document.createElement("img")
    removeFromCollectionButtonIcon.src = "./assets/icons/check-muted.svg"
    removeFromCollectionButton.append(removeFromCollectionButtonIcon)

    if (findInCollection(movie.id)){
        buttonsWrapper.append(removeFromCollectionButton)
    } else {
        buttonsWrapper.append(addToCollectionButton)
    }

    addToCollectionButton.addEventListener("click", () => {
        addToCollection(movieId);
        buttonsWrapper.replaceChild(removeFromCollectionButton,addToCollectionButton)
    })

    removeFromCollectionButton.addEventListener("click", () => {
        removeFromCollectionModal.showModal();
    })

    removeFromCollectionConfirm.addEventListener("click", ()=> {
        removeFromCollection(movieId)
        buttonsWrapper.replaceChild(addToCollectionButton,removeFromCollectionButton)
        removeFromCollectionModal.close()
    })
    removeFromCollectionCancel.addEventListener("click", ()=> {
        removeFromCollectionModal.close()
    })


    const taglineOverviewWrapper = document.createElement("div")
    taglineOverviewWrapper.classList.add("tagline-overview-wrapper")
    const tagline = document.createElement("p")
    tagline.classList.add("movie-page-tagline")
    tagline.textContent = movie.tagline
    const overview = document.createElement("p")
    overview.classList.add("movie-page-overview")
    overview.textContent = movie.overview

    taglineOverviewWrapper.append(tagline,overview)
    info.append(title,genres,releaseDate,buttonsWrapper,taglineOverviewWrapper)
    container.append(poster,info)
    hero.append(container)

    heroSection.append(hero);
}

export function renderMovieCast(cast) {

    cast.map(actor=>{
        const castCard = document.createElement("div")
        castCard.classList.add("cast-card")
        const castPortrait = document.createElement("img")
        castPortrait.classList.add("cast-portrait")
        castPortrait.src = actor.portraitPath
        castPortrait.alt = `Portrait of ${actor.name}`
        const castName = document.createElement("p")
        castName.classList.add("cast-name")
        castName.textContent = actor.name
        const castCharacter = document.createElement("p")
        castCharacter.classList.add("cast-character")
        castCharacter.textContent = actor.character

        castCard.append(castPortrait,castName,castCharacter)
        castCardsContainer.append(castCard)
    })



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
        const collectText = document.createElement("p")
        collectText.textContent = "COLLECT"
        addMovieButton.append(collectText)

        const checkIcon = document.createElement("img")
        checkIcon.src = "./assets/icons/check-muted.svg"
        checkIcon.classList.add("search-result-button-icon")
        const plusIcon = document.createElement("img")
        plusIcon.src = "./assets/icons/plus-dark.svg"
        plusIcon.classList.add("search-result-button-icon")

        

        if (findInCollection(movie.id)) {
            addMovieButton.classList.add("already-added-button")
            addMovieButton.append (checkIcon);
          

        } else {
            addMovieButton.classList.add("add-to-collection-button")
            addMovieButton.append (plusIcon);
            addMovieButton.addEventListener("click", async ()=>{
            await addToCollection(movie.id);
            renderUserMovies();
            addMovieButton.classList.replace("add-to-collection-button","already-added-button")
            addMovieButton.replaceChild(checkIcon,plusIcon)
        }, {once: true})
        }

        
        const viewDetailsButton = document.createElement("a")
        viewDetailsButton.classList.add("view-details-button")
        viewDetailsButton.href = `movie.html?id=${Number(movie.id)}`
        viewDetailsButton.textContent = "DETAILS"
        const viewDetailsIcon = document.createElement("img")
        viewDetailsIcon.classList.add("search-result-button-icon")
        viewDetailsIcon.src = "./assets/icons/eye.svg"
        viewDetailsButton.append(viewDetailsIcon)

        buttonsWrapper.append(addMovieButton,viewDetailsButton)
        infoWrapper.append(infoTitle,infoYear,infoOverview)
        resultItem.append(poster,infoWrapper,buttonsWrapper)

        searchResultsContainer.append(resultItem)

    })
}

export function clearSearchResults () {

    searchResultsContainer.replaceChildren()

}
