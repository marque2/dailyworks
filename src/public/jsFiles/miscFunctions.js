
function createTimePicker(inputField, divToPutPickerInto, closeTimePopup, dataTime) {

  var finishHour = 12;
  var startHour = 1;

  var placeholderTimeString = "";

  var hourPicked = null
  var minutePicked = null;
  var amPmPicked = null;


  if (dataTime != -1) {
    var timeArray = minutesTo12HourArray(dataTime);
    //hour, minute, ampm, timestring
    hourPicked = timeArray[0];
    minutePicked = timeArray[1];
    amPmPicked = timeArray[2];
    placeholderTimeString = (timeArray[3] + amPmPicked);
  } else {
    placeholderTimeString = "00:00AM";
  }




  var currentTimeString = "";

  var timePickerPopup = document.createElement("div");
  timePickerPopup.classList += "timePickerPopupMainDiv";


  //create placeholder header time
  var placeholderHeaderTime = document.createElement("p");
  placeholderHeaderTime.innerText = placeholderTimeString;
  placeholderHeaderTime.classList.add('timePickerPlaceholderTimeHeader');
  timePickerPopup.appendChild(placeholderHeaderTime)


  //create hour header
  var hoursHeader = document.createElement('p');
  hoursHeader.classList.add('timePickerHeaderP');
  hoursHeader.innerText = "Hours";
  timePickerPopup.appendChild(hoursHeader);

  //create hours table
  var hoursBreakPoint = 6;
  var nbRowsHours = 2;
  var hoursTable = document.createElement("table");
  hoursTable.classList += "timePickerHoursTable";
  timePickerPopup.appendChild(hoursTable);

  //create minutes header
  var minutesHeader = document.createElement('p');
  minutesHeader.classList.add('timePickerHeaderP');
  minutesHeader.innerText = "Minutes";
  timePickerPopup.appendChild(minutesHeader);

  //create minutes table
  var minutesBreakPoint = 6;
  var nbRowsMinutes = 2;
  var minutesTable = document.createElement("table");
  minutesTable.classList += "timePickerMinutesTable";
  timePickerPopup.appendChild(minutesTable);


  function createTimesTable() {

    //create hours rows
    var hoursRow = document.createElement("tr");
    var hoursCell = null;
    for (var i = startHour, counter = 1; i < finishHour + 1; i++, counter++) {
      hoursCell = document.createElement('td');
      hoursCell.setAttribute("time", i);
      if (i < 10) {
        hoursCell.innerText = "0" + i;
      } else {
        hoursCell.innerText = i;
      }
      hoursCell.onclick = function () {
        setHours(this.getAttribute('time'));
      }
      hoursRow.appendChild(hoursCell);
      if (counter == hoursBreakPoint && i != finishHour) {
        counter = 0;
        hoursTable.appendChild(hoursRow);
        hoursRow = document.createElement("tr");
      }
    }
    hoursTable.appendChild(hoursRow);





    //create minutes rows
    var minutesRow = document.createElement("tr");
    var minutesCell = null;

    for (var i = 0, counter = 1; i < 60; i += 5, counter++) {
      minutesCell = document.createElement('td');
      minutesCell.setAttribute("time", i);
      if (i < 10) {
        minutesCell.innerText = "0" + i;

      } else {
        minutesCell.innerText = i;
      }

      minutesCell.onclick = function () {
        setMinutes(this.getAttribute('time'));
      }

      minutesRow.appendChild(minutesCell);

      if (counter == minutesBreakPoint) {
        counter = 0;
        minutesTable.appendChild(minutesRow);
        minutesRow = document.createElement("tr");
      }
    }
    minutesTable.appendChild(minutesRow);




    //create am pm div
    var amPmContainer = document.createElement('div');
    var amContainer = document.createElement('p');
    var pmContainer = document.createElement('p');

    amPmContainer.appendChild(amContainer);
    amPmContainer.appendChild(pmContainer);

    amPmContainer.classList.add('timePickerAmPmContainer');
    amContainer.classList.add('timePickerAmContainer');
    pmContainer.classList.add('timePickerPmContainer');

    amContainer.innerText = "AM";
    pmContainer.innerText = "PM";

    amContainer.onclick = function () {
      setAmPm("AM");
    }
    pmContainer.onclick = function () {
      setAmPm("PM");
    }
    timePickerPopup.appendChild(amPmContainer);

  }



  function setMinutes(minuteVar) {
    minutePicked = minuteVar;
    setPlaceholderHeaderTime();
  }
  function setHours(hourVar) {
    hourPicked = hourVar
    setPlaceholderHeaderTime();
  }
  function setAmPm(choicePicked) {
    amPmPicked = choicePicked;
    setPlaceholderHeaderTime();
  }


  function setPlaceholderHeaderTime() {
    var currentTimeString = "";
    if (!hourPicked) {
      currentTimeString += "00:";
    } else {
      if (hourPicked < 10) {
        currentTimeString += "0" + hourPicked + ":";
      } else {
        currentTimeString += hourPicked + ":"
      }
    }
    if (!minutePicked) {
      currentTimeString += "00";
    } else {
      if (minutePicked < 10) {
        currentTimeString += "0";
      }
      currentTimeString += minutePicked;
    }
    if (!amPmPicked) {
      currentTimeString += "AM";
    } else {
      currentTimeString += amPmPicked;
    }
    placeholderHeaderTime.innerText = currentTimeString;
  }





  function destroyTimePopup() {
    timePickerPopup.remove();
    closePageOverlay();
    hourPicked = false;
    minutePicked = false;

  }
  function closePageOverlay() {
    closeTimePopup();
  }


  function setInputValue() {
    var displayHour = "";
    var displayMinute = "";
    var dataTimeAttribute = 0;

    if (!hourPicked) {
      displayHour = "00";
    } else {
      if (!amPmPicked || amPmPicked == "AM") {
        //am
        if (hourPicked == 12) {
          displayHour = "00";
        } else if (hourPicked < 10) {
          displayHour = "0" + hourPicked;
          dataTimeAttribute += (parseInt(hourPicked) * 60)
        } else {
          displayHour = hourPicked;
          dataTimeAttribute += (parseInt(hourPicked) * 60);
        }
      } else {
        //pm
        if (hourPicked == 12) {
          displayHour = "12";
          dataTimeAttribute += (12 * 60)
        } else {
          displayHour = (parseInt(hourPicked) + 12);
          dataTimeAttribute += ((parseInt(hourPicked) + 12) * 60)
        }
      }
    }

    if (!minutePicked) {
      displayMinute = "00";
    } else {
      if (minutePicked < 10) {
        displayMinute = "0";
      }
      displayMinute += minutePicked;
      dataTimeAttribute += (parseInt(minutePicked));
    }

    inputField.value = displayHour + ":" + displayMinute;
    inputField.setAttribute('data-time', dataTimeAttribute);


    //check for opposite side input if matches
    var parentNode = inputField.parentNode;
    if (inputField.classList.contains("storeScheduleEndTime")) {
      var oppositeInputNode = parentNode.getElementsByClassName("storeScheduleStartTime")[0];
      var oppositeNodeTimeAttribute = oppositeInputNode.getAttribute("data-time");
      if (oppositeNodeTimeAttribute == -1) {
        oppositeInputNode.setAttribute('data-time', dataTimeAttribute);
        oppositeInputNode.value = displayHour + ":" + displayMinute;
      } else if (dataTimeAttribute < oppositeNodeTimeAttribute) {
        oppositeInputNode.setAttribute('data-time', dataTimeAttribute);
        oppositeInputNode.value = displayHour + ":" + displayMinute;
      }
    } else {
      var oppositeInputNode = parentNode.getElementsByClassName("storeScheduleEndTime")[0];
      var oppositeNodeTimeAttribute = oppositeInputNode.getAttribute("data-time");
      if (oppositeNodeTimeAttribute == -1) {
        oppositeInputNode.setAttribute('data-time', dataTimeAttribute);
        oppositeInputNode.value = displayHour + ":" + displayMinute;
      } else if (dataTimeAttribute > oppositeNodeTimeAttribute) {
        oppositeInputNode.setAttribute('data-time', dataTimeAttribute);
        oppositeInputNode.value = displayHour + ":" + displayMinute;
      }
    }


  }


  createTimesTable();



  //create cancel button
  var cancelMainDiv = document.createElement('div');
  cancelMainDiv.classList += "timePickerCancelMainDiv";
  var cancelTextInsideDiv = document.createElement('div');
  cancelTextInsideDiv.classList += 'timePickerCancelInsideDiv';
  cancelTextInsideDiv.innerHTML = "Cancel";
  cancelMainDiv.appendChild(cancelTextInsideDiv);
  timePickerPopup.appendChild(cancelMainDiv);
  cancelTextInsideDiv.onclick = function () {
    timePickerPopup.remove();
    closePageOverlay();
  }

  // create done button
  var doneMainDiv = document.createElement('div');
  doneMainDiv.classList += "timePickerDoneMainDiv";
  var doneTextInsideDiv = document.createElement('div');
  doneTextInsideDiv.classList += 'timePickerDoneInsideDiv';
  doneTextInsideDiv.innerHTML = "Done";
  doneMainDiv.appendChild(doneTextInsideDiv);
  timePickerPopup.appendChild(doneMainDiv);
  doneTextInsideDiv.onclick = function () {
    setInputValue();
    timePickerPopup.remove();
    closePageOverlay();
  }

  divToPutPickerInto.appendChild(timePickerPopup);
}

































