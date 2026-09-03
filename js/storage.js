import { getMovieDetails } from "./api.js"

export function checkStorage() {

    if (!localStorage.getItem("collection")) {
        console.log("Nothing found in collection.")
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

export function updateCollection(updatedCollection) {

    try {
        const newCollection = JSON.stringify(updatedCollection)
        localStorage.setItem("collection", newCollection)
    } catch {
        console.error("Failed to update user collection")
    }
}

export async function addToCollection(movieId) {

    const movieDetails = (await getMovieDetails(movieId));

    const movieToAdd = {
        id: movieDetails.id,
        title: movieDetails.title,
        posterPath: movieDetails.posterPath,
        genres: movieDetails.genres,
        collected: true,
        favorite: false,
        personalRating: null,
        personalReviewHeading: "",
        personalReviewBody: "",
        addedTimestamp: Date.now()
    }

    const collection = getCollection();
    collection.push(movieToAdd);
    updateCollection(collection);

}

export async function removeFromCollection(movieId) {

    const collection = getCollection();
    const updatedCollection = collection.filter(movie=> movie.id != movieId )
    updateCollection(updatedCollection);

}

export function findInCollection (movieId) {

    const collection = getCollection();

    const movie = collection.find(movie=>movie.id === movieId)

    return movie

}