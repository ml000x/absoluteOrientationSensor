/************* GEOLOCATION *************/
const getPosBtn = document.querySelector("#get-position");
getPosBtn.addEventListener("click", getPos);

var geoWatchID = null;
const watchPosBtn = document.querySelector("#watch-position");
watchPosBtn.addEventListener("click", () => (geoWatchID = watchPos()));

const clearWatchBtn = document.querySelector("#clear-watch");
clearWatchBtn.addEventListener("click", clearWatch);

const posStatusEl = document.querySelector("#pos-status");

const positionEl = document.querySelector("#position");

function showPosition(position) {
    const {
        latitude,
        longitude,
        altitude,
        accuracy,
        altitudeAccuracy,
        heading,
        speed
    } = position.coords;

    positionEl.textContent = `
latitude [degrees]: ${latitude}

longitude [degrees]: ${longitude}

altitude [meters]: ${altitude}
      
accuracy [meters]: ${accuracy}

altitudeAccuracy [meters]: ${altitudeAccuracy}

heading [degrees]: ${heading}
      
speed [m/s]: ${speed}

timestamp: ${Date(position.timestamp)}
`;
}

function getPosSuccess(position) {
    posStatusEl.textContent = "Got Current Position";
    showPosition(position);
    console.log("position: ", position);
}

function geoWatchSuccess(position) {
    posStatusEl.textContent = "Watching";
    watchPosBtn.disabled = true;
    clearWatchBtn.disabled = false;

    showPosition(position);
    console.log("position: ", position);
}

function geoError(err) {
    posStatusEl.textContent = "Error";
    alert(
        "Sorry, no position available." +
        " error code: " +
        err.code +
        " error.message: " +
        err.message
    );
    console.error(err);
}

var geoOptions = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
};

function watchPos() {
    clearWatch();

    posStatusEl.textContent = "Loading";

    if ("geolocation" in navigator) {
        const geoWatchID = navigator.geolocation.watchPosition(
            geoWatchSuccess,
            geoError,
            geoOptions
        );
    } else {
        alert("Geolocation is not supported in your browser");
        console.error("Geolocation is not supported in your browser");
    }

    return geoWatchID;
}

function clearWatch() {
    geoWatchID === null ? navigator.geolocation.clearWatch(geoWatchID) : false;
    posStatusEl.textContent = "Stopped Watching";
    watchPosBtn.disabled = false;
    clearWatchBtn.disabled = true;
}

function getPos() {
    clearWatch();

    posStatusEl.textContent = "Loading";

    navigator.geolocation.getCurrentPosition(getPosSuccess, geoError, geoOptions);
}
/************* end GEOLOCATION *************/
