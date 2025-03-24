console.log("loading models");

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