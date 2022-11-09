// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// Hour cards
// var am9El = $("#hour-9");
// var am10El = $("#hour-10");
// var am11El = $("#hour-11");
// var am12El = $("#hour-12");
// var pm1El = $("#hour-13");
// var pm2El = $("#hour-14");
// var pm3El = $("#hour-15");
// var pm4El = $("#hour-16");
// var pm5El = $("#hour-17");

var buttons = $(".saveBtn");
var events = [];

// card colors: past, present, future

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  buttons.on("click", saveEvent);

  // Determin the color of the block relative to the current hour
  $(".time-block").each(function () {
    // gets the hour of the block using its id -> .each(element.ID)
    var blockHour = this.id.split("-").pop();
    var currentHour = dayjs().hour();
    // compare current hour to the block and color accordingly
    // remove any color classes befor adding one

    $(this).removeClass("past");
    $(this).removeClass("present");
    $(this).removeClass("future");
    if (currentHour > blockHour) {
      $(this).addClass("past");
      console.log("past");
    } else if (currentHour === blockHour) {
      $(this).addClass("present");
    } else {
      // currentHour > blockHour
      $(this).addClass("future");
    }
  });

  $(".time-block").each(function () {
    var blockID = $(this).attr("id");
    if (localStorage.getItem(blockID)) {
      var localText = localStorage.getItem(blockID);
      $(this).children().eq(1).text(localText);
      // console.log(localStorage.getItem(blockID));
    }
    // console.log($(this).attr("id"));
  });
  //
  // TODO: Add code to display the current date in the header of the page.
});

var saveEvent = function (event) {
  event.preventDefault();
  // get id and text
  var id = $(this).parent().attr("id");
  var text = $(this).parent().children("textarea").val();
  console.log($(this).parent().attr("id"));
  localStorage.setItem(id, text);
};
