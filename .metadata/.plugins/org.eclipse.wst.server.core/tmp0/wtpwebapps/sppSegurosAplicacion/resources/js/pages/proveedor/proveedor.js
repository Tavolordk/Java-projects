proveedorC.archivos();
$(document).ready(function () {
	proveedorC.cargaCatalogoBancos();
	proveedorC.obtenerActividadEconomica()
	proveedorC.obtenerGirosMercantiles()
	
	if($('#fisicaMoral').val() === 'F'){
		$('.proveedorFisicoNuevo').css('display','block');
		$('.proveedorMoralNuevo').css('display','none');
	}else{
		$('.proveedorFisicoNuevo').css('display','none');
		$('.proveedorMoralNuevo').css('display','block');
	}
	
	
	$('#formProveedor .codigoPostal').focusin(function() {
		proveedorC.autoCompletarCodigoPostal('formProveedor');
	});
	
	$('#guardaProveedor').click(function () {
		proveedorC.guardaProveedor();
	});
	
	$('#btnNomORazon').click(function () {
		proveedorC.buscaProveedoresPorNombreORazon();
	});
	
	$('#btnBusquedarfc').click(function () {
		proveedorC.buscaProveedoresPorRFC();
	});
	
	$('#historialComentarios').click(function () {
		proveedorC.historialComentarios();
	});
	
	$('#tipoProveedor').change(function () {
		if($("#tipoProveedor").val()==7) {
			$("#tipoProveedorDesc").attr('disabled', false);
		} else {
			$("#tipoProveedorDesc").val('');
			$("#tipoProveedorDesc").attr('disabled', true);
		}
	});
	
	$('#fisicaMoral').change(function () {
//		console.log("Valor: ", $(this).val());
		if($(this).val() == 'F'){
			$('.proveedorFisicoNuevo').css('display', 'block');
			$('.proveedorMoralNuevo').css('display', 'none');
		}else{
			$('.proveedorFisicoNuevo').css('display', 'none');
			$('.proveedorMoralNuevo').css('display', 'block');
		}
	});
});