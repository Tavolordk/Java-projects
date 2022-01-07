$(document).ready(function() {
       
	reportesRR8C.catalogoAnios()
       
	$('#btnRR8').click(function(){
		reportesRR8C.reporteCorsOrs();
	})
	
	$('#btnRR8Fes').click(function(){
		reportesRR8C.reporteFes()
	})
	
});

