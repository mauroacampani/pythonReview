let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
});

const cargarPeliculas = async() => {
    try{

    
    const respuesta =  await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=a60070faf034ecaa57adbea4299c3a88&language=es-ES&page=${pagina}`)
    console.log(respuesta)

    const datos = await respuesta.json()
    
    let peliculas = '';

    datos.results.forEach(pelicula => {
        peliculas += `
        <div class="card">
        <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="avatar">
        <div class="content">
        <table width="100%" cellspacing="0">
        <tr>
				<td><img src="img/star.png" width="20" height="20"></img></td>
				<td>${pelicula.vote_average}</td>
			</tr>
            <tr>
                <td style="text-align: left;"><p>${pelicula.title}</p></td>
               
            </tr>
            
        </table>
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

btnSiguienteSeries.addEventListener('click', () => {
	if(paginaSeries < 1000){
		paginaSeries += 1;
		cargarSeries();
	}
});

btnAnteriorSeries.addEventListener('click', () => {
	if(paginaSeries > 1){
		paginaSeries -= 1;
		cargarSeries();
	}
});

const cargarSeries = async() => {
    try{

    
    const respuesta =  await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=a60070faf034ecaa57adbea4299c3a88&language=es-ES&page=${paginaSeries}`)
    
    

    const datosSeries = await respuesta.json()
    
    let series = '';
    
    datosSeries.results.forEach(serie => {
        
        series += `
        <div class="card">
        <img src="https://image.tmdb.org/t/p/w500/${serie.poster_path}" class="avatar">
        <div class="content">
        <table width="100%" cellspacing="0">
        <tr>
				<td><img src="img/star.png" width="" height="20"></img></td>
				<td>${serie.vote_average}</td>
			</tr>
            <tr>
                <td style="width: 100%;"><p>${serie.original_name}</p></td>
               
            </tr>
            
        </table>
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