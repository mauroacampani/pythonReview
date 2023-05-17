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