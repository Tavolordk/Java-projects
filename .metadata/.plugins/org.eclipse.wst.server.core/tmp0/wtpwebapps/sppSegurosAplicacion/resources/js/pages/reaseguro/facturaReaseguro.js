$(document).ready(function() {
	facturaReaseguroC.llenaCatalogoRamo()   
    facturaReaseguroC.catalogoAnios()
    facturaReaseguroC.cargaContratosProporcionles();
	
	$('#btnFactura').click(function(){
		facturaReaseguroC.facturaReaseguro()
	})
	
});

