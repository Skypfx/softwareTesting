package lab1;

public class Triangle {
	public boolean admitOut(int total) {
		if(total > 83) {
			return false;
		}
	    if(total >= 50) { 
			total = total - 50;
			admitOut(total);
		}
		 if(total >= 20) {
			total = total - 20;
			admitOut(total);
		}
		 if(total >= 10) {
			total = total - 10;
			admitOut(total); 
		}
		 if(total >= 5) {
			 total = total - 5;			 
		 }
		 if(total<=3) {
			 return true;
		 }
		 else
			 return false;	
	}
	
}
