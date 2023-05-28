//MUESTRA MENU AL HACER CLIC EN BOTON DEL NAV
const toggle = document.querySelector('.toggle');
const menu = document.querySelectorAll('.item');


  toggle.addEventListener('click', () => {

    menu.forEach(item =>{   
    
    item.classList.toggle('active')
       

  });
 
});


document.getElementById('flecha-derecha').onclick = function(){
  const widthItem = document.querySelector('.card').offsetWidth;
  document.getElementById('formList').scrollLeft += widthItem;
}
document.getElementById('flecha-izquierda').onclick = function(){
  const widthItem = document.querySelector('.card').offsetWidth;
  document.getElementById('formList').scrollLeft -= widthItem;
}

document.getElementById('flecha-derecha-series').onclick = function(){
  const widthItem = document.querySelector('.card').offsetWidth;
  document.getElementById('formListSeries').scrollLeft += widthItem;
}
document.getElementById('flecha-izquierda-series').onclick = function(){
  const widthItem = document.querySelector('.card').offsetWidth;
  document.getElementById('formListSeries').scrollLeft -= widthItem;
}




let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

//PASA A LA SIGUENTE PAGINA DE PELICULAS
btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
	}
});

//RETROCEDE A LA PAGINA ANTERIROR DE PELICULAS
btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
});

function convertirFecha(fecha){
  const fecha1 = new Date(fecha);
  const formatoFecha = { day: '2-digit', month: 'short', year: 'numeric' };
  const fechaFormateada = fecha1.toLocaleDateString('es-ES', formatoFecha);

  return fechaFormateada;
}

//CARGA LAS PELICULAS TENDENCIAS
const cargarPeliculas = async() => {
   

    try{

    
    const respuesta =  await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=a60070faf034ecaa57adbea4299c3a88&language=es-ES&page=${pagina}`)
    

    const datos = await respuesta.json()
    
    let peliculas = '';

    //CREA LOS CARD DE LAS PELICULAS
    datos.results.forEach(pelicula => {

      const fecha = convertirFecha(pelicula.release_date);

        
        peliculas += `
        <div class="card">
        
        <a class="boton" href="#" onclick='obtenerVideo(${pelicula.id}, "${pelicula.title}", "${pelicula.overview.replace(/['"]+/g, '')}", "${pelicula.media_type}");'><i class="fas fa-eye"></i></a>

       
        <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="avatar">
        <div class="content">
        
        
        <div><img src="img/star.png" width="" height="20"></img>${pelicula.vote_average}</div></br>
        <div>${pelicula.title}</div></br>
        <div class="fecha">${fecha}</div>
    </div>
        </div>
    
    `;
    });

    document.getElementById('list').innerHTML = peliculas;

}catch(error){
    console.log(error)
}
}

cargarPeliculas()


let paginaSeries = 1;
const btnAnteriorSeries = document.getElementById('btnAnteriorSeries');
const btnSiguienteSeries = document.getElementById('btnSiguienteSeries');

//PASA A LA SIGUENTE PAGINA DE SERIES
btnSiguienteSeries.addEventListener('click', () => {
	if(paginaSeries < 1000){
		paginaSeries += 1;
		cargarSeries();
	}
});

//RETROCEDE A LA PAGINA ANTERIOR DE LAS SERIES
btnAnteriorSeries.addEventListener('click', () => {
	if(paginaSeries > 1){
		paginaSeries -= 1;
		cargarSeries();
	}
});

//OBTIENE LAS SERIES TENDENCIAS
const cargarSeries = async() => {
    try{

 
    
    const respuesta =  await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=a60070faf034ecaa57adbea4299c3a88&language=es-ES&page=${paginaSeries}`)
    
    
    const datosSeries = await respuesta.json()
    
    let series = '';
    
    //CREAR LOS CARD DE LAS SERIES
    datosSeries.results.forEach(serie => {

      const fecha = convertirFecha(serie.first_air_date);
        
        series += `
        <div class="card">
        <a class="boton" href="#" onclick='obtenerVideo(${serie.id}, "${serie.original_name}", "${serie.overview.replace(/['"]+/g, '')}", "${serie.media_type}");'><i class="fas fa-eye"></i></a>
        <img src="https://image.tmdb.org/t/p/w500/${serie.poster_path}" class="avatar">
        <div class="content">
        <div><img src="img/star.png" width="" height="20"></img>${serie.vote_average}</div></br>
        <div>${serie.original_name}</div></br>
        <div class="fecha">${fecha}</div>
        
    </div>
        </div>
    `;
    });

    document.getElementById('listSeries').innerHTML = series;

}catch(error){
    console.log(error)
}
}

cargarSeries()

//OBTNIENE VIDEO Y SINOPSIS
async function obtenerVideo(id, name, sinopsis, tipo){
 


  try{

  
  const respuesta =  await fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=a60070faf034ecaa57adbea4299c3a88&append_to_response=videos`)
  
  let video;
  let trailerSinopsis = '';
  const dataVideos = await respuesta.json()
  
  //SI HAY VIDEOS 
  if (dataVideos.videos.results !="") {

  //BUSCA EL TRAILER OFICIAL
  const trailer = dataVideos.videos.results.find(
      (vid) => vid.name === "Official Trailer"
      
    );

    //SI ENCONTRO EL TARILER OFICIAL SINO BUSCA EL PRIMER VIDEO QUE SE ENCUENTRE DISPONIBLE
    if (trailer){
      
      video = trailer.key
    }else{
      
      video = dataVideos.videos.results[0].key
    }
    
    //INSERTA HTML EN EL MODAL CON EL TRAILER
    trailerSinopsis += `

    <div class="title">
    <h2>${name}</h2>
    </div>
    <h4>Trailer</h4>
    <div id="tra" class="trailer">
    <iframe src="https://www.youtube.com/embed/${video}?enablejsapi=1" id="videoFrame" frameborder="0" allowfullscreen></iframe>
    </div>
    <div id="noTra"  style="display: none;">
    <p>Traile no disponible</p>
    </div>
    <h3>Sinopsis</h3>
    <p>${sinopsis}</p>
    `;
      
    
    
      
  

  }else{ 
    
    //INSERTA HTML EN EL MODAL SIN EL TRAILER
    trailerSinopsis += `

    <div class="title">
    <h2>${name}</h2>
    </div>
    <h4>Trailer</h4>
    <div id="noTra">
    <p>Traile no disponible</p>
    </div>
    <h3>Sinopsis</h3>
    <p>${sinopsis}</p>
    `;
      
    
    
     
  }
    
  

  document.getElementById('modalContent').innerHTML = trailerSinopsis;
        
  



}catch(error){
  console.log(error)
}

//MODAL TRAILER Y SINOPSIS
var modal = document.getElementById('myModal');
var closeBtn = modal.getElementsByClassName('close')[0];

//MUESTRA EL MODAL
modal.style.display = 'block';
youtubeCarga();
//CIERRA MODAL Y RECARGA LA PAGINA
closeBtn.addEventListener('click', function() {

modal.style.display = 'none';
// window.location.reload()
detenerVideo();

});


}


//Carga y detiene el reproductor de youtube
function youtubeCarga() {
  if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = function() {
      crearReproductor();
    };
  } else {
    crearReproductor();
  }
}

function crearReproductor() {
  player = new YT.Player('videoFrame', {
    events: {
      'onReady': reproductorListo
    }
  });
}

function reproductorListo() {
  player.stopVideo();
}

 
function detenerVideo() {
  player.stopVideo();
}



