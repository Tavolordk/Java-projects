$(document).ready(function(){
	ramoC.ramoDefault(null);
	
	$('#reporte').change(function(){
		var reporte = $('#reporte').val()
		
		if(reporte === '1'){
			$('.actuarios').css('display', 'block')
		}else{
			$('.actuarios').css('display', 'none')
		}
		
	})
	
	$('#btnBuscarReporte').click(function(){
		var reporte = $('#reporte').val()
		
			if(reporte === '1'){
				reporteActuarioC.reporte();
		}else{
			reporteActuarioC.reporteVigor();
		}
		
	});
});