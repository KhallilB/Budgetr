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

  const calculateTotal = function(type) {
    var sum = 0;

    data.allItems[type].forEach(function(current) {
      sum += current.value;
    });

    data.totals[type] = sum;
  };

  let data = {
    allItems: {
      expense: [],
      income: []
    },
    totals: {
      expense: 0,
      income: 0
    },
    budget: 0,
    percentage: -1
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
      calculateTotal('expense');
      calculateTotal('income');

      // Calculate income - expenses
      data.budget = data.totals.income - data.totals.expense;

      // Calculate percentage of income spent
      if (data.totals.income > 0) {
        data.percentage = Math.round(
          (data.totals.expense / data.totals.income) * 100
        );
      } else {
        data.percentage = -1;
      }
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalIncome: data.totals.income,
        totalExpenses: data.totals.expense,
        percentage: data.percentage
      };
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
    expenseContainer: '.expenses-list',
    budgetLabel: '.budget-value',
    incomeLabel: '.budget-income-value',
    expenseLabel: '.budget-expenses-value',
    percentageLabel: '.budget-expenses-percentage'
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

    addListItem: function(obj, type) {
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
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

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

    //Display Budget Updates on UI
    displayBudget: function(obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent =
        obj.totalIncome;
      document.querySelector(DOMstrings.expenseLabel).textContent =
        obj.totalExpenses;
      document.querySelector(DOMstrings.percentageLabel).textContent =
        obj.percentage;
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
    budgetCtrl.calculateBudget();

    //Return Budget
    var budget = budgetCtrl.getBudget();

    //Display Budget on UI
    UICtrl.displayBudget(budget);
    console.log(budget);
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

      //Calculate and Update Budget
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
