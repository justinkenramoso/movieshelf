import { renderMovieCast, renderMoviePageHero } from "./ui.js";
import { getMovieCast } from "./api.js";

const movieId = new URLSearchParams(window.location.search).get("id")

await renderMoviePageHero(movieId);
renderMovieCast(await getMovieCast(movieId));