var subramoC = (function() {
	var btnEditarSubramo = "btnEditarSubramo";
	var idSubramo = 0;
	
	var guardarSubramo = function(formulario,modeling) {
		var formData = {idSubramo:idSubramo};
    	//iterate over form elements   
		$.each($('input, select', formulario),function(k, v){
	        formData[$(this).attr("name")] = $(this).val();
	    });
		console.log(formData);
		$.ajax({
			url : "subramoC/guardarSubramo",
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
					subramoC.obtenerSubramo();
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
	
	var extraerSubramo = function(){
		$.ajax({
			url : "subramoC/obtenerSubramo",
			method: "get",
			dataType: 'json',
			contentType: 'application/json',
			success : function(dataSet) {
				$('#subramo').html("");
				console.log(dataSet);
				if(dataSet.mensaje === 'OK'){
					$('#subramo').append('<option value="0">Seleccione Subramo...</option>');
					$.each(dataSet.dataExtra, function(i, v){
						$('#subramo').append('<option value="' + v.cveSubramo +'">' + v.cT9Descripcion + '</option>');
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

	var obtenerSubramo = function() {
		var btnEditarSubramo = "btnEditarSubramo";
		$.ajax({
			url : "subramoC/obtenerSubramo",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				var columnas = [
						{
							title : "Clave",
							data : "cveSubramo"
						},
						{
							title : "Descripción",
							data : "cT9Descripcion"
						},

						{
							title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse' class='" + btnEditarSubramo + "'><i class='fas fa-edit'></i></span>",
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
					tabla.iniciarTabla("#tablaSubramo", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
					editarSubramo();
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
	
	var editarSubramo = function() {
		
		var table = $("#tablaSubramo").DataTable();
		
		$('#tablaSubramo tbody').on('click', '.btnEditarSubramo', function(){
			util.resetInvalidTooltip();
			var data = table.row( $(this).parents('tr') ).data();
			console.log(data);
			idSubramo = data.idSubramo;
						
			$('#editarSubramoModal').modal({show:true, backdrop:'static'});
				$.each(data, function(key, value){
					$("#formSubramoEditar *[name=" + key + "]").val(value);
				});
			});
		
		$('#editarSubramoModal').on('hidden.bs.modal', function (e) {
			$('#formSubramoEditar')[0].reset(); 
			idSubramo=null;
		})
	}

	return {
		guardarSubramo : guardarSubramo,
		obtenerSubramo : obtenerSubramo,
		extraerSubramo : extraerSubramo
	}
})();