$(document).ready(function(){
	agrupadorC.comboAgrupadores();
	agrupadorC.extraerAgrupadores();
	ramoC.ramo(null, null);
	
	$("#nuevoAgrupadoresModal").click(function(){
		$('.titleEditAgrupadores').text("Nuevo agrupador");
		$('#editarAgrupadoresModal').modal({show:true, backdrop:'static'});
		$('#formAgrupadoresEditar')[0].reset();
	});
});

//Accion guardar Agrupador
$('#btnGuardarAgrupadores').click(function(){
	agrupadorC.guardarAgrupadores();
});

$('#ramo').blur(function() {
	if(($('#ramo').val() === '1')){
		$('#tipoProducto1').prop('disabled',true);
		$('#tipoProducto2').prop('disabled',true);	
		$('#tipoProducto1').prop('checked',false);
		$('#tipoProducto2').prop('checked',false);
	}else{
		$('#tipoProducto1').prop('disabled',false);
		$('#tipoProducto2').prop('disabled',false);
	}
});