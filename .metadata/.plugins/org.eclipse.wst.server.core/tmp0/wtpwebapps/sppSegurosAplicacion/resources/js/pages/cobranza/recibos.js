$(document).ready(function(){

	var pantalla = $('#pantalla').text()
	
	if(pantalla.includes('Consulta')){
		ramoC.ramo(null,null);
	}
	
	/*** GENERA REPORTE DE DxP ***/
	$('#idBuscaRecibosPend').click(function(){
		recibosC.muestraRecibosPendientes()
	})
	
	/**** MUESTRA RECIBOS POR POLIZA *****/
	$('#btnBuscaRecibo').click(function(){
		recibosC.muestraRecibosPoliza()
	})
	
	/*** GENERA CORTE DE CAJA ***/
	$('#corteCaja').click(function(){
		recibosC.corteCaja();
	})
	
	/*** GENERA REPORTE DEUD ***/
	$('#ReporteDeud').click(function(){
		recibosC.reporteDeud();
	})
	
	$('#tipoReporte').click(function(){
		if($('#tipoReporte').val() === '2'){
			$('#divReporteDxP').css('display','block')
		}if($('#tipoReporte').val() === '3'){
			$('#divReporteDxP').css('display','block')
		}
	})
})