function createDateTimePicker(inputField, divToPutPickerInto, closeTimePopup, dataDate, dataTime) {
  var hourPicked = null
  var minutePicked = null;
  var amPmPicked = null;

  var dayPicked = null;
  var monthPicked = null;
  var yearPicked = null;

  var todayDate = new Date();

  var placeholderTimeString = "";
  var placeholderDateString = "";

  var finishHour = 12;
  var startHour = 1;

  if (dataDate != -1) {
    var splittedDateString = dataDate.split('/');
    yearPicked = splittedDateString[0];
    monthPicked = parseInt(splittedDateString[1]);
    dayPicked = splittedDateString[2];
    placeholderDateString = monthsName[monthPicked - 1] + " " + dayPicked + ", " + yearPicked;
  } else {
    placeholderDateString = monthsName[todayDate.getMonth()] + " " + todayDate.getDate() + ", " + todayDate.getFullYear();
  }

  if (dataTime != -1) {
    var timeArray = minutesTo12HourArray(dataTime);
    //hour, minute, ampm, timestring
    hourPicked = timeArray[0];
    minutePicked = timeArray[1];
    amPmPicked = timeArray[2];
    placeholderTimeString = (timeArray[3] + amPmPicked);
  } else {
    placeholderTimeString = "00:00AM";
  }


  var timePickerPopup = document.createElement("div");
  timePickerPopup.classList += "timePickerPopupMainDiv";

  var timeMainContainer = document.createElement('div');
  timeMainContainer.classList.add('dateTimePickerMainTypeInnerContainer');
  timeMainContainer.style.display = "block";

  var dateMainContainer = document.createElement('div');
  dateMainContainer.classList.add('dateTimePickerMainTypeInnerContainer');
  dateMainContainer.style.display = "none";


  var dateTimeDisplayDiv = document.createElement('div');
  dateTimeDisplayDiv.classList.add("dateTimePickerChangeViewDivMainContainer");


  //create time button
  var timeDisplayInsideDiv = document.createElement('div');
  timeDisplayInsideDiv.classList.add('dateTimePickerChangeViewInnerDiv');
  var clockImg = document.createElement('img');
  clockImg.src = "assets/icons/octiconsSvg/watch.svg";
  clockImg.classList.add('dateTimePickerChangeViewIcon');
  timeDisplayInsideDiv.appendChild(clockImg);
  dateTimeDisplayDiv.appendChild(timeDisplayInsideDiv);
  timePickerPopup.appendChild(dateTimeDisplayDiv);
  clockImg.onclick = function () {
    timeMainContainer.style.display = "block";
    dateMainContainer.style.display = "none";
  }

  //create calendar button
  var dateDisplayInsideDiv = document.createElement('div');
  dateDisplayInsideDiv.classList.add('dateTimePickerChangeViewInnerDiv');
  var calendarImg = document.createElement('img');
  calendarImg.src = "assets/icons/octiconsSvg/calendar.svg";
  calendarImg.classList.add('dateTimePickerChangeViewIcon');
  dateDisplayInsideDiv.appendChild(calendarImg);
  dateTimeDisplayDiv.appendChild(dateDisplayInsideDiv);
  timePickerPopup.appendChild(dateTimeDisplayDiv);
  calendarImg.onclick = function () {
    timeMainContainer.style.display = "none";
    dateMainContainer.style.display = "block";
  }

  //create placeholder header date
  var placeholderHeaderDate = document.createElement("p");
  placeholderHeaderDate.innerText = placeholderDateString;
  placeholderHeaderDate.classList.add('timePickerPlaceholderTimeHeader');
  timePickerPopup.appendChild(placeholderHeaderDate);

  //create placeholder header time
  var placeholderHeaderTime = document.createElement("p");
  placeholderHeaderTime.innerText = placeholderTimeString;
  placeholderHeaderTime.classList.add('timePickerPlaceholderTimeHeader');
  timePickerPopup.appendChild(placeholderHeaderTime);


  //create hour header
  var hoursHeader = document.createElement('p');
  hoursHeader.classList.add('timePickerHeaderP');
  hoursHeader.innerText = "Hours";
  timeMainContainer.appendChild(hoursHeader);

  //create hours table
  var hoursBreakPoint = 6;
  var nbRowsHours = 2;
  var hoursTable = document.createElement("table");
  hoursTable.classList += "timePickerHoursTable";
  timeMainContainer.appendChild(hoursTable);

  //create minutes header
  var minutesHeader = document.createElement('p');
  minutesHeader.classList.add('timePickerHeaderP');
  minutesHeader.innerText = "Minutes";
  timeMainContainer.appendChild(minutesHeader);

  //create minutes table
  var minutesBreakPoint = 6;
  var nbRowsMinutes = 2;
  var minutesTable = document.createElement("table");
  minutesTable.classList += "timePickerMinutesTable";
  timeMainContainer.appendChild(minutesTable);


  function createTimesTable() {


    //create hours rows
    var hoursRow = document.createElement("tr");
    var hoursCell = null;

    for (var i = startHour, counter = 1; i < finishHour + 1; i++, counter++) {
      hoursCell = document.createElement('td');
      hoursCell.setAttribute("time", i);
      if (i < 10) {
        hoursCell.innerText = "0" + i;
      } else {
        hoursCell.innerText = i;
      }

      hoursCell.onclick = function () {
        setHours(this.getAttribute('time'));
      }

      hoursRow.appendChild(hoursCell);

      if (counter == hoursBreakPoint && i != finishHour) {
        counter = 0;
        hoursTable.appendChild(hoursRow);
        hoursRow = document.createElement("tr");
      }
    }
    hoursTable.appendChild(hoursRow);





    //create minutes rows
    var minutesRow = document.createElement("tr");
    var minutesCell = null;

    for (var i = 0, counter = 1; i < 60; i += 5, counter++) {
      minutesCell = document.createElement('td');
      minutesCell.setAttribute("time", i);
      if (i < 10) {
        minutesCell.innerText = "0" + i;

      } else {
        minutesCell.innerText = i;
      }

      minutesCell.onclick = function () {
        setMinutes(this.getAttribute('time'));
      }

      minutesRow.appendChild(minutesCell);

      if (counter == minutesBreakPoint) {
        counter = 0;
        minutesTable.appendChild(minutesRow);
        minutesRow = document.createElement("tr");
      }
    }
    minutesTable.appendChild(minutesRow);




    //create am pm div
    var amPmContainer = document.createElement('div');
    var amContainer = document.createElement('p');
    var pmContainer = document.createElement('p');

    amPmContainer.appendChild(amContainer);
    amPmContainer.appendChild(pmContainer);

    amPmContainer.classList.add('timePickerAmPmContainer');
    amContainer.classList.add('timePickerAmContainer');
    pmContainer.classList.add('timePickerPmContainer');

    amContainer.innerText = "AM";
    pmContainer.innerText = "PM";

    amContainer.onclick = function () {
      setAmPm("AM");
    }
    pmContainer.onclick = function () {
      setAmPm("PM");
    }
    timeMainContainer.appendChild(amPmContainer);
  }





  function createDatePicker() {
    var calendarPickerDate = new Date();
    var theDateToday = new Date();

    var calendarMainDivSelectorDate = document.createElement('div');
    calendarMainDivSelectorDate.classList.add("calendarPopupDatePicker");



    var topPickerDiv = document.createElement('div');
    topPickerDiv.classList.add('monthCalendarPickerTopDiv');

    var leftArrow = document.createElement('p');
    leftArrow.classList.add('monthCalendarPickerLeftArrow');
    leftArrow.innerHTML = "&#9668;";
    var rightArrow = document.createElement('p');
    rightArrow.classList.add('monthCalendarPickerRightArrow');
    rightArrow.innerHTML = "&#9658;";

    var monthName = document.createElement('p');
    monthName.classList.add('monthCalendarPickerMonthName');
    monthName.innerText = fullMonthsName[calendarPickerDate.getMonth()] + " " + calendarPickerDate.getFullYear();

    topPickerDiv.appendChild(leftArrow);
    topPickerDiv.appendChild(rightArrow);
    topPickerDiv.appendChild(monthName);
    calendarMainDivSelectorDate.appendChild(topPickerDiv);


    var divAroundTable = document.createElement('div');
    divAroundTable.classList.add('dateTableContainer');
    createTable(calendarPickerDate);





    leftArrow.onclick = function () {
      changeMonth(-1);
    }
    rightArrow.onclick = function () {
      changeMonth(1);
    }


    function changeMonth(plusOrMinus) {

      var lastDayOfCurrentMonth = new Date(calendarPickerDate.getFullYear(), calendarPickerDate.getMonth() + 1, 0).getDate();
      var lastDayOfNextMonth = new Date(calendarPickerDate.getFullYear(), calendarPickerDate.getMonth() + 2, 0).getDate();
      var lastDayOfPastMonth = new Date(calendarPickerDate.getFullYear(), calendarPickerDate.getMonth(), 0).getDate();
      if (plusOrMinus == 1) {
        //next Month
        if (lastDayOfNextMonth < lastDayOfCurrentMonth) {
          calendarPickerDate.setDate(lastDayOfNextMonth);
          calendarPickerDate.setMonth(calendarPickerDate.getMonth() + 1);
        } else {
          calendarPickerDate.setMonth(calendarPickerDate.getMonth() + 1);
        }
      } else {
        //past month == -1
        if (lastDayOfPastMonth < lastDayOfCurrentMonth) {
          calendarPickerDate.setDate(lastDayOfPastMonth);
          calendarPickerDate.setMonth(calendarPickerDate.getMonth() - 1);
        } else {
          calendarPickerDate.setMonth(calendarPickerDate.getMonth() - 1);

        }
      }

      createTable(calendarPickerDate);

      monthName.innerText = fullMonthsName[calendarPickerDate.getMonth()] + " " + calendarPickerDate.getFullYear();
    }




    function createTable(theDate) {
      divAroundTable.innerHTML = "";
      var monthNumber = theDate.getMonth();
      var yearNumber = theDate.getFullYear();

      var daysInMonth = new Date(yearNumber, monthNumber + 1, 0).getDate();

      var startDayOfMonth = new Date(yearNumber, monthNumber, 1).getDay();
      var endDayOfMonth = new Date(yearNumber, monthNumber, daysInMonth).getDay();

      // Determine the number of blank squares before start of month
      var squares = [];
      if (startDayOfMonth != 0) {
        for (var i = 0; i < startDayOfMonth; i++) {
          squares.push("b");
        }
      }

      // Populate the days of the month
      for (var i = 1; i <= daysInMonth; i++) {
        squares.push(i);
      }

      // Determine the number of blank squares after end of month
      if (endDayOfMonth != 6) {
        var blanks = endDayOfMonth == 0 ? 6 : 6 - endDayOfMonth;
        for (var i = 0; i < blanks; i++) {
          squares.push("b");
        }
      }


      var monthTable = document.createElement("table");
      monthTable.classList.add("monthCalendarSelectorTable");

      // First row - Days
      var monthNameRow = document.createElement("tr");
      var calendarCell = null;
      for (var i = 0; i < weekDayName.length; i++) {
        calendarCell = document.createElement("td");
        calendarCell.innerHTML = weekDayName[i];
        monthNameRow.appendChild(calendarCell);
      }
      monthNameRow.classList.add("monthNameRow");
      monthTable.appendChild(monthNameRow);




      // Days in Month
      var totalDays = squares.length;
      var calendarRow = document.createElement("tr");
      var monthDateCell = null;

      for (var i = 0; i < totalDays; i++) {
        monthDateCell = document.createElement("td");
        if (squares[i] == "b") {
          monthDateCell.classList.add("blankDate");
        } else {

          var wrapperInsideTd = document.createElement("div");
          wrapperInsideTd.innerHTML = "<div class='monthDateCell'>" + squares[i] + "</div>";
          wrapperInsideTd.classList.add("wrapperInsideMonthCell");
          monthDateCell.appendChild(wrapperInsideTd);
          var newMonthNumber = monthNumber;
          monthDateCell.setAttribute("date", yearNumber + "/" + (newMonthNumber + 1) + "/" + squares[i]);



          if (theDateToday.getDate() > squares[i] && theDateToday.getMonth() == newMonthNumber && theDateToday.getFullYear() == yearNumber) {

            wrapperInsideTd.classList.add('calendarTextBlocked');
          } else if (theDateToday.getMonth() > newMonthNumber && theDateToday.getFullYear() == yearNumber) {
            //later month but same year
            wrapperInsideTd.classList.add('calendarTextBlocked');
          } else if (theDateToday.getFullYear() > yearNumber) {
            //later year
            wrapperInsideTd.classList.add('calendarTextBlocked');
          } else {
            wrapperInsideTd.classList.add('calendarTextAvailable');
            monthDateCell.addEventListener("click", function () {

              var splittedString = this.getAttribute('date').split('/');
              setDay(splittedString[2]);
              setYear(splittedString[0]);
              setMonth(splittedString[1]);
            });
          }


        }
        calendarRow.appendChild(monthDateCell);
        if (i != 0 && (i + 1) % 7 == 0) {
          monthTable.appendChild(calendarRow);
          calendarRow = document.createElement("tr");
        }
      }


      divAroundTable.appendChild(monthTable);
    }
    calendarMainDivSelectorDate.appendChild(divAroundTable);
    dateMainContainer.appendChild(calendarMainDivSelectorDate);



  }

  timePickerPopup.appendChild(dateMainContainer);
  timePickerPopup.appendChild(timeMainContainer);

  //create cancel button
  var cancelMainDiv = document.createElement('div');
  cancelMainDiv.classList += "timePickerCancelMainDiv";
  var cancelTextInsideDiv = document.createElement('div');
  cancelTextInsideDiv.classList += 'timePickerCancelInsideDiv';
  cancelTextInsideDiv.innerHTML = "Cancel";
  cancelMainDiv.appendChild(cancelTextInsideDiv);
  timePickerPopup.appendChild(cancelMainDiv);
  cancelTextInsideDiv.onclick = function () {
    timePickerPopup.remove();
    closePageOverlay();
  }

  // create done button
  var doneMainDiv = document.createElement('div');
  doneMainDiv.classList += "timePickerDoneMainDiv";
  var doneTextInsideDiv = document.createElement('div');
  doneTextInsideDiv.classList += 'timePickerDoneInsideDiv';
  doneTextInsideDiv.innerHTML = "Done";
  doneMainDiv.appendChild(doneTextInsideDiv);
  timePickerPopup.appendChild(doneMainDiv);
  doneTextInsideDiv.onclick = function () {
    setInputValue();

    timePickerPopup.remove();
    closePageOverlay();
  }




  function setMinutes(minuteVar) {
    minutePicked = minuteVar;
    setPlaceholderHeaderTime();
  }
  function setHours(hourVar) {
    hourPicked = hourVar;
    setPlaceholderHeaderTime();
  }
  function setAmPm(choicePicked) {
    amPmPicked = choicePicked;
    setPlaceholderHeaderTime();
  }
  function setDay(choicePicked) {
    dayPicked = choicePicked;
    setPlaceholderHeaderTime();
  }
  function setMonth(choicePicked) {
    monthPicked = choicePicked;
    setPlaceholderHeaderTime();
  }
  function setYear(choicePicked) {
    yearPicked = choicePicked;
    setPlaceholderHeaderTime();
  }
  var timeString = "";
  var dateString = "";
  function setPlaceholderHeaderTime() {
    timeString = "";
    dateString = "";
    if (!hourPicked) {
      timeString += "00:";
    } else {
      if (hourPicked < 10) {
        timeString += "0" + hourPicked + ":";
      } else {
        timeString += hourPicked + ":"
      }
    }
    if (!minutePicked) {
      timeString += "00";
    } else {
      if (minutePicked < 10) {
        timeString += "0";
      }
      timeString += minutePicked;
    }
    if (!amPmPicked) {
      timeString += "AM";
    } else {
      timeString += amPmPicked;
    }

    if (!monthPicked) {
      dateString += monthsName[new Date().getMonth()];
    } else {
      dateString += monthsName[monthPicked - 1];
    }

    if (!dayPicked) {
      dateString += " " + new Date().getDate();
    } else {
      dateString += " " + dayPicked;
    }

    if (!yearPicked) {
      dateString += ", " + new Date().getFullYear();
    } else {
      dateString += ", " + yearPicked;
    }
    placeholderHeaderTime.innerText = timeString;
    placeholderHeaderDate.innerText = dateString;
  }





  function destroyTimePopup() {
    timePickerPopup.remove();
    closePageOverlay();
    hourPicked = false;
    minutePicked = false;

  }
  function closePageOverlay() {
    closeTimePopup();
  }


  function setInputValue() {

    var displayHour = "";
    var displayMinute = "";
    var dataTimeAttribute = 0;
    var dataDateAttribute = "";



    if (!yearPicked) {
      timeString += "2019/";
      dataDateAttribute += "2019/";
    } else {
      timeString += yearPicked + "/";
      dataDateAttribute += yearPicked + "/";
    }
    if (!monthPicked) {
      timeString += "01/";
      dataDateAttribute += "01/";
    } else {
      timeString += monthPicked + "/";
      dataDateAttribute += monthPicked + "/";
    }
    if (!dayPicked) {
      timeString += "01 ";
      dataDateAttribute += "01";
    } else {
      timeString += dayPicked + " ";
      dataDateAttribute += dayPicked;
    }

    if (!hourPicked) {
      displayHour = "00";
    } else {
      if (!amPmPicked || amPmPicked == "AM") {
        //am
        if (hourPicked == 12) {
          displayHour = "00";
        } else if (hourPicked < 10) {
          displayHour = "0" + hourPicked;
          dataTimeAttribute += (parseInt(hourPicked) * 60)
        } else {
          displayHour = hourPicked;
          dataTimeAttribute += (parseInt(hourPicked) * 60);
        }
      } else {
        //pm
        if (hourPicked == 12) {
          displayHour = "12";
          dataTimeAttribute += (12 * 60)
        } else {
          displayHour = (parseInt(hourPicked) + 12);
          dataTimeAttribute += ((parseInt(hourPicked) + 12) * 60)
        }
      }
    }
    if (!minutePicked) {
      displayMinute = "00";
    } else {
      if (minutePicked < 10) {
        displayMinute = "0";
      }
      displayMinute += minutePicked;
      dataTimeAttribute += (parseInt(minutePicked));
    }

    inputField.value = dataDateAttribute + " " + displayHour + ":" + displayMinute;
    inputField.setAttribute('data-date', dataDateAttribute);
    inputField.setAttribute('data-time', dataTimeAttribute);

    checkValidityInput(inputField);

  }

  createDatePicker();
  createTimesTable();

  divToPutPickerInto.appendChild(timePickerPopup);


}




