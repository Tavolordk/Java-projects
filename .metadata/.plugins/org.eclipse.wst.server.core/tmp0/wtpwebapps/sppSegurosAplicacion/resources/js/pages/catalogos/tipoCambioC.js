var tipoCambioC = (function() {
	
	var btnEditTipoCambio = "btnEditTipoCambio";
	var idTipo = 0;
	
	var guardarTipoCambio = function(formulario, modaling) {
		var  formData={cveTipoCambio:idTipo};
    	//iterate over form elements   
		$.each($('input, select', formulario),function(k, v){
	        formData[$(this).attr("name")] = $(this).val();
	    });
      
		$.ajax({
			url : "tipoCambioC/guardarTipoCambio",
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
					tipoCambioC.obtenertipoCambio();
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$(formulario)[0].reset();
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

	

	var obtenertipoCambio = function() {
		var btnEditTipoCambio = "btnEditTipoCambio";
		$.ajax({
			url : "tipoCambioC/obtenertipoCambio",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				var columnas = [
						{
							title : "Moneda",
							data : "cve_MonedaLocal"
						},
						{
							title : "Tipo de Cambio",
							data : "cT4TipoCambio"
						},
						{
							title : "Fecha",
							data : "cT4Fecha"
						},
						

						{
							title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse' class='" + btnEditTipoCambio + "'><i class='fas fa-edit'></i></span>",
							orderable : false
						}/*,
						{
							title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse'><i class='fas fa-trash-alt'></i></span>",
							orderable : false
						}*/
						];
				console.log(dataSet);
				if (dataSet.mensaje === "OK") {
					tabla.iniciarTabla("#tablaTipoCambio", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
					editarTipoCambio();
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
	
	var editarTipoCambio = function() {
		console.log("entraTipoC");
		var table = $("#tablaTipoCambio").DataTable();
		
		$('#tablaTipoCambio tbody').on('click', '.btnEditTipoCambio', function(){
			util.resetInvalidTooltip();
			var data = table.row( $(this).parents('tr') ).data();
			console.log(data);
			idTipo = data.cveTipoCambio;
			
			
			$('#editarTipoCambioModal').modal({show:true, backdrop:'static'});
			$.each(data, function(key, value){
				$("#formTipoCambioEditar *[name=" + key + "]").val(value);
			});
		});
		
		$('#editarTipoCambioModal').on('hidden.bs.modal', function (e) {
			$('#formTipoCambioEditar')[0].reset(); 
			idTipo=null;
	})
	}

	return {
		guardarTipoCambio : guardarTipoCambio,
		obtenertipoCambio : obtenertipoCambio
	}
})();