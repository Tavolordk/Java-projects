var gastosMedicosC = (function () {
	
	var guardarIBNRRCCGastosMedicos = function (){

		var fsE = $('#fsE').val();
		var alphaE = $('#alphaE').val();
		var id = 1;
		var fac1= $('#fac1E').val();
		var fac2= $('#fac2E').val();
		var fac3= $('#fac3E').val();
		var fac4= $('#fac4E').val();
		var fac5= $('#fac5E').val();
		var fsUlE= $('#fsUlE').val();
		var jsonData = {fsE:fsE,
						alphaE:alphaE,
						id:1,
						fac1E:fac1,
						fac2E:fac2,
						fac3E:fac3,
						fac4E:fac4,
						fac5E:fac5,
						fsUlE:fsUlE};
		$.ajax({
				url         : "reservas/guardarIBNRRCCGastosMedicos",
				type        : "POST",
				data: JSON.stringify(jsonData),
				dataType: 'json',
				contentType: 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){
					console.log('COBERTURAS RC')
					console.log(dataSet.mensaje)
					
					if(dataSet.mensaje === 'OK'){
						obtnerIBNRRCCGastosMedicos();
					}else{
						$('#idTable').css('display','none');
						mensajes.modalAlert('warning','Información',dataSet.detalleMensaje);
					}
					
				},
				statusCode: {
					404: function () {
						console.log("");
					}
				},
				error: function (xhr, status, error) {
					var err = xhr.responseText;
					console.log(xhr);
				},
				complete: function(){
					util.loadingEnd();
				}
			});
		}
	
	var obtnerIBNRRCCGastosMedicos = function (){
	$.ajax({
			url         : "reservas/obtnerIBNRRCCGastosMedicos",
			type        : "GET",
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
				console.log(dataSet.mensaje)
				if(dataSet.mensaje === 'OK'){
					if(dataSet.dataExtra.length != 0){
						$('#fs').html(parseFloat(dataSet.dataExtra[0].gastRRC).toFixed(2)+"%");
						$('#alpha').html(parseFloat(dataSet.dataExtra[0].alpha).toFixed(2)+"%");
						$('#fac1').html(parseFloat(dataSet.dataExtra[0].fac1).toFixed(2)+"%");
						$('#fac2').html(parseFloat(dataSet.dataExtra[0].fac2).toFixed(2)+"%");
						$('#fac3').html(parseFloat(dataSet.dataExtra[0].fac3).toFixed(2)+"%");
						$('#fac4').html(parseFloat(dataSet.dataExtra[0].fac4).toFixed(2)+"%");
						$('#fac5').html(parseFloat(dataSet.dataExtra[0].fac5).toFixed(2)+"%");
						$('#fsUl').html(parseFloat(dataSet.dataExtra[0].gastIBNR).toFixed(2)+"%");
						
						$('#fsE').val(parseFloat(dataSet.dataExtra[0].gastRRC).toFixed(2));
						$('#alphaE').val(parseFloat(dataSet.dataExtra[0].alpha).toFixed(2));
						$('#fac1E').val(parseFloat(dataSet.dataExtra[0].fac1).toFixed(2));
						$('#fac2E').val(parseFloat(dataSet.dataExtra[0].fac2).toFixed(2));
						$('#fac3E').val(parseFloat(dataSet.dataExtra[0].fac3).toFixed(2));
						$('#fac4E').val(parseFloat(dataSet.dataExtra[0].fac4).toFixed(2));
						$('#fac5E').val(parseFloat(dataSet.dataExtra[0].fac5).toFixed(2));
						$('#fsUlE').val(parseFloat(dataSet.dataExtra[0].gastIBNR).toFixed(2));
						$('#id').html(parseFloat(dataSet.dataExtra[0].id).toFixed(2));
						
					}else{
						mensajes.modalAlert('warning','Información',"No cuenta con datos");
					}
					}					
				else{
					mensajes.modalAlert('warning','Información',dataSet.detalleMensaje);
				}
				
			},
			statusCode: {
				404: function () {
					console.log("");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	return {
		guardarIBNRRCCGastosMedicos:guardarIBNRRCCGastosMedicos,
		obtnerIBNRRCCGastosMedicos:obtnerIBNRRCCGastosMedicos
	}
})();