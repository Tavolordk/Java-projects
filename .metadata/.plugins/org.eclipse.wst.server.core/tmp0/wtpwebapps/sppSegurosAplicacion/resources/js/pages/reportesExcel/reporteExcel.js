$(document).ready(function(){
	ramoC.ramoDefault(null);
	
	$('#btnBuscarReporte').click(function(){
		reporteExcelC.reporteEmision();
	});
	
	$('#idRamo, #tipoReporte').change(function(){
		if( $('#idRamo').val() == 1 &&  $('#tipoReporte').val() === 'emisionCoberturas' ){
			$('.anexosConexosControl').addClass('d-block').removeClass('d-none');
		}else{
			console.log("ocultar");
			$('.anexosConexosControl').removeClass('d-block').addClass('d-none');
		}
	});
	
	var conexos=window.location.pathname;
	
	if(conexos.indexOf("reporteConexos") > 0){
		ramoC.ramoDefault(1);
		reporteExcelC.obtenerCoberturasAnalogasConexas();
	}
	
});