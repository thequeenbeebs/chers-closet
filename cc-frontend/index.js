//JS GOES IN HERE

//add event listener for submit button
//grab the username submitted and finds it in DB
//if not found, create a new user
//load user home page with menu bar

//add event listener for view clothing
//if clicked, fetch and render all clothing items

document.addEventListener('DOMContentLoaded', () => {
    userLogin()
})

function userLogin() {
    document.getElementById('login').addEventListener('submit', (event) => {
        event.preventDefault()
        debugger
    })
}