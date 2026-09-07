import { renderMovieCast, renderMoviePageHero, renderUserReviews } from "./ui.js";
import { getMovieCast } from "./api.js";
import { findInCollection, isValidReview, updateReview } from "./storage.js";

const userReviewHeading = document.querySelector(".user-review-heading")
const userReviewBody = document.querySelector(".user-review-body")

const updateReviewModal = document.querySelector(".update-review-modal")
const editReviewButton = document.querySelector("#edit-review-button")
const cancelEditReviewButton = document.querySelector(".update-review-cancel")
const updateReviewConfirmButton = document.querySelector(".update-review-confirm")
const reviewHeadingInput = document.querySelector("#update-review-heading")
const reviewBodyInput = document.querySelector("#update-review-body")

const movieIdString = new URLSearchParams(window.location.search).get("id")
const movieId = Number(movieIdString);

await renderMoviePageHero(movieId);
renderMovieCast(await getMovieCast(movieId));
renderUserReviews(movieId)

editReviewButton.addEventListener("click", ()=> {
    if (findInCollection(movieId)){
         updateReviewModal.showModal()
    } else {
        alert("Add the movie to your collection before writing a review!")
    }
})

cancelEditReviewButton.addEventListener("click", ()=> {
    updateReviewModal.close()
})

updateReviewConfirmButton.addEventListener("click", ()=> {

    if (isValidReview(reviewHeadingInput.value,reviewBodyInput.value))

        try {
            updateReview(movieId,reviewHeadingInput.value,reviewBodyInput.value)
            renderUserReviews(movieId)

        } catch {
            console.error("Failed to update review")
        }

        else {
            alert("Please write a valid review.")
        }

    updateReviewModal.close()

})
