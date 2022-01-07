/**
 * 
 */

$(document).ready(function() {

	comisionesC.obtenerComisiones();
	ramoC.extraerRamo();
	productoC.extraerProducto();

	//Accion guardar Comisiones
	$('#btnGuardarComision').click(function(){
		comisionesC.guardarComisiones('#formComisionesNuevo','#nuevaComisionModal');
	});

	$('#actualizarComisiones').click(function(){
		comisionesC.guardarComisiones('#formComisionesEditar','#editarComisionesModal');
	});
	
});


