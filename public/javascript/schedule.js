$(document).ready(function () {

    //ARRAYS USED FOR MONTH/DAY NAMES
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    //COUNTERS
    let monthCounter;
    let yearCounter;

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

    //FUNCTION TO CREATE CALENDAR
    function createCalender() {
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
            let dayOfWeek = false

            let asnDate
            let tempArr = user.schedule

            //GENERATES EMPTY SPACES
            for (let i = 0; i < firstDayMonth.getDay(); i++) {
                blocksDay += `<li style="display: inline-block; height: 24px"></li>`
            }

            //GENERATES FILLED SPACES (NUMBERED SPACES) 
            for (let i = 0; i < daysInMonth(monthCounter, yearCounter); ++i) {
                blocksDay += `<li class="filledDay" id="dayOfTheMonth${i + 1}">${i + 1}</li>`
            }

            $('#calendarMonth').html(`${monthToday}<br><span="font-size:18px">${yearToday}</span>`)
            $('#daysOfMonth').append(blocksDay)

            //FOR LOOP THAT HIGHLIGHTS FILLED SPOTS (NUMBERED SPOTS)
            for (let i = 0; i < daysInMonth(monthCounter, yearCounter); ++i) {
                asnDate = `${monthCounter}/${i + 1}/${yearCounter}`

                for (let j = 0; j < tempArr.length; ++j) {
                    if (asnDate == tempArr[j].date) {
                        $(`#dayOfTheMonth${i + 1}`).addClass("hasSchedule")
                    }
                }
            }


            $('#prevBtn').click(function (e) {
                if (monthCounter != 1) {
                    blocksDay = '';

                    monthCounter--;

                    let firstDayMonth = new Date(yearCounter, monthCounter - 1, 1)

                    //BLANK SPACE
                    for (let i = 0; i < firstDayMonth.getDay(); i++) {
                        blocksDay += `<li style="display: inline-block; height: 24px"></li>`
                    }

                    monthToday = months[(monthCounter - 1)]
                    yearToday = yearCounter

                    //FILLED SPACE
                    for (let i = 0; i < daysInMonth(monthCounter, yearCounter); ++i) {
                        blocksDay += `<li class="filledDay" id="dayOfTheMonth${i + 1}">${i + 1}</li>`
                    }

                    $('#calendarMonth').html(`${monthToday}<br><span="font-size:18px">${yearToday}</span>`)
                    $('#daysOfMonth').html(blocksDay)

                    //FOR LOOP THAT HIGHLIGHTS FILLED SPOTS
                    for (let i = 0; i < daysInMonth(monthCounter, yearCounter); ++i) {
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

                    monthCounter = 12
                    yearCounter--;

                    let firstDayMonth = new Date(yearCounter, monthCounter - 1, 1)

                    for (let i = 0; i < firstDayMonth.getDay(); i++) {
                        blocksDay += `<li style="display: inline-block; height: 24px"></li>`
                    }

                    monthToday = months[(monthCounter - 1)]
                    yearToday = yearCounter

                    for (let i = 0; i < daysInMonth(monthCounter, yearCounter); ++i) {
                        blocksDay += `<li class="filledDay" id="dayOfTheMonth${i + 1}">${i + 1}</li>`
                    }

                    $('#calendarMonth').html(`${monthToday}<br><span="font-size:18px">${yearToday}</span>`)
                    $('#daysOfMonth').html(blocksDay)

                    //FOR LOOP THAT HIGHLIGHTS FILLED SPOTS
                    for (let i = 0; i < daysInMonth(monthCounter, yearCounter); ++i) {
                        asnDate = `${monthCounter}/${i + 1}/${yearCounter}`

                        for (let j = 0; j < tempArr.length; ++j) {
                            if (asnDate == tempArr[j].date) {
                                $(`#dayOfTheMonth${i + 1}`).addClass("hasSchedule")
                            }
                        }
                    }

                }
            })

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

                    for (let i = 0; i < daysInMonth(monthCounter, yearCounter); ++i) {
                        blocksDay += `<li class="filledDay" id="dayOfTheMonth${i + 1}">${i + 1}</li>`
                    }

                    $('#calendarMonth').html(`${monthToday}<br><span="font-size:18px">${yearToday}</span>`)
                    $('#daysOfMonth').html(blocksDay)

                    //FOR LOOP THAT HIGHLIGHTS FILLED SPOTS
                    for (let i = 0; i < daysInMonth(monthCounter, yearCounter); ++i) {
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

                    for (let i = 0; i < daysInMonth(monthCounter, yearCounter); ++i) {
                        blocksDay += `<li class="filledDay" id="dayOfTheMonth${i + 1}">${i + 1}</li>`
                    }

                    $('#calendarMonth').html(`${monthToday}<br><span="font-size:18px">${yearToday}</span>`)
                    $('#daysOfMonth').html(blocksDay)

                    //FOR LOOP THAT HIGHLIGHTS FILLED SPOTS
                    for (let i = 0; i < daysInMonth(monthCounter, yearCounter); ++i) {
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

    //WATCHES DATE BUTTONS
    function watchDateBtn() {
        getUserInfo(function (user) {
            $('#daysOfMonth').on('click', '.filledDay', function (e) {
                let checkIf = false;
                let numPart = e.target.id;
                numPart = numPart.slice(13)
                let todayDate = new Date();
                let tempDate = `${monthCounter}/${numPart}/${yearCounter}`
                localStorage.setItem('dateOfBtn', tempDate);

                tempDate = ``

                let tempArr = user.schedule

                for (let i = 0; i < tempArr.length; ++i) {
                    if (tempArr[i].date == localStorage.getItem('dateOfBtn')) {
                        checkIf = true;
                        break;
                    }
                }

                if (!checkIf) {
                    $('#schedule-form').show(500);
                }
                else if (checkIf) {
                    // alert("SELECTED DAY ALREADY HAS A SCHEDULE, PLEASE CHOOSE ANOTHER DATE")
                    $('#schedule-form-update').show(500);
                }

            });
        })


        //CLOSES schedule BTN  
        $('#cancelSchedule').click(function (e) {
            $('#schedule-form').hide(500, function (e) {
                $('#schedSubBtn').show();
                $('#postMsg').hide()
            });
        })

        $('#cancelScheduleUpdate').click(function (e) {
            $('#schedule-form-update').hide(500, function (e) {
                $('#schedSubBtnUpdate').show();
                $('#updateMsg').hide();
            })
        })
    }

    //WATCHES SUBMIT SCHEDULE BTN
    function watchSubmitSchedule() {
        $('#schedule-form').submit(event => {
            event.preventDefault();
            const targetOne = $(event.currentTarget).find('#message-form-schedule')

            const scheduleMsg = targetOne.val()

            targetOne.val('')

            postScheduleRequest(scheduleMsg, function (e) {
                $('#calendarMonth').html('')
                $('#daysOfMonth').html('')
                $('#schedule-form').hide(500)
                createCalender();
            })
        })
    }

    //WATCHES SUBMIT AND UPDATE BTN
    function watchSubmitUpdateSchedule() {
        $('#schedule-form-update').submit(event => {
            event.preventDefault();
            const targetOne = $(event.currentTarget).find('#message-form-schedule-update')

            const scheduleMsg = targetOne.val()

            targetOne.val('')

            updateScheduleCall(scheduleMsg, function (e) {
                $('#calendarMonth').html('')
                $('#daysOfMonth').html('')
                $('#schedule-form-update').hide(500)
                createCalender();
            })
        })
    }

    //WATCHES DELETE BTN
    function watchDeleteBtn() {
        $('#deleteBtn').click(event => {
            event.preventDefault();

            deleteScheduleCall(function (e) {
                $('#calendarMonth').html('')
                $('#daysOfMonth').html('')
                $('#schedule-form-update').hide(500)
                createCalender();
            })
        })
    }

    //API REQUEST TO GET USER INFO
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

    //API REQUEST FOR SCHEDULE
    function postScheduleRequest(schedule, callback) {
        let jwt = localStorage.getItem('authToken')
        var tokens = jwt.split('.')

        const query =
        {
            id: JSON.parse(atob(tokens[1])).user.id,
            description: schedule,
            date: localStorage.getItem('dateOfBtn')
        }

        localStorage.removeItem('date   OfBtn');

        const settings =
        {
            url: '/post/schedule',
            data: JSON.stringify(query),
            contentType: 'application/json',
            dataType: 'json',
            type: 'PUT',
            success: callback,
            error: function (e) {
                window.alert('FAILED TO STORE SCHEDULE! PLEASE TRY AGAIN OR CONTACT DEVELOPER IF PROBLEM PERSISTS!')
            }
        }

        $.ajax(settings)
    }

    //API REQUEST FOR UPDATE
    function updateScheduleCall(schedule, callback) {
        let jwt = localStorage.getItem('authToken')
        var tokens = jwt.split('.')

        // console.log(localStorage.getItem('dateOfBtn'))

        const query =
        {
            id: JSON.parse(atob(tokens[1])).user.id,
            date: localStorage.getItem('dateOfBtn'),
            description: schedule,
        }

        localStorage.removeItem('dateOfBtn');

        console.log(schedule);
        console.log(query.date);
        console.log(query.id)
        // console.log("API CLAL")

        const settings =
        {
            url: '/put/schedule',
            data: JSON.stringify(query),
            // data: query,
            contentType: 'application/json',
            dataType: 'json',
            type: 'PUT',
            success: callback,
            error: function (e) {
                window.alert('FAILED TO UPDATE SCHEDULE! PLEASE TRY AGAIN OR CONTACT DEVELOPER IF PROBLEM PERSISTS!')
            }
        }

        $.ajax(settings)
    }

    //API REQUEST FOR DELETE
    function deleteScheduleCall(callback) {
        let jwt = localStorage.getItem('authToken')
        var tokens = jwt.split('.')

        const query =
        {
            id: JSON.parse(atob(tokens[1])).user.id,
            date: localStorage.getItem('dateOfBtn')
        }

        localStorage.removeItem('dateOfBtn');

        const settings =
        {
            url: '/delete/schedule',
            data: JSON.stringify(query),
            contentType: 'application/json',
            dataType: 'json',
            type: 'DELETE',
            success: callback,
            error: function (e) {
                window.alert('FAILED TO DELETE SCHEDULE! PLEASE TRY AGAIN OR CONTACT DEVELOPER IF PROBLEM PERSISTS!')
            }
        }

        $.ajax(settings)
    }





    function init() {
        $(createCalender);
        $(watchDateBtn);
        $(watchSubmitSchedule);
        $(watchSubmitUpdateSchedule);
        $(watchDeleteBtn);
    }

    $(init);
})