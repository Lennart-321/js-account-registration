// const labels = [
//     document.getElementById("lb-input-name"),
//     document.getElementById("lb-input-username"),
//     document.getElementById("lb-input-email"),
//     document.getElementById("lb-input-password"),
//     document.getElementById("lb-input-password-confirm"),
// ];
// const inputElements = [
//     document.getElementById("input-name"),
//     document.getElementById("input-username"),
//     document.getElementById("input-email"),
//     document.getElementById("input-password"),
//     document.getElementById("input-password-confirm"),
// ];

// const nrOfInput = 5;
// const labels = Array(nrOfInput);
// const inputs = Array(nrOfInput);
// const errorMsgs = Array(nrOfInput);
// const inputNames = Array(nrOfInput); //"name", "username", "email", "password", "passwordConfirm"];

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

console.log(inputs[-1]);



//console.log(inputNames);
// console.log(inputs);
// console.log(labels);
//const h1 = document.querySelector("h1");
//h1.childNodes[0].addEventListener("click", (e) => { console.log("Text clicked", e); });
//h1.childNodes[0].addEventListener("DOMCharacterDataModified", e => { console.log("Text clicked", e); }, true);
//console.log(h1.childNodes[0]);
//setTimeout(() => (h1.innerText += " appended text"), 3000);

const button = document.getElementById("submit");

// for (let i = 0; i < 5; i++) { 
//     setTimeout(function() { 
//         console.log(i); 
//     }, 1000); 
// }

(function () {
    //
    let local = "before";
    for (let i = 0; i < nrOfInput; i++) {
        if (labels[i]) labels[i].onclick = () => { console.log(local, i, inputNames[i]); inputs[i].focus(); }
        inputs[i].onblur = () => {
            errorMsgs[i].hidden = validate[i](inputs[i].value);
            button.disabled = !validateAll();
        };
    }
    local = "after";

    //Validation functions:
    validate = Array(nrOfInput).fill(null);
    for (let inputName in validationFunctions) {
        let ix = inputNames.indexOf(inputName);
        if (ix >= 0) {
            validate[ix] = validationFunctions[inputName];
        }
    }

    document.getElementById("the-form").addEventListener("submit", e => {
        e.preventDefault();
        console.log(collectInput());
    });

    //Connent submit event
    //button.addEventListener("click", () => { console.log("Clicked 1!"); });
    //button.addEventListener( "click", e => { console.log("Clicked 2!"); /*e.stopPropagation();*/ }, true );
    //button.onclick = () => { console.log("Clicked 3!"); /*console.log(collectInput());*/ };
    //button.addEventListener("click", () => { console.log("Clicked 4!"); });
    //document.body.addEventListener("click", e => { console.log("Clicked Body!"); /*e.stopPropagation();*/ });
    //document.body.addEventListener("focusout", e => { console.log("focusout body!"); /*e.stopPropagation();*/ });
    //document.body.addEventListener("blur", e => { console.log("blur body!"); /*e.stopPropagation();*/ });
    //document.body.addEventListener("focusout", e => { console.log("capture focusout body!");/*e.stopPropagation();*/ }, true);
    //document.body.addEventListener("blur", e => { console.log("capture blur body!"); /*e.stopPropagation();*/ }, true);
})();

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
