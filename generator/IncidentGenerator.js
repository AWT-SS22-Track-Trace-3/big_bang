import IncidentTypes from "./constants";
import helpers from "./helpers";

const IncidentGenerator = () => {
    const getRandomIncidentDefinition = () => {
        let keys = Object.keys(IncidentTypes);

        return IncidentTypes[keys[helpers.getRandomArrayIndex(keys.length)]]
    }

    const generateIncident = (incidentDef, date, chainStep) => {
        if (!incidentDef) return null;

        return {
            product: incidentDef.product,
            type: incidentDef.id,
            name: incidentDef.name,
            description: incidentDef.description,
            chain_step: chainStep,
            reporter: {
                user: "admin",
                timestamp: date
            }
        }
    }

    return {
        getRandomIncidentDefinition,
        generateIncident
    }
}

export default IncidentGenerator;