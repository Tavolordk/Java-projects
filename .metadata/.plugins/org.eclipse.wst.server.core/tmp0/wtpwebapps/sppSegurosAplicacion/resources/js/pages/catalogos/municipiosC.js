var municipiosC = (function() {
	var btnEditMunicipio = "btnEditMunicipio";
	var idMunicipios = 0;
	
	var guardarMunicipios = function(formulario, modaling) {
		var formData = {idMunicipio:idMunicipios};
    	//iterate over form elements   
		$.each($('input, select', formulario),function(k, v){
	        formData[$(this).attr("name")] = $(this).val();
	    });
		console.log(formData);
		$.ajax({
			url : "municipiosC/guardarMunicipios",
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
					municipiosC.extraerMunicipios();
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

	var extraerMunicipios = function() {
		var btnEditMunicipio = "btnEditMunicipio";
		$.ajax({
			url : "municipiosC/extraerMunicipios",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				var columnas = [
						{
							title : "Nombre de Municipio",
							data : "nombreMunicipio"
						},
						
						{
							title : "Clave de Municipio",
							data : "claveMunicipio"
						},
						
						{
							title : "Estado",
							data : "estado.nombreEstado"
						},
						

						{
							title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse' class='" + btnEditMunicipio + "'><i class='fas fa-edit'></i></span>",
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
					tabla.iniciarTabla("#tablaMunicipio", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
					editarMunicipio();
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

	var editarMunicipio = function() {
		
		var table = $("#tablaMunicipio").DataTable();
		
		$('#tablaMunicipio tbody').on('click', '.btnEditMunicipio', function(){
			util.resetInvalidTooltip();
			var data = table.row( $(this).parents('tr') ).data();
			console.log(data);
			idMunicipios = data.idMunicipio;
			
			
			$('#editarMunicipiosModal').modal({show:true, backdrop:'static'});
			$.each(data, function(key, value){
				var estado = null;
				var municipio = null;
				
				if(key==="estado"){
					estado = value;
					$("#formMunicipiosEditar *[name=" + key + "]").val(estado.idEstado);
				}//else if(key==="municipio"){
				//	municipio = value;
				//	$("#formMunicipiosEditar *[name=" + key + "]").html("<option value=" + municipio.idMunicipio + " selected>" + municipio.nombreMunicipio + "</option>");
				//}
				else{
				$("#formMunicipiosEditar *[name=" + key + "]").val(value);
				}
			});
		});
		
		$('#editarMunicipiosModal').on('hidden.bs.modal', function (e) {
			$('#formMunicipiosEditar')[0].reset(); 
			idMunicipios=null;
	})
	}
	
	return {
		guardarMunicipios : guardarMunicipios,
		extraerMunicipios : extraerMunicipios
		
	}
})();
