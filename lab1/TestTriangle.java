package lab1;
import static org.junit.Assert.assertEquals;

import java.util.Arrays;
import java.util.Collection;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;


@RunWith(Parameterized.class)
public class TestTriangle {
	Triangle tri;
	private int total;
	boolean expected;
	
	public TestTriangle(int total,boolean expected) {
		this.total=total; 
		this.expected=expected;
	}
	
	@Before 
	public void setUp(){
		tri = new Triangle();
		
	}
	@Parameters
	public static Collection<Object[]> getData(){
	return Arrays.asList(new Object[][]{
	{1,true},
	{7,true},
	{9,false},
	{11,true},
	{14,false}, 
	{23,true},
	{24,false},
	{26,true},
	{29,false},
	{31,true},
	{34,false},
	{40,false},
	{70,true},
	{84,false}
	});
   }
	
	@Test
	public void testTri() {
	assertEquals(this.expected,tri.admitOut(this.total));
	}
	

}
