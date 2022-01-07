var comisionesC = (function() {
	var btnEditComisiones = "btnEditComisiones";
	var cveComisiones = 0;
	
	var guardarComisiones = function(formulario,modaling) {
		var formData = {cveComisiones:cveComisiones};
    	//iterate over form elements   
		$.each($('input, select', (formulario)),function(k, v){
	        formData[$(this).attr("name")] = $(this).val();
	    });
		console.log(formData);
		$.ajax({
			url : "comisionesC/guardarComisiones",
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
					comisionesC.obtenerComisiones();
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
	

	var obtenerComisiones = function() {
		var btnEditComisiones = "btnEditComisiones";
		$.ajax({
			url : "comisionesC/obtenerComisiones",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				var columnas = [
					{
						title : "Clave Comision",
						data : "cveComisiones"
					},
					{
							title : "Fecha Inicio de Vigencia",
							data : "cT12FechaInicioVigencia"
						},
						{
							title : "Fecha Fin de Vigencia",
							data : "cT12FechaFinVigencia"
						},
						{
							title : "% Comisiones",
							data : "cT12PorcentajeComisiones"
						},
						{
							title : "% Bono",
							data : "cT12PorcentajeBono"
						},
						
						{
							title : "Ramo",
							data : "cveRamo"
						},
						
						{
							title : "Producto",
							data : "cveProducto"
						},

						{
							title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse' class='" + btnEditComisiones + "'><i class='fas fa-edit'></i></span>",
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
					tabla.iniciarTabla("#tablaComisiones", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
					editarComisiones();
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
	
	var editarComisiones = function() {

		var table = $("#tablaComisiones").DataTable();
		
		$('#tablaComisiones tbody').on('click', '.btnEditComisiones', function(){
			util.resetInvalidTooltip();
			var data = table.row( $(this).parents('tr') ).data();
			console.log(data);
			cveComisiones = data.cveComisiones;
			
			$('#editarComisionesModal').modal({show:true, backdrop:'static'});
			$.each(data, function(key, value){
				
				$("#formComisionesEditar *[name=" + key + "]").val(value);
				
			});
			
		});
		
		$('#editarComisionesModal').on('hidden.bs.modal', function (e) {
			$('#formComisionesEditar')[0].reset(); 
			cveComisiones = null;
	})
	}

	return {
		obtenerComisiones : obtenerComisiones,
		guardarComisiones : guardarComisiones
	}
})();