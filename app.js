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
      expense: [],
      income: []
    },
    totals: {
      expese: 0,
      income: 0
    }
  };

  return {
    addItem: function(type, desc, val) {
      var newItem, ID;

      //Creates new ID
      //ID = last ID + 1
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      //Create new item based on income or expense type
      if (type === 'expense') {
        newItem = new Expense(ID, desc, val);
      } else if (type === 'income') {
        newItem = new Income(ID, desc, val);
      }

      //Pushes to array based on type
      data.allItems[type].push(newItem);

      //Return new element
      return newItem;
    },

    testing: function() {
      console.log(data);
    }
  };
})();

//CONTROLLER FOR UI
var UIController = (function() {
  //Stores DOM elements
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

    addListItem: function(obj, type) {
      //Create HTML string with placeholder text
      //Replace placeholder text with data
      //Insert HTML into DOM
    },

    //Returns all DOMstring elements for public access
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

//CONTROLLER FOR ENTIRE APP
var controller = (function(budgetCtrl, UICtrl) {
  var DOM = UICtrl.getDOMstrings();

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

  var ctrlAddItem = function() {
    var input, newItem;

    //Get input data
    input = UICtrl.getInput();
    console.log(input);

    //Adds item to budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    //add item to budget controller,
    // add new item to user,s
    //calculate budget,
    //display the budget
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
