


const buscador = document.getElementById("buscador")
const btnBuscar = document.getElementById("btnBuscar")
const topAnimes = document.querySelector(".c-top")



const animesTop = () =>{

  const xhr  = new XMLHttpRequest()
  xhr.open("GET", "https://api.jikan.moe/v4/anime") //construir la peticion
  xhr.responseType = "json"
  xhr.send() //Realizar la peticion

  xhr.addEventListener("load", (e)=>{
    
    //console.log(xhr.response)
    //console.log(JSON.parse(xhr.response))
    //console.log(xhr.response)
    //console.log(e.target.response)

   const animesData = xhr.response.data;
   let cartas = ""

   animesData.forEach(anime => {

    cartas += `
      <div class="c-card">
        <img src="${anime.images.jpg.image_url}" alt="Yaiza" class="c-card__img">
        <p class="c-card__titulo">${anime.title}</p>
      </div>
    
    `
   });
   
   topAnimes.innerHTML =cartas
  
  })
}


function searchAnime (nombre){

  const xhr = new XMLHttpRequest()
  xhr.open("GET", `https://api.jikan.moe/v4/anime?q="${nombre}"`)
  xhr.responseType = "json"
  xhr.send()

  xhr.addEventListener("load", ()=>{
      const searchList = xhr.response.data

      let cartas = ""

      searchList.forEach(anime => {
   
       cartas += `
         <div class="c-card">
           <img src="${anime.images.jpg.image_url}" alt="Yaiza" class="c-card__img">
           <p class="c-card__titulo">${anime.title}</p>
         </div>
       
       `
      });
      
      topAnimes.innerHTML =cartas
  })

}

animesTop()

btnBuscar.addEventListener("click", ()=>{
  searchAnime(buscador.value)
})





