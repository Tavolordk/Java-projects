
fileinput.inicializarFileinputUploadOnClick(null,fileInputSesas,["txt"]);
$(document).ready(function(){
	
	analisisC.catalogoAnios()
	analisisC.graficamon()
	analisisC.grafica()
	analisisC.primasTotal()
	analisisC.primasPorcentaje()
	analisisC.ramosSesa()
	
 $('#ramosCond').val('301, 402, 403, 771, 781, 909, 910')
 
 $('#cobRC').click(function(){
	 console.log('cargacoberturas')
	 
	 analisisC.coberturasRC();
 })
 
  $('#monedaBtn').click(function(){
	 console.log('cargacoberturas')
	 
	 analisisC.monedaCat();
	 
 })
 
 
  $('#giroBtn').click(function(){
	 console.log('cargacoberturas')
	 
	 analisisC.giroCat();
	 $('.nuevaCob').addClass('d-none')
	 
 })
 
 $('#nuevaCob').click(function(){
	 
	 analisisC.guardaCobertura()
	 
 })
 
 $('#hipotesisForm #claveCNSF').focusin(function(){
	 console.log('Busca Clave CNSF -> ')
	 analisisC.autoCompletarRamoCNSF('formArchivoPagos')
	 
 })
 
 $('#idCargarPagos').click(function(){
	 
	 analisisC.cargaSesaTxt()
	
	 $('#fileInputPagos').val("")
//	 fileinput.inicializarFileinputUploadOnClick(null,fileInputPagos,["txt"]);
	 
 })
 
 $('#calculaDatos').click(function(){
	 analisisC.calculaDatos()
 })
	
//	$('#cargaPagos').css('display','block');
//	$('#lbArchivoPagos').css('display','block');
//	$('#txtCargaPagos').css('display','block');
	
})