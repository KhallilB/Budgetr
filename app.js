const budgetController = (function() {
  const Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  let data = {
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
      let newItem, ID;

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

    calculateBudget: function() {
      // Calculate total income and expenses
      // Calculate income - expenses
      // Calculate percentage of income spent
    },

    testing: function() {
      console.log(data);
    }
  };
})();

// ******************************************* //

const UIController = (function() {
  //Stores DOM element strings
  const DOMstrings = {
    // inputTypeEl: document.querySelector('.add-type'),
    inputType: '.add-type',
    inputDescription: '.add-description',
    inputValue: '.add-value',
    inputButton: '.add-button',
    incomeContainer: '.income-list',
    expenseContainer: '.expenses-list'
  };

  return {
    //Gets and returns all user input from form in object
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //will either be value income or expense
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value) //parsed to change string to an int
      };
    },

    addListItem: function(item, type) {
      let html, newHtml, element;
      //Create HTML string with placeholder text
      if (type === 'income') {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item-description">%description%</div><div class="right clearfix"><div class="item-value">%value%</div><div class="item-delete"><button class="item-delete-btn"><i class="ion-ios-close-outline"></i></button></div></div>';
      } else if (type === 'expense') {
        element = DOMstrings.expenseContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item-description">%description%</div><div class="right clearfix"><div class="item-value">%value%</div><div class="item-percentage">30%</div><div class="item-delete"><button class="item-delete-btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      //Replace placeholder text with data
      newHtml = html.replace('%id%', item.id);
      newHtml = newHtml.replace('%description%', item.description);
      newHtml = newHtml.replace('%value%', item.value);

      //Insert HTML into DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields: function() {
      let fields, fieldsArr;

      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ', ' + DOMstrings.inputValue
      );

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array) {
        current.value = '';
      });

      fieldsArr[0].focus();
    },

    //Returns all DOMstring elements for public access
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

// ********************************************** //

const controller = (function(budgetCtrl, UICtrl) {
  let DOM = UICtrl.getDOMstrings();

  const setupEventListeners = function() {
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

  const updateBudget = function() {
    //Calculate Budget
    //Return Budget
    //Display Budget on UI
  };

  //Adds new item to list
  const ctrlAddItem = function() {
    var input, newItem;

    //Get input data
    input = UICtrl.getInput();
    console.log(input);

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      //Adds item to budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      //Add item to the UI
      UICtrl.addListItem(newItem, input.type);

      //Clear UI fields
      UICtrl.clearFields();

      //Calculate and Updatae Budget
      updateBudget();
    }
  };

  //Initilizes app
  return {
    init: function() {
      console.log('Application has started');
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
