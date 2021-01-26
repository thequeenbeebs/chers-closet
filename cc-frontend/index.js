let CURRENT_USER = ""

addEventListener("DOMContentLoaded", ()=> {
    userLogin()
})

function renderClothing(clothing) {
    let getLocation = document.querySelector("#card-container")
    let div = document.createElement("div")
        div.classList.add("card")
    let header = document.createElement("h2")
        header.innerHTML = clothing.name
    let image = document.createElement("img")
        image.src = clothing.image
    let brand = document.createElement("h4")
        brand.innerHTML = clothing.brand
    let category = document.createElement("p")
        category.innerHTML = clothing.category
    let paragraph = document.createElement("p")
        paragraph.innerHTML = clothing.color
    let button1 = document.createElement("button")
        button1.innerHTML = "Edit Item"
    let button2 = document.createElement("button")
        button2.innerHTML = "Delete Item"
        button2.addEventListener('click', () => deleteItem(clothing))
    
    div.append(header, image, brand, category, paragraph, button1, button2)
    getLocation.append(div)
}

function userLogin() {
    document.getElementById('login').addEventListener('submit', (event) => {
        event.preventDefault()
        let username = event.target.username.value
        fetch(`http://localhost:3000/users/${username}`)
        .then(resp => resp.json())
        .then(user => {
            CURRENT_USER = user
            renderUserPage(user)
        })
    })
}

function renderUserPage(user) {
    let navbar = document.getElementById("navbar")
    let welcome = document.createElement('h2')
        welcome.innerHTML = `Welcome, ${user.username}!`
    let clothingButton = document.createElement("button")
        clothingButton.innerHTML = "View Clothing"
        clothingButton.classList.add('right')
        clothingButton.addEventListener('click', () => viewClothing(user.clothings))
    let outfitButton = document.createElement("button")
        outfitButton.innerHTML = "View Outfits"
        outfitButton.classList.add('right')
    navbar.append(welcome, clothingButton, outfitButton)
    document.getElementById("login").remove()
   
    // add outfit button event listener 
}

function viewClothing(clothings) {
    document.getElementById('card-container').innerHTML = ""
    document.getElementById('create-container').innerHTML = ""
    let addButton = document.createElement('button')
        addButton.innerHTML = "Add Clothing Item"
        addButton.addEventListener('click', () => renderAddClothingForm())
    document.getElementById('create-container').append(addButton)
    clothings.forEach(renderClothing)
    
}

function renderAddClothingForm() {
    let container = document.getElementById('create-container')
        container.innerHTML = ""
    let form = document.createElement('form')
        form.addEventListener('submit', (event) => createClothing(event))
    let name = document.createElement('input')
        name.type = "text"
        name.name = "name"
        name.placeholder = "item name"
    let brand = document.createElement('input')
        brand.type = "text"
        brand.name = "brand"
        brand.placeholder = "brand name"
    let category = document.createElement('input')
        category.type = "text"
        category.name = "category"
        category.placeholder = "category"
    let color = document.createElement('input')
        color.type = "text"
        color.name = "color"
        color.placeholder = "color"
    let image = document.createElement('input')
        image.type = "text"
        image.name = "image"
        image.placeholder = "image url"
    let submit = document.createElement('input')
        submit.type = "submit"
    form.append(name, brand, category, color, image, submit)
    container.append(form)
}

function createClothing(event) {
    event.preventDefault()
    document.getElementById('create-container').innerHTML = ""
    let addButton = document.createElement('button')
        addButton.innerHTML = "Add Clothing Item"
        addButton.addEventListener('click', () => renderAddClothingForm())
    document.getElementById('create-container').append(addButton)
    let newClothing = {
        name: event.target.name.value,
        brand: event.target.brand.value,
        category: event.target.category.value,
        color: event.target.color.value,
        image: event.target.image.value,
        user_id: CURRENT_USER.id
    }
    let reqPack = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "POST",
        body: JSON.stringify(newClothing)
    }
    fetch('http://localhost:3000/clothings', reqPack)
        .then(resp => resp.json())
        .then(clothes => {
            renderClothing(clothes)})
}

function deleteItem(clothing) {
    console.log(clothing)
    clothing.id
}