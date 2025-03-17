"use strict";
{
    const coppingMechanismsSelectSpan = document.getElementById("coppingMechanismsSelectSpan");
    const btAddMechanism = document.getElementById("btAddMechanism");
    const newMechanismBox = document.getElementById("newMechanismBox");

    const coppingMechanisms = [
        "The Pleaser",
        "The Smoker",
        "The Protestor",
    ];

    window.addEventListener("load", loadMechanisms);

    function loadMechanisms() {
        let html = "";
        for (const x of coppingMechanisms) {
            html += `<option value="">${x}</option>`;
        }
        coppingMechanismsSelectSpan.innerHTML = html;
    }

    btAddMechanism.addEventListener("click", function () {
        if (newMechanismBox.value === "") {
            alert("Enter Mechanism");
            return;
        }
        coppingMechanisms.push(newMechanismBox.value);
        loadMechanisms();
    });
}