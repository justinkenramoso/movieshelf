import { renderUserMovies } from "./ui.js";
import { searchMovies } from "./api.js";
import { renderSearchResults } from "./ui.js";
import { clearSearchResults } from "./ui.js";
import { checkStorage } from "./storage.js";

checkStorage();

renderUserMovies();
searchMovies("the dark knight")


const addMoviesButton = document.querySelector("#add-movies-button")
const cancelAddMoviesButton = document.querySelector("#add-movies-cancel")
const addMoviesModal = document.querySelector("#add-movies-modal")


addMoviesButton.addEventListener("click", ()=>{
    addMoviesModal.showModal();
})
cancelAddMoviesButton.addEventListener("click", ()=>{
    addMoviesModal.close();
})

let searchTimer;

const movieSearchInput = document.querySelector("#add-movies-search")

movieSearchInput.addEventListener("input", (event) => {

    clearTimeout(searchTimer);

    searchTimer = setTimeout(async ()=>{

        clearSearchResults()

        const results = await searchMovies(event.target.value)

        renderSearchResults(results)
        
    }, 1000)

})