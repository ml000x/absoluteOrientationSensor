/************* DEVICE ORIENTATION *************/
const getOrientationBtn = document.querySelector("#get-orientation");

getOrientationBtn.addEventListener("click", () => {
    getOrientation();
    getOrientationBtn.disabled = true;
    stopGetOrientationBtn.disabled = false;
});

const stopGetOrientationBtn = document.querySelector("#stop-get-orientation");

stopGetOrientationBtn.addEventListener("click", () => {
    window.removeEventListener("deviceorientation", handleOrientation, true);
    orientationStatusEl.textContent = "Stopped Observing Orientation";
    getOrientationBtn.disabled = false;
    stopGetOrientationBtn.disabled = true;
});

const orientationStatusEl = document.querySelector("#orientation-status");

const orientationEl = document.querySelector("#orientation");

function handleOrientation(event) {
    orientationStatusEl.textContent = "Observing Orientation";

    const { absolute, alpha, beta, gamma } = event;
    console.log({handleOrientation: event})

    orientationEl.textContent = `
absolute: ${absolute}

alpha [degrees]: ${alpha}
    
beta [degrees]: ${beta}
    
gamma [degrees]: ${gamma}
  `;
    console.log("device orientation: ", event);
}

function getOrientation() {
    if (window.DeviceOrientationEvent) {
        orientationStatusEl.textContent = "Loading";
        window.addEventListener("deviceorientation", handleOrientation, true);
    } else {
        alert("DeviceOrientationEvent is not supported by your browser.");
        console.error("DeviceOrientationEvent is not supported by your browser.");
    }
}
/************* end DEVICE ORIENTATION *************/
