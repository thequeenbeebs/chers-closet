let CURRENT_USER = ""
let CATEGORIES_ARRAY = ['tops', 'sweaters', 'pants', 'shorts', 'skirts', 'dresses', 'jackets', 'shoes', 'bags', 'jewelry']

document.addEventListener("DOMContentLoaded", ()=> {
    userLogin()
})

function userLogin() {
    document.getElementById('login').addEventListener('submit', (event) => {
        event.preventDefault()
        let username = event.target.username.value
        fetch(`http://localhost:3000/users/${username}`)
        .then(resp => resp.json())
        .then(user => {
            CURRENT_USER = user
            document.querySelector('h1').innerHTML = `${user.username}'s Closet`
            renderUserPage(user)
        })
    })
}

function renderUserPage(user) {
    let navbar = document.getElementById("navbar")
    let clothingButton = document.createElement("button")
        clothingButton.innerHTML = "View Clothing"
        clothingButton.classList.add('right')
        clothingButton.classList.add('nav-buttons')
        clothingButton.addEventListener('click', () => viewClothing(user.clothings))
    let outfitButton = document.createElement("button")
        outfitButton.innerHTML = "View Outfits"
        outfitButton.classList.add('right')
        outfitButton.classList.add('nav-buttons')
        outfitButton.addEventListener('click', () => viewOutfits(user.outfits))
    navbar.append(outfitButton, clothingButton)
    document.getElementById("login").remove()
}