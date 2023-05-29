function load() {
    
    let url = 'https://api.themoviedb.org/3/movie/now_playing';
    let html = 'listNov'
    cargarPeliculasNov(url, html);

    url = 'https://api.themoviedb.org/3/movie/top_rated';
    html = 'listVistas'
    cargarMasVistas(url, html);
     
  }
  
document.addEventListener("DOMContentLoaded", load, false);

let paginaNov = 1;
const btnAnteriorNov = document.getElementById('btnAnteriorNov');
const btnSiguienteNov = document.getElementById('btnSiguienteNov');


//PASA A LA SIGUENTE PAGINA DE PELICULAS
btnSiguienteNov.addEventListener('click', () => {
	if(paginaNov < 1000){
		paginaNov += 1;
        let url = 'https://api.themoviedb.org/3/movie/now_playing';
    let html = 'listNov'
    cargarPeliculasNov(url, html);
		
	}
});

//RETROCEDE A LA PAGINA ANTERIROR DE PELICULAS
btnAnteriorNov.addEventListener('click', () => {
	if(paginaNov > 1){
		paginaNov -= 1;
		let url = 'https://api.themoviedb.org/3/movie/now_playing';
    let html = 'listNov'
    cargarPeliculasNov(url, html);
	}
});



//CARGA LAS PELICULAS TENDENCIAS
const cargarPeliculasNov = async(url, html) => {
 

    try{

    
    const respuestaNov =  await fetch(`${url}?api_key=a60070faf034ecaa57adbea4299c3a88&language=es-ES&page=${paginaNov}`)
    
    const datosNov = await respuestaNov.json()
  
    let peliculasNov = '';

    //CREA LOS CARD DE LAS PELICULAS
    datosNov.results.forEach(peliculaNov => {
        const fecha = convertirFecha(peliculaNov.release_date);
        peliculasNov += `
        <div class="card">
        
        <a class="boton" href="#" onclick='obtenerVideo(${peliculaNov.id}, "${peliculaNov.title}", "${peliculaNov.overview.replace(/['"]+/g, '')}", "movie");'><i class="fas fa-eye"></i></a>

       
        <img src="https://image.tmdb.org/t/p/w500/${peliculaNov.poster_path}" class="avatar">
        <div class="content">
        
        <div><img src="img/star.png" width="" height="20"></img>${peliculaNov.vote_average}</div></br>
        <div>${peliculaNov.title}</div></br>
        <div class="fecha">${fecha}</div>
    </div>
        </div>
    `;
    });

    document.getElementById(html).innerHTML = peliculasNov;


}catch(error){
    console.log(error)
}
}




//CARGA LAS PELICULAS TENDENCIAS
const cargarMasVistas = async(url, html) => {
 

    try{

    
    const respuestaNov =  await fetch(`${url}?api_key=a60070faf034ecaa57adbea4299c3a88&language=es-ES&page=${paginaNov}`)
    
    const datosNov = await respuestaNov.json()
        let i = 1;
    let peliculasNov = '';

    //CREA LOS CARD DE LAS PELICULAS
    datosNov.results.slice(0, 10).forEach(peliculaNov => {

        const fecha = convertirFecha(peliculaNov.release_date);
        
        peliculasNov += `
        <div class="card">
        
        <a class="boton" href="#" onclick='obtenerVideo(${peliculaNov.id}, "${peliculaNov.title}", "${peliculaNov.overview.replace(/['"]+/g, '')}", "movie");'><i class="fas fa-eye"></i></a>
        <a class="botonRan" href="#">#${i}</a>
       
        <img src="https://image.tmdb.org/t/p/w500/${peliculaNov.poster_path}" class="avatar">
        <div class="content">
        
         
        <div><img src="img/star.png" width="" height="20"></img>${peliculaNov.vote_average}</div></br>
        <div>${peliculaNov.title}</div></br>
        <div class="fecha">${fecha}</div>
    </div>
        </div>
    `;
    i += 1;
    });

    document.getElementById(html).innerHTML = peliculasNov;


}catch(error){
    console.log(error)
}
}

document.getElementById('flecha-derechaNov').onclick = function(){
    const widthItem = document.querySelector('.card').offsetWidth;
    document.getElementById('contentListNov').scrollLeft += widthItem;
  }
  document.getElementById('flecha-izquierdaNov').onclick = function(){
    const widthItem = document.querySelector('.card').offsetWidth;
    document.getElementById('contentListNov').scrollLeft -= widthItem;
  }



  //CARGA LAS PELICULAS TENDENCIAS
const peliculaPrincipal = async() => {

    let arrRan = []
    
    try{

    const ran = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=a60070faf034ecaa57adbea4299c3a88&language=es-ES&page=1`)

    const datosRan = await ran.json()

    datosRan.results.forEach(peliculaRan => {
        arrRan.push(peliculaRan.id)
    });
    var rand = Math.floor(Math.random()*arrRan.length);
    var peliRandom = arrRan[rand];
   
    const respuestaNov =  await fetch(`https://api.themoviedb.org/3/movie/${peliRandom}?api_key=a60070faf034ecaa57adbea4299c3a88&language=es-ES`)
    
    const datosPrin = await respuestaNov.json()
       
    let peliculasPrin = '';

    //CREA LOS CARD DE LAS PELICULAS

        
        peliculasPrin += `
       
        <img src="https://image.tmdb.org/t/p/original/${datosPrin.backdrop_path}" alt="">

        <div class="pelicula-content">
        <h3 class="titulo">${datosPrin.title}</h3>
    <p>${datosPrin.overview}</p>
    <button role="button" onclick='obtenerVideo(${datosPrin.id}, "${datosPrin.title}", "${datosPrin.overview.replace(/['"]+/g, '')}", "movie");' class="boton"><i class="fas fa-play"></i>Información</button>
  </div>
    
    `;



    document.getElementById('peliculasPrincipales').innerHTML = peliculasPrin;


}catch(error){
    console.log(error)
}
}

peliculaPrincipal()

//CAMBIA DE PELICULA PRINCIPAL CADA 12seg
setInterval(peliculaPrincipal, 12000)

 