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
    
    div.append(header, image, brand, category, paragraph, button1, button2)
    getLocation.append(div)
    

}
{/* <div class="card">
                <h2>Dummy Card</h2>
                <img src="img_avatar.png" alt="Avatar" style="width:100%">
                <h4><b>John Doe</b></h4> 
                <p>Architect & Engineer</p> 
                <button>Edit Item</button>
                <button>Delete Item</button>
            </div> */}

//log in functionality -- work in progress
function userLogin() {
    document.getElementById('login').addEventListener('submit', (event) => {
        event.preventDefault()
        let username = event.target.username.value
        fetch(`http://localhost:3000/users/${username}`)
        .then(resp => resp.json())
        .then(user => console.log(user))
        //pull that person's clothing

        //rails find by username or create in user controller
        //make current user as an empty object
    })
}
