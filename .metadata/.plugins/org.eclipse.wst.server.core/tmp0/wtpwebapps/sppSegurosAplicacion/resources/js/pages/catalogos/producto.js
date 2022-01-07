$(document).ready(function() {
	productoC.obtenerProducto();
	productoC.extraerProducto();
	ramoC.ramo(null, null);
	monedaC.extraerMoneda();
	
	//Accion guardar Producto
	$('#btnGuardarProducto').click(function(){
		productoC.guardarProducto('#formProductoNuevo','#nuevoProductoModal');
	});
	
	$('#btnNuevoProducto').click(function(){
		$('#nuevoProductoModalLongTitle').text('Nuevo producto');
		$('#nuevoProductoModal').modal({show:true, backdrop:'static'});
	});
	
	$('#btnEditProducto').click(function(){
		productoC.guardarProducto('#formProductoEditar','#editarProductoModal');
	});
	
	$('.ramo').change(function() {
		console.log("ramo cambia");
		if(($(this).val() != '5')){
			$('.tipoProducto').removeClass('d-block').addClass('d-none');
			$('.agrupador-box').removeClass('d-block').addClass('d-none');
		}else{
			$('.tipoProducto').removeClass('d-none').addClass('d-block');
			$('.agrupador-box').removeClass('d-none').addClass('d-block');
		}
	});
	
	$('input[name="tipoProducto"]').click(function(){
		var tipoProducto = $('input[name="tipoProducto"]:checked').val();
		if($('#ramo').val() == 5){
			agrupadorC.comboAgrupadores(tipoProducto == 1 ? true : false);
		}else{
			$('.agrupador').html('');
		}
	});
});

