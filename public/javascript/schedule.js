$(document).ready(function () {

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let monthCounter
    let yearCounter

    Date.prototype.getMonthName = function () {
        return months[this.getMonth()];
    };
    Date.prototype.getDayName = function () {
        return days[this.getDay()];
    };

    //GETS THE NUMBER OF DAYS IN A MONTH
    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    function createCalender() {
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

        for (let i = 0; i < firstDayMonth.getDay(); i++) {
            blocksDay += `<li style="display: inline-block; height: 24px"></li>`
        }


        for (let i = 0; i < daysInMonth(monthCounter - 1, yearCounter); ++i) {
            blocksDay += `<li class="filledDay" id="dayOfTheMonth${i + 1}">${i + 1}</li>`
        }

        $('#calendarMonth').html(`${monthToday}<br><span="font-size:18px">${yearToday}</span>`)
        $('#daysOfMonth').append(blocksDay)

        $('#prevBtn').click(function (e) {
            if (monthCounter != 1) {
                blocksDay = '';

                // if (monthCounter != 0) {
                monthCounter--;
                // }

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

                console.log(monthCounter - 1)

                $('#calendarMonth').html(`${monthToday}<br><span="font-size:18px">${yearToday}</span>`)
                $('#daysOfMonth').html(blocksDay)

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

                for (let i = 0; i < daysInMonth(monthCounter - 1, yearCounter); ++i) {
                    blocksDay += `<li class="filledDay" id="dayOfTheMonth${i + 1}">${i + 1}</li>`
                }

                $('#calendarMonth').html(`${monthToday}<br><span="font-size:18px">${yearToday}</span>`)
                $('#daysOfMonth').html(blocksDay)


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
            }
        })
    }

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

                let tempArr = user.tasks

                console.log(localStorage.getItem('dateOfBtn'))

                for (let i = 0; i < tempArr.length; ++i) {
                    if (tempArr[i].date == localStorage.getItem('dateOfBtn')) {
                        checkIf = true;
                        break;
                    }
                }
                if (!checkIf) {
                    $('#schedule-form').show(500, function (e) {
                        $('#schedule-form').css({ 'position': 'absolute' })
                    });
                }
                else if (checkIf) {
                    alert("SELECTED DAY ALREADY HAS A SCHEDULE, PLEASE CHOOSE ANOTHER DATE")
                }

                // $('#schedule-form').show(500, function (e) {
                //     $('#schedule-form').css({ 'position': 'absolute' })
                // });
            });
        })


        //CLOSES schedule BTN  
        $('#cancelSchedule').click(function (e) {
            $('#schedule-form').hide(500, function (e) {
                $('#schedSubBtn').show();
                $('#postMsg').hide()
            });
        })
    }

    function watchSubmitSchedule() {
        $('#schedule-form').submit(event => {
            console.log("CLICKED!")
            event.preventDefault();
            const targetOne = $(event.currentTarget).find('#message-form-schedule')

            const scheduleMsg = targetOne.val()

            targetOne.val('')

            postScheduleRequest(scheduleMsg, function (e) {
                $('#schedSubBtn').fadeOut(500, function (event) {
                    $('#postMsg').fadeIn(500)
                })
            })
        })
    }

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

    function postScheduleRequest(schedule, callback) {
        let jwt = localStorage.getItem('authToken')
        var tokens = jwt.split('.')

        const query =
        {
            id: JSON.parse(atob(tokens[1])).user.id,
            description: schedule,
            date: localStorage.getItem('dateOfBtn')
        }

        localStorage.removeItem('dateOfBtn');

        const settings =
        {
            url: '/post/schedule',
            data: JSON.stringify(query),
            contentType: 'application/json',
            dataType: 'json',
            type: 'PUT',
            success: callback,
            error: function (e) {
                alert('ERROR! PLEASE TRY AGAIN!');
            }
        }

        $.ajax(settings)
    }

    function init() {
        $(createCalender);
        $(watchDateBtn);
        $(watchSubmitSchedule);
    }

    $(init);
})