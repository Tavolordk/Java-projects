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
public class FTCAcreedorparte8 {

	public static void main(String[] args) {
		String fileNameJrxml = "C:/Users/Tavol/JaspersoftWorkspace/MyReports/FTCAcreedor(1)parte8.jrxml";
		String fileNamePdf = "C:/resultado/FTCAcreedor/parte8.pdf";

		try{
		System.out.println("Cargando el archivo jrxml...");
		JasperDesign jasperDesign = JRXmlLoader.load(fileNameJrxml);
		System.out.println("Compilando el archivo jrxml a archivo JASPER...");
		JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);
		String expedienteNum = "SMFDF4567";
		SimpleDateFormat formato = new SimpleDateFormat("yyyy");
		Date anioDate = formato.parse("2015");
		
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("expedienteNum", expedienteNum);
		params.put("anioDate", anioDate);

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
