<!DOCTYPE html>
<html>
<head>
    <title>Uptilt Traffic Map</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
    <!-- Stylesheets -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/animate.css') }}"> <!-- required for animations -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/app.css') }}"> <!-- user css -->
</head>
<body>
<div id="map"></div>
<div class="clock_widget"><span class="date_string"></span><span class="clock_string"></span></div>
<div class="weather_widget">
    <div class="left_side_wrap">
        <div class="left_side_content">
            <canvas id="big_icon" width="200" height="200"></canvas>
            <span class="temp"></span>
            <span class="summary"></span>
            <span class="wind"></span>
        </div>
    </div>
    <div class="right_side">
        <div id="day_0" class="day">
            <div class="icon_wrap">
                <canvas id="day_icon_0" class="DI" width="52" height="52"></canvas>
            </div>
            <div class="time_wrap">
                <span class="time"></span>
            </div>
            <div class="graph_wrap">
                <span class="t_temp_low"></span>
                <span class="graph" style="left:91px; right:70px;"></span>
                <span class="t_temp_high"></span>
            </div>
        </div>
        <div id="day_1" class="day">
            <div class="icon_wrap">
                <canvas id="day_icon_1" class="DI" width="52" height="52"></canvas>
            </div>
            <div class="time_wrap">
                <span class="time"></span>
            </div>
            <div class="graph_wrap">
                <span class="t_temp_low"></span>
                <span class="graph" style="left:42px; right:35px;"></span>
                <span class="t_temp_high"></span>
            </div>
        </div>
        <div id="day_2" class="day">
            <div class="icon_wrap">
                <canvas id="day_icon_2" class="DI" width="52" height="52"></canvas>
            </div>
            <div class="time_wrap">
                <span class="time"></span>
            </div>
            <div class="graph_wrap">
                <span class="t_temp_low"></span>
                <span class="graph" style="left:56px; right:105px;"></span>
                <span class="t_temp_high"></span>
            </div>
        </div>
        <div id="day_3" class="day">
            <div class="icon_wrap">
                <canvas id="day_icon_3" class="DI" width="52" height="52"></canvas>
            </div>
            <div class="time_wrap">
                <span class="time"></span>
            </div>
            <div class="graph_wrap">
                <span class="t_temp_low"></span>
                <span class="graph" style="left:0px; right:98px;"></span>
                <span class="t_temp_high"></span>
            </div>
        </div>
        <div id="day_4" class="day">
            <div class="icon_wrap">
                <canvas id="day_icon_4" class="DI" width="52" height="52"></canvas>
            </div>
            <div class="time_wrap">
                <span class="time"></span>
            </div>
            <div class="graph_wrap">
                <span class="t_temp_low"></span>
                <span class="graph" style="left:7px; right:56px;"></span>
                <span class="t_temp_high"></span>
            </div>
        </div>
        <div id="day_5" class="day">
            <div class="icon_wrap">
                <canvas id="day_icon_5" class="DI" width="52" height="52"></canvas>
            </div>
            <div class="time_wrap">
                <span class="time"></span>
            </div>
            <div class="graph_wrap">
                <span class="t_temp_low"></span>
                <span class="graph" style="left:49px; right:0px;"></span>
                <span class="t_temp_high"></span>
            </div>
        </div>
    </div>
</div>
<script src="https://code.jquery.com/jquery-2.2.4.min.js"
			  integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
			  crossorigin="anonymous"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.min.js"></script>
<script src="{{ asset('assets/js/skycons.js') }}"></script>
<script src="{{ asset('assets/js/google_traffic.js') }}"></script>
<script src="{{ asset('assets/js/weather_widget.js') }}"></script>
<script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhdIXhHMJfdvScWTa8lSYgbOJnwpQCyhc&callback=initMap">
</script>
</body>
