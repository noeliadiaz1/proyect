function obtenerCotizacionDolarBlue() {

    //Url de la api de dolarsi
    const apiUrl = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            //Busca la cotización del dolar blue en la respuesta de la API de DolarSi
            const dolarBlue = data.find(item => item.casa.nombre === 'Dolar Blue');
            console.log('Cotización del dólar blue encontrada:', dolarBlue.casa.venta);

            //Formatea y elimina los puntos que separan la parte entera en unidades
            const cotizacionDolarBlue = dolarBlue ? parseFloat(dolarBlue.casa.venta.replace(/[.]/g, '')) : null;
            console.log(cotizacionDolarBlue);

            //Retorna la cotización del dolar blue
            return cotizacionDolarBlue;
        })
        .catch(error => {
            console.error('Error al obtener cotización del dólar blue desde DolarSi:', error);
            return null;
        });
}

function convertirAPrecioDolarBlue(precioEnPesos) {
    return obtenerCotizacionDolarBlue()
        .then(cotizacionDolarBlue => {
            if (cotizacionDolarBlue !== null) {
                //Converterte el precio a dolares blue y limita a dos decimales
                const precioEnDolarBlue = (precioEnPesos / cotizacionDolarBlue).toFixed(2);
                return precioEnDolarBlue;
            } else {
                console.log('No se pudo obtener la cotización del dólar blue.');
                return null;
            }
        });
}

function cargarProductos(nombre) {
    $.get("https://api.mercadolibre.com/sites/MLA/search?limit=10&q=" + nombre, function (data) {
        var items = [];
        $.each(data.results, function (index, item) {
            const precioEnPesos = item.price;

            // Llamar a la función para convertir el precio a Dólar Blue
            convertirAPrecioDolarBlue(precioEnPesos)
                .then(precioEnDolarBlue => {
                    if (precioEnDolarBlue !== null) {
                        items.push(
                            "<li class=\"list-group-item d-flex justify-content-between align-items-center\">" +
                            "<div class='nombre-producto'>" + item.title + "</div>" +
                            "<div>" +
                            "<span title='Pesos argentinos' class=\"badge bg-primary rounded-pill\">$ " + parseFloat(precioEnPesos).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</span>" +
                            "<span title='Dolar Blue' class=\"badge bg-success rounded-pill\">$ " + parseFloat(precioEnDolarBlue).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</span>"
                            + "</div></li>");
                        $("#resultadoBusqueda").html(items.join(""));
                    } else {
                        console.log('No se pudo convertir el precio a Dólar Blue.');
                    }
                });
        });
    });
}
