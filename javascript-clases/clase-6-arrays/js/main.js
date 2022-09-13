//CONSIGNA
//INCORPORAR AL MENOS UN ARRAY EN TU PROYECTO
//UTILIZAR ALGUNOS METODOS O PROPIEDADES VISTO EN CLASES

const usuario = [{administrador : "admin",password : "admin"}];
let valor = 0;
let user = 1;
//recorre los objetos dentro del array si encuntra un objeto con nombre y password validos inicia como administrador de lo contrario retorna a inicio
function cliente(){
    const nombre = prompt("Ingrese su nombre: ");
    const pass = prompt("Ingrse su contraseña");
    for (const persona of usuario) {
        if((nombre == persona.administrador) && (pass == persona.password)){
            alert("Usuario: SUPER ADMINISTRADOR");
            administrador();
        }else{
            do {
                if((nombre == usuario[user].administrador) && (pass == usuario[user].password)){
                    alert("Usuario ADMINISTRADOR");
                    administrador();
                }else{
                    user++;
                    continue;
                }

            } while (user < usuario.length);
            alert(`AREA RESTRINGIDA\nUsuario o Contraseña Invalida`);
            bienvenida();
        }
    }
}
//menu de administrador
function administrador() {
    const opcion = Number(prompt("1.-MANEJAR administradores\n2.-Salir"));
    switch (opcion) {
        case 1:
            manejarAdmin();
        case 2:
            bienvenida();    
        default:
            alert("Ingrese una Opcion Correcta");
            administrador();
    }
}
//manejar los nombres y password de los administradores, Por cada uno de ellos
function manejarAdmin(){
    cantidad = usuario.length;
    alert(`Cantidad de ADMINISTRADORES: ${cantidad}`);
        opcion = Number(prompt("1.-Agregar Nuevo Administrador\n2.- Eliminar\n3.-Editar\n4.-Editar SUPER USUARIO\n5.-Salir"));
        switch (opcion) {
            case 1:
                nuevoAdministrador();
                administrador();
            case 2:
                i = 1;
                cantidad = usuario.length;
                do{
                    paso = confirm(`Esta seguro que desa ELIMINAR a: ${usuario[i].administrador}`)
                    if(paso == true){
                        usuario.splice(i,1);
                        alert(`ADMISNISTRADOR ELIMINADO.\nCANTIDAD DE ADMINISTRADORES \t${cantidad}.`);
                        i++;
                        continue;
                    }else{
                        opcion = confirm("DESEA PASAR al siguiente ADMINISTRADOR");
                        if(opcion == false){
                            manejarAdmin();
                        }else{
                            i++;
                            continue;
                        }
                        continue;
                    }
                }while(i < cantidad);
                manejarAdmin();
            case 3:
                i = 1;
                cantidad = usuario.length;
                do{
                    paso = confirm(`Esta seguro que desea EDITAR a: ${usuario[i].administrador}.`)
                    if(paso == true){
                        nombreViejo = usuario[i].administrador;
                        passViejo = usuario[i].password;
                        nombreNuevo = prompt(`Nombre ANTERIOR ${usuario[i].administrador}.\n\tIngrese nombre NUEVO:`);
                        passNuevo = prompt(`Password ANTERIOS ${usuario[i].password}.\n\tIngrese password NUEVO:`);
                        usuario.push({administrador:nombreNuevo,password:passNuevo});
                        //encontrar la posicion del nuevo objeto dentro del array
                        posicion = usuario.length;
                        posicion = posicion - 1;
                        alert(`Se edito usuario: ${nombreViejo}.\nSe edito password: ${passViejo}\n\tNUEVO nombre: ${usuario[posicion].administrador}\n\tNueva Password: ${usuario[posicion].password}`);
                        usuario.splice(i,1);
                        i++;
                        continue;
                    }else{
                        opcion = confirm("DESEA PASAR AL SIGUIENTE ADMINISTRADOR");
                        if(opcion == false){
                            manejarAdmin();
                        }else{
                            i++;
                            continue;
                        }
                        continue;
                    }
                    
                }while (i < cantidad);
                manejarAdmin();
            case 4:
                opcion = confirm("DESEA editar el SUPER ADMINISTRADOR");
                if(opcion == false){
                    manejarAdmin();
                }else{
                    superU = prompt(`El NOMBRE del SUPER USUARIO es: ${usuario[0].administrador}\n\tIngresa Nuevo NOMBRE SUPER USUARIO: `);
                    superP = prompt(`El PASSWORD del SUPER USUARIO es: ${usuario[0].password}\n\tIngresa Nuevo PASSWORD SUPER USUARIO: `);
                    usuario.shift();
                    usuario.unshift({administrador:superU,password:superP});
                    alert(`Se edito el SUPER USUARIO:\n\tNOMBRE: ${usuario[0].administrador}\n\tPASSWORD: ${usuario[0].password}`);
                    bienvenida();
                }
            case 5:
                administrador();
            default:
                alert("INGRESE UNA OPCION CORRECTA");
                manejarAdmin();

        }
}
//agrega nuevo ADMINISTRADOR
function nuevoAdministrador(){
    const nuevoAdmin = prompt("caracter no permitido: @\nIngrese NUEVO ADMINISTRADOR: ");
    const nuevaPass = prompt("Ingrese NUEVA CONTRASEÑA");
    usuarioAdmin = [nuevoAdmin,nuevaPass];
    alert("NUEVO ADMINISTRADOR Y SU PASSWORD\n" + usuarioAdmin.join("<---->"));
    comparar(usuarioAdmin);
    opcion1 = confirm(`CONFIRME el nuevo administrador: ${usuarioAdmin[0]}`);
    opcion2 = confirm(`CONFIRME password para el nuevo administrador: ${usuarioAdmin[1]}`);
    if((opcion1 == true) && (opcion2 == true)){
        usuario.push({administrador:usuarioAdmin[0],password:usuarioAdmin[1]});
    }else{
        nuevoAdministrador();
    }
}
//compara nombre del administrador para encontrar un caracter no permitido
function comparar(usuarioAdmin){
    alert(`A continuacion revisaremos si tiene el caracter no permitido: @`);
    indice = usuarioAdmin[0].indexOf("@");
    if(indice == -1){
        alert("Confirmado no introdujo el caracter no permitido");
    }else{
        alert("Ingreso un caracter Restringido.");
        nuevoArray = usuarioAdmin[0].toString();
        usuarioNombre = nuevoArray.split('');

        function buscando(elemento) {
            return elemento !== "@";
        }
        arreglo = usuarioNombre.filter(buscando);
        indice = arreglo.length;
        arregloTres = arreglo.join('');
        arregloDos = arreglo.reverse();
        arregloCuatro = arregloDos.join('');
        opcion = Number(prompt(`Le sugerimos el nombre: \n\t1.${arregloTres}\n\t2.${arregloCuatro}`));
        switch (opcion) {
            case 1:
                usuarioAdmin.shift();
                usuarioAdmin.unshift(arregloTres);
                alert(`El nombre del administrador es: ${usuarioAdmin[0]}.\nEl password es: ${usuarioAdmin[1]}`);
                console.log(usuarioAdmin);
                return (usuarioAdmin);
            case 2:
                usuarioAdmin.shift();
                nombreReversa = arregloCuatro;
                usuarioAdmin.unshift(nombreReversa);
                alert(`El nombre del administrador es: ${usuarioAdmin[0]}.\nEl password es: ${usuarioAdmin[1]}`);
                return (usuarioAdmin);
            default:
                alert("Introduzca una opcion VALIDA")
                comparar(usuarioAdmin);
        }
    }
}
//funcion de inicio para comenzar debe aceptar y si le da cancelar se sale del programa
bienvenida();
function bienvenida(){
    const inicio = confirm("Bienvenido al Programa de Administración de Usuarios\nDesea Continuar");
    if (inicio == true){
        cliente();
    }else{
        return
    }
}