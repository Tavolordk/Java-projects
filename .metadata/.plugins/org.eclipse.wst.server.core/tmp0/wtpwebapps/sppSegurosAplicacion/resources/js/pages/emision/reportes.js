$(document).ready(function() {
	reportesC.obtenerMoneda();
	reportesC.obtenerRamo();
	reportesC.obtenerSucursal();
	reportesC.obtenerReportes();
	
	$('#tipoReporte').change(function(){
		tipoReporte = $('#tipoReporte').val()
		console.log('TIPO REPORTE CAMBIO')
		console.log(tipoReporte)
		
		if(tipoReporte === '1'){
			$('#divReporteAnual').css('display','block')
			$('#divReporteTrimestral').css('display','none')
		}else if(tipoReporte === '2'){
			$('#divReporteAnual').css('display','none')
			$('#divReporteTrimestral').css('display','block')
		}
	})
});

$('#idReporte').on('change', function(){
	reportesC.obtenerTipoFiltro();
});

$('#btnPruebaReporte').on('click', function(){
	reportesC.buscaReporte();
	
});

$('#idRamo').on('change', function(){
	reportesC.obtenerTipoFiltro();
});

$('#btnRR').on('click', function(){
	tipoReporte = $('#tipoReporte').val()
	
	if(tipoReporte === '1'){
		reportesC.reporteRR();
//	}else if(tipoReporte ==='2'){
//		reportesC.reporteTrimestralRR8();
//	}
	}else if(tipoReporte ==='3'){
		reportesC.reporteRR8SiniestrosAnual()
	}
});

//
$('#nombreParametro').on('change', function(){
	reportesC.obtieneValorFiltro();
	console.log('FILTRO', $("#nombreParametro option:selected").text())
	console.log($("#nombreParametro option:selected").val())
});