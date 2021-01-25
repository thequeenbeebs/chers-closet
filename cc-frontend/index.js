//JS GOES IN HERE

//add event listener for submit button
//grab the username submitted and finds it in DB
//if not found, create a new user
//load user home page with menu bar

//add event listener for view clothing
//if clicked, fetch and render all clothing items

addEventListener("DOMContentLoaded", ()=> {
    fetchClothing()
})

function fetchClothing() {

    fetch("http://localhost:3000/clothings")
    .then(clothing => clothing.json())
    .then(clothing => clothing.forEach(renderClothing))
}

function renderClothing(clothing) {
document.querySelector("#card-container")



}

//  <div id= "card-container">
// <div class="card">
//             <h2>Card</h2>
        
//           <img src="img_avatar.png" alt="Avatar" style="width:100%">
//           <div class="container">
//             <h4><b>John Doe</b></h4> 
//             <p>Architect & Engineer</p> 
//           </div>
//         </div>
//         </div>

// function userLogin() {
//     document.getElementById('login').addEventListener('submit', (event) => {
//         event.preventDefault()
//         debugger
//     })
// }
