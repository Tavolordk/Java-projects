$(document).ready(function() {
	coberturasC.obtenerCoberturas();
	coberturasC.obtenerTiposCobertura();
	ramoC.ramo(null, null);

	$('#btnGuardarCobertura').click(function(){
		coberturasC.guardarCoberturas('#formCoberturasNuevo','#nuevaCoberturaModal');
	});
	
	$('#btnEditarCoberturas').click(function(){
		coberturasC.guardarCoberturas('#formCoberturasEditar','#editarcoberturasModal');
	});
	
});

