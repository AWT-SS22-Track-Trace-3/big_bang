import SerialNumberGenerator from "./SerialNumberGenerator";

const SupplyChainBuilder = () => {
    let supply_chain = []

    const init = () => {
        supply_chain = [];
    }

    const addCreation = (owner, futureOwner = undefined) => {
        supply_chain.push({
            id: 0,
            type: "change_of_ownership",
            transaction_date: owner.transaction_date,
            checkin_date: owner.transaction_date,
            checked_in: true,
            checked_out: false,
            owner: owner.username,
            future_owner: futureOwner ? futureOwner : null

        })
    }

    const addOwnership = (owner, futureOwner = undefined) => {
        let nextIndex = supply_chain.length;

        supply_chain.push({
            id: nextIndex,
            type: "change_of_ownership",
            transaction_date: owner.transaction_date,
            checkin_date: owner.checkin_date,
            checkout_date: owner.checkout_date ? owner.checkout_date : null,
            checked_in: true,
            checked_out: true,
            owner: owner.username,
            future_owner: futureOwner ? futureOwner : null
        })
    }

    const addShipment = (owner) => {
        let nextIndex = supply_chain.length;

        supply_chain[nextIndex - 1].checked_out = true

        supply_chain.push({
            id: nextIndex,
            type: "shipment",
            shipment_method: "air",
            tracking_number: SerialNumberGenerator().generate(12),
            date_shipped: owner.shipment_date,
            date_delivered: owner.delivery_date,
            owner: owner.username
        })
    }

    const addTermination = (owner) => {
        let nextIndex = supply_chain.length;

        supply_chain[nextIndex - 1].checked_out = true

        supply_chain.push({
            id: nextIndex,
            type: "termination",
            transaction_date: owner.transaction_date,
            owner: owner.username
        })
    }

    const addIncident = (incident) => {
        if (!incident) return;

        if (incident.adjustments.length > 0) {
            let adjIndex = incident.adjustments.length - 1;
            for (let i = supply_chain.length - 1; i >= 0; i--) {

                //console.log(supply_chain)
                if (supply_chain[i].type === incident.intercept || incident.intercept === "any") {
                    supply_chain[i] = { ...supply_chain[i], ...incident.adjustments[adjIndex] };

                    adjIndex--;
                }

                if (adjIndex < 0) break;
            }
        }
    }

    const getLastIndex = () => {
        return supply_chain.length - 1;
    }

    return {
        init,
        addCreation,
        addOwnership,
        addShipment,
        addTermination,
        addIncident,
        getLastIndex,
        build: () => (supply_chain)
    }
}

export default SupplyChainBuilder;