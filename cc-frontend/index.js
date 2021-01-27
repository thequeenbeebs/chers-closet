let CURRENT_USER = ""

addEventListener("DOMContentLoaded", ()=> {
    userLogin()
})

function renderClothing(clothing) {
    let getLocation = document.querySelector("#card-container")
    let div = document.getElementById(`clothing-${clothing.id}`)
    
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
        button1.addEventListener('click', () => renderEditClothingForm(clothing))
    let button2 = document.createElement("button")
        button2.innerHTML = "Delete Item"
        button2.addEventListener('click', () => deleteItem(clothing))
    if (div) {
        div.append(header, image, brand, category, paragraph, button1, button2)
    } else {
        div = document.createElement("div")
        div.id = `clothing-${clothing.id}`
        div.classList.add("card")
        div.append(header, image, brand, category, paragraph, button1, button2)
        getLocation.append(div)
    }
}
function getOutfits (){
    fetch('http://localhost:3000/outfits/')
    .then(r => r.json())
    .then((outfitData) => {
        
        outfitData.forEach(renderOutfits)
    })

}
function renderOutfits(outfit) {
    let getLocation = document.querySelector("#outfit-container")
    let div = document.createElement("div")
    div.classList.add("card")

    let header = document.createElement("h2")
        header.innerHTML = outfit.name
    let season = document.createElement('p')
        season.innerHTML = outfit.season
    let occasion = document.createElement('p')
        occasion.innerHTML = outfit.occasion
    let button1 = document.createElement("button")
        button1.innerHTML = "Edit Item"
    let button2 = document.createElement("button")
        button2.innerHTML = "Delete Item"

    div.append(header, season, occasion, button1, button2)
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
        outfitButton.addEventListener('click', () => getOutfits(user.outfits))
    navbar.append(outfitButton, clothingButton)
    document.getElementById("login").remove()
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
    let category = document.createElement('select')
        let categoriesArray = ['Tops', 'Sweaters', 'Pants', 'Shorts', 'Skirts', 'Dresses', 'Jackets', 'Shoes', 'Bags', 'Jewelry']
        category.name = "category"
        category.placeholder = "category"
        categoriesArray.forEach(categoruy)
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
    fetch(`http://localhost:3000/clothings/${clothing.id}`, {method: "DELETE"})
    let index = CURRENT_USER.clothings.indexOf(clothing)
    CURRENT_USER.clothings.splice(index, 1)
    viewClothing(CURRENT_USER.clothings)
}

function renderEditClothingForm(clothing) {
    let form = document.createElement('form')
        form.addEventListener('submit', (event) => updateItem(event, clothing))
    let name = document.createElement('input')
        name.type = "text"
        name.name = "name"
        name.value = clothing.name
    let brand = document.createElement('input')
        brand.type = "text"
        brand.name = "brand"
        brand.value = clothing.brand
    let category = document.createElement('input')
        category.type = "text"
        category.name = "category"
        category.value = clothing.category
    let color = document.createElement('input')
        color.type = "text"
        color.name = "color"
        color.value = clothing.color
    let image = document.createElement('input')
        image.type = "text"
        image.name = "image"
        image.value = clothing.image
    let submit = document.createElement('input')
        submit.type = "submit"
    form.append(name, brand, category, color, image, submit)
    document.getElementById(`clothing-${clothing.id}`).append(form)
}

function updateItem(event, clothing) {
    event.preventDefault()

    let updatedItem = {
        name: event.target.name.value,
        brand: event.target.brand.value,
        category: event.target.category.value,
        color: event.target.color.value,
        image: event.target.image.value
    }

    let reqPack = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify(updatedItem)
    }

    fetch(`http://localhost:3000/clothings/${clothing.id}`, reqPack)
        .then(resp => resp.json())
        .then(item => {
            document.getElementById(`clothing-${clothing.id}`).innerHTML = ""
            renderClothing(item)
        })
}