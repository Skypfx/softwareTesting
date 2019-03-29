package lab2;

import static org.junit.Assert.assertEquals;

import java.io.File;
import java.text.DecimalFormat;
import java.util.concurrent.TimeUnit;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
public class WebTest {
	private WebDriver driver;
	  private String baseUrl;
	  public String id, name, gitUrl;
	  
	  @Before
	  public void setUp() throws Exception {
		  String driverPath = System.getProperty("user.dir") + "/src/geckodriver.exe";
		  System.setProperty("webdriver.gecko.driver", driverPath);
		  driver = new FirefoxDriver();
		  baseUrl = "http://121.193.130.195:8800/";
		  driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
	  }
	  
	  @Test
	  public void testWeb()throws Exception{
		  driver.get(baseUrl + "/");

		  File file = new File("d:\\Documents\\WeChat Files\\pfx5207\\Files\\软件测试名单.xlsx");
			Workbook wb = WorkbookFactory.create(file);
			Sheet sheet = (Sheet) wb.getSheetAt(0); //读取第一张表
			int lastRowNum = sheet.getLastRowNum();//获取到总行数 
			DecimalFormat df = new DecimalFormat("0"); //用于数字类型转换 
	        for (int i = 2; i <= lastRowNum; i++) {
	            Row row = sheet.getRow(i); //拿每一行
	            int lastCellNum = row.getLastCellNum(); //拿到对应行的总列数
	            for (int j = 1; j < lastCellNum; j++) {
	            	if(j==1) {
	            		Cell cell = row.getCell(j);
	            		id = df.format(cell.getNumericCellValue());
	            	}else if(j==2){
	            		Cell cell = row.getCell(j);
	            		name = cell.getStringCellValue();
            			            		
	            	}else {
	            		Cell cell = row.getCell(j);
	            		gitUrl = cell.getStringCellValue();
	            	}	       	   
	            }
	            driver.get(baseUrl + "/");
            	driver.findElement(By.name("id")).sendKeys(id);//输入登录账户
     		    driver.findElement(By.name("password")).sendKeys(id.substring(4));//输入密码
     		    driver.findElement(By.id("btn_login")).click();//点击登录按钮
     		    assertEquals(id, driver.findElement(By.id("student-id")).getText());
     		    assertEquals(name, driver.findElement(By.id("student-name")).getText());
     		    assertEquals(gitUrl,driver.findElement(By.id("student-git")).getText());
     		    driver.findElement(By.linkText("LOG OUT")).click();//退出登录
     		    driver.findElement(By.linkText("Return to Login Page")).click();//返回登录页面	        
	        }		   
	  }
	 
}
