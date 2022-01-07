var productoC = (function() {
	var btnEditProducto = "btnEditProducto";
	var idProducto = 0;
	
	var guardarProducto = function(formulario, modaling) {
		var formData = {cveProducto:idProducto};
    	//iterate over form elements  
		var tipoProducto
		if($('#ramo').val()==5){
			tipoProducto = $('input[name="tipoProducto"]:checked').val();
		}else{
			tipoProducto = 2;
		}
		$.each($('input, select', formulario),function(k, v){
			if($(this).hasClass("moneda")){
				formData[$(this).attr("name")] = $(this).inputmask('unmaskedvalue');
			}else{
				formData[$(this).attr("name")] = $(this).val();
			}
	       
	    });
		formData['tipoProducto'] = tipoProducto;
		
		$.ajax({
			url : "productoC/guardarProducto",
			method: "POST",
			data: JSON.stringify(formData),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet.mensaje);
				if(dataSet.mensaje==="OK"){
					productoC.obtenerProducto();
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$(formulario)[0].reset();
					datepicker.customConfig();
					$(modaling).modal('hide');
				}
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			},				
			complete: function(){
				util.loadingEnd();
			}
		});
	}

	var extraerProducto = function(){
		$.ajax({
			url : "productoC/obtenerProducto",
			method: "get",
			dataType: 'json',
			contentType: 'application/json',
			success : function(dataSet) {
				$('#producto, .producto').html("");
				//console.log(dataSet);
				if(dataSet.mensaje === 'OK'){
					$('#producto, .producto').append('<option value="0">Seleccione Producto...</option>');
					$.each(dataSet.dataExtra, function(i, v){
						$('#producto, .producto').append('<option data-plazo="' + v.plazoPlan +'" value="' + v.cveProducto +'">' + v.nombre + '</option>');
					});
				}
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			}
		});
	}
	
	var obtenerProducto = function() {
		var btnEditProducto = "btnEditProducto";
		$.ajax({
			url : "productoC/obtenerProducto",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				var columnas = [
						
						
						{
							title : "Nombre Producto",
							data : "nombre"
						},
						
						{
							title : "Plazo Plan",
							data : "plazoPlan"
						},
						
						{
							title : "Ramo",
							data : "ramo.cT8Descripcion"
						},
						
						{
							title : "Moneda",
							data : "moneda.ct16MonedaNombre"
						},
						
						{
							title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse' class='" + btnEditProducto + "'><i class='fas fa-edit'></i></span>",
							orderable : false
						}];
				if (dataSet.mensaje === "OK") {
					tabla.iniciarTabla("#tablaProducto", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
					editarProducto();
				}
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			},				
			complete: function(){
				util.loadingEnd();
			}
		});
	}

	var extraerProductobyRamo = function(callback) {
		var ramo = $('#idRamo').val();
		$.ajax({

			url : "productoC/id/" + ramo,
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				callback(dataSet);

				// console.log(dataSet);

			},
			error : function(request, status, error) {
				console.log(request.responseText);
			},
			statusCode : {
				404 : function(a, b, c) {
					console.log("Error:", a, b, c);
					console.log("No encuentra reporte.");
					console.log(this.url);
				}
			},
			complete : function() {
				util.loadingEnd();
			}
		});
	}

	var producto = function(valor) {
		// var valor = $('#idRamo').val();
		extraerProductobyRamo(function(producto) {
			var dataSet = producto;
			if (dataSet.mensaje === 'OK') {
				$('#producto, .producto').html("");
				$('#producto, .producto').append(
						'<option value="0">Seleccione Producto...</option>');
				$.each(dataSet.dataExtra, function(i, v) {
					$('#producto, .producto').append(
							'<option data-plazo="' + v.plazoPlan + '" value="'
									+ v.cveProducto + '">' + v.nombre
									+ '</option>');
				});
				if (valor) {
					$("#producto").val(valor).change();
				}
			}

		});
	}
	
	// /////////////sirve
	var extraerProductobyRamo = function(callback) {
		var ramo = $('#idRamo').val();
		$.ajax({

			url : "productoC/id/" + ramo,
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				callback(dataSet);

				// console.log(dataSet);

			},
			error : function(request, status, error) {
				console.log(request.responseText);
			},
			statusCode : {
				404 : function(a, b, c) {
					console.log("Error:", a, b, c);
					console.log("No encuentra reporte.");
					console.log(this.url);
				}
			},
			complete : function() {
				util.loadingEnd();
			}
		});
	}

	var producto = function(valor) {
		// var valor = $('#idRamo').val();
		extraerProductobyRamo(function(producto) {
			var dataSet = producto;
			if (dataSet.mensaje === 'OK') {
				$('#producto, .producto').html("");
				$('#producto, .producto').append(
						'<option value="0">Seleccione Producto...</option>');
				$.each(dataSet.dataExtra, function(i, v) {
					$('#producto, .producto').append(
							'<option data-plazo="' + v.plazoPlan + '" value="'
									+ v.cveProducto + '">' + v.nombre
									+ '</option>');
				});
				if (valor) {
					$("#producto").val(valor).change();
				}
			}

		});
	}
	
