import helpers from "./helpers";

const init = () => {
    String.prototype.replaceUmlaute = function () {
        return helpers.replaceUmlaut(this);
    }
}

export default init;