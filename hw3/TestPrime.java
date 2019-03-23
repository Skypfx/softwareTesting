package hw3;

import org.junit.Before;
import org.junit.Test;

public class TestPrime {
	PrintPrimes pri;
	
	@Before
	public void setUp()
	{
	  pri = new PrintPrimes(); 
	}
	
	@Test
	public void testPrime() {
		pri.printPrimes(5); 
	}
}
