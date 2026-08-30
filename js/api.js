const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2EwZWMwOTU5YTJmNWJkMmVjYmY4OTRjNmI1MjJlOCIsIm5iZiI6MTY3MDgxNDE0My4xMTgsInN1YiI6IjYzOTY5OWJmNzMwNGI1MDA3ZjdkYmJlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tCL91veqOmEDHaER8m6ZM-I-GoKMua2HpNHbDf20ACE"

export const posterBaseUrl = "https://image.tmdb.org/t/p/w600_and_h900_face"
export const backdropBaseUrl = "https://image.tmdb.org/t/p/w1280"

function transformMovie(rawMovie) {

    const movie = {
        id: rawMovie.id,
        title: rawMovie.title,
        backdropPath: `${backdropBaseUrl}${rawMovie.backdrop_path}`,
        genres: rawMovie.genres,
        overview: rawMovie.overview,
        releaseDate: rawMovie.release_date,
    };

    if (rawMovie.poster_path) {
        movie.posterPath = `${posterBaseUrl}${rawMovie.poster_path}`
    } else {
        movie.posterPath = "../assets/images/placeholder_poster.jpg"
    }

    if (rawMovie.tagline) {
        movie.tagline = rawMovie.tagline;
    }

    return movie;

}

export async function getMovieDetails(movieId) {

    const url = `https://api.themoviedb.org/3/movie/${movieId}`
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    try {

        const response = await fetch(url,options)
        if (!response.ok) {
            throw new Error("Failed to fetch from TMDB")
        }

        const movie = transformMovie(await response.json());

        return movie;

    } catch (error) {

        console.error(error.message)

    }

}

export async function searchMovies(movieName) {

    const queryString = new URLSearchParams({query: movieName}).toString()

    const url = `https://api.themoviedb.org/3/search/movie?${queryString}`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(url,options);
        if (!response.ok) {
            throw new Error("Failed to fecth search results from TMDB")
        }
        
        const resultsObject = await response.json();
        const resultsArray = resultsObject.results;

        const results = resultsArray.map(movie => transformMovie(movie))

        return results;

    } catch(error) {
        console.error(error.message)
    }
}