$(document).ready(function(){
	var currentPage = (window.location.pathname.split('/'))[2];
	
	if(currentPage != 'endosoCancelarPoliza'){
		ramoC.ramoDefault(5);
	}else{
		ramoC.ramoDefault(null);
	}
	
	sepomexC.obtenerEstados();
	
	$('#nuevoCertificado #codigoPostal').focusin(function(){
		endosos.autoCompletarCodigoPostal("nuevoCertificado");
	});
	
	$('#btnCancelarPoliza').click(function(){
		endosos.cancelarPoliza();
	});
	
	$('#btnCancelarCertificado').click(function(){
		endosos.cancelarCertificado();
	});
	
	$('#btnBuscarPoliza').click(function(){
		endosos.buscarPoliza();
	});
	
	$('#nuevoCertificado #btnGuardarCertificado').click(function(){
		endosos.guardarCertificado();
	});
	
	$('#nuevoCertificado .estado').change(function() {
		$('#nuevoCertificado .municipio').prop('disabled', false);
		sepomexC.obtenerMunicipios($(this).val());
	});
	
	$('#btnBuscarCertificado').click(function(){
		endosos.buscarCertificado();
	});
	
	$('#formCambioNombreAsegurado #btnGuardarNombreAsegurado').click(function(){
		endosos.cambiarNombreAsegurdoDanios();
	});
});