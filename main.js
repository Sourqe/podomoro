var startButton = document.getElementById("start");
var timerRunning = false;
var stopResetOn = false;
var workNow = true;
var timeLeft = 0;
var timerId;
var startTime;
var timeLeft;

$('#pause').addClass("disabledButton");
$('#stop').addClass("disabledButton");
$('#pause').prop("disabled", true);
$('#stop').prop("disabled", true);

function prefixZero(time) {
    if (time < 10) {
        return '0' + time;
    } else {
        return time;
    }
}

function clearTimer() {
    clearInterval(timerId);
}

function startTimer(workNow) {
    if (workNow === true  && timeLeft === 0) {
        startTime = parseInt($("#workDisplay").text()) * 60;
        $("#timeText").text($("#workDisplay").text() + ":00");

    } 
    
    if (workNow === false) {
        startTime = parseInt($("#breakDisplay").text()) * 60;
        $("#timeText").text($("#breakDisplay").text() + ":00");
    }

    timerId = setInterval(function() {
        startTime--;

        var minutes = prefixZero(Math.floor(startTime / 60));
        var seconds = prefixZero(Math.floor(startTime % 60));

        $("#timeText").text(minutes + ":" + seconds);

        if (startTime == 0) {
            clearTimer();

            if (workNow === true) {
                workNow = false;

                $('#bottomText').removeClass("initialOpacity");
                $('#bottomText').addClass("gray");

                $('#topText').addClass("initialOpacity");
                $('#topText').removeClass("gray");

            } else {
                workNow = true;

                $('#topText').removeClass("initialOpacity");
                $('#topText').addClass("gray");

                $('#bottomText').addClass("initialOpacity");
                $('#bottomText').removeClass("gray");
            }

            startTimer(workNow);
        }

    }, 1000);
}

$(function() {
    $("#start").click(function() {

        $('#start').prop("disabled", true);
        $('#start').addClass("disabledButton");

        $('#pause').removeClass("disabledButton");
        $('#pause').prop("disabled", false);

        $('#stop').removeClass("disabledButton");
        $('#stop').prop("disabled", false);

        workNow = true;
        startTimer(workNow);
    }),

    $("#workUp").click(function() {
        var currentTime = parseInt($("#workDisplay").text());
        if (currentTime < 50) {
            var workTime = currentTime + 1;
            $("#workDisplay").text(workTime);
            if (workNow === true) {
                $("#configureMinutes").text(workTime);
            }
        } else {
            alert("The duration of working has to be smaller than 50.");
        }
    }),

    $("#breakUp").click(function() {
        var currentTime = parseInt($("#breakDisplay").text());
        if (currentTime < 50) {
            var workTime = currentTime + 1;
            $("#breakDisplay").text(workTime);
            if (workNow === false) {
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
            if (workNow === true) {
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
            if (workNow === false) {
                $("#configureMinutes").text(workTime);
            }
        } else {
            alert("The duration of a break has to be larger than 0.");
        }
    }),

    $("#pause").click(function() {
        if (workNow === true) {
            workNow = false;

            $('#pause').prop("disabled", true);
            $('#pause').addClass("disabledButton");

            $('#start').removeClass("disabledButton");
            $('#start').prop("disabled", false);
            
            $('#stop').addClass("disabledButton");
            $('#stop').prop("disabled", true);
            
            // pause the timer
            timeLeft = startTime;
            clearTimer();
        }
    }),

    $("#stop").click(function() {
        if (workNow === true) {
            workNow = false;

            $('#pause').prop("disabled", true);
            $('#pause').addClass("disabledButton");

            $('#stop').prop("disabled", true);
            $('#stop').addClass("disabledButton");

            $('#start').prop("disabled", false);
            $('#start').removeClass("disabledButton");
            
            timeLeft = 0;
            clearTimer();

            $("#timeText").text($("#workDisplay").text() + ":00");
        }
    })

});