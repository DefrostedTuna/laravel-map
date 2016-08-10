<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    abort(404, "Not Found");
});

Route::get('/radar', function() {
  return view('radar');
});

Route::get('/traffic', function() {
  return view('traffic');
});

Route::get('/api/weather', function() {

  // Debugging
  //$forecast = json_decode(json_encode(\Nwidart\LaravelForecast\ForecastFacade::get('38.0612', '-85.7097')));

  $forecast = json_decode(\Illuminate\Support\Facades\Storage::disk('local')->get('/weather/weather.json'));

  return response()->json($forecast);
});
