var bancosC = (function() {
	var btnEditBanco = "btnEditBanco";
	var idBanco = 0;
	
	var guardarBanco = function(formulario,modeling) {
		var formData = {id:idBanco};
		// iterate over form elements
		$.each($('input, select', formulario), function(k, v) {
			formData[$(this).attr("name")] = $(this).val();

		});

		console.log(formData);
		$.ajax({
			url : "bancosC/guardarBanco",
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
					bancosC.obtenerBanco();
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$(formulario)[0].reset();
					$(modeling).modal('hide');
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

	var extraerBanco = function() {
		$.ajax({
			url : "bancosC/obtenerBanco",
			method : "get",
			dataType : 'json',
			contentType : 'application/json',
			success : function(dataSet) {
				$('#banco').html("");
				if (dataSet.mensaje === 'OK') {
					$('#banco').append('<option value="">Seleccione Banco...</option>');
					$.each(dataSet.dataExtra, function(i, v) {
						$('#banco').append('<option value="' + v.id +'">' + v.nombre + '</option>');
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

	var obtenerBanco = function() {
		console.log("si entra!");
		var btnEditBanco = "btnEditBanco";
		$.ajax({
					url : "bancosC/obtenerBanco",
					method : "GET",
					beforeSend : function() {
						util.loadingStart();
					},
					success : function(dataSet) {
						var columnas = [
								{
									title : "Nombre de Banco",
									data : "nombre"
								},
								{
									title : "Nombre Corto",
									data : "nombreCorto"
								},
								{
									title : "Siglas",
									data : "siglas"
								},

								{
									title : "",
									data : null,
									defaultContent : "<span data-toggle='collapse' class='" + btnEditBanco + "'><i class='fas fa-edit'></i></span>",
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
					tabla.iniciarTabla("#tablaBanco", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
					editarBancos();
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
	
	var editarBancos = function() {
		console.log("entraaaaa");
		var table = $("#tablaBanco").DataTable();
		
		$('#tablaBanco tbody').on('click', '.btnEditBanco', function(){
			util.resetInvalidTooltip();
			var data = table.row( $(this).parents('tr') ).data();
			console.log(data);
			idBanco = data.id;
			
			
			$('#editarBancosModal').modal({show:true, backdrop:'static'});
			$.each(data, function(key, value){
				$("#formBancosEditar *[name=" + key + "]").val(value);
			});
		});
		
		$('#editarBancosModal').on('hidden.bs.modal', function (e) {
			$('#formBancosEditar')[0].reset(); 
			idBanco=null;
	})
	}
	
	return {
		guardarBanco : guardarBanco,
		obtenerBanco : obtenerBanco
	
	}
})();