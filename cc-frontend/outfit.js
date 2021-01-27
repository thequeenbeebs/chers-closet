
// READ FUNCTIONS

function viewOutfits(outfits) {
    document.getElementById('card-container').innerHTML = ""
    document.getElementById('create-container').innerHTML = ""
    document.getElementById('footer').innerHTML = ""
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
    div.id = `outfit-${outfit.id}`

    let header = document.createElement("h2")
        header.innerHTML = outfit.name
    let season = document.createElement('p')
        season.innerHTML = outfit.season
    let occasion = document.createElement('p')
        occasion.innerHTML = outfit.occasion
    let button1 = document.createElement("button")
        button1.innerHTML = "Edit Item"
        button1.addEventListener('click', () => renderEditOutfitForm(outfit))
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

function renderEditOutfitForm(outfit) {
    let form = document.createElement('form')
        form.addEventListener('submit', (event) => updateOutfit(event, outfit))
    let name = document.createElement('input')
        name.type = "text"
        name.name = "name"
        name.value = outfit.name
    let season = document.createElement('input')
        season.type = "text"
        season.name = "season"
        season.value = outfit.season
    let occasion = document.createElement('input')
        occasion.type = "text"
        occasion.name = "occasion"
        occasion.value = outfit.occasion
    let submit = document.createElement('input')
        submit.type = "submit"
    form.append(name, season, occasion, submit)
    document.getElementById(`outfit-${outfit.id}`).append(form)
}

// UPDATE FUNCTIONS

function updateOutfit(event, outfit) {
    event.preventDefault()

    let updatedOutfit = {
        name: event.target.name.value,
        season: event.target.season.value,
        occasion: event.target.occasion.value,
    }

    let reqPack = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify(updatedOutfit)
    }

    fetch(`http://localhost:3000/outfits/${outfit.id}`, reqPack)
        .then(resp => resp.json())
        .then(item => {
            document.getElementById(`outfit-${outfit.id}`).innerHTML = ""
            renderOutfit(item)
        })
}