//	var extraerProductobyRamo = function(ramo){		
//		$.ajax({
//			async: false,
//			url: "productoC/id/" + ramo,
//			method: "GET",
//			beforeSend: function(){
//				util.loadingStart();
//			},
//			success: function (dataSet) {
//				$('#producto, .producto').html("");
//				console.log(dataSet);
//				if(dataSet.mensaje === 'OK'){
//					$('#producto, .producto').append('<option value="0">Seleccione Producto...</option>');
//					$.each(dataSet.dataExtra, function(i, v){
//						$('#producto, .producto').append('<option data-plazo="' + v.plazoPlan +'" value="' + v.cveProducto +'">' + v.nombre + '</option>');
//					});
//				}
//			},
//			error: function (request, status, error) {
//		        console.log(request.responseText);
//		    },
//			statusCode: {
//				404: function (a, b, c){
//			        console.log("Error:", a, b, c);
//					console.log("No encuentra reporte.");
//					console.log(this.url);
//				}
//			},
//			complete: function(){
//				util.loadingEnd();
//			}
//		});		
//	}
//	
	
	var editarProducto = function() {
		
		var table = $("#tablaProducto").DataTable();
		
		$('#tablaProducto tbody').on('click', '.btnEditProducto', function(){
			util.resetInvalidTooltip();
			var data = table.row( $(this).parents('tr') ).data();
			console.log(data);
			idProducto = data.cveProducto;
			
			$('#nuevoProductoModal').modal({show:true, backdrop:'static'});
			$.each(data, function(key, value){
				var ramo = null;
				var cveProducto = null;
				var tipoProducto = null;
				var agrupador = null;
				if(key==="ramo"){
					ramo = value;
					$("#formProductoNuevo *[name=" + key + "]").val(ramo.cveRamo);
					$("#formProductoNuevo #ramo").val(ramo.cveRamo);
					
				}else if (key==="moneda"){
					moneda = value;
					$("#formProductoNuevo #moneda").val(moneda.ct16Cve);
					}else if (key==="tipoProducto"){
						tipoProducto = value;
						$('#nuevoProductoModalLongTitle').text('Editar producto');
						$("#formProductoNuevo .tipoProducto").addClass('d-block').removeClass('d-none');
						if(value===1){
							$("#formProductoNuevo #tipoProducto1").prop('checked',true);
						}else{
							$("#formProductoNuevo #tipoProducto2").prop('checked',true);
						}
						}else if(key==="agrupador"){
							console.log(key);
							console.log(value)
							agrupador = value;
							$("#formProductoNuevo #agrupador").val(agrupador);
						}else{
					$("#formProductoNuevo *[name=" + key + "]").val(value);
				}
			});
		});
		
		$('#nuevoProductoModal').on('hidden.bs.modal', function (e) {
			$('#formProductoNuevo')[0].reset(); 
			//$('.municipio').html();
			idProducto = null;
	})
	}
	
	return {
		
		guardarProducto : guardarProducto,
		obtenerProducto : obtenerProducto,
		extraerProducto : extraerProducto,
		extraerProductobyRamo : extraerProductobyRamo,
		producto : producto

	}
})();