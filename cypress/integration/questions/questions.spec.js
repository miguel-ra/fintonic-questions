const { _ } = Cypress;

const toStrings = (cells$) => _.map(cells$, "textContent");

describe("CheckOut", () => {
  it("Should go to browse questions and see header and table", () => {
    cy.visit("/");

    // header
    cy.get("header > nav").contains(/browse/i);
    cy.contains(/add new questions/i);
    cy.contains(/api/i);
    cy.contains(/discuss/i);
    cy.contains(/login/i);

    // title
    cy.get("main > section").contains(/browse questions/i);

    // filter
    cy.get("select[aria-label=category]");
    cy.get("select[aria-label=type]");
    cy.get("select[aria-label=difficulty]");

    // table
    cy.get("table");
    cy.get("th[role=columnheader]").contains(/category/i);
    cy.get("th[role=columnheader]").contains(/type/i);
    cy.get("th[role=columnheader]").contains(/difficulty/i);
    cy.get("th[role=columnheader]").contains(/question/i);

    // pagination
    cy.get("nav[aria-label=pagination]");
  });

  it("Should sort on table heading click", () => {
    cy.visit("/");

    cy.get("th[role=columnheader]")
      .contains(/category/i)
      .click();

    cy.get("td[col-id=category]")
      .then(toStrings)
      .then((categories) => {
        // confirm categories are sorted
        // by sorting them ourselves
        // and comparing with the input list
        const sorted = _.sortBy(categories);

        expect(categories, "cells are sorted 📈").to.deep.equal(sorted);
      });
  });

  it("Should filter on table filters change", () => {
    cy.visit("/");

    cy.get("select[aria-label=category] > option")
      .eq(1)
      .then((option) => {
        cy.get("select[aria-label=category]").select(option[0].value);

        cy.get("td[col-id=category]")
          .then(toStrings)
          .then((categories) => {
            categories.forEach((category) => {
              expect(category).to.equal(option[0].value);
            });
          });
      });
  });
});
