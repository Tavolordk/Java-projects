var agrupadorC = (function(){
	
	var $idAgrupador = 0;
		
	var guardarAgrupadores = function() {
		var formData = {};
    	//iterate over form elements 		
		var tipoProducto
		if($('#ramo').val()==5){
			tipoProducto = $('input[name="esPublico"]:checked').val();
		}else{
			tipoProducto = 0;
		}
		$.each($('input, select', '#formAgrupadoresEditar'),function(k, v){
	        formData[$(this).attr("name")] = $(this).val();
	       
	    });
		console.log(tipoProducto);
		formData['esPublico'] = tipoProducto;

		formData['idAgrupador'] = $idAgrupador;
		console.log(formData);
		$.ajax({
			url : "agrupadorC/guardarAgrupadores",
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
					agrupadorC.extraerAgrupadores();
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$('#formAgrupadoresEditar')[0].reset();
					//datepicker.customConfig();
					$('#editarAgrupadoresModal').modal('hide');
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
	
	var comboAgrupadores = function(soloPublico){
		
		$.ajax({
			url : "agrupadorC/obtenerAgrupadores",
			method: "GET",
			dataType: 'json',
			contentType: 'application/json',
			success : function(dataSet) {
				$('.agrupador').html("");
				if(dataSet.mensaje === 'OK'){
					$('.agrupador').append('<option value="0">Seleccione opción...</option>');
					$.each(dataSet.dataExtra, function(i, v){
						if(soloPublico && v.esPublico){
							$('.agrupador').append('<option value="' + v.idAgrupador +'">' + v.nombreAgrupador + '</option>');
						}else if(!soloPublico && !v.esPublico){
							$('.agrupador').append('<option value="' + v.idAgrupador +'">' + v.nombreAgrupador + '</option>');
						}
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
	
	var extraerAgrupadores = function() {
		var btnEditAgrupadores = "btnEditAgrupadores";
		$.ajax({
					url : "agrupadorC/extraerAgrupadores",
					method : "GET",
					beforeSend : function() {
						util.loadingStart();
					},
					success : function(dataSet) {
						console.log(dataSet);
						var columnas = [

								{
									title : "Clave",
									data : "claveAgrupador"
								},
								{
									title : "Agrupador",
									data : "nombreAgrupador"
								},
								{
									title : "Ramo",
									data : "ramo.cT8Descripcion"
								},
								{ title: "Tipo", 
									data: "esPublico",
									render : function(data, type, row) {
									var	tipo = "";
									if(data == true){
										tipo = "Público"
//									}else if (data = df){
//										tipo = "Privado"
									}else{
										tipo = "Privado"
									}
									return tipo;
								} 
								},

								{
									title : "",
									data : null,
									defaultContent : "<span data-toggle='collapse' class='" + btnEditAgrupadores + "'><i class='fas fa-edit'></i></span>",
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
					tabla.iniciarTabla("#tablaAgrupadores", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
					editarAgrupadores();
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
	
	/***EDITAR AGRUPADORES***/
	var editarAgrupadores = function() {
		var $_table = $("#tablaAgrupadores").DataTable();
		$('#tablaAgrupadores tbody').on('click', '.btnEditAgrupadores', function(){
			var _table = $_table.row( $(this).parents('tr') ).data();
			
			$idAgrupador = _table.idAgrupador;
			$('#formAgrupadoresEditar #ramo').val(_table.ramo.cveRamo);
			$('#formAgrupadoresEditar #claveAgrupador').val(_table.claveAgrupador);
			$('#formAgrupadoresEditar #nombreAgrupador').val(_table.nombreAgrupador);
		
			var tipo = null;
			tipo = _table.esPublico;
			if(tipo === true){
				$("#formAgrupadoresEditar #tipoProducto1").prop('checked',true);
			}else{
				$("#formAgrupadoresEditar #tipoProducto2").prop('checked',true);
			}
			
			$('.titleEditAgrupadores').text("Editar Agrupador");
			$('#editarAgrupadoresModal').modal({show:true, backdrop:'static'});
			
		});
		$('#editarAgrupadoresModal').on('hidden.bs.modal', function (e) {
			$('#formAgrupadoresEditar')[0].reset(); 
			$idAgrupador=null;
	})
	
	}
	
	return {
		guardarAgrupadores : guardarAgrupadores,
		comboAgrupadores : comboAgrupadores,
		extraerAgrupadores : extraerAgrupadores
	}
})();