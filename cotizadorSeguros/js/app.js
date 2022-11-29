 //Constructores
 function aval (respaldo, modelo, contrato){//los valores que toma del formulario
    this.respaldo = respaldo;
    this.modelo = modelo;
    this.contrato = contrato;
}

//realiza la cotizacion con los datos

aval.prototype.cotizarAval = function(){

    let marca;
    const base = 2000;
    
    switch(this.respaldo){

        case '1':
            marca = base * 1.15;
            break;
        
        case '2':
            marca = base * 1.05;
            break;

        
        case '3':
            marca = base * 1.35;
            break;


        default:
            break;
    }
    
    //leer el año
    const diferencia = new Date().getFullYear() - this.modelo;
    //descuento segun el año
    marca -= ((diferencia * 3) * marca ) / 100;   
    

    if(this.contrato === 'basico'){
        marca *=1.30;
    }else{
        marca*=1.50;
    }
    return marca;


}
 
function interFaz(){}
 
//llena las opciones de los años
interFaz.prototype.contenidoYear = () =>{
    const max = new Date().getFullYear(),
        min = max - 25;
 
    const seleccionadorYear = document.querySelector('#year');
 
    for(let y = max; y > min; y--){
        let option = document.createElement('option');
        option.value = y;
        option.textContent = y;
        seleccionadorYear.appendChild(option);
    }
}

//muestra alertas en pantalla

interFaz.prototype.mostrarMensaje = (validacion, clase) => {

    const div = document.createElement('div');
     if(clase === 'error'){
     div.classList.add('error');
     }else{
        div.classList.add('correcto')
     }

     div.classList.add('validacion', 'mt-10')
     div.textContent = validacion;

     //insertar html
     const formu = document.querySelector('#cotizar-seguro');
     formu.insertBefore(div, document.querySelector('#resultado'));

     setTimeout(() =>{
        div.remove();
     },2000);


}

//proto q cotiza
interFaz.prototype.mostrarResultado = (total, Aval) => {
    const { respaldo, modelo, contrato } = Aval;

    let textoRespaldo;


    switch(respaldo){

        case '1':
            textoRespaldo = 'Americano'
            break;
        case '2':
            textoRespaldo = 'Asiatico'
            break;

        case '3':
            textoRespaldo = 'Europeo'
            break;



        default:
            break;
    }

    //crea el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML =`
      <p class="header">Tu resumen</p>
      <p class="font-normal">Respaldo: <span class="font-bold"> ${textoRespaldo} </span></p>
      <p class="font-normal">Modelo: <span class="font-bold"> ${modelo} </span></p>
      <p class="font-normal">Contrato: <span class="font-bold capitalize"> ${contrato} </span></p>
      <p class="font-normal">Total:  $ <span class="font-bold"> ${total} </span></p>  

    `;

    const resultadoDiv = document.querySelector('#resultado');
    
    
    //mostrar el spiner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);//se muetra el resultado despues de la eliminacion del spiner
        
    }, 2000);

}

//Instanciar interFaz
const interFZ = new interFaz();

 
document.addEventListener('DOMContentLoaded', () => {
    interFZ.contenidoYear(); //llenar el select con los años
})



eventListeners();
function eventListeners(){
    const formu = document.querySelector('#cotizar-seguro');
    formu.addEventListener('submit', generarSeguro);
}

function generarSeguro(e){

    e.preventDefault();

    //verificar diligenciamiento formulario respaldo

    const respaldo = document.querySelector('#marca').value;
    

    
    //verificar diligenciamiento formulario modelo

    const modelo = document.querySelector('#year').value;
    

    
    //verificar diligenciamiento formulario contrato

    const contrato = document.querySelector('input[name="tipo"]:checked').value; 
    
    if(respaldo === '' || modelo === '' || contrato === '') {
        interFZ.mostrarMensaje('todos los campos son obligatorios', 'error');
        return;
    }

    interFZ.mostrarMensaje('cotizando...', 'exito');  
    
    //ocultar las cotizaciones previas

    const resultados = document.querySelector('#resultado div');
    if(resultados != null){
        resultados.remove();
    }

    //instanciar el seguro


    const Aval = new aval(respaldo, modelo, contrato);

    const total = Aval.cotizarAval();


    // utilizar rl proto que va a cotizar
    interFZ .mostrarResultado(total, Aval);
    

}