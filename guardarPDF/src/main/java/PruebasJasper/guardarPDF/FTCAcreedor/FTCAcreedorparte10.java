package PruebasJasper.guardarPDF.FTCAcreedor;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
public class FTCAcreedorparte10 {

	public static void main(String[] args) {
		String fileNameJrxml = "C:/Users/Tavol/JaspersoftWorkspace/MyReports/FTCAcreedor(1)parte10.jrxml";
		String fileNamePdf = "C:/resultado/FTCAcreedor/parte10.pdf";

		try{
		System.out.println("Cargando el archivo jrxml...");
		JasperDesign jasperDesign = JRXmlLoader.load(fileNameJrxml);
		System.out.println("Compilando el archivo jrxml a archivo JASPER...");
		JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);
		String expedienteNum = "SMFDF4567";
		SimpleDateFormat f1 = new SimpleDateFormat("dd");
		SimpleDateFormat f2 = new SimpleDateFormat("mm");
		SimpleDateFormat f3 = new SimpleDateFormat("yyyy");
		Date diaFecha = f1.parse("12");
		Date mesDate = f2.parse("05");
		Date anioDate = f3.parse("2015");
		String nombreRepresentante="Oscar Perez";
		String cargoRepresentante="Abogado";
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("expedienteNum", expedienteNum);
		params.put("diaFecha", diaFecha);
		params.put("mesDate", mesDate);
		params.put("anioDate", anioDate);
		params.put("nombreRepresentante", nombreRepresentante);
		params.put("cargoRepresentante", cargoRepresentante);

		System.out.println("modificando parametros a archivo JASPER...");
		JasperPrint jprint = (JasperPrint) JasperFillManager.fillReport(jasperReport,params,new JREmptyDataSource());
		System.out.println("Exportando el archivo JASPER a PDF");
		JasperExportManager.exportReportToPdfFile(jprint,fileNamePdf);
		System.out.println("Guardado exitoso");
		}
		catch(Exception e)
		{
		  System.out.print("Exception: " + e);
		}

	}

}
