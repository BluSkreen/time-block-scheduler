// pointer to saveBtn class
var buttons = $(".saveBtn");

$(function () {
  // listener that add text from the time-block to local storage
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
      console.log(localStorage.getItem(blockID));
    }
    console.log($(this).attr("id"));
  });

  // Display the current date in the header of the page.
  $("#currentDay").text(
    "The current day is: " +
      dayjs().year() +
      "/" +
      dayjs().month() +
      "/" +
      dayjs().day()
  );
});

var saveEvent = function (event) {
  event.preventDefault();
  // get id and text
  var id = $(this).parent().attr("id");
  var text = $(this).parent().children("textarea").val();
  console.log($(this).parent().attr("id"));
  localStorage.setItem(id, text);
};
