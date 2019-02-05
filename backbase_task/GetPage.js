var Page = function()
{
    var searchBox = element(by.id('searchbox'));
    var filterButton = element(by.id('searchsubmit'));
    var firstSearchResult = element(by.xpath('//*[@id="main"]/table/tbody/tr[1]/td[1]/a'));
    var nextButton = element(by.linkText('Next →'));
    var previousButton = element(by.linkText('← Previous'));
    var currentgrid = element(by.xpath('//*[@id="pagination"]/ul/li[2]/a'));
    var noContentMessage;

    this.searchWithFullName = async function() {
        await searchBox.sendKeys(browser.params.create.computerName);
        await filterButton.click();
        await expect(firstSearchResult.getText()).toBe(browser.params.create.computerName);
    }

    this.searchWithPartialName = async function() {
        await searchBox.sendKeys(browser.params.create.partialName);
        await filterButton.click();
        expect(firstSearchResult.getText()).toContain(browser.params.create.partialName);
    }

    this.searchWithEmptyKeyword = async function() {
        await searchBox.clear();
        await filterButton.click();
        expect(firstSearchResult.getText()).toBe('123');
    }

    this.moveToNextPage = async function() {
        await nextButton.click();
        expect(currentgrid.getText()).toContain('11 to 20');
    }

    this.moveToPreviousPage = async function() {
        await previousButton.click();
        expect(browser.getCurrentUrl()).toBe('http://computer-database.herokuapp.com/computers?f=Moataz+Mahmoud');
    }

    this.searchWithNewKeyword = async function() {
        await searchBox.sendKeys(browser.params.create.newKeyword);
        await filterButton.click();
        noContentMessage = element(by.xpath('//*[@id="main"]/div[2]/em'));
        expect(noContentMessage.getText()).toBe('Nothing to display');
    }

    this.searchWithGivenKeyword = async function(keyword) {
        await searchBox.sendKeys(keyword);
        await filterButton.click();
    }
}
module.exports = new Page();