
// READ FUNCTIONS

function viewOutfits(outfits) {
    document.getElementById('card-container').innerHTML = ""
    document.getElementById('create-container').innerHTML = ""
    let addButton = document.createElement('button')
        addButton.innerHTML = "Add Outfit"
        addButton.addEventListener('click', () => renderAddOutfitForm())
    document.getElementById('create-container').append(addButton)
    outfits.forEach(renderOutfits)
    
}
function renderOutfits(outfit) {
    let getLocation = document.querySelector("#card-container")
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

// CREATE FUNCTIONS 

function renderAddOutfitForm() {
    let container = document.getElementById('create-container')
        container.innerHTML = ""
    let form = document.createElement('form')
    form.addEventListener('submit', (event)=> createOutfit(event))
    let name = document.createElement('input')
        name.type = "text"   
        name.name = "name"
        name.placeholder = "outfit name"
    let season = document.createElement('input')
        season.type = "text"
        season.name = "season"
        season.placeholder = "season"
    let occasion = document.createElement('input')
        occasion.type = "text"
        occasion.name = "occasion"
        occasion.placeholder = "occasion"
    let submit = document.createElement('input')
        submit.type = "submit"
    form.append(name, season, occasion, submit)
    container.append(form)
}

function createOutfit(event) {
    event.preventDefault()
    document.getElementById('create-container').innerHTML = ""
    let addButton = document.createElement('button')
        addButton.innerHTML = "Add Outfit"
        addButton.addEventListener('click', () => renderAddOutfitForm())
    document.getElementById('create-container').append(addButton)
    let newOutfit = {
        name: event.target.name.value,
        season: event.target.season.value,
        occasion: event.target.occasion.value

    }

    let reqPack = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(newOutfit)
    }

    fetch('http://localhost:3000/outfits', reqPack)
        .then(r => r.json())
        .then(outfit =>  renderOutfits(outfit))
}