$(document).ready(function () {

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let monthCounter;
    let yearCounter;

    let hasScheduleArr;

    Date.prototype.getMonthName = function () {
        return months[this.getMonth()];
    };
    Date.prototype.getDayName = function () {
        return days[this.getDay()];
    };

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }


    $(window).scroll(function () {
        if ($(document).scrollTop() > 20) {
            $('navBar').addClass('shrinkDown');
        }
        else {
            $('#navBar').removeClass('shrinkDown');
        }
    })

    //POPULATES STATISTICS AREA
    function populateStats() {
        let jwt = localStorage.getItem('authToken')
        var tokens = jwt.split('.')


        let bmiValue = 0;
        let bmrValue = 0;
        let scheduleValue = 0;
        let taskValue = 0;

        getUserInfo(function (e) {
            if (e != 'null') {
                if (e.bmiResults != 'null') {
                    bmiValue = e.bmiResults;
                }

                if (e.bmrResults != 'null') {
                    bmrValue = e.bmrResults;
                }

                if (e.schedule != 'null') {
                    scheduleValue = e.schedule.length
                }

                if (e.tasks != 'null') {
                    taskValue = e.tasks.length;
                }
            }

            if (bmiValue == 0 && bmrValue == 0 && scheduleValue == 0 && taskValue == 0) {
                $('#statsOverview').html('<p>Currently no stats available!</p>')
            }
            else {
                if (bmiValue != 0) {
                    const bmiMsg = `<h2>Current Bmi: ${bmiValue}</h2>`;

                    $('#statsOverview').append(bmiMsg)
                }

                if (bmrValue != 0) {
                    const bmrMsg = `<h2>Current Bmr: ${bmrValue}</h2>`;

                    $('#statsOverview').append(bmrMsg)
                }

                if (taskValue != 0) {
                    const taskMsg = `<h2>Tasks Made: ${taskValue}</h2>`;

                    $('#statsOverview').append(taskMsg)
                }

                if (scheduleValue != 0) {
                    const scheduleMsg = `<h2>Schedules Made: ${scheduleValue}</h2>`;

                    $('#statsOverview').append(scheduleMsg)
                }
            }
        })
    }

    //GENERATES CALENDAR FOR THE SCHEDULE
    function generateCalendarSchedule() {
        getUserInfo(function (user) {
            let date = new Date()
            let monthToday
            let yearToday
            let firstDayMonth = new Date(date.getFullYear(), date.getMonth(), 1)

            monthCounter = date.getMonth() + 1;
            yearCounter = date.getFullYear()

            monthToday = date.getMonthName()
            yearToday = date.getFullYear()

            let blocksDay = ""

            let tempArr = user.schedule
            let asnDate

            //GENERATES EMPTY SPACES
            for (let i = 0; i < firstDayMonth.getDay(); i++) {
                blocksDay += `<li style="display: inline-block; height: 24px"></li>`
            }

            //GENERATES FILLED SPACES
            for (let i = 0; i < daysInMonth(monthCounter - 1, yearCounter); ++i) {
                blocksDay += `<li class="filledDay" id="dayOfTheMonth${i + 1}">${i + 1}</li>`
            }

            $('#calendarMonth').html(`${monthToday}<br><span="font-size:18px">${yearToday}</span>`)
            $('#daysOfMonth').append(blocksDay)

            //FOR LOOP THAT HIGHLIGHTS FILLED SPOTS
            for (let i = 0; i < daysInMonth(monthCounter - 1, yearCounter); ++i) {
                asnDate = `${monthCounter}/${i + 1}/${yearCounter}`
                console.log(asnDate);

                for (let j = 0; j < tempArr.length; ++j) {
                    if (asnDate == tempArr[j].date) {
                        $(`#dayOfTheMonth${i + 1}`).addClass("hasSchedule")
                    }
                }
            }

            //GO TO PREVIOUS MONTH
            $('#prevBtn').click(function (e) {
                if (monthCounter != 1) {
                    blocksDay = '';
                    $('#daysOfMonth').html('')

                    monthCounter--;

                    let firstDayMonth = new Date(yearCounter, monthCounter - 1, 1)

                    //BLANK SPACE
                    for (let i = 0; i < firstDayMonth.getDay(); i++) {
                        blocksDay += `<li style="display: inline-block; height: 24px"></li>`
                    }

                    monthToday = months[(monthCounter - 1)]
                    yearToday = yearCounter

                    //FILLED SPACE
                    for (let i = 0; i < daysInMonth(monthCounter - 1, yearCounter); ++i) {
                        blocksDay += `<li class="filledDay" id="dayOfTheMonth${i + 1}">${i + 1}</li>`
                    }

                    $('#calendarMonth').html(`${monthToday}<br><span="font-size:18px">${yearToday}</span>`)
                    $('#daysOfMonth').html(blocksDay)

                    for (let i = 0; i < daysInMonth(monthCounter - 1, yearCounter); ++i) {
                        asnDate = `${monthCounter}/${i + 1}/${yearCounter}`
                        console.log(asnDate)

                        for (let j = 0; j < tempArr.length; ++j) {
                            if (asnDate == tempArr[j].date) {
                                $(`#dayOfTheMonth${i + 1}`).addClass("hasSchedule")
                            }
                        }
                    }
                }
                else {
                    blocksDay = '';

                    monthCounter = 12
                    yearCounter--;

                    let firstDayMonth = new Date(yearCounter, monthCounter - 1, 1)

                    for (let i = 0; i < firstDayMonth.getDay(); i++) {
                        blocksDay += `<li style="display: inline-block; height: 24px"></li>`
                    }

                    monthToday = months[(monthCounter - 1)]
                    yearToday = yearCounter

                    for (let i = 0; i < daysInMonth(monthCounter - 1, date.getFullYear()); ++i) {
                        blocksDay += `<li class="filledDay" id="dayOfTheMonth${i + 1}">${i + 1}</li>`
                    }

                    $('#calendarMonth').html(`${monthToday}<br><span="font-size:18px">${yearToday}</span>`)
                    $('#daysOfMonth').html(blocksDay)

                    for (let i = 0; i < daysInMonth(monthCounter - 1, yearCounter); ++i) {
                        asnDate = `${monthCounter}/${i + 1}/${yearCounter}`

                        for (let j = 0; j < tempArr.length; ++j) {
                            if (asnDate == tempArr[j].date) {
                                $(`#dayOfTheMonth${i + 1}`).addClass("hasSchedule")
                            }
                        }
                    }


                }
            })

            //GO TO NEXT MONTH
            $('#nextBtn').click(function (e) {

                if (monthCounter != 12) {
                    blocksDay = '';

                    monthCounter++;

                    let firstDayMonth = new Date(yearCounter, monthCounter - 1, 1)

                    for (let i = 0; i < firstDayMonth.getDay(); i++) {
                        blocksDay += `<li style="display: inline-block; height: 24px"></li>`
                    }

                    monthToday = months[(monthCounter - 1)]
                    yearToday = yearCounter

                    for (let i = 0; i < daysInMonth(monthCounter - 1, yearCounter); ++i) {
                        blocksDay += `<li class="filledDay" id="dayOfTheMonth${i + 1}">${i + 1}</li>`
                    }

                    $('#calendarMonth').html(`${monthToday}<br><span="font-size:18px">${yearToday}</span>`)
                    $('#daysOfMonth').html(blocksDay)

                    for (let i = 0; i < daysInMonth(monthCounter - 1, yearCounter); ++i) {
                        asnDate = `${monthCounter}/${i + 1}/${yearCounter}`

                        for (let j = 0; j < tempArr.length; ++j) {
                            if (asnDate == tempArr[j].date) {
                                $(`#dayOfTheMonth${i + 1}`).addClass("hasSchedule")
                            }
                        }
                    }

                }
                else {
                    blocksDay = '';
                    monthCounter = 1;
                    yearCounter++;

                    let firstDayMonth = new Date(yearCounter, monthCounter - 1, 1)

                    for (let i = 0; i < firstDayMonth.getDay(); i++) {
                        blocksDay += `<li style="display: inline-block; height: 24px"></li>`
                    }

                    monthToday = months[(monthCounter - 1)]
                    yearToday = yearCounter

                    for (let i = 0; i < daysInMonth(monthCounter - 1, yearCounter); ++i) {
                        blocksDay += `<li class="filledDay" id="dayOfTheMonth${i + 1}">${i + 1}</li>`
                    }

                    $('#calendarMonth').html(`${monthToday}<br><span="font-size:18px">${yearToday}</span>`)
                    $('#daysOfMonth').html(blocksDay)

                    for (let i = 0; i < daysInMonth(monthCounter - 1, yearCounter); ++i) {
                        asnDate = `${monthCounter}/${i + 1}/${yearCounter}`

                        for (let j = 0; j < tempArr.length; ++j) {
                            if (asnDate == tempArr[j].date) {
                                $(`#dayOfTheMonth${i + 1}`).addClass("hasSchedule")
                            }
                        }
                    }

                }
            })
        })
    }

    // CHECKS IF THERE ARE TASKS TODAY, IF SO POPULATE
    function checkAndPopulateTask() {
        getUserInfo(function (user) {

            let date = new Date()
            let monthToday = date.getMonth()
            let yearToday = date.getFullYear()
            let dayToday = date.getDay();
            let tempArr = user.tasks
            let ifAvailable = false;
            let temp = `${monthToday + 1}/${dayToday}/${yearToday}`
            let txtMsg;

            console.log(temp)

            console.log(tempArr)

            for (let i = 0; i < tempArr.length; ++i) {
                if (temp == tempArr[i].date) {
                    ifAvailable = true;
                    txtMsg = tempArr[i].description
                    break;
                }
            }

            if (ifAvailable) {
                $('#todayNo').append(txtMsg);
            } else {
                txtMsg = `You have no tasks today!
                You are free to do whatever you want!`
                $('#todayNo').append(txtMsg);
            }

        })
    }

    function viewScheduleDetail()
    {
      getUserInfo(function(user){

            let tempArr = user.schedule
            $('#daysOfMonth').on('click', '.hasSchedule', function(e){
                // console.log('HAI')
                let numPart = e.target.id;
                let tempDescription;
                numPart = numPart.slice(13)

                let tempDate = `${monthCounter}/${numPart}/${yearCounter}`
                console.log(tempDate)

                for(i = 0; i < user.length; ++i){
                    if(tempDate == user.schedule[i].date){
                        tempDescription = user.schedule[i].description;
                        break;
                    }
                }

                

            })
        })  
        
    }

    //GETS USER INFO
    function getUserInfo(callback) {
        let jwt = localStorage.getItem('authToken')
        var tokens = jwt.split('.')

        const query =
        {
            id: JSON.parse(atob(tokens[1])).user.id,
        }

        const settings =
        {
            url: '/api/users',
            data: query,
            contentType: 'application/json',
            dataType: 'json',
            type: 'GET',
            success: callback,
            error: function (e) {
                console.log('ERROR!!AT GET REQUEST')
            }
        }

        $.ajax(settings)
    }

    $('#testBtn').click(function (e) {
        console.log('hia')
        // console.log(JSON.parse(atob(tokens[1])).user.bmiResults)
        getUserInfo(function (e) {
            console.log("SUCCESS!")
        })

    })

    // INITIALIZATION
    function init() {
        $(populateStats)
        $(generateCalendarSchedule)
        $(checkAndPopulateTask)
        $(viewScheduleDetail)
    }

    $(init)
});

