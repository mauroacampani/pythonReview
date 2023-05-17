const cargarPeliculas = async() => {
    try{

    
    const respuesta =  await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a60070faf034ecaa57adbea4299c3a88&language=es-ES')
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
                <td><h3>${pelicula.title}</h3></td>
               
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