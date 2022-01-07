var estatusC = (function() {
	var btnEditEstatus = "btnEditEstatus";
	var idEstatus = 0;
	
	var guardarEstatus = function(formulario,modeling) {
		var formData = {cveEstatus:idEstatus};
    	//iterate over form elements   
		$.each($('input, select',formulario),function(k, v){
	        formData[$(this).attr("name")] = $(this).val();
	    });
		console.log(formData);
		
		$.ajax({
			url : "estatusC/guardarEstatus",
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
					estatusC.obtenerEstatus();
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
	
	var extraerEstatus = function(){
		$.ajax({
			url : "estatusC/obtenerEstatus",
			method: "get",
			dataType: 'json',
			contentType: 'application/json',
			success : function(dataSet) {
				$('#estatus').html("");
				console.log(dataSet);
				if(dataSet.mensaje === 'OK'){
					$('#estatus').append('<option value="0">Seleccione Estatus...</option>');
					$.each(dataSet.dataExtra, function(i, v){
						$('#estatus').append('<option value="' + v.cveEstatus +'">' + v.CT2Descripcion + '</option>');
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

	var obtenerEstatus = function() {
		var btnEditEstatus = "btnEditEstatus";
		$.ajax({
			url : "estatusC/obtenerEstatus",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				var columnas = [
					{
						title : "Clave Estatus",
						data : "cveEstatus"
					},
						{
							title : "Descripción",
							data : "ct2Descripcion"
						},
						
						{
							title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse'class='" + btnEditEstatus + "'><i class='fas fa-edit'></i></span>",
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
					tabla.iniciarTabla("#tablaEstatus", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
					editarEstatus();
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
	
	var editarEstatus = function (){
		var table = $("#tablaEstatus").DataTable();
		
		$('#tablaEstatus tbody').on('click', '.btnEditEstatus', function(){
			util.resetInvalidTooltip();
			var data = table.row( $(this).parents('tr') ).data();
			console.log(data);
			idEstatus = data.cveEstatus
		
			$('#editarEstatusModal').modal({show:true, backdrop:'static'});
			$.each(data, function(key, value){
				$("#formEstatusEditar *[name=" + key + "]").val(value);
			});
		});
		
		$('#editarEstatusModal').on('hidden.bs.modal', function (e) {
			$('#formEstatusEditar')[0].reset(); 
			idEstatus = null;
		})	
	} 

	return {
		guardarEstatus : guardarEstatus,
		obtenerEstatus : obtenerEstatus,
		extraerEstatus : extraerEstatus
	}
})();