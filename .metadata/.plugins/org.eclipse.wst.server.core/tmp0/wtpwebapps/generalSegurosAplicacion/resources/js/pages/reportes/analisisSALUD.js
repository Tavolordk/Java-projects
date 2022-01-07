
fileinput.inicializarFileinputUploadOnClick(null,fileInputSesas,["txt"]);
$(document).ready(function(){
	
	analisisC.catalogoAnios()
	analisisC.graficamon()
	analisisC.grafica()
	analisisC.primasTotal()
	analisisC.primasPorcentaje()
	analisisC.ramosSesa()
	analisisC.cifrasControlSalud()
	analisisC.graficaAsegurados()
	analisisC.graficaEmitida()
	analisisC.graficaDevengada()
	analisisC.graficaLimite()
	
	
	
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
 
 
 
 
 
 /**** Verificar las Lista de Archivos Salud ***/
 $('#verificaLista').click(function(){
	 console.log('verificaLista')
	 
	 analisisC.verificarLista();
 })
 
 
 /*** Traer las validaciones para Salud***/
  $('#verificaCatalogoValidaciones').click(function(){
	 console.log('CatalogoValidacionesSalud')
	 
	 analisisC.ValidacionesSalud();
 })
 
 
 /*** Descargar pdf ***/
 $('#descargarPDF').click(function(){
	 console.log('pdfsalud')
	 
	 analisisC.descargarPDF();
})


/*** Verificar Nulos ***/
  $('#verificarNulos').click(function(){
	 console.log('verificarNulos')
	 
	 analisisC.verificarNulos();
 })
 
 
 /*** Verificar Fecha ****/
  $('#verificarfecha').click(function(){
	 console.log('verificarfecha')
	 
	 analisisC.verificarFechafin();
 })
 
 
 /*** Verificar Fecha ****/
 $('#cambiarValor').click(function(){
	 console.log('cambiarValor')
	 
	 analisisC.actualizarNulos();
})


/*** Verificar Fecha ****/
 $('#validacionesComision').click(function(){
	 console.log('validaciones')
	 
	 analisisC.validacionesComision();
})

	
})