function checkValidityInput(inputElement) {
  var parentNode = inputElement.parentNode;
  if (inputElement.classList.contains('existingStoreAbsenceStart')) {
    var oppositeInputNode = parentNode.getElementsByClassName('existingStoreAbsenceEnd')[0];

    if (oppositeInputNode.getAttribute('data-date') == -1) {
      setInputValuesFromInput(inputElement, oppositeInputNode);
    } else {
      var startRelativeToEnd = compareStartToEnd(inputElement, oppositeInputNode);
      if (startRelativeToEnd == 1) {
        setInputValuesFromInput(inputElement, oppositeInputNode);
      }
    }
  } else if (inputElement.classList.contains('existingStoreAbsenceEnd')) {
    var oppositeInputNode = parentNode.getElementsByClassName('existingStoreAbsenceStart')[0];
    if (oppositeInputNode.getAttribute('data-date') == -1) {
      setInputValuesFromInput(inputElement, oppositeInputNode);
    } else {
      var startRelativeToEnd = compareStartToEnd(oppositeInputNode, inputElement);
      if (startRelativeToEnd == 1) {
        setInputValuesFromInput(inputElement, oppositeInputNode);
      }
    }
  } else if (inputElement.classList.contains('newStoreAbsenceEnd')) {
    var oppositeInputNode = parentNode.getElementsByClassName('newStoreAbsenceStart')[0];
    if (oppositeInputNode.getAttribute('data-date') == -1) {
      setInputValuesFromInput(inputElement, oppositeInputNode);
    } else {
      var startRelativeToEnd = compareStartToEnd(oppositeInputNode, inputElement);
      if (startRelativeToEnd == 1) {
        setInputValuesFromInput(inputElement, oppositeInputNode);
      }
    }
  } else if (inputElement.classList.contains('newStoreAbsenceStart')) {
    var oppositeInputNode = parentNode.getElementsByClassName('newStoreAbsenceEnd')[0];
    if (oppositeInputNode.getAttribute('data-date') == -1) {
      setInputValuesFromInput(inputElement, oppositeInputNode);
    } else {
      var startRelativeToEnd = compareStartToEnd(inputElement, oppositeInputNode);
      if (startRelativeToEnd == 1) {
        setInputValuesFromInput(inputElement, oppositeInputNode);
      }
    }
  }

}

