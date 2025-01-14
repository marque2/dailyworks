
  function createTimePicker(inputField, divToPutPickerInto, closeTimePopup, dataTime){
    var finishHour = 11;
    var startingHour = 0;

    var placeholderTimeString = "";
    var hourPicked = null
    var minutePicked = null;
    var amPmPicked = null;


    if(dataTime != -1){

        hourPicked = parseInt(Number(dataTime));
        minutePicked = Math.round((Number(dataTime)-hourPicked)*60);
        var hourDisplay = hourPicked;
        var minunteDisplay = minutePicked;
        if(minunteDisplay < 10){
            minunteDisplay = "0"+minunteDisplay;
        }
        if(hourPicked<10){
          hourDisplay = "0"+hourDisplay;
        }
        if(hourPicked<12){
          placeholderTimeString+="AM";
          amPmPicked = "AM";
          placeholderTimeString = (hourDisplay)+":"+minunteDisplay+amPmPicked;
        }else{
          placeholderTimeString+="PM";
          amPmPicked="PM";
          placeholderTimeString = (hourDisplay-12)+":"+minunteDisplay+amPmPicked;
        }

    }else{
      placeholderTimeString = "00:00AM";
    }




    var timeString = "";

    var timePickerPopup = document.createElement("div");
    timePickerPopup.classList+= "timePickerPopupMainDiv";


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


      function createTimesTable(){


    //create hours rows
          var hoursRow = document.createElement("tr");
          var hoursCell = null;

          for(var i = startingHour, counter = 1;i<finishHour+1;i++, counter++){
            hoursCell = document.createElement('td');
            hoursCell.setAttribute("time", i);
            if(i<10){
              hoursCell.innerText= "0"+i;
            }else{
              hoursCell.innerText= i;
            }

            hoursCell.onclick = function(){
              setHours(this.getAttribute('time'));
            }

            hoursRow.appendChild(hoursCell);

            if (counter == hoursBreakPoint && i!=finishHour) {
              counter = 0;
              hoursTable.appendChild(hoursRow);
              hoursRow = document.createElement("tr");
            }
          }
          hoursTable.appendChild(hoursRow);





    //create minutes rows
          var minutesRow = document.createElement("tr");
          var minutesCell = null;

          for(var i = 0, counter = 1; i< 60; i+=5, counter++){
            minutesCell = document.createElement('td');
            minutesCell.setAttribute("time", i);
            if(i <10){
              minutesCell.innerText = "0"+i;

            }else{
            minutesCell.innerText = i;
            }

            minutesCell.onclick = function(){
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

    amContainer.onclick = function(){
      setAmPm("AM");
      if(hourPicked>11){
        hourPicked = parseInt(hourPicked)-12;
      }
    }
    pmContainer.onclick = function(){
      setAmPm("PM");
      if(hourPicked<12){
        hourPicked = parseInt(hourPicked)+12;
      }
    }
    timePickerPopup.appendChild(amPmContainer);

      }



    function setMinutes(minuteVar){
      minutePicked = minuteVar;
      setPlaceholderHeaderTime();
    }
    function setHours(hourVar){
      hourPicked = hourVar
      setPlaceholderHeaderTime();
    }
    function setAmPm(choicePicked){
      amPmPicked = choicePicked;
      setPlaceholderHeaderTime();
    }

    function setPlaceholderHeaderTime(){
      var timeString = "";
      if(!hourPicked){
        timeString+="00:";
      }else{
        if(hourPicked>11){
          timeString+=(parseInt(hourPicked)-12)+":";
        }else{
          timeString+=hourPicked+":";
        }
      }
      if(!minutePicked){
        timeString+="00";
      }else{
        timeString+=minutePicked;
      }
      if(!amPmPicked){
        timeString+="AM";
      }else{
        timeString+=amPmPicked;
      }
      placeholderHeaderTime.innerText = timeString;
    }





    function destroyTimePopup(){
    timePickerPopup.remove();
    closePageOverlay();
    hourPicked = false;
    minutePicked = false;

    }
    function closePageOverlay(){
      closeTimePopup();
    }


    function setInputValue(){
      var timeString = "";
      var dataTimeAttribute="";
      var attributeHour = 0;
      if(!hourPicked){
        timeString+="00:";
      }else{
        if(!amPmPicked){
          attributeHour=parseInt(hourPicked);
          if(parseInt(hourPicked)>11){
            timeString+=(parseInt(hourPicked)-12);
          }else{
            timeString+=hourPicked;
          }
        }else if(amPmPicked=="AM"){
          attributeHour=parseInt(hourPicked);
          if(parseInt(hourPicked)>11){
            timeString+=(parseInt(hourPicked)-12);
          }else{
            timeString+=hourPicked;
          }
        }else{
          //is pm
          attributeHour=(parseInt(hourPicked));
          if(parseInt(hourPicked)>11){
            timeString+=(parseInt(hourPicked)-12);
          }else{
            timeString+=hourPicked;
          }
        }
        timeString+=":";
      }

      if(!minutePicked){
        timeString+="00"
      }else{
        timeString+=minutePicked;
        attributeHour+=((parseInt(minutePicked)/60));
      }
      dataTimeAttribute = attributeHour;
      if(!amPmPicked){
        timeString+="AM"
      }else{
        timeString+=amPmPicked;
      }

      inputField.value = timeString;
      inputField.setAttribute('data-time', dataTimeAttribute);
    }


    createTimesTable();



    //create cancel button
    var cancelMainDiv = document.createElement('div');
    cancelMainDiv.classList+="timePickerCancelMainDiv";
    var cancelTextInsideDiv = document.createElement('div');
    cancelTextInsideDiv.classList+='timePickerCancelInsideDiv';
    cancelTextInsideDiv.innerHTML = "Cancel";
    cancelMainDiv.appendChild(cancelTextInsideDiv);
    timePickerPopup.appendChild(cancelMainDiv);
    cancelTextInsideDiv.onclick = function(){
      timePickerPopup.remove();
      closePageOverlay();
    }

    // create done button
    var doneMainDiv = document.createElement('div');
    doneMainDiv.classList+="timePickerDoneMainDiv";
    var doneTextInsideDiv = document.createElement('div');
    doneTextInsideDiv.classList+='timePickerDoneInsideDiv';
    doneTextInsideDiv.innerHTML = "Done";
    doneMainDiv.appendChild(doneTextInsideDiv);
    timePickerPopup.appendChild(doneMainDiv);
    doneTextInsideDiv.onclick = function(){
      setInputValue();
      timePickerPopup.remove();
      closePageOverlay();
    }


        divToPutPickerInto.appendChild(timePickerPopup);


  }

































  function createDateTimePicker(inputField, divToPutPickerInto, closeTimePopup, dataDate, dataTime){
    var hourPicked = null
    var minutePicked = null;
    var amPmPicked = null;
    var dayPicked = null;
    var monthPicked = null;
    var yearPicked = null;

    var todayDate = new Date();

    var placeholderTimeString = "";
    var placeholderDateString = "";

    if(dataDate != -1){
      var splittedDateString = dataDate.split('/');
      yearPicked = splittedDateString[0];
      monthPicked = parseInt(splittedDateString[1]);
      dayPicked = splittedDateString[2];

      placeholderDateString = monthsName[monthPicked-1]+" "+ dayPicked+", "+yearPicked;
    }else{

      placeholderDateString = monthsName[todayDate.getMonth()] +" "+ todayDate.getDate()+", "+todayDate.getFullYear();
    }
    if(dataTime != -1){

        hourPicked = parseInt(Number(dataTime));
        minutePicked = Math.round((Number(dataTime)-hourPicked)*60);
        var hourDisplay = hourPicked;
        var minunteDisplay = minutePicked;
        if(minunteDisplay < 10){
            minunteDisplay = "0"+minunteDisplay;
        }
        if(hourPicked<10){
          hourDisplay = "0"+hourDisplay;
        }
        if(hourPicked<12){
          placeholderTimeString+="AM";
          amPmPicked = "AM";
          placeholderTimeString = (hourDisplay)+":"+minunteDisplay+amPmPicked;
        }else{
          placeholderTimeString+="PM";
          amPmPicked="PM";
          placeholderTimeString = (hourDisplay-12)+":"+minunteDisplay+amPmPicked;
        }

    }else{
      placeholderTimeString = "00:00AM";
    }


    var finishHour = 11;
    var startingHour = 0;








    var timePickerPopup = document.createElement("div");
    timePickerPopup.classList+= "timePickerPopupMainDiv";

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
      clockImg.onclick = function(){
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
      calendarImg.onclick = function(){
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


      function createTimesTable(){


    //create hours rows
          var hoursRow = document.createElement("tr");
          var hoursCell = null;

          for(var i = startingHour, counter = 1;i<finishHour+1;i++, counter++){
            hoursCell = document.createElement('td');
            hoursCell.setAttribute("time", i);
            if(i<10){
              hoursCell.innerText= "0"+i;
            }else{
              hoursCell.innerText= i;
            }

            hoursCell.onclick = function(){
              setHours(this.getAttribute('time'));
            }

            hoursRow.appendChild(hoursCell);

            if (counter == hoursBreakPoint && i!=finishHour) {
              counter = 0;
              hoursTable.appendChild(hoursRow);
              hoursRow = document.createElement("tr");
            }
          }
          hoursTable.appendChild(hoursRow);





    //create minutes rows
          var minutesRow = document.createElement("tr");
          var minutesCell = null;

          for(var i = 0, counter = 1; i< 60; i+=5, counter++){
            minutesCell = document.createElement('td');
            minutesCell.setAttribute("time", i);
            if(i <10){
              minutesCell.innerText = "0"+i;

            }else{
            minutesCell.innerText = i;
            }

            minutesCell.onclick = function(){
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

    amContainer.onclick = function(){
      setAmPm("AM");
      if(hourPicked>11){
        hourPicked = parseInt(hourPicked)-12;
      }
    }
    pmContainer.onclick = function(){
      setAmPm("PM");
      if(hourPicked<12){
        hourPicked = parseInt(hourPicked)+12;
      }
    }
    timeMainContainer.appendChild(amPmContainer);

      }





      function createDatePicker(){
        var calendarPickerDate = new Date();
        var theDateToday = new Date();

        var calendarMainDivSelectorDate = document.createElement('div');
        calendarMainDivSelectorDate.classList.add("calendarPopupDatePicker");



        var topPickerDiv = document.createElement('div');
        topPickerDiv.classList.add('monthCalendarPickerTopDiv');

        var leftArrow  = document.createElement('p');
        leftArrow.classList.add('monthCalendarPickerLeftArrow');
        leftArrow.innerHTML = "&#9668;";
        var rightArrow  = document.createElement('p');
        rightArrow.classList.add('monthCalendarPickerRightArrow');
        rightArrow.innerHTML = "&#9658;";

        var monthName  = document.createElement('p');
        monthName.classList.add('monthCalendarPickerMonthName');
        monthName.innerText = fullMonthsName[calendarPickerDate.getMonth()]+" "+calendarPickerDate.getFullYear();

        topPickerDiv.appendChild(leftArrow);
        topPickerDiv.appendChild(rightArrow);
        topPickerDiv.appendChild(monthName);
        calendarMainDivSelectorDate.appendChild(topPickerDiv);


        var divAroundTable = document.createElement('div');
        divAroundTable.classList.add('dateTableContainer');
        createTable(calendarPickerDate);





        leftArrow.onclick = function(){
        changeMonth(-1);
        }
        rightArrow.onclick = function(){
        changeMonth(1);
        }


        function changeMonth(plusOrMinus){

                    var lastDayOfCurrentMonth = new Date(calendarPickerDate.getFullYear(), calendarPickerDate.getMonth()+1, 0).getDate();
                    var lastDayOfNextMonth = new Date(calendarPickerDate.getFullYear(), calendarPickerDate.getMonth()+2, 0).getDate();
                    var lastDayOfPastMonth = new Date(calendarPickerDate.getFullYear(), calendarPickerDate.getMonth(), 0).getDate();
                    if(plusOrMinus == 1){
                    //next Month
                      if(lastDayOfNextMonth<lastDayOfCurrentMonth){
                      calendarPickerDate.setDate(lastDayOfNextMonth);
                      calendarPickerDate.setMonth(calendarPickerDate.getMonth()+1);
                      }else{
                      calendarPickerDate.setMonth(calendarPickerDate.getMonth()+1);
                      }
                    }else{
                    //past month == -1
                      if(lastDayOfPastMonth<lastDayOfCurrentMonth){
                      calendarPickerDate.setDate(lastDayOfPastMonth);
                      calendarPickerDate.setMonth(calendarPickerDate.getMonth()-1);
                      }else{
                      calendarPickerDate.setMonth(calendarPickerDate.getMonth()-1);

                      }
                    }

                        createTable(calendarPickerDate);

                        monthName.innerText = fullMonthsName[calendarPickerDate.getMonth()]+" "+calendarPickerDate.getFullYear();
        }




         function createTable(theDate){
        divAroundTable.innerHTML = "";
                   var monthNumber = theDate.getMonth();
                   var yearNumber = theDate.getFullYear();

                   var daysInMonth = new Date(yearNumber, monthNumber+1, 0).getDate();

                   var startDayOfMonth = new Date(yearNumber, monthNumber, 1).getDay();
                   var endDayOfMonth = new Date(yearNumber, monthNumber, daysInMonth).getDay();

                   // Determine the number of blank squares before start of month
                       var squares = [];
                       if (startDayOfMonth != 0) {
                         for (var i=0; i<startDayOfMonth; i++) {
                           squares.push("b");
                         }
                       }

                       // Populate the days of the month
                       for (var i=1; i<=daysInMonth; i++) {
                         squares.push(i);
                       }

                       // Determine the number of blank squares after end of month
                       if (endDayOfMonth != 6) {
                         var blanks = endDayOfMonth==0 ? 6 : 6-endDayOfMonth;
                         for (var i=0; i<blanks; i++) {
                           squares.push("b");
                         }
                       }


                   var monthTable = document.createElement("table");
                   monthTable.classList.add("monthCalendarSelectorTable");

                   // First row - Days
                       var monthNameRow = document.createElement("tr");
                       var calendarCell = null;
                       for (var i=0;i<weekDayName.length;i++) {
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

                       for (var i=0; i<totalDays; i++) {
                         monthDateCell = document.createElement("td");
                         if (squares[i]=="b") {
                           monthDateCell.classList.add("blankDate");
                         } else {

                           var wrapperInsideTd = document.createElement("div");
                           wrapperInsideTd.innerHTML = "<div class='monthDateCell'>"+squares[i]+"</div>";
                           wrapperInsideTd.classList.add("wrapperInsideMonthCell");
                           monthDateCell.appendChild(wrapperInsideTd);
                           var newMonthNumber = monthNumber;
                           monthDateCell.setAttribute("date", yearNumber+"/"+(newMonthNumber+1)+"/"+squares[i]);



                           if(theDateToday.getDate() > squares[i] && theDateToday.getMonth() == newMonthNumber && theDateToday.getFullYear() == yearNumber){

                           wrapperInsideTd.classList.add('calendarTextBlocked');
                         }else if(theDateToday.getMonth() >newMonthNumber && theDateToday.getFullYear() == yearNumber){
                           //later month but same year
                             wrapperInsideTd.classList.add('calendarTextBlocked');
                           }else if(theDateToday.getFullYear() > yearNumber){
                         //later year
                         wrapperInsideTd.classList.add('calendarTextBlocked');
                       }else{
                        wrapperInsideTd.classList.add('calendarTextAvailable');
                         monthDateCell.addEventListener("click", function(){

                           var splittedString = this.getAttribute('date').split('/');
                           setDay(splittedString[2]);
                           setYear(splittedString[0]);
                           setMonth(splittedString[1]);
                         });
                       }


                         }
                         calendarRow.appendChild(monthDateCell);
                         if (i!=0 && (i+1)%7==0) {
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
      cancelMainDiv.classList+="timePickerCancelMainDiv";
      var cancelTextInsideDiv = document.createElement('div');
      cancelTextInsideDiv.classList+='timePickerCancelInsideDiv';
      cancelTextInsideDiv.innerHTML = "Cancel";
      cancelMainDiv.appendChild(cancelTextInsideDiv);
      timePickerPopup.appendChild(cancelMainDiv);
      cancelTextInsideDiv.onclick = function(){
        timePickerPopup.remove();
        closePageOverlay();
      }

      // create done button
      var doneMainDiv = document.createElement('div');
      doneMainDiv.classList+="timePickerDoneMainDiv";
      var doneTextInsideDiv = document.createElement('div');
      doneTextInsideDiv.classList+='timePickerDoneInsideDiv';
      doneTextInsideDiv.innerHTML = "Done";
      doneMainDiv.appendChild(doneTextInsideDiv);
      timePickerPopup.appendChild(doneMainDiv);
      doneTextInsideDiv.onclick = function(){
        setInputValue();
        timePickerPopup.remove();
        closePageOverlay();
      }




    function setMinutes(minuteVar){
      minutePicked = minuteVar;
      setPlaceholderHeaderTime();
    }
    function setHours(hourVar){
      hourPicked = hourVar
      setPlaceholderHeaderTime();
    }
    function setAmPm(choicePicked){
      amPmPicked = choicePicked;
      setPlaceholderHeaderTime();
    }
    function setDay(choicePicked){
      dayPicked = choicePicked;
      setPlaceholderHeaderTime();
    }
    function setMonth(choicePicked){
      monthPicked = choicePicked;
      setPlaceholderHeaderTime();
    }
    function setYear(choicePicked){
      yearPicked = choicePicked;
      setPlaceholderHeaderTime();
    }

    function setPlaceholderHeaderTime(){
      var timeString = "";
      var dateString = "";
      if(!hourPicked){
        timeString+="00:";
      }else{
        if(hourPicked>11){
          timeString+=(parseInt(hourPicked)-12)+":";
        }else{
          timeString+=hourPicked+":";
        }
      }
      if(!minutePicked){
        timeString+="00";
      }else{
        timeString+=minutePicked;
      }
      if(!amPmPicked){
        timeString+="AM";
      }else{
        timeString+=amPmPicked;
      }

      if(!monthPicked){
        dateString+=monthsName[new Date().getMonth()];
      }else{
        dateString+=monthsName[monthPicked-1];
      }

      if(!dayPicked){
        dateString+= " "+new Date().getDate();
      }else{
        dateString+=" "+dayPicked;
      }

      if(!yearPicked){
        dateString+=", "+new Date().getFullYear();
      }else{
        dateString+=", "+yearPicked;
      }
      placeholderHeaderTime.innerText = timeString;
      placeholderHeaderDate.innerText = dateString;
    }





    function destroyTimePopup(){
    timePickerPopup.remove();
    closePageOverlay();
    hourPicked = false;
    minutePicked = false;

    }
    function closePageOverlay(){
      closeTimePopup();
    }


    function setInputValue(){
      var timeString = "";
      var dataDateAttribute="";
      var dataTimeAttribute="";
      var attributeHour=0;
      if(!yearPicked){
        timeString+="2019/";
        dataDateAttribute+="2019/";
      }else{
        timeString+=yearPicked+"/";
        dataDateAttribute+=yearPicked+"/";
      }
      if(!monthPicked){
        timeString+="01/";
        dataDateAttribute+="01/";
      }else{
        timeString+=monthPicked+"/";
        dataDateAttribute+=monthPicked+"/";
      }
      if(!dayPicked){
        timeString+="01 ";
        dataDateAttribute+="01";
      }else{
        timeString+=dayPicked+" ";
        dataDateAttribute+=dayPicked;
      }

      if(!hourPicked){
        timeString+="00:";
      }else{
        if(!amPmPicked){
          attributeHour=parseInt(hourPicked);
          if(parseInt(hourPicked)>11){
            timeString+=(parseInt(hourPicked)-12);
          }else{
            timeString+=hourPicked;
          }
        }else if(amPmPicked=="AM"){
          attributeHour=parseInt(hourPicked);
          if(parseInt(hourPicked)>11){
            timeString+=(parseInt(hourPicked)-12);
          }else{
            timeString+=hourPicked;
          }
        }else{
          //is pm
          attributeHour=(parseInt(hourPicked));
          if(parseInt(hourPicked)>11){
            timeString+=(parseInt(hourPicked)-12);
          }else{
            timeString+=hourPicked;
          }
        }
        timeString+=":";
      }
      if(!minutePicked){
        timeString+="00";
      }else{
        timeString+=minutePicked;
        attributeHour+=((parseInt(minutePicked)/60));
      }
      dataTimeAttribute = attributeHour;
      if(!amPmPicked){
        timeString+="AM";
      }else{
        timeString+=amPmPicked;
      }

      console.log(timeString);
      inputField.value = timeString;
      inputField.setAttribute('data-date', dataDateAttribute);
      inputField.setAttribute('data-time', dataTimeAttribute);

      checkValidityInput(inputField);

    }

        createDatePicker();
        createTimesTable();

        divToPutPickerInto.appendChild(timePickerPopup);


  }




  function checkValidityInput(inputElement){

    if(inputElement.classList.contains('existingStoreAbsenceStart')){
      var existingEndInput = inputElement.parentNode.getElementsByClassName('existingStoreAbsenceEnd')[0];
      if(existingEndInput.getAttribute('data-date') == -1){
        setInputValuesFromInput(inputElement, existingEndInput);
      }else{
        var startRelativeToEnd = compareStartToEnd(inputElement, existingEndInput);
        if(startRelativeToEnd==1){
          setInputValuesFromInput(inputElement, existingEndInput);
        }
      }
    }else if(inputElement.classList.contains('existingStoreAbsenceEnd')){
      console.log('yooo');
      var existingStartInput = inputElement.parentNode.getElementsByClassName('existingStoreAbsenceStart')[0];
      if(existingStartInput.getAttribute('data-date') == -1){
        setInputValuesFromInput(inputElement, existingStartInput);
      }else{
        var startRelativeToEnd = compareStartToEnd(existingStartInput, inputElement);
        if(startRelativeToEnd==1){
          setInputValuesFromInput(inputElement, existingStartInput);
          console.log('nope');
        }
      }
    }else if(inputElement.classList.contains('newStoreAbsenceEnd')){
      var newStartInput = inputElement.parentNode.getElementsByClassName('newStoreAbsenceStart')[0];
      if(newStartInput.getAttribute('data-date') == -1){
        setInputValuesFromInput(inputElement, newStartInput);
      }else{
        var startRelativeToEnd = compareStartToEnd(newStartInput, inputElement);
        if(startRelativeToEnd==1){
          setInputValuesFromInput(inputElement, newStartInput);
        }
      }
    }else if(inputElement.classList.contains('newStoreAbsenceStart')){
      var newEndInput = inputElement.parentNode.getElementsByClassName('newStoreAbsenceEnd')[0];
      if(newEndInput.getAttribute('data-date') == -1){
        setInputValuesFromInput(inputElement, newEndInput);
      }else{
        var startRelativeToEnd = compareStartToEnd(inputElement, newEndInput);
        if(startRelativeToEnd==1){
          setInputValuesFromInput(inputElement, newEndInput);
        }
      }
    }

  }

  function compareStartToEnd(startInput, endInput){
    var startDate = new Date(startInput.getAttribute('data-date'));
    var startTime = parseFloat(startInput.getAttribute('data-time'));
    var endDate = new Date(endInput.getAttribute('data-date'));
    var endTime = parseFloat(endInput.getAttribute('data-time'));
    var datesCompared = compareStartDateToEndDate(startDate, endDate);
    if(datesCompared==1){

      return 1;
    }else if(datesCompared==0){
      if(startTime == endTime){
        return 0;
      }else if(startTime < endTime){
        return -1;
      }else{
        return 1;
      }
    }else{
      return -1;
    }

  }

  function setInputValuesFromInput(sourceInput, targetInput){
    targetInput.setAttribute('data-date', sourceInput.getAttribute('data-date'));
    targetInput.setAttribute('data-time', sourceInput.getAttribute('data-time'));
    targetInput.value = sourceInput.value;
  }

function compareStartDateToEndDate(startDate, endDate){
  var startDay = parseInt(startDate.getDate());
  var startMonth = parseInt(startDate.getMonth());
  var startYear = parseInt(startDate.getFullYear());

  var endDay = parseInt(endDate.getDate());
  var endMonth = parseInt(endDate.getMonth());
  var endYear = parseInt(endDate.getFullYear());


  if(startDay == endDay && startMonth==startMonth && startYear==startYear){
    return 0;
  }else if(startMonth==endMonth && startYear == endYear){
    if(startDay<endDay){
      return -1;
    }else{
      return 1;
    }
  }else if(startYear == endYear){
    if(startMonth<endMonth){
      return -1;
    }else{
      return 1;
    }
  }else{
    if(startYear<endYear){
      return -1;
    }else{
      return 1;
    }
  }
}
