var chai = require('chai');
// var chaiWebdriver = require('chai-webdriverio').default;
// chai.use(chaiWebdriver(browser));
var expect = chai.expect;
var assert = chai.assert;

describe('Product Summary', function(){
  it('check no ID input', function(){
    //open home apge
    browser.url('/');

    //Click the 'Lookup Service' button
    browser.click('=Lookup Service');

    //Wait for error message text
    browser.waitForExist('//*[@id="form:severeGrowl_container"]/div/div/div[2]/span');

    //Get error message text
    var errorMsg = browser.getText('//*[@id="form:severeGrowl_container"]/div/div/div[2]/span');

    //Check error message text
    expect(errorMsg).to.include('Service ID is required');
  });

	it('check for invalid ID', function(){
    //open home page
    browser.url('/');

    //input invalid ID into search bar
   	browser.setValue('#form\\:productService\\:mobilefixedSearch\\:serviceIdentifier', '123456789');

   	//Click the 'Lookup Service' button
   	browser.click('=Lookup Service');  

    //Wait for error message text
    browser.waitForExist('//*[@id="form:severeGrowl_container"]/div/div/div[2]');

   	//Get error message text
   	var errorMsg = browser.getText('//*[@id="form:severeGrowl_container"]/div/div/div[2]');

	  	//Check error message text
    expect(errorMsg).to.include('Entered Service Id is not valid as per Service ID Type. Please enter correct Service ID or select appropriate Service ID Type.');
  });

  it('check for valid ID', function(){
  	//open home page
      browser.url('/');

      //input ID into search bar
     	browser.setValue('#form\\:productService\\:mobilefixedSearch\\:serviceIdentifier', '61439507017');

     	//Click the 'Lookup Service' button
     	browser.click('=Lookup Service');

     	//Wait for Service ID to exist
     	browser.waitForExist('//*[@id="form:j_idt1639:serviceDetails"]/table/tbody/tr[1]/td[2]');

     	//Get text in Service ID
     	var serviceID = browser.getText('//*[@id="form:j_idt1639:serviceDetails"]/table/tbody/tr[1]/td[2]');

     	//Check text in Service ID is same as input
      expect(serviceID).to.include('61439507017');
  });

  it('verify Product Summary page', function(){
  	//get page heading
	var pgHeading = browser.getText('//*[@id="form:mobileProductTabs:summaryPanel"]/div[1]/div/div[1]/h1');
  
      //Check page heading is right
      assert.equal(pgHeading, 'Product summary');

      //Check main section exists
      var prodSumExist = browser.isExisting('//*[@id="form:mobileProductTabs:summaryPanel"]/div[1]/div/div[2]/div[2]');
      expect(prodSumExist).to.be.true;
  });

  it('check reports in visualive button', function(){
  	//click Visualive button
  	//NOTE: Getting Visualive button by name doesn't work
  	browser.click('//*[@id="form:mobileProductTabs:j_idt1679:j_idt1690:0:dynamic_menu_button"]');  

  	//click Summary Report (1) button
  	browser.click('=Summary Report');  

  	//switch to new window
  	browser.window('Modini Diagnostics');
    //ISSUE = need to use URL here but URL has dynamic ID (trying to figure out way to use title)

  	//get new window title
  	var summaryRep = browser.getTitle();

  	//check new window title
  	assert.equal(summaryRep, 'Modini Diagnostics');

  	//close window
  	browser.close();
  });

  it('check Manage notices link', function(){
	//click Manage Notices link
  	browser.click('=Manage notices');

  //get Manage Notices page heading
  var manageNoticesHead = browser.getText('//*[@id="form:adminTab:screenNoticesPanel"]/div/div/div[1]');      
  //ISSUE = gets heading AND help link not just heading
		
		//Check page heading is right
      assert.equal(manageNoticesHead, 'Manage screen notices');

      //Go back to Product summary
      browser.click('=PRODUCT');

  });

  it('check Add notice button', function(){
  	//Click Add notice button
  	browser.click('=Add notice');

  	//Check popup exists - result
  	var addNoticePopup = browser.isExisting('//*[@id="createNoticeDlg"]');

  	//Check popup exists
  	assert.equal(addNoticePopup, true);

  });
});