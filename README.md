# backbase_task

### Introduction
In this small project you will find the automation of CRUD operations on the follwing website: http://computer-database.herokuapp.com/computers

This automation plan is built using protractor in JavaScript. Also I built it with Page Object Models patter where all the web elements are encapsulated in a page class. You can read more about page objects from here: https://github.com/angular/protractor/blob/master/docs/page-objects.md

The manual test plan can be found in this file: https://drive.google.com/open?id=1XZmexW8dcqwmQvUz4S_oQWSg8U7q2HS_aEqArq1wtxk

### What's inside this repo
In the automation plan all what I did is just automating all the steps in the manual test cases one by one.
You can find two page object files in this project, one for the create page and one to the get page (home page). The create page also handles the controller in each computer details page where you will be for editing and deleteing computers (UPDATE and DELETE operations). 
On the other hand, all the tests are listed in one test file which is Test.js. For each operation you can find its suite isolated in a standalone describe function. Each describe function contains all the test cases for this operation as it function for each test case.
As a final note, you will find some comments in each source file, these comments are important for you if you need to take a deeper look on how it's implemented in a lower level.

Now you have the full details for start working with this repo.
Clone it, run it, test it, and finally read it for more details and to know how things are wired inside.
For any questions or edits, don't hisitate to comment here.
Have a nice day!
