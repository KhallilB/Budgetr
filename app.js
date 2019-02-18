var budgetController = (function() {
  //Code
})();

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
