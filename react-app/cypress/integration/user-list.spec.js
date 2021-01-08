const getHTMLelementsByAttr = (attrName) => ((el = null) => (el || cy).get(`[data-testid=${attrName}]`));
const findHTMLelementsByAttr = (attrName) => ((el = null) => (el || cy).find(`[data-testid=${attrName}]`));

describe('User list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should render a table', () => {
    cy.get('table').should('have.attr', 'data-testid');
  });

  it('should render  Table Row components', () => {
    cy.request('http://localhost:3004/users').then((resp) => {
      getHTMLelementsByAttr('table-row')().should('have.length', resp.body.length);
    });
  });

  describe('to edit a user', () => {
    const openModalInInsertMode = () => {
      getHTMLelementsByAttr('new-user-btn')().click();
      const modal = getHTMLelementsByAttr('user-from-modal')();
      return modal;
    };
    it('should open a modal to insert a user record', () => {
      const modal = openModalInInsertMode();
      modal.should('have.length', 1);
      modal.get('input:first').should('be.enabled');
    });
  });

  describe('to edit a user', () => {
    const openModalInEditMode = () => {
      const firstTableRow = (getHTMLelementsByAttr('table-row')()).first();
      (findHTMLelementsByAttr('edit-user-btn')(firstTableRow)).click();
      const modal = getHTMLelementsByAttr('user-from-modal')();
      return modal;
    };

    it('should open a modal to edit the first user record', () => {
      const modal = openModalInEditMode();
      modal.should('have.length', 1);
      modal.find('input:first').should('be.disabled');
    });

    it('should edit the first user record', () => {
      const modal = openModalInEditMode();
      const nameInput = modal.find('input[name="name"]');
      nameInput.should('have.attr', 'value', 'Bret Powella');
      nameInput.clear().type('Bret Powell')
        .should('have.attr', 'value', 'Bret Powell');
      (getHTMLelementsByAttr('save-changes-btn')(modal)).click();
    });
  });
});
