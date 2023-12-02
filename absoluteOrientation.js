/************* ABSOLUTE ORIENTATION *************/
const observeAbsBtn = document.querySelector("#observe-abs-orientation");
observeAbsBtn.onclick = observeAbsOrientation;

const stopObserveAbsBtn = document.querySelector("#stop-observe-abs");
stopObserveAbsBtn.onclick = () => {
    absSensor.stop();
    observeAbsBtn.disabled = false;
    stopObserveAbsBtn.disabled = true;
};

const absEl = document.querySelector("#abs-orientation");

function makeAbsSensor(options) {
    try {
        return new AbsoluteOrientationSensor(options);
    } catch (error) {
        console.log(error)
        // Handle construction errors.
        if (error.name === "SecurityError") {
            // See the note above about feature policy.
            console.log("Sensor construction was blocked by a feature policy.");
        } else if (error.name === "ReferenceError") {
            console.log("Sensor is not supported by the User Agent.");
        } else {
            throw error;
        }
    }
}

const absSensor = makeAbsSensor();

absSensor.onactivate = () => {
    console.log("abs sensor activated");
    observeAbsBtn.disabled = true;
    stopObserveAbsBtn.disabled = false;
};

absSensor.onreading = () => {
    console.log("abs", absSensor.quaternion);
    absEl.textContent = absSensor.quaternion;
};

absSensor.onerror = event => {
    if (event.error.name === "NotAllowedError") {
        console.error({NotAllowedError: event.error.message})
        // Branch to code for requesting permission.
    } else if (event.error.name === "SecurityError") {
        console.error({SecurityError: event.error.message});
    } else if (event.error.name === "NotReadableError") {
        console.error({NotReadableError: event.error.message});
    }
};

function observeAbsOrientation() {
    Promise.all([
        navigator.permissions.query({ name: "accelerometer" }),
        navigator.permissions.query({ name: "magnetometer" }),
        navigator.permissions.query({ name: "gyroscope" })
    ]).then(results => {
        console.log({permissions: navigator.permissions.query({name: "xr-spatial-trackin"})})
        if (results.every(result => result.state === "granted")) {
            absSensor.start();
            console.log(
                "all permissions necessary to use AbsoluteOrientationSensor has been granted."
            );
        } else if (results.every(result => result.state === "prompt")) {
            absSensor.start();
            console.log(
                "all permissions necessary to use AbsoluteOrientationSensor has been granted."
            );
        } else if (results.some(result => result.state === "denied")) {
            console.log("No permissions to use AbsoluteOrientationSensor.");
            // in future permissions can be navigator.permissions.request()'ed
            console.log(
                "in future permissions can be navigator.permissions.request()'ed."
            );
        }
    });
}
/************* end ABSOLUTE ORIENTATION *************/
