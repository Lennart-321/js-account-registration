let nrOfInput = 0;
const labels = [];
const inputs = [];
const errorMsgs = [];
const inputNames = [];
let validate = null;
const validationFunctions = {
    name: (value) => value.length > 0,
    username: (value) => value.length > 2,
    email: (value) => value.indexOf("@") > 0,
    password: (value) => value.length > 7,
    passwordConfirm: (value) => inputs[inputNames.indexOf("password")]?.value === value,
    
};

//Get form elements
for (let i = 0; true; i++) {
    const input = document.getElementById("input" + i);
    if (input === null) {
        nrOfInput = i;
        break;
    }
    inputs.push(input);
    inputNames.push(input.name);
    labels.push(document.getElementById("label" + i));
    errorMsgs.push(document.getElementById("error" + i));
}
const button = document.getElementById("submit");


//Setup events
for (let i = 0; i < nrOfInput; i++) {
    if (labels[i]) labels[i].onclick = () => inputs[i].focus();
    inputs[i].onblur = () => {
        errorMsgs[i].hidden = validate[i](inputs[i].value);
        button.disabled = !validateAll();
    };
}

//Validation functions:
validate = Array(nrOfInput).fill(null);
for (let inputName in validationFunctions) {
    let ix = inputNames.indexOf(inputName);
    if (ix >= 0) {
        validate[ix] = validationFunctions[inputName];
    }
}

//Setup submit event
document.getElementById("the-form").addEventListener("submit", e => {
    e.preventDefault();
    console.log(collectInput());
});


function validateAll() {
    for (let i = 0; i < validate.length; i++) {
        if (validate[i]) {
            if (!validate[i](inputs[i].value))
                return false;
        }
    }
    return true;
}

function collectInput() {
    const registrationData = { name: null, username: null, email: null, password: null };

    for (let prop in registrationData) {
        let ix = inputNames.indexOf(prop);
        if (ix >= 0) {
            registrationData[prop] = inputs[ix].value;
        }
    }

    return registrationData;
}
