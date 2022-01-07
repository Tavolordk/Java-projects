package Web;
import java.io.Serializable;


public class Rectangulo implements Serializable{
    private int base;
    private int altura;
	public int getBase() {
		return this.base;
	}
	public void setBase(int base) {
		this.base = base;
	}
	public int getAltura() {
		return this.altura;
	}
	public void setAltura(int altura) {
		this.altura = altura;
	}

    public int getArea()
    {
    	return this.altura * this.base;
    }
	public Rectangulo(int base, int altura) {
		super();
		this.base = base;
		this.altura = altura;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + altura;
		result = prime * result + base;
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Rectangulo other = (Rectangulo) obj;
		if (altura != other.altura)
			return false;
		if (base != other.base)
			return false;
		return true;
	}
    
}
