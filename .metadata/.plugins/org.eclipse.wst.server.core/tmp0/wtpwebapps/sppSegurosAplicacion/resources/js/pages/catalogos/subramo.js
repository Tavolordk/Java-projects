/**
 * 
 */

$(document).ready(function() {

	subramoC.obtenerSubramo();
	//subramoC.extraerSubramo();
	
	//Accion guardar Subramo
/*	$('#btnGuardarSubramo').click(function(){
		subramoC.guardarSubramo();
	});
*/	
	$('#btnGuardarSubramo').click(function(){
		subramoC.guardarSubramo('#formSubramoNuevo','#nuevoSubramoModal');
	});
	
	$('#btnEditarSubramo').click(function(){
		subramoC.guardarSubramo('#formSubramoEditar','#editarSubramoModal');
	});
	
});

