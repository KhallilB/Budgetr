var budgetController = (function() {})();

var UIController = (function() {})();

var controller = (function(bugetCtrl, UICtrl) {
  var ctrlAddItem = function() {
    //TODO:
    // get input data,
    //add item to budget controller,
    // add new item to user,
    //calculate budget,
    //display the budget
    console.log('DagNaBit');
  };

  document.querySelector('.add-button ').addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', function(e) {
    //Handles enter event when submiting to list
    if (e.keyCode === 13 || e.which === 13) {
      //For older browsers who dont have key code property
      console.log('ENTER was pressed');
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
