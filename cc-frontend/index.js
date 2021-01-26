addEventListener("DOMContentLoaded", ()=> {
    userLogin()
    fetchClothing()
})

function fetchClothing() {
    fetch("http://localhost:3000/clothings")
    .then(clothing => clothing.json())
    .then(clothing => clothing.forEach(renderClothing))
}

//need to finish creating card/rendering clothing
function renderClothing(clothing) {
    document.querySelector("#card-container")

}

//log in functionality -- work in progress
function userLogin() {
    document.getElementById('login').addEventListener('submit', (event) => {
        event.preventDefault()
        let username = event.target.username.value
        //fetch array of objects of all users
        //find object where the usernames are the same
        //pull that person's clothing

        //rails find by username or create in user controller
        //make current user as an empty object
    })
}
