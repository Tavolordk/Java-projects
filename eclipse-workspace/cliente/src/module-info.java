package Cliente;

import java.io.DataInputStream;
import java.io.InputStream;
import java.io.ObjectOutput;
import java.io.ObjectOutputStream;
import java.net.Socket;

public class cliente {
	public static void main(String[] args){	
		int res = 0;
		int num[]= new int[2];
		if(args.length!=1){
			System.out.println("Uso: cliente <host>");
			System.exit(0);
		}
		try {
			String host= args[0];
			Socket sc= new Socket(host,400);
			java.io.OutputStream ostream= sc.getOutputStream();
			ObjectOutput s= new ObjectOutputStream(ostream);
			DataInputStream istream= new DataInputStream(sc.getInputStream());
			num[0]=5;
			num[1]=2;
			s.writeObject(num);
			s.flush();
			res= istream.readInt();
			sc.close();
			System.out.println("La suma es "+ res);
		}
		catch(Exception e){
			System.err.println("Excepcion "+e.toString());
			e.printStackTrace();
		}
	}
}
