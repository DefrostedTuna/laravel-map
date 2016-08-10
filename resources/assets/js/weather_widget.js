$(function() {

    var domainPrefix = '/map';

    var skycons = new Skycons({"color": "black"});

    var windDirections = {
        0: 'North',
        1: 'North East',
        2: 'East',
        3: 'South East',
        4: 'South',
        5: 'South West',
        6: 'West',
        7: 'North West',
        8: 'North'
    };
    var weekdays = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
    };
    var months = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
    };

    function calcWindDirection(bearing) {
        quad = Math.floor(Math.floor(bearing) / 40);
        return windDirections[quad];
    }
    function calcWeekday(day) {
        return weekdays[day];
    }
    function calcMonth(month) {
        return months[month];
    }
    function calcSuffix(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

    // Send an AJAX GET request to the server to obtain weather info
    // This makes for a cleaner transition between refreshes
    function ajaxWeatherWidget() {
        console.log("Run function");
        var deg = String.fromCharCode('176');
        $.ajax({
            url: domainPrefix + "/api/weather",
            type: "GET",
            contentType: "application/json",
            success: function (res) {
                $('.weather_widget').fadeOut('slow', function() {
                    console.log("AJAX Success");
                    console.log(res);

                    // Variables
                    var lowTempArray = [];
                    var highTempArray = [];
                    var weekLow = undefined;
                    var weekHigh = undefined;
                    var tempRange = undefined;
                    var boxWidth = $('.graph_wrap').width();
                    var pixelPerTemp = undefined;

                    // Find the various values we need to compare to later when assigning elements
                    for(i = 0; i < 7; i++) {
                        lowTempArray.push(Math.floor(res.daily.data[i].temperatureMin));
                        highTempArray.push(Math.floor(res.daily.data[i].temperatureMax));
                    }

                    // Clean up the arrays and finish setting values
                    lowTempArray.sort();
                    highTempArray.sort().reverse();
                    weekLow = lowTempArray[0];
                    weekHigh = highTempArray[0];
                    tempRange = (weekHigh - weekLow);
                    pixelPerTemp = (boxWidth / tempRange);

                    // Tend to the current weather section first
                    skycons.set('big_icon', res.currently.icon);
                    $('.weather_widget').find('.temp').text(Math.floor(res.currently.temperature) + deg);
                    $('.weather_widget').find('.summary').text(res.currently.summary);
                    $('.weather_widget').find('.wind').html("Wind: " + Math.floor(res.currently.windSpeed) + "mph<br>" + calcWindDirection(res.currently.windBearing));

                    // Loop through each entry and append the data where it goes
                    for(i = 0; i < 7; i++) {
                        var currentLowTemp = res.daily.data[i].temperatureMin;
                        var currentHighTemp = res.daily.data[i].temperatureMax;

                        var marginLeft = ((currentLowTemp - weekLow) * pixelPerTemp);
                        var marginRight = ((weekHigh - currentHighTemp) * pixelPerTemp);

                        skycons.set('day_icon_' + i, res.daily.data[i].icon);
                        $('#day_' + i).find('.time').text(moment.unix(res.daily.data[i].time).format('ddd'));
                        $('#day_' + i).find('.t_temp_low').text(Math.floor(res.daily.data[i].temperatureMin) + deg);
                        $('#day_' + i).find('.t_temp_high').text(Math.floor(res.daily.data[i].temperatureMax) + deg);
                        $('#day_' + i).find('.graph').css({ left: marginLeft, right: marginRight});
                    }

                    // Fix the "Today" label because I'm lazy. Lawl.
                    $('#day_0').find('.time').text("Today");
                });

                // Show widget after everything is constructed
                $('.weather_widget').fadeIn('slow');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Fail");
            }
        });
    }

    function clockWidget ( ) {
        var currentTime = new Date ( );
        var currentHours = currentTime.getHours ( );
        var currentMinutes = currentTime.getMinutes ( );
        var currentSeconds = currentTime.getSeconds ( );
        var currentDay = calcWeekday(currentTime.getDay());
        var currentMonth = calcMonth(currentTime.getMonth());
        var currentDate = calcSuffix(currentTime.getDate());
        var currentYear = currentTime.getFullYear();
        console.log(currentDay + ' ' + currentMonth + ' ' + currentDate);
        // Pad the minutes and seconds with leading zeros, if required
        currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
        currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
        // Choose either "AM" or "PM" as appropriate
        var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
        // Convert the hours component to 12-hour format if needed
        currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
        // Convert an hours component of "0" to "12"
        currentHours = ( currentHours == 0 ) ? 12 : currentHours;
        // Compose the string for display
        var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;
        // Update the time display
        $('.clock_widget').find('.date_string').text(currentDay + ' ' + currentMonth + ' ' + currentDate + ', ' + currentYear);
        $('.clock_widget').find('.clock_string').text(currentTimeString);
    }

    // Interval at which to refresh the weather widget
    setInterval(function () {
        ajaxWeatherWidget();
    }, 10 * 60000);
    setInterval(clockWidget, 1000);
    // Run any functions we need to call manually
    clockWidget();
    ajaxWeatherWidget();
    $('.clock_widget').fadeIn('slow');
    skycons.play();
});
