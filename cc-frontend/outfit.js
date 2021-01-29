
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
    let div = document.getElementById(`outfit-${outfit.id}`)
    let header = document.createElement("h2")
        header.innerHTML = outfit.name
    let clothingContainer = document.createElement('div')
        clothingContainer.classList.add("outfit-images")
    outfit.clothings.forEach(item => {
        let img = document.createElement('img')
            img.src = item.image
        clothingContainer.append(img)
    })
    let season = document.createElement('p')
        season.innerHTML = outfit.season
    let occasion = document.createElement('p')
        occasion.innerHTML = outfit.occasion
    let button1 = document.createElement("button")
        button1.innerHTML = "Edit Outfit"
        button1.addEventListener('click', () => renderEditOutfitForm(outfit))
    let button2 = document.createElement("button")
        button2.innerHTML = "Delete Outfit"
        button2.addEventListener('click', () => deleteOutfit(outfit))
    if (div) {
            div.innerHTML = ""
            div.append(header, clothingContainer, season, occasion, button1, button2)
    } else {
            div = document.createElement("div")
            div.id = `outfit-${outfit.id}`
            div.classList.add("outfit-card")
            div.append(header, clothingContainer, season, occasion, button1, button2)
            getLocation.append(div)
    }
}

// CREATE FUNCTIONS 

function renderAddOutfitForm() {
    let container = document.getElementById('create-container')
        container.innerHTML = ""
    let form = document.createElement('form')
        form.id = "create-outfit-form"
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
    let clothingDiv = document.createElement('div')
    CURRENT_USER.clothings.forEach(item => {
        let clothingOption = document.createElement('input')
            clothingOption.type = "checkbox"
            clothingOption.id = item.id
            clothingOption.value = item.id
            clothingOption.name = `clothing-${item.id}`
        let clothingLabel = document.createElement('label')
            clothingLabel.for = item.id
            clothingLabel.innerHTML = item.name
        let br = document.createElement('br')
            clothingDiv.append(clothingOption, clothingLabel, br)
    })
    let submit = document.createElement('input')
        submit.type = "submit"
    form.append(name, season, occasion, clothingDiv, submit)
    container.append(form)
}

function createOutfit(event) {
    event.preventDefault()
    
    let newOutfit = {
        name: event.target.name.value,
        season: event.target.season.value,
        occasion: event.target.occasion.value,
        user_id: CURRENT_USER.id
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
        .then(outfit =>  {
            CURRENT_USER.outfits.push(outfit)
            let checkboxes = document.querySelectorAll("input[type='checkbox']");
                checkboxes.forEach(box => {
                    if (box.checked) {
                        let item = CURRENT_USER.clothings.find(item => item.id === parseInt(box.id))
                        let outfit = CURRENT_USER.outfits[CURRENT_USER.outfits.length - 1]
                        createOutfitClothing(item, outfit)
                    }
            })
    document.getElementById('create-container').innerHTML = ""
    let addButton = document.createElement('button')
        addButton.innerHTML = "Add Outfit"
        addButton.addEventListener('click', () => renderAddOutfitForm())
    document.getElementById('create-container').append(addButton)
        })
}

function createOutfitClothing(item, outfit) {
    let newOutfitClothing = {
        clothing_id: item.id,
        outfit_id: outfit.id
    }
    
    let reqPack = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "POST",
        body: JSON.stringify(newOutfitClothing)
    }

    fetch('http://localhost:3000/outfit_clothings', reqPack)
        .then(resp => resp.json())
        .then(data => {
            let outfit = CURRENT_USER.outfits.find(outfit => outfit.id === data.outfit_id)
            let clothing = CURRENT_USER.clothings.find(item => item.id === data.clothing_id)
            if (outfit.clothings) {
                outfit.clothings.push(clothing)
            } else {
                outfit.clothings = [clothing]
            }
            renderOutfits(outfit)
        })
}

// UPDATE FUNCTIONS

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
    let clothingDiv = document.createElement('div')
    CURRENT_USER.clothings.forEach(item => {
        let clothingOption = document.createElement('input')
            clothingOption.type = "checkbox"
            clothingOption.id = item.id
            clothingOption.value = item.id
            clothingOption.name = `clothing-${item.id}`
        let clothingLabel = document.createElement('label')
            clothingLabel.for = item.id
            clothingLabel.innerHTML = item.name
        let br = document.createElement('br')
        clothingDiv.append(clothingOption, clothingLabel, br)
        })
    let submit = document.createElement('input')
        submit.type = "submit"
    form.append(name, season, occasion, clothingDiv, submit)
    document.getElementById(`outfit-${outfit.id}`).innerHTML = ""
    document.getElementById(`outfit-${outfit.id}`).append(form)
}

function updateOutfit(event, originalOutfit) {
    event.preventDefault()

    let originalClothings = []
        originalOutfit.clothings.forEach(item => originalClothings.push(item))

    let editedOutfit = {
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
        body: JSON.stringify(editedOutfit)
    }

    fetch(`http://localhost:3000/outfits/${originalOutfit.id}`, reqPack)
        .then(resp => resp.json())
        .then(updatedOutfit => {
    
            let updatedClothing = []
            let checkboxes = document.querySelectorAll("input[type='checkbox']")
                checkboxes.forEach(box => {
                    if (box.checked) {
                        updatedClothing.push(box)
                    }
            })
            updatedClothing.forEach(newItem => {
                originalClothings.forEach(oldItem => {
                    if (parseInt(newItem.id) === oldItem.id) {
                        let index = updatedClothing.indexOf(newItem)
                        updatedClothing.splice(index, 1)
                        let otherIndex = originalClothings.indexOf(oldItem)
                        originalClothings.splice(otherIndex, 1)
                    }
                })

            //what's left in updatedClothing needs to create
            updatedClothing.forEach(item => createOutfitClothing(item, updatedOutfit))
            //what's left in originalClothing needs to delete
            originalClothings.forEach(item => deleteOutfitClothing(item, updatedOutfit))
            })
        })
}

// DELETE FUNCTIONS

function deleteOutfit(outfit) {
    fetch(`http://localhost:3000/outfits/${outfit.id}`, {method: "DELETE"})
    let index = CURRENT_USER.outfits.indexOf(outfit)
    CURRENT_USER.outfits.splice(index, 1)
    viewOutfits(CURRENT_USER.outfits)
}

function deleteOutfitClothing(item, outfit) {
    // find outfitclothing based on item id and outfit id
    //delete it 
    console.log('a work in progress')
}