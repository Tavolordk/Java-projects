/**
 * 
 */
var coberturasProdC = (function() {
	var btnEditCobProd = "btnEditCobProd";
	var idCobProd = 0;
	
	var guardarCobProd = function(formulario, modeling) {
		var mensaje = '';
		var $tipoCobertura = $('.cobertura').find(':selected').attr('data-tipoCobertura');
		var formData = {idCoberturaProducto:idCobProd, 
						coberturaOpcional:"", 
						descripcion:$(".cobertura option:selected").html(),
						millar: ($tipoCobertura == '004' ? 0 : 1)};
		console.log('$tipoCobertura', $tipoCobertura);
		// iterate over form elements
		$.each($('input, select', formulario), function(k, v) {
			if ($(this).attr("name") !== undefined) {
				if ($(this).hasClass("moneda")) {

					formData[$(this).attr("name")] = $(this).inputmask('unmaskedvalue');

				} else if (!isNaN(parseInt($(this).val())) && ($(this).attr("name") === 'porcentajeSAIndemnizar' 
					                                       || $(this).attr("name") === 'porcentajePerdidaTotal')) {

					if (parseInt($(this).val()) <= 0 || parseInt($(this).val()) > 100) {

						mensaje = 'Porcentaje Perdida Total o SA a Indemnizar debe ser mayor a 0% y menor a 100%'
						return false
					}else{
						formData[$(this).attr("name")] = $(this).val();
					}
				} else {
					formData[$(this).attr("name")] = $(this).val();
				}
			}
		});
		
		
		if(mensaje !== ''){
			return mensajes.modalAlert('warning', 'Información', mensaje);
			
		}
		
		console.log(formData);
		$.ajax({
			url : "coberturasProdC/guardarCobProd",
			method : "POST",
			data : JSON.stringify(formData),
			dataType : 'json',
			contentType : 'application/json',
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet.mensaje);
				if (dataSet.mensaje === "OK") {
					coberturasProdC.obtenerCobProd();
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$(formulario)[0].reset();
					$('#primaRiesgo').prop('disabled',false);
					$('#gastosAdq').prop('disabled',false);
					$('#gastosAdm').prop('disabled',false);
					$('#utilidad').prop('disabled',false);
					datepicker.customConfig();
					$(modeling).modal('hide');
				}else if (dataSet.mensaje === "ERROR") {
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			},
			complete : function() {
				util.loadingEnd();
			}

		});
	}

	var extraerProductoXRamo = function(idRamo){
		return $.ajax({
			url : "productoC/id/" + idRamo,
			method: "get",
			dataType: 'json',
			contentType: 'application/json',
			beforeSend : function() {
				util.loadingStart();
			},
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
			},
			complete : function() {
				util.loadingEnd();
			}
		});
	}
	
	var extraerCoberturaXRamo = function(cveRamo){
		return $.ajax({
			url : "coberturasC/id/" + cveRamo,
			method: "get",
			dataType: 'json',
			contentType: 'application/json',
			success : function(dataSet) {
				$('#cobertura, .cobertura').html("");
				if(dataSet.mensaje === 'OK'){
					$('#cobertura, .cobertura').append('<option value="0">Seleccione Cobertura...</option>');
					$.each(dataSet.dataExtra, function(i, v){
						$('#cobertura, .cobertura').append('<option value="' + v.cveCobertura +'" data-tipoCobertura=' + v.tipoCobertura.tipoCoberturaIdentificador + '>' + v.ct10Descripcion + '</option>');
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
	
	var extraerCobProd = function() {
		$.ajax({
			url : "coberturasProdC/obtenerCobProd",
			method : "get",
			dataType : 'json',
			contentType : 'application/json',
			success : function(dataSet) {
				$('#cobProd').html("");
				if (dataSet.mensaje === 'OK') {
					$('#cobProd').append('<option value="">Seleccione Cobertura Producto...</option>');
					$.each(dataSet.dataExtra, function(i, v) {
						$('#cobProd').append('<option value="' + v.idCobProducto +'">' + v.descripcion + '</option>');
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

	var obtenerCobProd = function() {
		var btnEditCobProd = "btnEditCobProd";
		$.ajax({
					url : "coberturasProdC/obtenerCobProd",
					method : "GET",
					beforeSend : function() {
						util.loadingStart();
					},
					success : function(dataSet) {
						var columnas = [
								{
									title : "Producto",
									data : "producto.nombre"
								},
								{
									title : "Coberturas Producto",
									data : "descripcion"
								},
								{
									title : "Plazo Cobertura",
									data : "plazoCobertura"
								},
								{
									title : "Sublimite",
									data : "sublimite"
								},
								{
									title : "Comision Agente Cob",
									data : "comisionAgenteCobertura"
								},
								{
									title : "Comision Promotor Cob",
									data : "comisionPromotorCobertura"
								},
								{
									title : "",
									data : null,
									defaultContent : "<span data-toggle='collapse' class='" + btnEditCobProd + "'><i class='fas fa-edit'></i></span>",
									orderable : false
						}/*,
								{
									title : "",
									data : null,
									defaultContent : "<span data-toggle='collapse'><i class='fas fa-trash-alt'></i></span>",
									orderable : false
						}*/
						];
						if (dataSet.mensaje === "OK") {
					tabla.iniciarTabla("#tablaCobProd", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
					editarCobProd();
						}
					},
					statusCode : {
						404 : function() {
							console.log("page not found");
						}
					},
					complete : function() {
						util.loadingEnd();
					}
				});
	}
	
	var calculaTarifa = function(){

		var cuotaRiesgo = $('#primaRiesgo').inputmask('unmaskedvalue');
		var gastosAdq = $('#gastosAdq').inputmask('unmaskedvalue');
		var gastosAdm = $('#gastosAdm').inputmask('unmaskedvalue');
		var utilidad = $('#utilidad').inputmask('unmaskedvalue');
		var tarifa = cuotaRiesgo / (1-((gastosAdq*0.01) + (gastosAdm*0.01) + (utilidad*0.01)));
				
				$('#idTarifa').val(tarifa.toFixed(2));

	}
	
	var calculaTarifaEditar = function(){
		
		var cuotaRiesgo = $('#formCobProdEditar #primaRiesgo').inputmask('unmaskedvalue');
		var gastosAdq = $('#formCobProdEditar #gastosAdq').inputmask('unmaskedvalue');
		var gastosAdm = $('#formCobProdEditar #gastosAdm').inputmask('unmaskedvalue');
		var utilidad = $('#formCobProdEditar #utilidad').inputmask('unmaskedvalue');
		var tarifa = cuotaRiesgo / (1-((gastosAdq*0.01) + (gastosAdm*0.01) + (utilidad*0.01)));
			
			$('#formCobProdEditar #idTarifa').val(tarifa.toFixed(2));

}
	
	var editarCobProd = function() {
		
		var table = $("#tablaCobProd").DataTable();
		
		$('#tablaCobProd tbody').on('click', '.btnEditCobProd', function(){
			util.resetInvalidTooltip();
			var data = table.row( $(this).parents('tr') ).data();
			idCobProd = data.idCoberturaProducto;
			
			$.each(data, function(key, value){
				
			var ramo = null;
			var cveProducto = null;
				
				if(key==="ramo"){
					ramo = value;
					$(".ramo").val(ramo.cveRamo);
				}else if (key==="producto"){
					producto = value;
					$('.producto').html('');
					$.when(extraerProductoXRamo(data.ramo.cveRamo)).done(function(d){
						$(".producto").val(data.producto.cveProducto);
					});
				}else if (key==="ct10Cobertura"){
					$.when(extraerCoberturaXRamo(data.ramo.cveRamo)).then(function(d){
						var cobertura = value;
						$(".cobertura").val(data.ct10Cobertura.cveCobertura);
						validarCamposIndemnizacionPerdidas();
						validarTipoCobertura();
					});
				}else if (key==="gastosAdq"){
					gastosAdq = value;
					$("#formCobProdEditar #gastosAdq").val((gastosAdq*100).toFixed(2));
					$('#formCobProdEditar #gastosAdq').blur(function() {
						calculaTarifaEditar();
					});
				}else if (key==="gastosAdm"){
						gastosAdm = value;
						$("#formCobProdEditar #gastosAdm").val((gastosAdm*100).toFixed(2));
						$('#formCobProdEditar #gastosAdm').blur(function() {
							calculaTarifaEditar();
						});
				}else if (key==="utilidad"){
							utilidad = value;
							$("#formCobProdEditar #utilidad").val((utilidad*100).toFixed(2));
							$('#formCobProdEditar #utilidad').blur(function() {
								calculaTarifaEditar();
							});
				}else if (key==="tarifa"){
					tarifa = value;
							$('#formCobProdEditar #idTarifa').val(tarifa.toFixed(2));
				}else if (key==="impuesto"){
						$("#formCobProdEditar #impuesto").val((value*100).toFixed(2));
				}else if (key==="comisionPromotorCobertura"){
						$(".comisionPromotorCobertura").val((value*100).toFixed(2));
				}else if (key==="comisionAgenteCobertura"){
						$(".comisionAgenteCobertura").val((value*100).toFixed(2));
				}else if (key==="coaseguro"){
						$("#formCobProdEditar #coaseguro").val((value*100).toFixed(2));
				}else{
					$("#formCobProdEditar *[name=" + key + "]").val(value);
				}
			});
			
			$('#editarCobProdModal').modal({show:true, backdrop:'static'});
		});
		
		$('#editarCobProdModal').on('hidden.bs.modal', function (e) {
			$('#formCobProdEditar')[0].reset(); 
			idCobProd = null;
	})
	}
	
	var validarCamposIndemnizacionPerdidas = function(){
		var $ramo = $('.ramo').val();
		var $tipoCobertura = $('.cobertura').find(':selected').attr('data-tipoCobertura');
		console.log('$tipoCobertura', $tipoCobertura);
		if($ramo == '5'){
			if($tipoCobertura != '001' && $tipoCobertura != '004' && $tipoCobertura != undefined){
				$('.porcentajeSAIndemnizar-box').removeClass('d-none').addClass('d-block');
			}else{
				$('.porcentajeSAIndemnizar-box').removeClass('d-block').addClass('d-none');
				$('.porcentajeSAIndemnizar').val('');
			}
			
			if($tipoCobertura == '001'){
				$('.porcentajePerdidaTotal-box').removeClass('d-none').addClass('d-block');
			}else{
				$('.porcentajePerdidaTotal-box').removeClass('d-block').addClass('d-none');
				$('.porcentajePerdidaTotal').val('');
			}
		}else{
			$('.porcentajeSAIndemnizar-box, .porcentajePerdidaTotal-box').removeClass('d-block').addClass('d-none');
			$('.porcentajeSAIndemnizar, .porcentajePerdidaTotal').val('');
		}
	}
	
	var validarTipoCobertura = function(){
		if($('.cobertura').find(':selected').attr('data-tipoCobertura') == '004'){
			$('.asistencia').val('0');
			$('.asistencia').prop('disabled',true);
		}else{
			$('.asistencia').prop('disabled',false);
		}
	}
	
	return {
		guardarCobProd : guardarCobProd,
		obtenerCobProd : obtenerCobProd,
		calculaTarifa : calculaTarifa,
		editarCobProd : editarCobProd,
		extraerProductoXRamo : extraerProductoXRamo,
		extraerCoberturaXRamo : extraerCoberturaXRamo,
		validarCamposIndemnizacionPerdidas : validarCamposIndemnizacionPerdidas,
		validarTipoCobertura : validarTipoCobertura
	
	}
})();