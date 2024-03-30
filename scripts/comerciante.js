$(function () {
    $("#btn-similares").click(function () {
        cargarProductosSimilares($("#name").val());
    });

    $("#btn-crear").click(function () {
        crearProducto();
    });
});

function cargarProductosSimilares(nombre) {
    $.get("https://api.mercadolibre.com/sites/MLA/search?limit=10&q=" + nombre, function (data) {
        var items = [];
        $.each(data.results, function (index, item) {
            items.push(
                "<li class=\"list-group-item d-flex justify-content-between align-items-center\">" +
                item.title + 
                "<span class=\"badge bg-primary rounded-pill\">$ " + item.price + "</span></li>");
        });
        $("#mlproducts").html(items.join(""));
    });

}

function crearProducto(){
    if(!validarCampos()) return;

    Swal.fire({
        title: 'Su producto se a publicado',
        icon: 'success',
    }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
    });
}

function validarCampos() {
    if (esNuloOVacio($("#name").val()) 
        || esNuloOVacio($("#description").val()) 
        || esNuloOVacio($("#specs").val())
        || esNuloOVacio($("#category").val())
        || esNuloOVacio($("#price").val())) {

        mensaje('Todos los campos deben estar completos');
        return false; 
    }
    return true;
}

function esNuloOVacio(str) {
    return !str || str.length === 0;
  }

function mensaje(msg) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
    });
}

