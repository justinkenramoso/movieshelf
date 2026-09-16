import { renderMovieCast, renderMoviePageHero, renderUserRating, renderUserReviews } from "./ui.js";
import { getMovieCast } from "./api.js";
import { findInCollection, isValidRating, isValidReview, updateReview, updateRating } from "./storage.js";

const updateReviewModal = document.querySelector(".update-review-modal")
const editReviewButton = document.querySelector("#edit-review-button")
const cancelEditReviewButton = document.querySelector(".update-review-cancel")
const updateReviewConfirmButton = document.querySelector(".update-review-confirm")
const reviewHeadingInput = document.querySelector("#update-review-heading")
const reviewBodyInput = document.querySelector("#update-review-body")

const editRatingButton = document.querySelector("#edit-rating-button")
const userNewRating = document.querySelector("#user-new-rating")
const updateRatingModal = document.querySelector(".update-rating-modal")
const updateRatingCancel = document.querySelector(".update-rating-cancel")
const updateRatingConfirm = document.querySelector(".update-rating-confirm")


const movieIdString = new URLSearchParams(window.location.search).get("id")
const movieId = Number(movieIdString);

await renderMoviePageHero(movieId);
renderMovieCast(await getMovieCast(movieId));
renderUserReviews(movieId)
renderUserRating(movieId)

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

editRatingButton.addEventListener("click", ()=> {
    updateRatingModal.showModal()
})

updateRatingConfirm.addEventListener("click", ()=> {

    if(isValidRating(userNewRating.value)) {

        try {
            console.log(userNewRating.value)
            updateRating(movieId, userNewRating.value)
            renderUserRating(movieId)
        } catch (error) {
            console.error(`Failed to update rating : ${error.message}`)
        }

    } else {
        alert ("Please write a valid rating from 0-10")
    }

    updateRatingModal.close();


})

updateRatingCancel.addEventListener("click", () => {
    updateRatingModal.close()
})