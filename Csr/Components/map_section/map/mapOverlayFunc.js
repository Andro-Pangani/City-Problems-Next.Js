

export const myOvelayMarker = (data) => {
/*
data = {
 coords: {
  lat: [float],
  lng: [float]
 },
 mapTag: [mapReference]

}

*/
 const bounds = new window.google.maps.LatLngBounds(
  new window.google.maps.LatLng(data.coords.lat, data.coords.lng),

);
// The photograph is courtesy of the U.S. Geological Survey.
const srcImage =
  "https://developers.google.com/maps/documentation/" +
  "javascript/examples/full/images/talkeetna.png";

// The custom USGSOverlay object contains the USGS image,
// the bounds of the image, and a reference to the map.
class MapOverlayIcon extends window.google.maps.OverlayView {
  constructor(bounds, image) {
    super();
    // Initialize all properties.
    this.bounds_ = bounds;
    this.image_ = image;
    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div_ = null;
  }
  /**
   * onAdd is called when the map's panes are ready and the overlay has been
   * added to the map.
   */
  onAdd() {
    this.div_ = document.createElement("div");
    this.div_.className = 'aqiMapMarkerOuter'
    this.div_.style.boxSizing = 'border-box';
    this.div_.style.borderStyle = "solid";
    this.div_.style.borderWidth = "3px";
    this.div_.style.transform = 'translate(-50%, -50%)';
    this.div_.style.borderRadius = "50%";
    this.div_.style.borderColor = data.props.color;
    this.div_.style.minHeight = '40px';
    this.div_.style.minWidth = '40px';
    this.div_.style.position = "absolute";

    let divInner = document.createElement("div");
    divInner.style.backgroundColor = data.props.color;
    divInner.className = "aqiMapMarkerInner";
    // Create the img element and attach it to the div.
    const img = document.createElement("img");
    img.src = this.image_;

    // w30px - h19.3126px
    // w25px - 16.0938px
    img.style.width = "25px";
    img.style.height = "16.0938px";
    img.style.left = '50%';
    img.style.top = '50%';

    img.style.transform = "translate(-50%, -50%)";
    img.style.position = "absolute";
    divInner.appendChild(img);
    this.div_.appendChild(divInner);
    // Add the element to the "overlayLayer" pane.
    const panes = this.getPanes();
    panes.overlayMouseTarget.appendChild(this.div_);
    // Adding Listener on div_
    let me = this;
    window.google.maps.event.addDomListener(this.div_, 'click', function(e){
     e.preventDefault();
     
     window.google.maps.event.trigger(me, 'click');
    })


  }
  draw() {
    // We use the south-west and north-east
    // coordinates of the overlay to peg it to the correct position and size.
    // To do this, we need to retrieve the projection from the overlay.
    const overlayProjection = this.getProjection();
    // Retrieve the south-west and north-east coordinates of this overlay
    // in LatLngs and convert them to pixel coordinates.
    // We'll use these coordinates to resize the div.
    const sw = overlayProjection.fromLatLngToDivPixel(
      this.bounds_.getSouthWest()
    );
    const ne = overlayProjection.fromLatLngToDivPixel(
      this.bounds_.getNorthEast()
    );

    // Resize the image's div to fit the indicated dimensions.
    if (this.div_) {
      this.div_.style.left = sw.x + "px";
      this.div_.style.top = ne.y + "px";
      this.div_.style.width = ne.x - sw.x + "px";
      this.div_.style.height = sw.y - ne.y + "px";
    }
  }
  /**
   * The onRemove() method will be called automatically from the API if
   * we ever set the overlay's map property to 'null'.
   */
  onRemove() {
    if (this.div_) {
      this.div_.parentNode.removeChild(this.div_);
      this.div_ = null;
    }
  }
}

const overlay = new MapOverlayIcon(bounds, 'https://storage.googleapis.com/deligation-40179.appspot.com/icons/aqiStationPng.png');


 window.google.maps.event.addListener(overlay, "click", (e) => {
  console.log('Hey ovelay');
  data.infoWindow.open(data.mapTag, data.marker)
 })

  overlay.setMap(data.mapTag);
}