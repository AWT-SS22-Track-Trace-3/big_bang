const SerialNumberGenerator = () => {
    let instance;
    let offset = 0;

    function createInstance() {
        return SerialNumberGenerator();
    }

    return {
        getInstance: () => {
            if (!instance) instance = createInstance();
            return instance;
        },
        generate: (length) => {
            const offset_size = `${offset}`.length;
            const random_size = length - offset_size;

            if (length <= offset_size) return null;

            offset += 1;

            return `${offset}${Math.random().toString().substring(2, random_size + 2)}`;
        }
    }
}

export default SerialNumberGenerator;