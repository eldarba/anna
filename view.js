import * as data from "./data.js";
import * as elements from "./elements.js";

export function loadCopingMechanismsToDom() {
    let html = "";
    for (let i = 0; i < data.copingMechanismsArray.length; i++) {
        const x = data.copingMechanismsArray[i];
        html += `<option id="${i}">${x}</option>`;
    }
    elements.copingMechanismsSelect.innerHTML = html;
}



export function enableInputs() {
    copeMechanismText.disabled = false;
    copeReplyText.disabled = false;
}

export function disableInputs() {
    copeMechanismText.disabled = true;
    copeReplyText.disabled = true;
}


// Hebrew Unicode range: \u0590 - \u05FF
const hebrewRegex = /^[\u0590-\u05FF]/;

export function normalizeTextAreas() {

    for (const textarea of document.getElementsByTagName("textarea")) {
        textarea.addEventListener("input", function () {
            const value = textarea.value.trim();
            if (value && hebrewRegex.test(value[0])) {
                textarea.dir = 'rtl';
            } else {
                textarea.dir = 'ltr';
            }
        });
    }
}

export function addCopingMechanism() {
    loadCopingMechanismsToDom();
    // clear text areas
    elements.copeMechanismText.value = "";
    elements.copeReplyText.value = "";
    elements.newMechanismBox.value = "";
    elements.copingMechanismsSelect.selectedIndex = data.copingMechanismsArray.length - 1;
    enableInputs();
}

export function removeCopingMechanism(copeMechanismSelectIndex) {
    // clear text areas
    elements.copeMechanismText.value = "";
    elements.copeReplyText.value = "";
    // remove the option
    elements.copingMechanismsSelect.remove(copeMechanismSelectIndex);
}

export function displaySituationsOnTable() {
    elements.tbodySituations.innerHTML = "";
    for (const sit of data.situations) {
        const tr = document.createElement("tr");
        // tr.setAttribute("id", sit.date.getTime());
        tr.setAttribute("id", sit.date);

        const tdSituation = document.createElement("td");
        tdSituation.innerHTML = sit.title;

        const tdDate = document.createElement("td");
        tdDate.innerHTML = sit.date;

        const tdBtShow = document.createElement("td");
        const btShow = document.createElement("button");
        btShow.innerHTML = "Show";
        tdBtShow.append(btShow);

        const tdBtDel = document.createElement("td");
        const btDel = document.createElement("button");
        btDel.innerHTML = "x";
        tdBtDel.append(btDel);

        tr.append(tdSituation);
        tr.append(tdDate);
        tr.append(tdBtShow);
        tr.append(tdBtDel);

        btShow.addEventListener("click", () => showSituationDetails(sit));
        btDel.addEventListener("click", () => deleteSituation(sit));

        elements.tbodySituations.append(tr);
    }

}

export function showSituationDetails(situation) {
    console.log("Show");

    txtHealthySituation.value = situation.healthyAdult.situation;
    txtHealthyPunitive.value = situation.healthyAdult.punitiveAdult;
    txtHealthyVulnerable.value = situation.healthyAdult.vulnerableChild;
    txtCoping.value = situation.healthyAdult.copingMechanism;

    txtSituation.value = situation.situation;
    txtPunitive.value = situation.punitiveAdult;
    txtVulnerable.value = situation.vulnerableChild;

    // mechanisms
    const names = [];
    for (const mechanism of situation.copingMechanisms) {
        names.push(mechanism.name);
        localStorage.setItem(mechanism.name, mechanism.description);
        localStorage.setItem(mechanism.name + "reply", mechanism.reply);
    }

    localStorage.setItem("copingMechanisms", JSON.stringify(names));
    data.setCopingMechanismsArray(names);
    data.loadCopingMechanismsFromStorage();
    loadCopingMechanismsToDom();

    elements.copeMechanismText.value = "";
    elements.copeReplyText.value = "";

    const options = elements.copingMechanismsSelect.options;

    for (let i = 0; i < options.length; i++) {
      if (options[i].text !== "-- coping Mechanism --" && options[i].text) {
        elements.copingMechanismsSelect.selectedIndex = i;
        // Trigger the change event
        const event = new Event('change', { bubbles: true });
        elements.copingMechanismsSelect.dispatchEvent(event);
        break;
      }
    }


}

export function deleteSituation(sit) {
    if (!confirm("Delete Situation?")) {
        return;
    }
    // data.setSituations(data.situations.filter(s => s.date.getTime() !== sit.date.getTime()));
    data.setSituations(data.situations.filter(s => s.date !== sit.date));
    localStorage.setItem("situations", JSON.stringify(data.situations));
    displaySituationsOnTable();

    for (const mechanism of sit.copingMechanisms) {
        localStorage.removeItem(mechanism.name);
        localStorage.removeItem(mechanism.name + "reply");
    }

}

