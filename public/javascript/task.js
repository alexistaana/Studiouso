$(document).ready(function () {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
        let firstDayMonth = new Date(date.getFullYear(), date.getMonth(), 1)

        // firstDayMonth = firstDayMonth.getDayName()
        monthToday = date.getMonthName()

        console.log(monthToday)
        console.log("BARRIER")
        console.log(firstDayMonth) 
        console.log(firstDayMonth.getDay()) 
        // console.log(date.getDay())

        let blocksDay = ""
        let dayOfWeek = false

        for (let i = 0; i < firstDayMonth.getDay(); i++) {
            blocksDay += `<li>0</li>`
        }


        for (let i = 0; i < daysInMonth(date.getMonth(), date.getFullYear()); ++i) {
            blocksDay += `<li>${i + 1}</li>`
        }

        document.getElementById('calendarMonth').innerHTML =
            `
            ${monthToday}
        `

        $('#daysOfMonth').append(blocksDay)


        // document.getElementById('daysOfMonth').innerHTML =
        // `

        // `




    }



    function init() {
        $(createCalender)
    }


    $(init)

})