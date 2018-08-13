var startButton = document.getElementById("start");
var timerRunning = false;
var stopResetOn = false;
var workNow = false;

function prefixZero(time) {
    if (time < 10) {
        return '0' + time;
    } else {
        return time;
    }
}

function startTimer(workNow) {
    if (workNow = true) {
        var startTime = parseInt($("#workDisplay").text()) * 60;
        $("#timeText").text($("#workDisplay").text() + ":00");

    } else {
        var startTime = parseInt($("#breakDisplay").text()) * 60;
        $("#timeText").text($("#breakDisplay").text() + ":00");
    }

    var time = setInterval(function() {
        startTime--;

        var minutes = prefixZero(Math.floor(startTime / 60));
        var seconds = prefixZero(Math.floor(startTime % 60));

        $("#timeText").text(minutes + ":" + seconds);

        if (startTime == 0) {
            clearInterval(time);
            if (workNow = true) {
                workNow = false;
            } else {
                workNow = true;
            }
            startTimer(workNow);
        }

    }, 1000);
}

$(function() {
    $("#start").click(function() {
        workNow = true;
        startTimer(workNow);
    }),

    $("#workUp").click(function() {
        var currentTime = parseInt($("#workDisplay").text());
        if (currentTime < 50) {
            var workTime = currentTime + 1;
            $("#workDisplay").text(workTime);
            if (workNow = true) {
                $("#configureMinutes").text(workTime);
            }
        } else {
            alert("The duration of working has to be smaller than 50.");
        }
    }),

    $("#breakUp").click(function() {
        var currentTime = parseInt($("#breakDisplay").text());
        if (currentTime < 50) {
            var workTime = currentTime - 1;
            $("#breakDisplay").text(workTime);
            if (workNow = false) {
                $("#configureMinutes").text(workTime);
            }
        } else {
            alert("The duration of a break has to be smaller than 50.");
        }
    }),

    $("#workDown").click(function() {
        var currentTime = parseInt($("#workDisplay").text());
        if (currentTime > 1) {
            var workTime = currentTime - 1;
            $("#workDisplay").text(workTime);
            if (workNow = true) {
                $("#configureMinutes").text(workTime);
            }
        } else {
            alert("The duration of working has to larger than 0.");
        }
    }),

    $("#breakDown").click(function() {
        var currentTime = parseInt($("#breakDisplay").text());
        if (currentTime > 1) {
            var workTime = currentTime - 1;
            $("#breakDisplay").text(workTime);
            if (workNow = false) {
                $("#configureMinutes").text(workTime);
            }
        } else {
            alert("The duration of a break has to be larger than 0.");
        }
    })

});