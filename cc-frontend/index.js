//JS GOES IN HERE

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