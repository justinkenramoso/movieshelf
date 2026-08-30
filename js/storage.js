import { getMovieDetails } from "./api.js"
import { posterBaseUrl } from "./api.js";
import { backdropBaseUrl } from "./api.js";

export function checkStorage() {

    if (!localStorage.getItem("collection")) {
        const emptyCollection = []
        localStorage.setItem("collection", JSON.stringify(emptyCollection))
    }

}

export function getCollection() {

    try {
        const collection = JSON.parse(localStorage.getItem("collection"))
        return collection;
    } catch {
        console.error("Failed to load user collection")
    }
}

export async function addToCollection(movieId) {

    const movieDetails = (await getMovieDetails(movieId));
    console.log(movieDetails)

    const movieToAdd = {
        id: movieDetails.id,
        title: movieDetails.title,
        posterPath: `${posterBaseUrl}${movieDetails.posterPath}`,
        collected: true,
        watched: false,
        favorite: false,
        personalRating: null,
        personalComment: "",
        addedTimestamp: Date.now()
    }

    const currentCollection = JSON.parse(localStorage.getItem("collection"));

    currentCollection.push(movieToAdd);

    localStorage.setItem("collection", JSON.stringify(currentCollection))

}