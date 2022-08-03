const IncidentTypes = {
    forgery: {
        id: "forgery",
        name: "Forgery",
        description: "Reported suspect for forged or tampered product.",
        intercept: "any",
        adjustments: []
    },
    checkInError: {
        id: "checkin_error",
        name: "Check-In Error",
        description: "Product checked in but not previously checked out.",
        intercept: "change_of_ownership",
        noPriorShipment: true,
        adjustments: [
            {
                checked_out: false,
                checkout_date: null
            },
            {
                checked_out: false,
                checkout_date: null
            }
        ]
    },
    checkOutError: {
        id: "checkout_error",
        name: "Check-Out Error",
        description: "Product checked out but not previously checked in.",
        intercept: "change_of_ownership",
        adjustments: [
            {
                type: "type_of_ownership",
                checked_in: false,
                checkin_date: null
            }
        ]
    },
    theft: {
        id: "theft",
        name: "Theft",
        description: "Received number of containers does not match specification.",
        intercept: "change_of_ownership",
        adjustments: []
    },
    invalidTransactionDates: {
        id: "invalid_transaction_date",
        name: "Invalid Transaction Dates",
        description: "Transaction dates do not match.",
        intercept: "change_of_ownership",
        adjustments: []
    },
    shipmentRejected: {
        id: "shipment_rejected",
        name: "Shipment Rejected",
        description: "Received wrong number of packages.",
        intercept: "shipment",
        adjustments: []
    },
    generalInconsistency: {
        id: "reported_inconsistency",
        name: "Reported General Inconsistency",
        description: "General inconsistency in transaction data.",
        intercept: "any",
        adjustments: []
    }
}

export default IncidentTypes;