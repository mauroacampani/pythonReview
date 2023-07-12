
	let	enc = `
		 <div class="contenedor">
        <nav id="navbar">
            
            <ul class="menu">
                <li class="logo"><a href="#"><img src="img/logo.jpg" alt="" ></a></li>
                <li class="item"><a  href="index.html">Inicio</a></li>
                <li class="item"><a  href="peliculas.html">Películas</a></li>
                <li class="item"><a  href="series.html">Series</a></li>
                <li class="item"><a  href="contacto.html">Contacto</a></li>
                <li class="toggle"><a id="btn-a" href="#"><i class="fas fa-bars"></i></a></li>
            </ul>
        </nav>
    </div>
	`
	document.querySelector("header").innerHTML = enc;


let pie = `
<div style="text-align: center;">Disenado Mauro Campani</div>
                <a href="https://www.instagram.com/"><img id=redes src="img/instagram.png" alt="Instagram" width="25px"></a>
                <a href="https://es-la.facebook.com/"><img id=redes src="img/facebook.png" alt="Facebook" width="25px"></a>
                <a href="https://www.whatsapp.com/?lang=es"><img id=redes src="img/whatsapp.png" alt="Whatsapp" width="25px"></a>
                `
 document.querySelector("footer").innerHTML = pie;              
