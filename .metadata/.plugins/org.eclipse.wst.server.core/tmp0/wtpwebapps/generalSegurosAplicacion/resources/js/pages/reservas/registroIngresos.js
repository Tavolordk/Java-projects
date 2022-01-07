$(document).ready(function () {
	registroIngresosC.sumar();
	registroIngresosC.obtenerIngresos();
	$('#btnBuscarIngreso').click(function () {
			registroIngresosC.buscarNombre();
		});
	$('#btnNuevoIngreso').click(function () {
		$('#nuevoIngresoModal').modal({show:true, backdrop:'static'});
	});
	$('#btnGuardarIngreso').click(function () {
		registroIngresosC.btnGuardarIngreso();
	});
	
	
	
});