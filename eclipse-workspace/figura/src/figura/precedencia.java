package figura;

public class precedencia {
    public static void main(String [] args)
    {
        int a = 2;
        int b = 3;
        int res = -3 + 6 / ++a * 4 - b-- + b;
        System.out.println("Resultado = " + res);
    }
}
