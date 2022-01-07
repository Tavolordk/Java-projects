$(document).ready(function () {
	journalGastosC.obtenerJournalGastos();
	$('#btnBuscarJournalGastos').click(function () {
		journalGastosC.buscarJournalGastos();
	});
});