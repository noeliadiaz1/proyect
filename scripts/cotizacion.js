function cargarCotizacionDolar() {
    $.get("https://www.dolarsi.com/api/api.php?type=valoresprincipales", function (data) {
        $.each(data, function (index, item) {
            if(item.casa.nombre === "Dolar turista") {
                $(".cotizacion").text("Cotizacion Dolar Turista: $" + item.casa.venta);
            }
        });
    });
}

$(function() {
    cargarCotizacionDolar();
});