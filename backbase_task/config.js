exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub', 
    capabilities: {
        'browserName': 'Chrome',
        'chromeOptions': {
            'args': ['no-sandbox']
        }
    },

    params: {
        create: {
            computerName: 'Moataz Mahmoud',
            introducedDate: '1994-06-16',
            discontinuedDate: '1995-06-16',
            companyName: 'Apple Inc.',
            alphabeticDate: 'abc',
            partialName: 'Moataz',
            newKeyword: 'Nothing in the universe'
        }
    },

    specs: ['Test.js']
};