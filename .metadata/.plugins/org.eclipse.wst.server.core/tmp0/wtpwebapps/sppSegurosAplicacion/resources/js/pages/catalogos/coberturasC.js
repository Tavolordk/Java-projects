var coberturasC = (function() {
	var btnEditarCoberturas = "btnEditarCoberturas";
	var idCoberturas = 0;
	var $consecutivoTipoCobertura = 0;
	
	var guardarCoberturas = function(formulario, modaling) {
		console.log('$consecutivoTipoCobertura', $consecutivoTipoCobertura);
		
		var mensaje = '';
		var formData = {cveCobertura:idCoberturas, consecutivoTipoCobertura : $consecutivoTipoCobertura};
    	
		//iterate over form elements   
		$.each($('input, select', formulario),function(k, v){
			
			console.log('Campo: ',$(this).attr("name"), 'Valor: ', $(this).val())
			
			if($(this).val() !== '0' && $(this).val() !== ''){
				formData[$(this).attr("name")] = $(this).val().toUpperCase();
			}else{
				mensaje =  $(this).attr("name")
				return false
			}
	           
	    });
		
		if(mensaje !== ''){
			return mensajes.modalAlert('warning','Información','Es necesario Capturar Todos los Campos');
		}
		
		$.ajax({
			url : "coberturasC/guardarCoberturas",
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
					coberturasC.obtenerCoberturas();
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$(formulario)[0].reset();
					$(modaling).modal('hide');
					$consecutivoTipoCobertura = 0;
				}
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			},			
			complete: function(){
				util.loadingEnd();
				$consecutivoTipoCobertura = 0;
			}
		});
	}
	
	var extraerCoberturas = function(){
		$.ajax({
			url : "coberturasC/obtenerCoberturas",
			method: "get",
			dataType: 'json',
			contentType: 'application/json',
			success : function(dataSet) {
				$('#cobertura, .cobertura').html("");
				//console.log(dataSet);
				if(dataSet.mensaje === 'OK'){
					$('#cobertura, .cobertura').append('<option value="0">Seleccione Cobertura...</option>');
					$.each(dataSet.dataExtra, function(i, v){
						$('#cobertura, .cobertura').append('<option value="' + v.cveCobertura +'">' + v.ct10Descripcion + '</option>');
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
	
	var obtenerCoberturas = function() {
		var btnEditarCoberturas = "btnEditarCoberturas";
		$.ajax({
			url : "coberturasC/obtenerCoberturas",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				var columnas = [
						{
							title : "Descripción",
							data : "ct10Descripcion"
						},
						
						{
							title : "Ramo",
							data : "cveRamo.cT8Descripcion"
						},
						
						{
							title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse' class='" + btnEditarCoberturas + "'><i class='fas fa-edit'></i></span>",
							orderable : false
						},];
				
				if (dataSet.mensaje === "OK") {
					tabla.iniciarTabla("#tablaCoberturas", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
					editarCoberturas();
					
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
	
	var editarCoberturas = function() {
		var table = $("#tablaCoberturas").DataTable();
		
		$('#tablaCoberturas tbody').on('click', '.btnEditarCoberturas', function(){
			util.resetInvalidTooltip();
			var data = table.row( $(this).parents('tr') ).data();
			idCoberturas = data.cveCobertura;

			console.log('data.consecutivoTipoCobertura', data.coberturaConsecutivoTipoCobertura);
			$consecutivoTipoCobertura = data.coberturaConsecutivoTipoCobertura;
			$('#editarcoberturasModal').modal({show:true, backdrop:'static'});
			
			$.each(data, function(key, value){
				$("#formCoberturasEditar *[name=" + key + "]").val(value);
				
				if(key === 'tipoCobertura'){
					$("#formCoberturasEditar *[name=" + key + "]").val(value.idTipoCobertura);
				}else if(key === 'cveRamo'){
					$("#formCoberturasEditar *[name=" + key + "]").val(value.cveRamo);
				}else if(key === 'tipo'){
					console.log(key, value);
					$("#formCoberturasEditar *[name=" + key + "]").val(value);
				}
			});
		});
		
		$('#editarcoberturasModal').on('hidden.bs.modal', function (e) {
			$('#formCoberturasEditar')[0].reset(); 
			idCoberturas=null;
			$consecutivoTipoCobertura = 0;
	})
	}
	
	var obtenerTiposCobertura = function(){
		$.ajax({
			url : "coberturasC/obtenerTiposCobertura",
			method: "get",
			dataType: 'json',
			contentType: 'application/json',
			success : function(dataSet) {
				$('.tipoCobertura').html("");
				if(dataSet.mensaje === 'OK'){
					$('.tipoCobertura').append('<option value="0">--- Seleccione ---</option>');
					$.each(dataSet.dataExtra, function(i, v){
						$('.tipoCobertura').append('<option value="' + v.idTipoCobertura +'">' + v.tipoCoberturaNombre + '</option>');
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

	return {
		guardarCoberturas : guardarCoberturas,
		obtenerCoberturas : obtenerCoberturas,
		extraerCoberturas : extraerCoberturas,
		obtenerTiposCobertura : obtenerTiposCobertura
		
	}
})();