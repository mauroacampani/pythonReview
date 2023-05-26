
let paginaNov = 1;
const btnAnteriorNov = document.getElementById('btnAnteriorNovSerie');
const btnSiguienteNov = document.getElementById('btnSiguienteNovSerie');


//PASA A LA SIGUENTE PAGINA DE PELICULAS
btnSiguienteNov.addEventListener('click', () => {
	if(paginaNov < 1000){
		paginaNov += 1;
        let url = 'https://api.themoviedb.org/3/tv/airing_today';
    let html = 'listNovSerie'
    cargarSeriesNov(url, html);
		
	}
});

//RETROCEDE A LA PAGINA ANTERIROR DE PELICULAS
btnAnteriorNov.addEventListener('click', () => {
	if(paginaNov > 1){
		paginaNov -= 1;
		let url = 'https://api.themoviedb.org/3/tv/airing_today';
    let html = 'listNovSerie'
    cargarSeriesNov(url, html);
	}
});



function load() {
    
    let url = 'https://api.themoviedb.org/3/tv/airing_today';
    let html = 'listNovSerie'
    cargarSeriesNov(url, html);

    url = 'https://api.themoviedb.org/3/tv/top_rated';
    html = 'listVistasSerie'
    cargarSeriesMasVistas(url, html);
     
  }
  
document.addEventListener("DOMContentLoaded", load, false);


//CARGA LAS PELICULAS TENDENCIAS
const cargarSeriesNov = async(url, html) => {
 

    try{

    
    const respuestaNov =  await fetch(`${url}?api_key=a60070faf034ecaa57adbea4299c3a88&language=es-ES&page=${paginaNov}`)
    
    const datosNov = await respuestaNov.json()
  
    let seriesNov = '';

    //CREA LOS CARD DE LAS PELICULAS
    datosNov.results.forEach(serieNov => {
        
        seriesNov += `
        <div class="card">
        
        <a class="boton" href="#" onclick='obtenerVideo(${serieNov.id}, "${serieNov.original_name}", "${serieNov.overview}", "tv");'><i class="fas fa-eye"></i></a>

       
        <img src="https://image.tmdb.org/t/p/w500/${serieNov.poster_path}" class="avatar">
        <div class="content">
        
        <table width="100%" cellspacing="0">
        <tr>
				<td><img src="img/star.png" width="20" height="20"></img></td>
				<td>${serieNov.vote_average}</td>
			</tr>
            <tr>
                <td style="text-align: left;"><p>${serieNov.original_name}</p></td>
               
            </tr>

            
        </table>
    </div>
        </div>
    `;
    });

    document.getElementById(html).innerHTML = seriesNov;


}catch(error){
    console.log(error)
}
}




//CARGA LAS PELICULAS TENDENCIAS
const cargarSeriesMasVistas = async(url, html) => {
 

    try{

    
    const respuestaNov =  await fetch(`${url}?api_key=a60070faf034ecaa57adbea4299c3a88&language=es-ES&page=${paginaNov}`)
    
    const datosNov = await respuestaNov.json()
        let i = 1;
    let seriesNov = '';

    //CREA LOS CARD DE LAS PELICULAS
    datosNov.results.slice(0, 10).forEach(serieNov => {
        
        seriesNov += `
        <div class="card">
        
        <a class="boton" href="#" onclick='obtenerVideo(${serieNov.id}, "${serieNov.original_name}", "${serieNov.overview}", "tv");'><i class="fas fa-eye"></i></a>
        <a class="botonRan" href="#">${i}</a>
       
        <img src="https://image.tmdb.org/t/p/w500/${serieNov.poster_path}" class="avatar">
        <div class="content">
        
        <table width="100%" cellspacing="0">
        <tr>
				<td><img src="img/star.png" width="20" height="20"></img></td>
				<td>${serieNov.vote_average}</td>
			</tr>
            <tr>
                <td style="text-align: left;"><p>${serieNov.original_name}</p></td>
               
            </tr>

            
        </table>
    </div>
        </div>
    `;
    i += 1;
    });

    document.getElementById(html).innerHTML = seriesNov;


}catch(error){
    console.log(error)
}
}

document.getElementById('flecha-derechaNovSerie').onclick = function(){
    const widthItem = document.querySelector('.card').offsetWidth;
    document.getElementById('formListNovSerie').scrollLeft += widthItem;
  }
  document.getElementById('flecha-izquierdaNovSerie').onclick = function(){
    const widthItem = document.querySelector('.card').offsetWidth;
    document.getElementById('formListNovSerie').scrollLeft -= widthItem;
  }



  //CARGA LAS PELICULAS TENDENCIAS
const seriePrincipal = async() => {

    let arrRan = []
    
    try{

    const ran = await fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=a60070faf034ecaa57adbea4299c3a88&language=es-ES&page=1`)

    const datosRan = await ran.json()

    datosRan.results.forEach(serieRan => {
        arrRan.push(serieRan.id)
    });
    var rand = Math.floor(Math.random()*arrRan.length);
    var rValue = arrRan[rand];
    console.log(rValue)
    
    const respuestaNov =  await fetch(`https://api.themoviedb.org/3/tv/${rValue}?api_key=a60070faf034ecaa57adbea4299c3a88`)
    
    const datosPrin = await respuestaNov.json()
       
    let seriesPrin = '';

    //CREA LOS CARD DE LAS PELICULAS

        
        seriesPrin += `
       
        <img src="https://image.tmdb.org/t/p/original/${datosPrin.backdrop_path}" alt="">

        <div class="pelicula-content">
        <h3 class="titulo">${datosPrin.original_name}</h3>
    <p>${datosPrin.overview}</p>
    <button role="button" onclick='obtenerVideo(${datosPrin.id}, "${datosPrin.original_name}", "${datosPrin.overview}", "tv");' class="boton"><i class="fas fa-play"></i>Información</button>
  </div>
    
    `;



    document.getElementById('ss').innerHTML = seriesPrin;


}catch(error){
    console.log(error)
}
}

seriePrincipal()
setInterval(seriePrincipal, 15000)

 