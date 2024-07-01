const links = document.querySelectorAll(".menu a");
let gamesData = [];
const loading = document.querySelector(".loading");
getGames("mmorpg");

for (let i = 0; i < links.length; i++) { //3lshan al navbar
   links[i].addEventListener("click", function (e) {
      document.querySelector(".menu .active").classList.remove("active");
      links[i].classList.add("active");
      const category = e.target.innerText; 
      console.log(category); 
      getGames(category); 
   });
}
async function getGames(categoryName) {
   loading.classList.remove("d-none"); 
   const options = {
      method: "GET",
      headers: {
         "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
         "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
   };
   const apiResponse = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`, options);
   const data = await apiResponse.json();
   gamesData = data;
   displayData();
   loading.classList.add("d-none"); // a-Hide al loading
}
function showDetails(id) {
    location.href = `./details.html?id=${id}`;
 }
function displayData() {
   let gamesBox = ``;
   for (let i = 0; i < gamesData.length; i++) {
     gamesBox += `
      <div class="col">
      <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)" onclick="showDetails(${gamesData[i].id})" class="card h-100 bg-transparent" role="button" >
         <div class="card-body">
            <figure class="position-relative">
               <img class="card-img-top object-fit-cover h-100" src="${gamesData[i].thumbnail}" />
            </figure>
            <figcaption>
               <div class="hstack justify-content-between">
                  <h3 class="h6 small"> ${gamesData[i].title} </h3>
                  <span class="badge text-bg-primary p-2">Free</span>
               </div>
               <p class="card-text small text-center opacity-50">
                  ${gamesData[i].short_description}
               </p>
            </figcaption>
         </div>
         <footer class="card-footer small hstack justify-content-between">
            <span class="badge badge-color">${gamesData[i].genre}</span>
            <span class="badge badge-color">${gamesData[i].platform}</span>
         </footer>
      </div>
   </div>
      `;}
   document.getElementById("gameData").innerHTML = gamesBox;
}