function setInputValuesFromInput(sourceInput, targetInput) {
  targetInput.setAttribute('data-date', sourceInput.getAttribute('data-date'));
  targetInput.setAttribute('data-time', sourceInput.getAttribute('data-time'));
  targetInput.value = sourceInput.value;
}

function compareStartDateToEndDate(startDate, endDate) {
  var startDay = parseInt(startDate.getDate());
  var startMonth = parseInt(startDate.getMonth());
  var startYear = parseInt(startDate.getFullYear());

  var endDay = parseInt(endDate.getDate());
  var endMonth = parseInt(endDate.getMonth());
  var endYear = parseInt(endDate.getFullYear());


  if (startDay == endDay && startMonth == startMonth && startYear == startYear) {
    return 0;
  } else if (startMonth == endMonth && startYear == endYear) {
    if (startDay < endDay) {
      return -1;
    } else {
      return 1;
    }
  } else if (startYear == endYear) {
    if (startMonth < endMonth) {
      return -1;
    } else {
      return 1;
    }
  } else {
    if (startYear < endYear) {
      return -1;
    } else {
      return 1;
    }
  }
}
















function decimalToHour12Format(num) {
  var hrs = parseInt(Number(num));
  var min = Math.round((Number(num) - hrs) * 60);
  if (min == 0) {
    min = "00";
  }
  var hourString = "";
  if (hrs > 11) {
    var amPm = "PM";
    hourString = (hrs - 12) + ':' + min + amPm;
  } else {
    var amPm = "AM";
    hourString = hrs + ':' + min + amPm;
  }
  return hourString;
}


