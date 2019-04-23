import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

public class testBubbleSort {
	private BubbleSort bs;
	
	@Before
     public void set(){
	   bs = new BubbleSort();
   }	
	@Test
	public void test() {
		
		int arr1[] = new int[]{1,6,2,2,5};
		int arr2[] = new int[]{2,3,1,2,6,2,4};
	      int expect1[] = new int[]{1,2,2,5,6};
		  int expect2[] = new int[]{1,2,2,2,3,4,6};
	      assertArrayEquals(expect1, bs.BubbleSort(arr1));
		  assertArrayEquals(expect2, bs.BubbleSort(arr2));
	}

}