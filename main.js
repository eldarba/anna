"use strict";
{
    // constant elements
    /**@type {HTMLSelectElement} */
    const coppingMechanismsSelect = document.getElementById("coppingMechanismsSelect");
    const btAddMechanism = document.getElementById("btAddMechanism");
    const newMechanismBox = document.getElementById("newMechanismBox");
    const removeMechanismBt = document.getElementById("removeMechanismBt");
    const copeMechanismText = document.getElementById("copeMechanismText");
    const copeReplyText = document.getElementById("copeReplyText");

    // constants
    let coppingMechanisms = [
        "-- Copping Mechanism --",
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
        // clear text areas
        copeMechanismText.value = "";
        copeReplyText.value = "";
        newMechanismBox.value = "";
        coppingMechanismsSelect.selectedIndex = coppingMechanisms.length - 1;
    });

    removeMechanismBt.addEventListener("click", function () {
        const selectedIndex = coppingMechanismsSelect.selectedIndex;
        if (selectedIndex > 0) {
            alert(`Remove ${coppingMechanismsSelect.value} copping mechanism?`);
            // clear cache
            localStorage.removeItem(coppingMechanismsSelect.value);
            localStorage.removeItem(coppingMechanismsSelect.value + "reply");
            // clear text areas
            copeMechanismText.value = "";
            copeReplyText.value = "";
            coppingMechanisms = coppingMechanisms.filter(item => item !== coppingMechanismsSelect.value);
            // remove the option
            coppingMechanismsSelect.remove(selectedIndex);
        }
    });

    copeMechanismText.addEventListener("input", function () {
        localStorage.setItem(coppingMechanismsSelect.value, this.value);
    });

    copeReplyText.addEventListener("input", function () {
        localStorage.setItem(coppingMechanismsSelect.value + "reply", this.value);
    });

    // changing the cope mechanism select
    coppingMechanismsSelect.addEventListener("change", function () {
        if (this.selectedIndex > 0) {
            copeMechanismText.disabled = false;
            copeReplyText.disabled = false;
            copeMechanismText.value = localStorage.getItem(this.value);
            copeReplyText.value = localStorage.getItem(this.value + "reply");

            if(copeMechanismText.value && hebrewRegex.test(copeMechanismText.value[0])){
                copeMechanismText.dir = "rtl";
            }else{
                copeMechanismText.dir = "ltr";
            }

            if(copeReplyText.value && hebrewRegex.test(copeReplyText.value[0])){
                copeReplyText.dir = "rtl";
            }else{
                copeReplyText.dir = "ltr";
            }

        } else {
            copeMechanismText.value = "";
            copeReplyText.value = "";
            copeMechanismText.disabled = true;
            copeReplyText.disabled = true;
        }
    });

    // Hebrew Unicode range: \u0590 - \u05FF
    const hebrewRegex = /^[\u0590-\u05FF]/;

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