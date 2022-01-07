/**
 * 
 */

$(document).ready(function() {

	monedaC.obtenerMoneda();
//	monedaC.extraerMoneda();
	
	$('#btnGuardarMoneda').click(function(){
		monedaC.guardarMoneda('#formMonedaNuevo','#nuevaMonedaModal');
	});
	
	$('#actualizarMoneda').click(function(){
		monedaC.guardarMoneda('#formMonedaEditar','#editarMonedaModal');
	});
	
});


