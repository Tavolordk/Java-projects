beneficiarioC.archivosBeneficiario()
$(document).ready(function() {
	
	beneficiarioC.obtenerActividadEconomica();
	giroMercantilC.obtenerGirosMercantiles();
	ocupacionC.ocupacion();
	sepomexC.obtenerEstados();
	
	var radioSelected = $("input[name=fisicoMoral]:checked").val();
	
	if(radioSelected == 1){
		
		$(".clean").val('');
		$(".cleanSelect").val('0');
		$('.clienteFisico').css('display', 'block')
		$('.clienteMoral').css('display', 'none')
		
	}else if(radioSelected == 2){
		
		$(".clean").val('');
		$(".cleanSelect").val('0');
		$('.clienteFisico').css('display', 'none')
		$('.clienteMoral').css('display', 'block')
		
	}
	
	$('.codigoPostal').focusin(function(){
		beneficiarioC.autoCompletarCodigoPostal("");
	});
	
	
	$('input[name="fisicoMoral"]').change(function() {
		var radioSelected = $("input[name=fisicoMoral]:checked").val();
		console.log(radioSelected);
		$(".clean").val('');
		$(".cleanSelect").val('0');
		
		if(radioSelected == 1){
			$('.clienteFisico').css('display', 'block')
			$('.clienteMoral').css('display', 'none')
		}else if(radioSelected == 2){
			$('.clienteFisico').css('display', 'none')
			$('.clienteMoral').css('display', 'block')
		}
	});
	
	$('#guardarBeneficiario').click(function(){
		
		beneficiarioC.guardaBeneficiario();
		
	})

});