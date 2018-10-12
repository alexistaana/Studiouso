$(document).ready(function (e) {

    //ARRAYS USED FOR MONTH/DAY NAMES
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    //COUNTERS
    let monthCounter;
    let yearCounter;

    //ARR FOR STORAGE OF SCHEDULES
    let hasScheduleArr;

    //FUNCTIONS TO GET NAMES OF MONTH/DAY
    Date.prototype.getMonthName = function () {
        return months[this.getMonth()];
    };
    Date.prototype.getDayName = function () {
        return days[this.getDay()];
    };

    //RETURNS THE # OF DAYS IN MONTH
    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

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
            let tempArrTask = user.tasks

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

                for (let j = 0; j < tempArr.length; ++j) {
                    if (asnDate == tempArr[j].date) {
                        $(`#dayOfTheMonth${i + 1}`).addClass("hasSchedule")
                    }
                }
                for (let j = 0; j < tempArrTask.length; ++j) {
                    if (asnDate == tempArrTask[j].date) {
                        $(`#dayOfTheMonth${i + 1}`).addClass("hasTask")

                    }
                }
            }

            //CHECKS IF IT HAS BOTH SCHEDULE AND TASK
            for (let i = 0; i < daysInMonth(monthCounter - 1, yearCounter); ++i) {
                asnDate = `${monthCounter}/${i + 1}/${yearCounter}`
                if ($(`#dayOfTheMonth${i + 1}`).hasClass("hasSchedule") && $(`#dayOfTheMonth${i + 1}`).hasClass("hasTask")) {
                    $(`#dayOfTheMonth${i + 1}`).removeClass("hasSchedule").removeClass("hasTask").addClass("hasBoth");
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

                        for (let j = 0; j < tempArr.length; ++j) {
                            if (asnDate == tempArr[j].date) {
                                $(`#dayOfTheMonth${i + 1}`).addClass("hasSchedule")
                            }
                        }
                        for (let j = 0; j < tempArrTask.length; ++j) {
                            if (asnDate == tempArrTask[j].date) {
                                $(`#dayOfTheMonth${i + 1}`).addClass("hasTask")

                            }
                        }
                    }

                    //CHECKS IF IT HAS BOTH SCHEDULE AND TASK
                    for (let i = 0; i < daysInMonth(monthCounter - 1, yearCounter); ++i) {
                        asnDate = `${monthCounter}/${i + 1}/${yearCounter}`
                        if ($(`#dayOfTheMonth${i + 1}`).hasClass("hasSchedule") && $(`#dayOfTheMonth${i + 1}`).hasClass("hasTask")) {
                            $(`#dayOfTheMonth${i + 1}`).removeClass("hasSchedule").removeClass("hasTask").addClass("hasBoth");
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
                        for (let j = 0; j < tempArrTask.length; ++j) {
                            if (asnDate == tempArrTask[j].date) {
                                $(`#dayOfTheMonth${i + 1}`).addClass("hasTask")

                            }
                        }
                    }

                    //CHECKS IF IT HAS BOTH SCHEDULE AND TASK
                    for (let i = 0; i < daysInMonth(monthCounter - 1, yearCounter); ++i) {
                        asnDate = `${monthCounter}/${i + 1}/${yearCounter}`
                        if ($(`#dayOfTheMonth${i + 1}`).hasClass("hasSchedule") && $(`#dayOfTheMonth${i + 1}`).hasClass("hasTask")) {
                            $(`#dayOfTheMonth${i + 1}`).removeClass("hasSchedule").removeClass("hasTask").addClass("hasBoth");
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
                        for (let j = 0; j < tempArrTask.length; ++j) {
                            if (asnDate == tempArrTask[j].date) {
                                $(`#dayOfTheMonth${i + 1}`).addClass("hasTask")

                            }
                        }
                    }

                    //CHECKS IF IT HAS BOTH SCHEDULE AND TASK
                    for (let i = 0; i < daysInMonth(monthCounter - 1, yearCounter); ++i) {
                        asnDate = `${monthCounter}/${i + 1}/${yearCounter}`
                        if ($(`#dayOfTheMonth${i + 1}`).hasClass("hasSchedule") && $(`#dayOfTheMonth${i + 1}`).hasClass("hasTask")) {
                            $(`#dayOfTheMonth${i + 1}`).removeClass("hasSchedule").removeClass("hasTask").addClass("hasBoth");
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
                        for (let j = 0; j < tempArrTask.length; ++j) {
                            if (asnDate == tempArrTask[j].date) {
                                $(`#dayOfTheMonth${i + 1}`).addClass("hasTask")

                            }
                        }
                    }

                    //CHECKS IF IT HAS BOTH SCHEDULE AND TASK
                    for (let i = 0; i < daysInMonth(monthCounter - 1, yearCounter); ++i) {
                        asnDate = `${monthCounter}/${i + 1}/${yearCounter}`
                        if ($(`#dayOfTheMonth${i + 1}`).hasClass("hasSchedule") && $(`#dayOfTheMonth${i + 1}`).hasClass("hasTask")) {
                            $(`#dayOfTheMonth${i + 1}`).removeClass("hasSchedule").removeClass("hasTask").addClass("hasBoth");
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
            let dayToday = date.getDate();
            let tempArr = user.tasks
            let ifAvailable = false;
            let temp = `${monthToday + 1}/${dayToday}/${yearToday}`
            let txtMsg;

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

    //FUNCTION TO VIEW SCHEDULE
    function viewScheduleDetail() {
        getUserInfo(function (user) {

            let tempArr = user.schedule
            $('#daysOfMonth').on('click', '.hasSchedule', function (e) {
                let numPart = e.target.id;
                let tempDescription;
                let ifFound = false;
                numPart = numPart.slice(13)

                let tempDate = `${monthCounter}/${numPart}/${yearCounter}`

                for (i = 0; i < user.schedule.length; ++i) {
                    if (tempDate == user.schedule[i].date) {
                        tempDescription = user.schedule[i].description;
                        ifFound = true;
                        break;
                    }
                }

                if (ifFound) {
                    $('#scheduleMsg').html('')
                    $('#scheduleMsg').prepend(`<h1>${tempDate}</h1> <h1>Schedule</h1>`)
                    $('#scheduleMsg').append(tempDescription)
                    $('#scheduleMsgDiv').show(500)
                }
            })
        })

        //CLOSES schedule BTN  
        $('#closeBtn').click(function (e) {
            $('#scheduleMsgDiv').hide(500)
        })
    }

    function viewTaskDetail() {
        getUserInfo(function (user) {

            let tempArr = user.tasks
            $('#daysOfMonth').on('click', '.hasTask', function (e) {
                let numPart = e.target.id;
                let tempDescription;
                let ifFound = false;
                numPart = numPart.slice(13)

                let tempDate = `${monthCounter}/${numPart}/${yearCounter}`

                for (i = 0; i < user.tasks.length; ++i) {
                    if (tempDate == user.tasks[i].date) {
                        tempDescription = user.tasks[i].description;
                        ifFound = true;
                        break;
                    }
                }

                if (ifFound) {
                    $('#scheduleMsg').html('')
                    $('#scheduleMsg').prepend(`<h1>${tempDate}</h1> <h1>Task</h1>`)

                    $('#scheduleMsg').append(tempDescription)
                    $('#scheduleMsgDiv').show(500)
                }
            })
        })

        //CLOSES schedule BTN  
        $('#closeBtn').click(function (e) {
            $('#scheduleMsgDiv').hide(500)
        })
    }

    function viewScheduleAndTaskDetail() {
        getUserInfo(function (user) {

            let tempArr = user.schedule
            $('#daysOfMonth').on('click', '.hasBoth', function (e) {
                let numPart = e.target.id;
                let tempDescription;
                let tempDescriptionTask;
                let ifFound = false;
                let ifFoundTask = false;
                
                numPart = numPart.slice(13)

                let tempDate = `${monthCounter}/${numPart}/${yearCounter}`

                for (i = 0; i < user.schedule.length; ++i) {
                    if (tempDate == user.schedule[i].date) {
                        tempDescription = user.schedule[i].description;
                        ifFound = true;
                        break;
                    }
                }

                for (i = 0; i < user.tasks.length; ++i) {
                    if (tempDate == user.tasks[i].date) {
                        tempDescriptionTask = user.tasks[i].description;
                        ifFoundTask = true;
                        break;
                    }
                }

                if (ifFound) {
                    $('#scheduleMsg').html('')
                    $('#scheduleMsg').prepend(`<h1>${tempDate}</h1> <h1>Schedule</h1>`)
                    $('#scheduleMsg').append(tempDescription)
                    $('#scheduleMsg').append(`<h1>Task</h1>`)
                    $('#scheduleMsg').append(tempDescriptionTask)
                    $('#scheduleMsgDiv').show(500)
                }
            })
        })

        //CLOSES schedule BTN  
        $('#closeBtn').click(function (e) {
            $('#scheduleMsgDiv').hide(500)
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
                window.alert('FAILED TO GET USER INFO! UNEXPECTED ERROR, PLEASE CONTACT DEVELOPER')
            }
        }

        $.ajax(settings)
    }

    // INITIALIZATION
    function init() {
        $(populateStats)
        $(generateCalendarSchedule)
        $(checkAndPopulateTask)
        $(viewScheduleDetail)
        $(viewTaskDetail)
        $(viewScheduleAndTaskDetail)
    }

    $(init)
});

