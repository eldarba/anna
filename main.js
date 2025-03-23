import * as elements from "./elements.js";
import * as data from "./data.js";
import * as view from "./view.js";

// init actions:
data.loadCopingMechanismsFromStorage();
window.addEventListener("load", view.loadCopingMechanismsToDom);
view.normalizeTextAreasListener();

if (localStorage.getItem("situations")) {
    data.setSituations(JSON.parse(localStorage.getItem("situations")));
    view.displaySituationsOnTable();
}

elements.btAddMechanism.addEventListener("click", function () {
    const value = elements.newMechanismBox.value;
    if (value === "") {
        alert("Enter Mechanism");
        return;
    }

    if (data.copingMechanismsArray.indexOf(value) !== -1) {
        alert(`Mechanism ${value} Already Exists`);
        return;
    }

    // handle data add
    data.addCopingMechanism()
    // handle view
    view.addCopingMechanism()
});

elements.btRemoveMechanism.addEventListener("click", function () {
    const copeMechanismSelectIndex = elements.copingMechanismsSelect.selectedIndex;
    if (copeMechanismSelectIndex > 0) {
        const mechanism = elements.copingMechanismsSelect.value;
        alert(`Remove ${mechanism} coping mechanism?`);
        // handle data remove
        data.removeCopingMechanism(mechanism);
        //handle view
        view.removeCopingMechanism(copeMechanismSelectIndex);
    } else {
        alert("Select Coping Mechanism to Remove!");
    }
});

elements.btResetMechanism.addEventListener("click", function () {
    if (confirm("WARNING - Mechanisms will be deleted!")) {
        localStorage.removeItem("copingMechanisms");
        data.setCopingMechanismsArray([]);
        data.loadCopingMechanismsFromStorage();
        view.loadCopingMechanismsToDom();
        // location.reload();
    }
});

copeMechanismText.addEventListener("input", function () {
    localStorage.setItem(copingMechanismsSelect.value, this.value);
});

copeReplyText.addEventListener("input", function () {
    localStorage.setItem(copingMechanismsSelect.value + "reply", this.value);
});

// changing the cope mechanism select
copingMechanismsSelect.addEventListener("change", function () {
    if (this.selectedIndex > 0) {
        view.enableInputs();
        copeMechanismText.value = localStorage.getItem(this.value);
        copeReplyText.value = localStorage.getItem(this.value + "reply");
    } else {
        elements.copeMechanismText.value = "";
        elements.copeReplyText.value = "";
        view.disableInputs();
    }
});

elements.btSaveSituation.addEventListener("click", data.saveSituation);

