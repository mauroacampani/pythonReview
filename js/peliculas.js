
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



function load() {
    
    let url = 'https://api.themoviedb.org/3/movie/now_playing';
    let html = 'listNov'
    cargarPeliculasNov(url, html);

    url = 'https://api.themoviedb.org/3/movie/top_rated';
    html = 'listVistas'
    cargarMasVistas(url, html);
     
  }
  
document.addEventListener("DOMContentLoaded", load, false);


//CARGA LAS PELICULAS TENDENCIAS
const cargarPeliculasNov = async(url, html) => {
 

    try{

    
    const respuestaNov =  await fetch(`${url}?api_key=a60070faf034ecaa57adbea4299c3a88&language=es-ES&page=${paginaNov}`)
    
    const datosNov = await respuestaNov.json()
  
    let peliculasNov = '';

    //CREA LOS CARD DE LAS PELICULAS
    datosNov.results.forEach(peliculaNov => {
        
        peliculasNov += `
        <div class="card">
        
        <a class="boton" href="#" onclick='obtenerVideo(${peliculaNov.id}, "${peliculaNov.title}", "${peliculaNov.overview}", "movie");'><i class="fas fa-eye"></i></a>

       
        <img src="https://image.tmdb.org/t/p/w500/${peliculaNov.poster_path}" class="avatar">
        <div class="content">
        
        <table width="100%" cellspacing="0">
        <tr>
				<td><img src="img/star.png" width="20" height="20"></img></td>
				<td>${peliculaNov.vote_average}</td>
			</tr>
            <tr>
                <td style="text-align: left;"><p>${peliculaNov.title}</p></td>
               
            </tr>

            
        </table>
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
        
        peliculasNov += `
        <div class="card">
        
        <a class="boton" href="#" onclick='obtenerVideo(${peliculaNov.id}, "${peliculaNov.title}", "${peliculaNov.overview}", "movie");'><i class="fas fa-eye"></i></a>
        <a class="botonRan" href="#">${i}</a>
       
        <img src="https://image.tmdb.org/t/p/w500/${peliculaNov.poster_path}" class="avatar">
        <div class="content">
        
        <table width="100%" cellspacing="0">
        <tr>
				<td><img src="img/star.png" width="20" height="20"></img></td>
				<td>${peliculaNov.vote_average}</td>
			</tr>
            <tr>
                <td style="text-align: left;"><p>${peliculaNov.title}</p></td>
               
            </tr>

            
        </table>
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
    document.getElementById('formListNov').scrollLeft += widthItem;
  }
  document.getElementById('flecha-izquierdaNov').onclick = function(){
    const widthItem = document.querySelector('.card').offsetWidth;
    document.getElementById('formListNov').scrollLeft -= widthItem;
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
    var rValue = arrRan[rand];
    console.log(rValue)
    
    const respuestaNov =  await fetch(`https://api.themoviedb.org/3/movie/${rValue}?api_key=a60070faf034ecaa57adbea4299c3a88`)
    
    const datosPrin = await respuestaNov.json()
       
    let peliculasPrin = '';

    //CREA LOS CARD DE LAS PELICULAS

        
        peliculasPrin += `
       
        <img src="https://image.tmdb.org/t/p/original/${datosPrin.backdrop_path}" alt="">

        <div class="pelicula-content">
        <h3 class="titulo">${datosPrin.title}</h3>
    <p>${datosPrin.overview}</p>
    <button role="button" onclick='obtenerVideo(${datosPrin.id}, "${datosPrin.title}", "${datosPrin.overview}", "movie");' class="boton"><i class="fas fa-play"></i>Información</button>
  </div>
    
    `;



    document.getElementById('pp').innerHTML = peliculasPrin;


}catch(error){
    console.log(error)
}
}

peliculaPrincipal()
setInterval(peliculaPrincipal, 15000)

 