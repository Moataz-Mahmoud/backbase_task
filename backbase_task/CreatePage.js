var Page = function()
{
    //home page elements
    var addButton = element(by.id('add'));

    //add page elements
    var computerName = element(by.id('name'));
    var introducedDate = element(by.id('introduced'));
    var discontinuedDate = element(by.id('discontinued'));
    var company = element(by.id('company'));
    var createButton = element(by.css('.btn.primary'));
    var successMessage = element(by.css('.alert-message.warning'));
    var cancelButton = element(by.linkText('Cancel'));
    var errorMessages;
    var firstComputer = element(by.xpath('//*[@id="main"]/table/tbody/tr[1]/td[1]/a'));
    var deleteButton = element(by.css('.btn.danger'));

    this.clickAddButton = async function() {
        await addButton.click();
    }

    this.setComputerName = async function() {
        await computerName.sendKeys(browser.params.create.computerName);
    }

    this.setIntroducedDate = async function() {
        await introducedDate.sendKeys(browser.params.create.introducedDate);
    }

    this.setDiscontinuedDate = async function() {
        await discontinuedDate.sendKeys(browser.params.create.discontinuedDate);
    }

    this.selectCompany = async function() {
        await element(by.cssContainingText('option', browser.params.create.companyName)).click();
    }

    this.createComputer = async function() {
        await createButton.click();
    }

    this.AssureAddingNewComputer = async function() {
        expect(successMessage.getText()).toBe('Done! Computer ' + browser.params.create.computerName +  ' has been created');
    }

    this.checkCancelButton = async function() {
        await cancelButton.click();
        expect(browser.getCurrentUrl()).toBe('http://computer-database.herokuapp.com/computers');
        element.all(by.css('.alert-message.warning')).then(function(items) {
            expect(items.length).toBe(0);
        });
    }

    this.checkErrorMessages = async function() {
        errorMessages = element.all(by.css('.clearfix.error'));
        await expect(errorMessages.count()).toEqual(1);
    }

    this.sendAlphabeticsToDates = async function() {
        await introducedDate.sendKeys(browser.params.create.alphabeticDate);
        await discontinuedDate.sendKeys(browser.params.create.alphabeticDate);
    }

    this.checkDateErrorMessages = async function() {
        errorMessages = element.all(by.css('.clearfix.error'));
        await expect(errorMessages.count()).toEqual(2);
    }

    this.openComputerDetails = async function() {
        //should be ACE for the first run
        await firstComputer.click();
    }

    this.editComputer = async function() {
        await computerName.clear();
        await computerName.sendKeys(browser.params.create.computerName);
        await createButton.click();
    }

    this.checkMandatoryName = async function() {
        await computerName.clear();
        await createButton.click();
        errorMessages = element.all(by.css('.clearfix.error'));
        await expect(errorMessages.count()).toEqual(1);
    }

    this.checkOptionalDates = async function() {
        await introducedDate.clear();
        await discontinuedDate.clear();
        await createButton.click();
        expect(browser.getCurrentUrl()).toBe('http://computer-database.herokuapp.com/computers');
    }

    this.deleteComputer = async function() {
        await deleteButton.click();
        successMessage = element(by.css('.alert-message.warning'));
        expect(successMessage.getText()).toBe('Done! Computer has been deleted');
    }

    this.addNewElement = async function() {
        await computerName.sendKeys('123');
    }
}
module.exports = new Page();