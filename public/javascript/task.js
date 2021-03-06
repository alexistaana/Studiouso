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

            let tempArr = user.tasks
            let asnDate

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

            //FOR LOOP THAT HIGHLIGHTS FILLED SPOTS
            for (let i = 0; i < daysInMonth(monthCounter, yearCounter); ++i) {
                asnDate = `${monthCounter}/${i + 1}/${yearCounter}`

                for (let j = 0; j < tempArr.length; ++j) {
                    if (asnDate == tempArr[j].date) {
                        $(`#dayOfTheMonth${i + 1}`).addClass("hasTask")
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
                                $(`#dayOfTheMonth${i + 1}`).addClass("hasTask")
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
                                $(`#dayOfTheMonth${i + 1}`).addClass("hasTask")
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
                                $(`#dayOfTheMonth${i + 1}`).addClass("hasTask")
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
                                $(`#dayOfTheMonth${i + 1}`).addClass("hasTask")
                            }
                        }
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
                window.alert('FAILED TO GET USER INFO! UNEXPECTED ERROR, PLEASE CONTACT DEVELOPER')
            }
        }
        $.ajax(settings)
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

                let tempArr = user.tasks

                for (let i = 0; i < tempArr.length; ++i) {
                    if (tempArr[i].date == localStorage.getItem('dateOfBtn')) {
                        checkIf = true;
                        break;
                    }
                }

                if (!checkIf) {
                    $('#task-form').show(500, function (e) {
                        $('#task-form').css({ 'position': 'absolute' })
                    });
                }
                else if (checkIf) {
                    $('#task-form-update').show(500);
                }

            });
        })


        //CLOSES TASK BTN  
        $('#cancelTask').click(function (e) {
            $('#task-form').hide(500, function (e) {
                $('#taskSubBtn').show();
                $('#postMsg').hide()
            });
        })

        $('#cancelTaskUpdate').click(function (e) {
            $('#task-form-update').hide(500, function (e) {
                $('#taskSubBtnUpdate').show();
                $('#updateMsg').hide();
            })
        })

    }

    //WATCHES SUBMIT BTN
    function watchSubmitTask() {
        $('#task-form').submit(event => {
            event.preventDefault();
            const targetOne = $(event.currentTarget).find('#message-form-task')

            const taskMsg = targetOne.val()

            targetOne.val('')

            postTaskRequest(taskMsg, function (event) {
                $('#calendarMonth').html('')
                $('#daysOfMonth').html('')
                $('#task-form').hide(500)

                //UPDATES PAGE
                createCalender();
            })
        })
    }

    //WATCHES SUBMIT AND UPDATE BTN
    function watchSubmitUpdateTask() {
        $('#task-form-update').submit(event => {
            event.preventDefault();
            const targetOne = $(event.currentTarget).find('#message-form-task-update')

            const taskMsg = targetOne.val()

            targetOne.val('')

            updateTaskCall(taskMsg, function (e) {
                $('#calendarMonth').html('')
                $('#daysOfMonth').html('')
                $('#task-form-update').hide(500)

                //UPDATES PAGE
                createCalender();
            })
        })
    }


    //WATCHES DELETE BTN
    function watchDeleteBtn() {
        $('#deleteBtn').click(event => {
            event.preventDefault();

            deleteTaskCall(function (e) {
                $('#calendarMonth').html('')
                $('#daysOfMonth').html('')
                $('#task-form-update').hide(500)

                //UPDATES PAGE
                createCalender();
            })
        })
    }


    //API REQUEST TO POST TASKS
    function postTaskRequest(tasks, callback) {
        let jwt = localStorage.getItem('authToken')
        var tokens = jwt.split('.')

        const query =
        {
            id: JSON.parse(atob(tokens[1])).user.id,
            description: tasks,
            date: localStorage.getItem('dateOfBtn')
        }

        localStorage.removeItem('dateOfBtn');

        const settings =
        {
            url: '/post/task',
            data: JSON.stringify(query),
            contentType: 'application/json',
            dataType: 'json',
            type: 'PUT',
            success: callback,
            error: function (e) {
                window.alert('FAILED TO STORE TASK! PLEASE TRY AGAIN OR CONTACT DEVELOPER IF PROBLEM PERSISTS!')
            }
        }

        $.ajax(settings)
    }

    //API REQUEST FOR UPDATE
    function updateTaskCall(task, callback) {
        let jwt = localStorage.getItem('authToken')
        var tokens = jwt.split('.')

        const query =
        {
            id: JSON.parse(atob(tokens[1])).user.id,
            date: localStorage.getItem('dateOfBtn'),
            description: task,
        }

        localStorage.removeItem('dateOfBtn');

        const settings =
        {
            url: '/put/tasks',
            data: JSON.stringify(query),
            contentType: 'application/json',
            dataType: 'json',
            type: 'PUT',
            success: callback,
            error: function (e) {
                window.alert('FAILED TO UPDATE TASK! PLEASE TRY AGAIN OR CONTACT DEVELOPER IF PROBLEM PERSISTS!')
            }
        }

        $.ajax(settings)
    }

    //API REQUEST FOR DELETE
    function deleteTaskCall(callback) {
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
            url: '/delete/tasks',
            data: JSON.stringify(query),
            contentType: 'application/json',
            dataType: 'json',
            type: 'DELETE',
            success: callback,
            error: function (e) {
                window.alert('FAILED TO DELETE TASK! PLEASE TRY AGAIN OR CONTACT DEVELOPER IF PROBLEM PERSISTS!')
            }
        }

        $.ajax(settings)
    }


    //INITIALIZATION
    function init() {
        $(createCalender);
        $(watchDateBtn);
        $(watchSubmitTask);
        $(watchSubmitUpdateTask);
        $(watchDeleteBtn);
    }


    $(init)

})