$(document).ready(function() {
	//solicitudCertificadosDaniosC.obtenerSolicitudCertificadosDanios();
});

$('#tabDcertificado').click(function(){
	solicitudCertificadosDaniosC.obtenerSolicitudCertificadosDanios();
});
$('#tabDCoberturas').click(function(){
	coberturaDaniosC.certificadosSinCobertura();
	coberturaDaniosC.obtenerCoberturas();
});
