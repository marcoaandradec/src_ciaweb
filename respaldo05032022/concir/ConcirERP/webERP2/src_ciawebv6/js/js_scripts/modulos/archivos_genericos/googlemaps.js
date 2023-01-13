/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function showCanvas(divmapa){
    if (GBrowserIsCompatible()) {
        map = new GMap2(document.getElementById(divmapa));
        map.setCenter(new GLatLng(37.4419, -122.1419), 16);
        geocoder = new GClientGeocoder();
    }
}
function buscarDir(address){
    var punto = '';
    if (geocoder) {
        geocoder.getLatLng(
            address,
            function(point) {
                if (!point) {
                    punto = 'No encontrado'
                } else {
                    map.setCenter(point, 16);
                    var marker = new GMarker(point);
                    map.addOverlay(marker);
                    marker.openInfoWindowHtml(address);
                    punto = point;
                }
            }
            );
    }
    return punto;
}