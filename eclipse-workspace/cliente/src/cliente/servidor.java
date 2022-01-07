package cliente;

import java.lang.*;
import java.io.* ;
import java.net.* ;
import java.util.* ;

@SuppressWarnings("unused")
public class servidor
{
	public static void main ( String [] args)
	{
		ServerSocket serverAddr = null;
		Socket sc = null;
		int num[] ; // petición
		int res;
		try {
			serverAddr = new ServerSocket(8080);
		}
		catch (Exception e){
			System.err.println("Error creando socket");
		}
while (true){
		try {
			sc = serverAddr.accept(); 	// esperando conexión
			InputStream istream = sc.getInputStream();
			ObjectInput in = new ObjectInputStream(istream);
			System.out.println("hola mundo");
		num = (int[]) in.readObject();
		res = num[0] + num[1];


			DataOutputStream ostream = 
					new DataOutputStream(sc.getOutputStream());

			ostream.writeInt(res);
			ostream.flush();
			sc.close();
		}
		catch(Exception e) {
			System.err.println("excepcion " + e.toString() );
			e.printStackTrace() ;
		}
	   }
  }
}