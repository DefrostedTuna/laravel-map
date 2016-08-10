function initMap() {
    // Instantiate google maps instance with basemap at coordinates
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: 38.0574792, lng: -85.7105443},
        mapTypeId: google.maps.MapTypeId.HYBRID
    });
    var marker = new google.maps.Marker({
        position: {lat: 38.0574792, lng: -85.7105443},
        map: map,
        title: 'You be Hurr'
    });

    // Weather layer source via tile server API
    var tileNEX = new google.maps.ImageMapType({
        getTileUrl: function(tile, zoom) {
            // Append (new Date()).getTime() to prevent browser caching of returned images
            return "http://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/" +
                zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime();
        },
        tileSize: new google.maps.Size(256, 256),
        opacity:0.50,
        name : 'NEXRAD',
        isPng: true
    });

    // Apply tile to basemap
    map.overlayMapTypes.setAt("0",tileNEX);

    // Specify refresh rate of tile server (No limit on API calls, yay!)
    setInterval(function() {
        console.log("Refreshed the weather radar!");
        map.overlayMapTypes.setAt("0",tileNEX);
    }, 5 * 60000);

}