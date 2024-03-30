const usuarios = [
    { user: "grupo2", contrasena: "123" },
    
];

let map = L.map('mi_mapa').setView([-32.69064,-64.72324],15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function mostrarApoyo(){
    L.marker([-32.68927,-64.72002]).addTo(map).bindPopup("Centro turistico 1")
    L.marker([-32.69673,-64.71656]).addTo(map).bindPopup("Centro turistico 2")
    L.marker([-32.68610,-64.72887]).addTo(map).bindPopup("Centro turistico 3")
    

}
function buscarComercios(){
    L.marker([-32.69365,-64.71594]).addTo(map).bindPopup("Regionales AlpaCorral")
    L.marker([-32.68995,-64.72047]).addTo(map).bindPopup("El Cordobes")
    L.marker([-32.692445,-64.7192790]).addTo(map).bindPopup("Alpa Indumentaria")
    L.marker([-32.691940,-64.721575]).addTo(map).bindPopup("Alfajores Corral")
    L.marker([-32.690242,-64.723335]).addTo(map).bindPopup("Regaleria Marcos")

}
function movil(){
    L.marker([-32.69028,-64.72096]).addTo(map).bindPopup("movil 1")
    L.marker([-32.69499,-64.71449]).addTo(map).bindPopup("movil 2")
    L.marker([-32.68929,-64.72893]).addTo(map).bindPopup("movil 3")
    

}
function apretarBoton() {
    const miBoton = document.getElementById("logeo");
    miBoton.addEventListener("click", function() {
        validarUsuario();
    });
}

function validarUsuario() {
    const user = document.getElementById("username").value;
    const pw = document.getElementById("password").value;

    const usuarioValido = chequeoUsuario(user, pw);

    if (usuarioValido) {
        // Si el usuario es válido, redirige a "Comerciante.html"
        window.location.href = "nuevoAviso.html";
    } else {
        mostrarAlerta("Usuario incorrecto");
    }
}

function chequeoUsuario(user, contrasena) {
    // Recorre el array de usuarios y verifica si coincide el email y la contraseña
    for (const usuario of usuarios) {
        if (usuario.user === user && usuario.contrasena === contrasena) {
            return true; // Si se encuentra una coincidencia, retorna true
        }
    }
    return false; // Si no se encuentra una coincidencia, retorna false
}

function mostrarAlerta(mensaje) {
    const alerta = document.getElementById("custom-alert");
    const mensajeAlerta = document.getElementById("alert-message");

    mensajeAlerta.textContent = mensaje;
    alerta.style.display = "block";
}


$(function() {
    $(".tarjeta").click(function() {
        // Elimina todos los marcadores del mapa
        map.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
            map.removeLayer(layer);
            }
        });

        var latitud = $(this).data("latitud");
        var longitud = $(this).data("longitud");
        var nombre=  $(this).data("comercio");

        L.marker([latitud, longitud]).addTo(map).bindPopup(nombre);
    });

    $("#btn-buscar").click(function() {
        var texto = $("#txt-busqueda").val();
        $(".tarjeta").show();
        if(texto !== "") {
            $(".tarjeta").filter(function() {
                return $(this).find(".articulo").text().toUpperCase().indexOf(texto.toUpperCase()) === -1;
            }).hide(); 
        }
    });

    cargarCotizacionDolar();
});

