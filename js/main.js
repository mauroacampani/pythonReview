//MUESTRA MENU AL HACER CLIC EN BOTON DEL NAV
const toggle = document.querySelector('.toggle');
const menu = document.querySelectorAll('.item');


  toggle.addEventListener('click', () => {

    menu.forEach(item =>{   
    
    item.classList.toggle('active')
       

  });
 
});
