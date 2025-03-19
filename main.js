"use strict";
{
    // constant elements
    /**@type {HTMLSelectElement} */
    const copingMechanismsSelect = document.getElementById("copingMechanismsSelect");
    const btAddMechanism = document.getElementById("btAddMechanism");
    const newMechanismBox = document.getElementById("newMechanismBox");
    const removeMechanismBt = document.getElementById("removeMechanismBt");
    const resetMechanismBt = document.getElementById("resetMechanismBt");
    const copeMechanismText = document.getElementById("copeMechanismText");
    const copeReplyText = document.getElementById("copeReplyText");

    const copingMechanismsDefault = [
        "-- coping Mechanism --",
        "The Pleaser",
        "The Smoker",
        "The Protestor",
    ];

    let copingMechanisms = [];

    if (localStorage.getItem("copingMechanisms")) {
        copingMechanisms = JSON.parse(localStorage.getItem("copingMechanisms"));
    } else {
        copingMechanisms = copingMechanisms.concat(copingMechanismsDefault);
    }




    window.addEventListener("load", loadMechanisms);

    function loadMechanisms() {
        let html = "";
        for (let i = 0; i < copingMechanisms.length; i++) {
            const x = copingMechanisms[i];
            html += `<option id="${i}">${x}</option>`;
        }
        copingMechanismsSelect.innerHTML = html;
    }

    btAddMechanism.addEventListener("click", function () {
        if (newMechanismBox.value === "") {
            alert("Enter Mechanism");
            return;
        }
        console.log(copingMechanisms.indexOf(newMechanismBox.value));
        
        if (copingMechanisms.indexOf(newMechanismBox.value) !== -1) {
            alert(`Mechanism ${newMechanismBox.value} Already Exists`);
            return;
        }
        copingMechanisms.push(newMechanismBox.value);
        localStorage.setItem("copingMechanisms", JSON.stringify(copingMechanisms));
        loadMechanisms();
        // clear text areas
        copeMechanismText.value = "";
        copeReplyText.value = "";
        newMechanismBox.value = "";
        copingMechanismsSelect.selectedIndex = copingMechanisms.length - 1;
        enableInputs();
    });

    removeMechanismBt.addEventListener("click", function () {
        const selectedIndex = copingMechanismsSelect.selectedIndex;
        if (selectedIndex > 0) {
            alert(`Remove ${copingMechanismsSelect.value} coping mechanism?`);
            // clear cache
            localStorage.removeItem(copingMechanismsSelect.value);
            localStorage.removeItem(copingMechanismsSelect.value + "reply");
            // clear text areas
            copeMechanismText.value = "";
            copeReplyText.value = "";
            copingMechanisms = copingMechanisms.filter(item => item !== copingMechanismsSelect.value);
            localStorage.setItem("copingMechanisms", JSON.stringify(copingMechanisms));
            // remove the option
            copingMechanismsSelect.remove(selectedIndex);
        }
    });

    resetMechanismBt.addEventListener("click", function () {
        if (confirm("WARNING - All saved data will be deleted!")) {
            localStorage.clear();
            location.reload();
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
            enableInputs();
            copeMechanismText.value = localStorage.getItem(this.value);
            copeReplyText.value = localStorage.getItem(this.value + "reply");

            if (copeMechanismText.value && hebrewRegex.test(copeMechanismText.value[0])) {
                copeMechanismText.dir = "rtl";
            } else {
                copeMechanismText.dir = "ltr";
            }

            if (copeReplyText.value && hebrewRegex.test(copeReplyText.value[0])) {
                copeReplyText.dir = "rtl";
            } else {
                copeReplyText.dir = "ltr";
            }

        } else {
            copeMechanismText.value = "";
            copeReplyText.value = "";
            disableInputs();
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

    function enableInputs() {
        copeMechanismText.disabled = false;
        copeReplyText.disabled = false;
    }
    
    function disableInputs() {
        copeMechanismText.disabled = true;
        copeReplyText.disabled = true;
    }
}