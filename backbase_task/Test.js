var CreateTest = require('./CreatePage.js');
var GetTest = require('./GetPage.js')

describe('Testing create functionalities', function() {
    beforeAll(function() {
        //Change the defaul timeout from 10 seconds to 10 minutes.
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

        //disable waiting for angular because this is not an Angular application
        browser.waitForAngularEnabled(false);
    })

    beforeEach(function() {
        //visit the homepage
        browser.get('http://computer-database.herokuapp.com/computers');
    });

    it('Add a new computer with full details', async function() {
        await CreateTest.clickAddButton();
        await CreateTest.setComputerName();
        await CreateTest.setIntroducedDate();
        await CreateTest.setDiscontinuedDate(); 
        await CreateTest.selectCompany();
        await CreateTest.createComputer();
        await CreateTest.AssureAddingNewComputer();
    });

    it('Add a new computer with no introduced date', async function() {
        await CreateTest.clickAddButton();
        await CreateTest.setComputerName();
        await CreateTest.setDiscontinuedDate(); 
        await CreateTest.selectCompany();
        await CreateTest.createComputer();
        await CreateTest.AssureAddingNewComputer();
    });

    it('Add a new computer with no discontinued date', async function() {
        browser.get('http://computer-database.herokuapp.com/computers');
        await CreateTest.clickAddButton();
        await CreateTest.setComputerName();
        await CreateTest.setIntroducedDate(); 
        await CreateTest.selectCompany();
        await CreateTest.createComputer();
        await CreateTest.AssureAddingNewComputer();
    });

    it('Add a new computer with no selected company', async function() {
        await CreateTest.clickAddButton();
        await CreateTest.setComputerName();
        await CreateTest.setIntroducedDate();
        await CreateTest.setDiscontinuedDate();
        await CreateTest.createComputer();
        await CreateTest.AssureAddingNewComputer();
    });

    it('Add a new computer with only computer name', async function() {
        await CreateTest.clickAddButton();
        await CreateTest.setComputerName();
        await CreateTest.setIntroducedDate();
        await CreateTest.setDiscontinuedDate(); 
        await CreateTest.selectCompany();
        await CreateTest.createComputer();
        await CreateTest.AssureAddingNewComputer();
    });

    it('Check Cancel button', async function() {
        await CreateTest.clickAddButton();
        await CreateTest.setComputerName();
        await CreateTest.setIntroducedDate();
        await CreateTest.setDiscontinuedDate(); 
        await CreateTest.selectCompany();
        await CreateTest.checkCancelButton();
    });

    it('Add a new computer with already added computer name', async function() {
        await CreateTest.clickAddButton();
        await CreateTest.setComputerName();
        await CreateTest.setIntroducedDate();
        await CreateTest.setDiscontinuedDate(); 
        await CreateTest.selectCompany();
        await CreateTest.createComputer();
        await CreateTest.AssureAddingNewComputer();
    });

    it('Add a new computer with all blank fields', async function() {
        await CreateTest.clickAddButton();
        await CreateTest.createComputer();
        await CreateTest.checkErrorMessages();
    });

    it('Add a new computer with alphabitic characters in introduced and discontinued fields', async function() {
        await CreateTest.clickAddButton();
        await CreateTest.setComputerName();
        await CreateTest.sendAlphabeticsToDates();
        await CreateTest.createComputer();
        await CreateTest.checkDateErrorMessages();
    });
});

describe('Testing get functionalities', function() {
    beforeAll(function() {
        //Change the defaul timeout from 10 seconds to 10 minutes.
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

        //disable waiting for angular because this is not an Angular application
        browser.waitForAngularEnabled(false);
    });

    beforeEach(function() {
        //visit the homepage
        browser.get('http://computer-database.herokuapp.com/computers');
    });

    it('Search computers with the full name', async function() {
        await GetTest.searchWithFullName();
    });

    it('Search computers with partial name', async function() {
        await GetTest.searchWithPartialName();
    });

    it('Search with empty keyword', async function() {
        //add new element for the sake of assurance
        await CreateTest.clickAddButton();
        await CreateTest.addNewElement();
        await CreateTest.createComputer();
        
        await GetTest.searchWithEmptyKeyword();
    });

    it('Search with pagination', async function() {
        //Add 30 computers with full name 'Moataz Mahmoud'
        for (var i = 30; i >= 0; i--) {
            await CreateTest.clickAddButton();
            await CreateTest.setComputerName();
            await CreateTest.createComputer();
        }
        await GetTest.searchWithFullName();
        await GetTest.moveToNextPage();
        await GetTest.moveToPreviousPage();
    });

    it('Search with keyword which isn’t found', async function() {
        await GetTest.searchWithNewKeyword();
    })
});

describe('Testing update functionalities', function() {
    beforeAll(function() {
        //Change the defaul timeout from 10 seconds to 10 minutes.
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

        //disable waiting for angular because this is not an Angular application
        browser.waitForAngularEnabled(false);
    });

    beforeEach(function() {
        //visit the homepage
        browser.get('http://computer-database.herokuapp.com/computers');
    });

    it('Edit the details of computer', async function() {
        await CreateTest.openComputerDetails();
        await CreateTest.editComputer();
        
        //confirm successful edit
        await GetTest.searchWithGivenKeyword('ACE');
        //first search result shouldn't be ACE
        expect(element(by.xpath('//*[@id="main"]/table/tbody/tr[1]/td[1]/a')).getText()).not.toBe('ACE');
    });

    it('Check Cancel button', async function() {
        await CreateTest.openComputerDetails();
        await CreateTest.checkCancelButton();
    });

    it('Check that you can not remove the computer name from edit page', async function() {
        await CreateTest.openComputerDetails();
        await CreateTest.checkMandatoryName();
    });

    it('Check that you can remove the introduced and discontinued date from the edit page', async function() {
        await CreateTest.openComputerDetails();
        await CreateTest.checkOptionalDates();
    })
});

describe('Testing delete functionalities', function() {
    beforeAll(function() {
        //Change the defaul timeout from 10 seconds to 10 minutes.
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

        //disable waiting for angular because this is not an Angular application
        browser.waitForAngularEnabled(false);
    });

    beforeEach(function() {
        //visit the homepage
        browser.get('http://computer-database.herokuapp.com/computers');
    });

    it('Edit the details of computer', async function() {
        await CreateTest.openComputerDetails();
        await CreateTest.deleteComputer();
    });
});