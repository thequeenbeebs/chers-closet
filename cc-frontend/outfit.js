
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
        button1.innerHTML = "Edit Item"
        button1.addEventListener('click', () => renderEditOutfitForm(outfit))
    let button2 = document.createElement("button")
        button2.innerHTML = "Delete Item"
        button2.addEventListener('click', () => deleteOutfit(outfit))
    if (div) {
            div.append(header, clothingContainer, season, occasion, button1, button2)
    } else {
            div = document.createElement("div")
            div.id = `outfit-${outfit.id}`
            div.classList.add("card")
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
    let clothing = document.createElement('select')
        clothing.name = "clothingId"
        clothing.setAttribute("multiple", true)
        let placeholder = document.createElement('option')
            placeholder.innerHTML = "clothing"
            placeholder.setAttribute("disabled", true)
            placeholder.setAttribute("selected", true)
            placeholder.setAttribute("hidden", true)
        clothing.append(placeholder)
        CURRENT_USER.clothings.forEach(item => {
            let option = document.createElement('option')
                option.value = item.id
                option.innerHTML = item.name
                clothing.append(option)
        })
    // let plus = document.createElement('button')
    //     plus.innerHTML = "+"
    //     plus.addEventListener('click', () => addClothingInput())
    let submit = document.createElement('input')
        submit.type = "submit"
    form.append(name, season, occasion, clothing, submit)
    container.append(form)
}

// function addClothingInput() {
//     let clothing = document.createElement('select')
//         clothing.name = "clothingId"
//         let placeholder = document.createElement('option')
//             placeholder.innerHTML = "clothing"
//             placeholder.setAttribute("disabled", true)
//             placeholder.setAttribute("selected", true)
//             placeholder.setAttribute("hidden", true)
//         clothing.append(placeholder)
//         CURRENT_USER.clothings.forEach(item => {
//             let option = document.createElement('option')
//                 option.value = item.id
//                 option.innerHTML = item.name
//                 clothing.append(option)
//         })
//     let plus = document.createElement('button')
//         plus.innerHTML = "+"
//         plus.addEventListener('click', () => addClothingInput())
//     document.getElementById('create-outfit-form').append(clothing, plus)
// }

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
            debugger
            let clothings = [CURRENT_USER.clothings.find(item => {return item.id === parseInt(event.target.clothingId.value)})]
            clothings.forEach(item => createOutfitClothing(item, outfit))
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
            outfit.clothings = [clothing]
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
    let clothing = document.createElement('select')
        clothing.name = "clothing"
        let placeholder = document.createElement('option')
            placeholder.innerHTML = "clothing"
            placeholder.setAttribute("disabled", true)
            placeholder.setAttribute("selected", true)
            placeholder.setAttribute("hidden", true)
        clothing.append(placeholder)
        CURRENT_USER.clothings.forEach(item => {
            let option = document.createElement('option')
                option.value = item
                option.innerHTML = item.name
                clothing.append(option)
        })
    let submit = document.createElement('input')
        submit.type = "submit"
    form.append(name, season, occasion, clothing, submit)
    document.getElementById(`outfit-${outfit.id}`).append(form)
}

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
            renderOutfits(item)
        })
}

// DELETE FUNCTIONS

function deleteOutfit(outfit) {
    fetch(`http://localhost:3000/outfits/${outfit.id}`, {method: "DELETE"})
    let index = CURRENT_USER.outfits.indexOf(outfit)
    CURRENT_USER.outfits.splice(index, 1)
    viewOutfits(CURRENT_USER.outfits)
}