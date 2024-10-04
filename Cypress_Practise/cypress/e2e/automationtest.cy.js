

describe('Dynamic Table Test', () => {
    let testData;
  
    // Load the data from the JSON file only once before the tests
    before(() => {
      cy.fixture('data').then((data) => {
        testData = data;
      });
    });
  
    it('Should enter data and validate the table', () => {
      // Step 1: Visit the page
      cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');
  
      // Step 2: Click the 'Table Data' button
      cy.contains("Table Data").click();  
     // Step 3: Insert the entire data array in the input text box
    // JSON.stringify(testData) will convert the array into a JSON string
    cy.get('#jsondata').clear().type(JSON.stringify(testData), { parseSpecialCharSequences: false });

    // Click the 'Refresh Table' button after the data is entered
    cy.get('#refreshtable').click();
   // Step 4: Ensure the correct table is targeted
   cy.get('#dynamictable', { timeout: 10000 }).should('exist'); // Check if the table exists
   cy.wait(2000); // Wait for a moment to allow the table to refresh

   // Log the table HTML to verify if rows are populated
   cy.get('#dynamictable').then(($table) => {
     console.log('Table HTML content:', $table.html());
   });

   // Step 5: Check for the data rows (skipping the first row as it's the header)
   cy.get('#dynamictable tr').each((row, index) => {
     if (index > 0) { // Skip the header row (index 0)
       const { name, age, gender } = testData[index - 1]; // Adjust index to match test data

       // Assertions for each data row's <td> elements
       cy.wrap(row).find('td').eq(0).should('have.text', name);
       cy.wrap(row).find('td').eq(1).should('have.text', age.toString());
       cy.wrap(row).find('td').eq(2).should('have.text', gender);
     }
   });
 });
});