function hoursMinutesToMilliseconds(hours, minutes) {
  return (hours * 3600000) + (minutes * 60000);
}

function decimalHourToMilliseconds(decimalHour) {
  return decimalHour * 3600000;
}
function millisecondsToTime(milliseconds) {

  var minutes = Math.floor((milliseconds / (1000 * 60)) % 60),
    hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;

  return hours + ":" + minutes;
}


function timeToDecimal(dateX) {
  var t = dateX.getHours() + ":" + dateX.getMinutes();
  var arr = t.split(':');
  var dec = parseInt((arr[1] / 6) * 10, 10);

  return parseFloat(parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec);
}

function decimalToTime(decimalNb) {
  var min = Math.floor(Math.abs(decimalNb))
  var sec = Math.floor((Math.abs(decimalNb) * 60) % 60);
  return (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}



function sameDate(date1, date2) {
  if (date1.getDate() == date2.getDate() && date2.getMonth() == date1.getMonth() && date1.getFullYear() == date2.getFullYear()) {

    return true;
  } else {
    return false;
  }
}



function getStartAndEndDateString(start, end) {
  var stringDate = "";
  var startMinuteString = start.getMinutes();
  var endMinuteString = end.getMinutes();
  if (startMinuteString == '0') {
    startMinuteString = "00";
  }
  if (endMinuteString == "0") {
    endMinuteString == "00";
  }
  stringDate = monthName[start.getMonth()] + " " + start.getDate() + "@" + start.getHours() + ":" + startMinuteString + " - " + monthName[end.getMonth()] + " " + end.getDate() + "@" + end.getHours() + ":" + endMinuteString;
  return stringDate;
}

function getEventDurationInDays(start, end) {
  var stopLoop = false;
  var durationDays = 1;
  var startDateObj = new Date(start);
  var endDateObj = new Date(end);
  while (stopLoop == false) {
    if (sameDate(startDateObj, endDateObj)) {
      return durationDays;
    } else {
      startDateObj.setDate(startDateObj.getDate() + 1);
      durationDays++;
    }
  }
}





function sameDateOrLater(date1, date2) {

  if (date1.getDate() >= date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear()) {
    //later day but same month and same year

    return true;
  } else if (date1.getMonth() >= date2.getMonth() && date1.getFullYear() == date2.getFullYear()) {
    //later month but same year
    return true;
  } else if (date1.getFullYear() >= date2.getFullYear()) {
    //later year
    return true;
  } else {
    return false;
  }
}







function eventsOverlap(d1, d2) {

  if (d1.endDate.getTime() <= d2.startDate.getTime() || d1.startDate.getTime() >= d2.endDate.getTime()) {
    return false;
  } else {
    return true;
  }

}

function eventsOverlapEJS(d1, d2) {
  if (new Date(d1.backendDateObjEnd).getTime() <= new Date(d2.backendDateObjStart).getTime() || new Date(d1.backendDateObjStart).getTime() >= new Date(d2.backendDateObjEnd).getTime()) {
    return false;
  } else {
    return true;
  }

}

function dateIsInsideRange(date1, startDate, endDate) {
  if (endDate.getTime() < date1.getTime() || startDate.getTime() > date1.getTime()) {
    return false;
  } else {
    return true;
  }
}



function dateIsInsideRangeOfWeekEJS(date1, startDate, endDateFromObj) {
  var endDate = new Date(endDateFromObj);
  endDate.setDate(endDate.getDate() + 1);
  if (endDate.getTime() <= new Date(date1).getTime() || startDate.getTime() > new Date(date1).getTime()) {
    return false;
  } else {
    return true;
  }
}


function eventIsInsideRange(event, rangeStart, rangeEnd) {
  var eventStart = new Date(event.backendDateObjStart).getTime();
  var eventEnd = new Date(event.backendDateObjEnd).getTime();
  rangeStart = rangeStart.getTime();
  rangeEnd = rangeEnd.getTime();

  if (eventStart >= rangeStart && eventStart < rangeEnd) {
    return true;
  } else if (eventEnd > rangeStart && eventEnd <= rangeEnd) {
    return true;
  } else if (eventStart <= rangeStart && eventEnd >= rangeEnd) {
    return true;
  }
  return false;
}


function closeAllOpenPopup() {

  document.getElementById('notificationMainAroundDiv').style.display = 'none';
  var openPopupDiv = document.getElementsByClassName('openPopupDiv');
  for (var q = 0; q < openPopupDiv.length; q++) {
    openPopupDiv[q].remove();
  }
}

function removeNotificationAlert() {
  var notificationCircleAlert = document.getElementById('newNotificationAlertCircle');
  if (notificationCircleAlert) {

    $.ajax({
      url: '/removeNotificationAlertFromStore',
      type: 'post',
      success: function (data, textStatus) {
        if (data == "ok") {
          notificationCircleAlert.remove();
        }
      },
      error: function (textStatus, errorThrown) {

      }
    });
  }
}













function compareStartToEnd(startInput, endInput) {
  var startDate = new Date(startInput.getAttribute('data-date'));
  var startTime = parseInt(startInput.getAttribute('data-time'));
  var endDate = new Date(endInput.getAttribute('data-date'));
  var endTime = parseInt(endInput.getAttribute('data-time'));
  var datesCompared = compareStartDateToEndDate(startDate, endDate);
  if (datesCompared == 1) {

    return 1;
  } else if (datesCompared == 0) {
    if (startTime == endTime) {
      return 0;
    } else if (startTime < endTime) {
      return -1;
    } else {
      return 1;
    }
  } else {
    return -1;
  }

}






function closeAllTransparentOverlays() {
  var allTranspOverlays = document.getElementsByClassName('transparentOverlay');
  while (allTranspOverlays.length > 0) {
    allTranspOverlays[0].remove();
  }
}


async function closeFiltersPopup() {
  var fullScreenTransparentContainer = document.getElementById('filtersDivFullScreenContainer');
  var filtersPopup = document.getElementById('filtersDivContainer');
  filtersPopup.style.bottom = "-100%";
  fullScreenTransparentContainer.style.display = 'none';

}



function dateToDateString(dateX) {
  var day = dateX.getDate();
  var month = dateX.getMonth() + 1;
  var year = dateX.getFullYear();
  var dateString = year + "/" + month + "/" + day;
  return dateString;
}


function dateToClientString(dateX) {
  dateX = new Date(dateX);
  var day = dateX.getDate();
  var month = dateX.getMonth();
  var year = dateX.getFullYear();
  var hour = dateX.getHours();
  var minutes = dateX.getMinutes();
  if (hour < 10) {
    hour = 0 + "" + hour;
  }
  if (minutes < 10) {
    minutes = 0 + "" + minutes;
  }

  return fullMonthsName[month] + " " + day + ", " + year + " @ " + hour + ":" + minutes;
}






function minutesToHourInt(minutes) {
  return minutes / 60;
}

function minutestoFloorHourInMinutes(minutes) {
  return Math.floor(minutes / 60) * 60;
}
function minutesToCeilingHourInMinutes(minutes) {
  return Math.ceil(minutes / 60) * 60;
}


function minutesToHourString(minutes) {
  minutes = parseInt(minutes);
  var nbHours = Math.floor(minutes / 60);
  var nbMinutes = minutes - (nbHours * 60);
  var hourString = "";
  if (nbHours < 10) {
    hourString += "0" + nbHours + ":";
  } else {
    hourString += nbHours + ":";
  }
  if (nbMinutes == 0) {
    hourString += "00";
  } else if (nbMinutes < 10) {
    hourString += "0" + nbMinutes;
  } else {
    hourString += nbMinutes;
  }
  return hourString;
}



function minutesTo12HourString(minutes) {
  minutes = parseInt(minutes);
  //hour, minute, ampm, timestring
  var nbHours = Math.floor(minutes / 60);
  var nbMinutes = minutes - (nbHours * 60);
  var hourString = "";
  var amPmString = "";
  if (nbHours < 10) {
    hourString += "0" + nbHours + ":";
    amPmString = "AM";
  } else if (nbHours < 12) {
    hourString += nbHours + ":";
    amPmString = "AM";
  } else if (nbHours == 12) {
    hourString += nbHours + ":";
    amPmString = "PM";
  } else {
    hourString += (nbHours - 12) + ":";
    amPmString = "PM";
  }
  if (nbMinutes == 0) {
    hourString += "00";
  } else if (nbMinutes < 10) {
    hourString += "0" + nbMinutes;
  } else {
    hourString += nbMinutes;
  }
  return hourString + amPmString;
}



function minutesTo12HourArray(minutes) {
  //hour, minute, ampm, timestring
  var nbHours = Math.floor(minutes / 60);
  var nbMinutes = minutes - (nbHours * 60);
  var nbHours12format = 0;
  var hourString = "";
  var amPmString = "";
  if (nbHours < 10) {
    hourString += "0" + nbHours + ":";
    amPmString = "AM";
    nbHours12format = nbHours;
  } else if (nbHours < 12) {
    hourString += nbHours + ":";
    amPmString = "AM";
    nbHours12format = nbHours;
  } else if (nbHours == 12) {
    hourString += nbHours + ":";
    amPmString = "PM";
    nbHours12format = nbHours;
  } else {
    hourString += (nbHours - 12) + ":";
    amPmString = "PM";
    nbHours12format = (nbHours - 12);
  }
  if (nbMinutes == 0) {
    hourString += "00";
  } else if (nbMinutes < 10) {
    hourString += "0" + nbMinutes;
  } else {
    hourString += nbMinutes;
  }
  return [nbHours12format, nbMinutes, amPmString, hourString];
}
