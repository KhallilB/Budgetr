//CONTROLLER FOR BUDGET OBJECTS
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      expenses: [],
      incomes: []
    },
    totals: {
      expeses: 0,
      incomes: 0
    }
  };
})();

//CONTROLLER FOR UI
var UIController = (function() {
  //Stores all DOM elements
  var DOMstrings = {
    inputType: '.add-type',
    inputDescription: '.add-description',
    inputValue: '.add-value',
    inputButton: '.add-button'
  };

  return {
    //Gets and returns all user input from form
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //will either be income or expense
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    //Returns all DOMstring elements for public access
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

//CONTROLLER FOR EVENTS
var controller = (function(bugetCtrl, UICtrl) {
  var setupEventListeners = function() {
    document
      .querySelector(DOM.inputButton)
      .addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e) {
      //Handles enter event when submiting to list
      if (e.keyCode === 13 || e.which === 13) {
        //For older browsers who dont have key code property
        console.log('ENTER was pressed');
        ctrlAddItem();
      }
    });
  };

  var DOM = UICtrl.getDOMstrings();

  var ctrlAddItem = function() {
    var input = UICtrl.getInput();
    //TODO:
    // get input data,
    //add item to budget controller,
    // add new item to user,s
    //calculate budget,
    //display the budget
    console.log(input);
  };

  //Initilizes all functions
  return {
    init: function() {
      console.log('Application has started');
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
