
function validar() {

    var nombre = document.getElementById("nombre").value.trim();
    var email = document.getElementById("email").value.trim();
    var peliSerie = document.getElementById("pelicula-serie").value.trim();
    var comentario = document.getElementById("comentario").value.trim();

    // Verificar si algún campo está en blanco
    if (nombre === "" || email === "" || peliSerie === "" || comentario === "") {
      alert("Por favor, complete todos los campos requeridos del formulario.");
      return false;
    }

    // Verificar si el campo nombre contiene solo caracteres alfabéticos y espacios
    for (var i = 0; i < nombre.length; i++) {
      var charCode = nombre.charCodeAt(i);
      if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
        alert("El Nombre solo puede contener caracteres alfabéticos y espacios.");
        return false;
      }
    }


    
    //Verifica que el campo email sea válido
    if( !(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(email)) ) {
        alert("Debe ingresar un email válido.");
     return false;
    }

    //Verifica que el campo comentario contenga menos de 150 caracteres
    if (comentario.length > 150){
        alert("El comentario debe contener menos de 150 caracteres");
        return false;
    }
    
    //Verifica que la pelicula/serie tenga una calificacion
    if(!document.querySelector('input[name="star"]:checked')) {
        alert('Debe calificar la pelicula/serie');
        return false;
        }

    // Si todas las validaciones son exitosas, enviar el formulario
    alert("Formulario enviado correctamente.");
    return true;
  }
