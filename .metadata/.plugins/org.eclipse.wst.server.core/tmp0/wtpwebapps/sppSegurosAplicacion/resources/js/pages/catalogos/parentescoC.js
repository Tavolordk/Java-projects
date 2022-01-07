var parentescoC = (function() {

	var obtenerParentesco = function(callback){
		$.ajax({
			url : "parentescoC/obtenerParentesco",
			method: "get",
			dataType: 'json',
			contentType: 'application/json',
			success : callback,
		});
	};
	
	var llenarComboParentesco = function(){
		obtenerParentesco(function(data){
			$('.parentesco').html("");
			if(data.mensaje === 'OK'){
				$('.parentesco').append('<option value="0">Seleccione opción...</option>');
				$.each(data.dataExtra, function(i, v){
					$('.parentesco').append('<option value="' + v.idParentesco +'">' + v.descripcion + '</option>');
				});
			}
		});
	};
	
	return {
		obtenerParentesco : obtenerParentesco,
		llenarComboParentesco : llenarComboParentesco
	}
})();