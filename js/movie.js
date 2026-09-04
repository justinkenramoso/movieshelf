import { renderMovieCast, renderMoviePageHero } from "./ui.js";
import { getMovieCast } from "./api.js";

const updateReviewModal = document.querySelector(".update-review-modal")
const editReviewButton = document.querySelector("#edit-review-button")
const cancelEditReviewButton = document.querySelector(".update-review-cancel")

const movieId = new URLSearchParams(window.location.search).get("id")

await renderMoviePageHero(movieId);
renderMovieCast(await getMovieCast(movieId));

editReviewButton.addEventListener("click", ()=> {
    updateReviewModal.showModal()
})

cancelEditReviewButton.addEventListener("click", ()=> {
    updateReviewModal.close()
})