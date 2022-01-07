var estadosC = (function() {
	var btnEditEstados = "btnEditEstados";
	var idEstado = 0;
	
	var guardarEstados = function(formulario, modeling) {
		var formData = {idEstado:idEstado};
    	//iterate over form elements   
		$.each($('input, select', formulario),function(k, v){
	        formData[$(this).attr("name")] = $(this).val();
	    });
        
		$.ajax({
			url : "estadosC/guardarEstados",
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
					estadosC.extraerEstados();
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
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var  extraerEstados = function() {
		var btnEditEstados = "btnEditEstados";
		$.ajax({
			url : "estadosC/extraerEstados",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				var columnas = [
						{
							title : "Nombre Estado",
							data : "nombreEstado"
						},
					
						
						{
							title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse' class='" + btnEditEstados + "'><i class='fas fa-edit'></i></span>",
							orderable : false
						},
/*						{
							title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse'><i class='fas fa-trash-alt'></i></span>",
							orderable : false
						}*/
						];
				console.log(dataSet);
				if (dataSet.mensaje === "OK") {
					tabla.iniciarTabla("#tablaEstado", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
					editarEstados();
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
	
	var editarEstados = function() {
		console.log("entraEditEdos");
		var table = $("#tablaEstado").DataTable();
		
		$('#tablaEstado tbody').on('click', '.btnEditEstados', function(){
			util.resetInvalidTooltip();
			var data = table.row( $(this).parents('tr') ).data();
			console.log(data);
			idEstado = data.idEstado;
			
			
			$('#editarEstadosModal').modal({show:true, backdrop:'static'});
			$.each(data, function(key, value){
				$("#formEstadosEditar *[name=" + key + "]").val(value);
			});
		});
		
		$('#editarEstadosModal').on('hidden.bs.modal', function (e) {
			$('#formEstadosEditar')[0].reset(); 
			idEstado=null;
	})
	}

	return {
		 guardarEstados : guardarEstados,
		 extraerEstados :  extraerEstados
		
	}
})();