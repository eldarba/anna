import * as elements from "./elements.js";
import * as view from "./view.js";
import * as models from "./models.js";


console.log("loading data");

export const copingMechanismsDefault = [
    "-- coping Mechanism --",
    // "The Pleaser",
    // "The Smoker",
    // "The Protestor",
];

export let copingMechanismsArray = [];

export function setCopingMechanismsArray(arr) {
    copingMechanismsArray = arr;
}

/** init actions - set the available coping mechanisms */
export function loadCopingMechanismsFromStorage() {
    if (localStorage.getItem("copingMechanisms")) {
        copingMechanismsArray = JSON.parse(localStorage.getItem("copingMechanisms"));
    } else {
        copingMechanismsArray = copingMechanismsArray.concat(copingMechanismsDefault);
    }
}

export function addCopingMechanism() {
    copingMechanismsArray.push(elements.newMechanismBox.value);
    localStorage.setItem("copingMechanisms", JSON.stringify(copingMechanismsArray));
}

export function removeCopingMechanism(mechanism) {
    // remove data for coping mechanism text areas
    localStorage.removeItem(mechanism);
    localStorage.removeItem(mechanism + "reply");
    // remove mechanism from the array
    copingMechanismsArray = copingMechanismsArray.filter(item => item !== mechanism);
    // remove mechanism from the array saved in storage
    localStorage.setItem("copingMechanisms", JSON.stringify(copingMechanismsArray));
}

// situations
export let situation = null;
export let situations = [];

export function setSituations(sit) {
    situations = sit;
}

export function saveSituation() {
    if (elements.txtSituation.value === "") {
        alert("Enter Situation");
        return;
    }
    // create model for current situation
    const healthyAdult = new models.HealthyAdult(elements.txtHealthySituation.value, elements.txtHealthyPunitive.value, elements.txtHealthyVulnerable.value, elements.txtCoping.value);
    const copingMechanisms = [];

    for (const item of copingMechanismsArray) {
        copingMechanisms.push(new models.CopingMechanism(item, localStorage.getItem(item), localStorage.getItem(item + "reply")));
    }

    const situationTitle = prompt("Enter Situation Title");

    if (situationTitle === "") {
        alert("You must enter a title!");
        return;
    }

    if (!situationTitle) {
        return;
    }

    // create and save the situation
    situation = new models.Situation(situationTitle, healthyAdult, elements.txtSituation.value, elements.txtPunitive.value, elements.txtVulnerable.value, copingMechanisms);
    situations.push(situation);
    localStorage.setItem("situations", JSON.stringify(situations));
    view.displaySituationsOnTable();

    // clear
    view.resetPage();
}
