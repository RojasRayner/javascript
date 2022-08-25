//Actividad 2 Crear un algoritmo con un condicional
//solicitar uno o mas valores ingresados por prompt
//comparar las entradas en funcion a ciertas condiciones
//muestre por consola o alert el resultado segun los valores ingresados y las condiciones cumplidas


//variable string que se usa como guia para comparar
let palabra = (`@/*-|"\\_`);
//numeros de intentos
let intentos = 3;
//se pide datos al usuario y se les espesifica las validaciones
let nombre = prompt (`\t Tienes ${intentos} intentos \n\t Ingrese su nombre \n\t No usar las siguientes Caracteres Restringidos\n @ / * - | " \\ _  \n\t ESC o esc para salir.`);
//mientras el valor no sea escape y tenga cantidad de intentos, ejecutar.
while ((nombre !== "ESC") && (intentos > 0) && (nombre !== "esc")) {
    //variable que se usa para guardar la string que se va a generar de las letras en el nombre
    let restringida = "";
    //variable que se usa para guardar los numeros ingresados por el usuario
    let numero = "";
    //un loop para comparar que el datos del usuario no tenga numeros
    for (let i = 0; i < nombre.length; i++) {
    const element = nombre[i];
    //si el dato del usuario tiene un numero guardar ese numero
        if(Number(element) >=0){
            numero = numero + element.toString();
        }else{
            continue;
        }
    }
    //de lo contrario comparar el datos del usuario con la variable que se usa como palabra reservada
    for (let i = 0; i < nombre.length; i++) {
        for (let index = 0; index < palabra.length; index++) {
            const elemento = palabra[index];
            if(nombre[i] === elemento){
                restringida= restringida + nombre[i];
            }else{
            continue;
            }
        }
    }
    //validaciones
    //si numero contiene algun dato or restringida contiene algunn dato
    if ((numero !== "") || (restringida !== "")) {
        alert(`ingresaste por error:\n Numeros ${numero} \nPalabra Restringida ${restringida}`);
    }else //si no hay ningun dato entonces
        if((numero === "") && (nombre === "") && (restringida === "")){
        alert("Incorrecto!. No ingresaste ningun dato."); 
    }else{//de lo contrario
        alert(`Bienvenido. ${nombre} Ingresaste correctamente`);
        break;
    }
    //se resta un intento
    intentos--;
    //se pide datos al usuario nuevamente
    nombre = prompt (`\t Tienes ${intentos} intentos \n\tIngrese su nombre \n\t No usar las siguientes Caracteres Restringidos\n @ / * - | " \\ _ `);
    if(intentos == 1){
        alert(`Lo Sentimos!. No tienes más intentos`)
        break;
    }else{
        continue;
    }
}
