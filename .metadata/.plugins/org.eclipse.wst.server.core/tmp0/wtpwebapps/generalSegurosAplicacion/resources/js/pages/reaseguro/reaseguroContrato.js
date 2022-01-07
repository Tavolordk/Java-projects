$(document).ready(function(){
	
	$("#nuevoContrato")[0].reset();
	reaseguroContrato.catRamosReaseguro();
	reaseguroContrato.catTipoMoneda();
	reaseguroContrato.catTipoContratos();
	reaseguroContrato.editarReasegurador();
	
	$('#guardaContrato').click(function(){
		
		reaseguroContrato.guardaContrato();

		console.log($("[data-id='ramosCNSF']").attr('title'))
		console.log($("[data-id='moneda']").attr('title'))
		
	})
	
	$('#ramosCNSF').change(function(){
		
		console.log('Ramos Seleccionados', $('#ramosCNSF').val())
		var descRamos = {}
		var ramos = ''
			
		descRamos = $('#ramosCNSF').val()
		console.log('Tamaño Ramos ->',descRamos.length)
		
		if(descRamos.length < 5){
			
			descRamos.forEach(function(ramo, index) {
				
				if(ramos === ''){
					ramos = ramo
				}else{
					ramos = ramos +'-'+ramo
				}
				console.log("Ramo " + ramos)
			});
			
			$('#negocioCubierto').val(ramos)
		}else{
			$('#negocioCubierto').val('Industria toda la Cartera')
		}
		
	});
	
	$('#indefinido').change(function(){
		
		if(this.checked) {
			$('#fechaFinVigencia').attr('disabled','true')
        }else{
        	$('#fechaFinVigencia').removeAttr('disabled')
        }
	});
	
	$('#sinLimites').change(function(){
		
		if(this.checked) {
			$('#limiteRespons').attr('disabled','true')
			$('#limiteRespons').val(0.00)
			
        }else{
        	$('#limiteRespons').val('')
        	$('#limiteRespons').removeAttr('disabled')
        }
	});
	
	$('#comisionCheck').change(function(){
		
		if(this.checked) {
			$('#comision').attr('disabled','true')
			$('#comision').val(0.00)
			
        }else{
        	$('#comision').val('')
        	$('#comision').removeAttr('disabled')
        }
	});
	
	$('#sinParticipacion').change(function(){
		
		if(this.checked) {
			$('#participacionUtil').attr('disabled','true')
			$('#participacionUtil').val(0.00)
			
        }else{
        	$('#participacionUtil').val('')
        	$('#participacionUtil').removeAttr('disabled')
        }
	});
	
})