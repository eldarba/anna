"use strict";
{
    // constant elements
    const coppingMechanismsSelect = document.getElementById("coppingMechanismsSelect");
    const btAddMechanism = document.getElementById("btAddMechanism");
    const newMechanismBox = document.getElementById("newMechanismBox");
    const removeMechanismBt = document.getElementById("removeMechanismBt");

    // constants
    const coppingMechanisms = [
        "-- Choose Copping Mechanism --",
        "The Pleaser",
        "The Smoker",
        "The Protestor",
    ];

    window.addEventListener("load", loadMechanisms);

    function loadMechanisms() {
        let html = "";
        for (let i = 0; i < coppingMechanisms.length; i++) {
            const x = coppingMechanisms[i];
            html += `<option id="${i}">${x}</option>`;
        }
        // what the fuck
        coppingMechanismsSelect.innerHTML = html;
    }

    btAddMechanism.addEventListener("click", function () {
        if (newMechanismBox.value === "") {
            alert("Enter Mechanism");
            return;
        }
        coppingMechanisms.push(newMechanismBox.value);
        loadMechanisms();
        newMechanismBox.value = "";
        coppingMechanismsSelect.selectedIndex = coppingMechanisms.length-1;
    });

    removeMechanismBt.addEventListener("click", function () {
        const selectedIndex = coppingMechanismsSelect.selectedIndex;
        if (selectedIndex > 0) {
            alert("Remove this copping mechanism?");
            coppingMechanismsSelect.remove(selectedIndex);
        }
    });
}