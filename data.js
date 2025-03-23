import * as elements from "./elements.js";
import * as view from "./view.js";

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

export class Situation {

    constructor(title, HealthyAdult, situation, punitiveAdult, vulnerableChild, copingMechanisms) {
        const d = new Date();
        this.date = d.toLocaleDateString() + ":" + d.toLocaleTimeString();
        this.title = title;
        this.healthyAdult = HealthyAdult;
        this.situation = situation;
        this.punitiveAdult = punitiveAdult;
        this.vulnerableChild = vulnerableChild;
        this.copingMechanisms = copingMechanisms;
    }

    getDateFormatted() {
        // return this.date.toLocaleDateString() + ":" + this.date.toLocaleTimeString();
        return this.date;
    }
}

export class HealthyAdult {
    constructor(situation, punitiveAdult, vulnerableChild, copingMechanism) {
        this.situation = situation;
        this.punitiveAdult = punitiveAdult;
        this.vulnerableChild = vulnerableChild;
        this.copingMechanism = copingMechanism;
    }
}

export class CopingMechanism {
    constructor(name, description, reply) {
        this.name = name;
        this.description = description;
        this.reply = reply;
    }
}

export function loadCopingMechanismsFromStorage() {
    // init actions - set the available coping mechanisms
    if (localStorage.getItem("copingMechanisms")) {
        setCopingMechanismsArray(JSON.parse(localStorage.getItem("copingMechanisms")));
    } else {
        setCopingMechanismsArray(copingMechanismsArray.concat(copingMechanismsDefault));
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
    setCopingMechanismsArray(copingMechanismsArray.filter(item => item !== mechanism));
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
    const healthyAdult = new HealthyAdult(elements.txtHealthySituation.value, elements.txtHealthyPunitive.value, elements.txtHealthyVulnerable.value, elements.txtCoping.value);
    const copingMechanisms = [];
    for (const item of copingMechanismsArray) {
        copingMechanisms.push(new CopingMechanism(item, localStorage.getItem(item), localStorage.getItem(item + "reply")));
    }
    const situationTitle = prompt("Enter Situation Title");
    situation = new Situation(situationTitle, healthyAdult, elements.txtSituation.value, elements.txtPunitive.value, elements.txtVulnerable.value, copingMechanisms);
    situations.push(situation);
    localStorage.setItem("situations", JSON.stringify(situations));
    view.displaySituationsOnTable();

    localStorage.removeItem("copingMechanisms");
    setCopingMechanismsArray([]);
    loadCopingMechanismsFromStorage();
    view.loadCopingMechanismsToDom();

    elements.copeMechanismText.value = "";
    elements.copeReplyText.value = "";
    view.disableInputs();
}