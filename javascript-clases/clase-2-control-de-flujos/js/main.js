//Actividad 2 Crear un algoritmo con un condicional
//solicitar uno o mas valores ingresados pro prompt
//comparar las entradas en funcion a ciertas condiciones
//muestre por consola o alert el resultado segun los valores ingresados y las condiciones cumplidas


//variable string que se usa como guia para comparar
let palabra = ("hola");
//variable que se usa para guardar la string que se va a generar de las letras en el nombre
let saludo;
//se pide datos al usuario
let nombre = prompt ("Ingrese su nombre: ");
//un loop para comparar que el datos del usuario no tenga numeros
for (let i = 0; i < nombre.length; i++) {
    const element = nombre[i];
    //si el dato del usuario tiene un numero generar un alert
    if(element >=0){
        alert(`Ingresaste este numero ${element} \nporfavor ingresa correctamente tu nombre`);
    }else{
        //de lo contrario comparar el datos del usuario con la variable que se usa como guia
        for (let i = 0; i < nombre.length; i++) {
            for (let index = 0; index < palabra.length; index++) {
                const elemento = palabra[index];
                if(nombre[i] === elemento){
                    saludo[index] = nombre[i];
                }else{
                    continue;
                }
            }
        }
        alert(`se comparo y se encontro esta similitud\n${saludo}`);
        break;
    }
    break;
}
alert(`${saludo} ingresaste correctamente tu nombre`);