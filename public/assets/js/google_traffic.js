function initMap() {
    // Instantiate google maps instance with basemap at coordinates
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: {lat: 38.074582, lng: -85.948448},
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var marker = new google.maps.Marker({
        position: {lat: 38.0574792, lng: -85.7105443},
        map: map,
        title: 'You be hurr!'
    });

    //This is the traffic layer if we need it, provided by Google
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    // This function will reload all of the Google provided tiles such as traffic
    $(function () {
        setInterval(reloadTiles, 10 * 60000);
    });
    function reloadTiles() {
        console.log("Updated!");
        var tiles = $("#map").find("img");
        for (var i = 0; i < tiles.length; i++) {
            var src = $(tiles[i]).attr("src");
            if (/googleapis.com\/vt?pb=/.test(src)) {
                var new_src = src.split("&ts")[0] + '&ts=' + (new Date()).getTime();
                $(tiles[i]).attr("src", new_src);
            }
        }
    }
}