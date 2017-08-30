let getProductionId = (production) => {
    return `${production[0]} := ${production[1].join(' ')}`;
};

// ignore whitespace
let processTokens = (rawTokens) => {
    let tokens = [];
    for (let i = 0; i < rawTokens.length; i++) {
        let {
            text,
            tokenType
        } = rawTokens[i];

        let name = tokenType.name;

        if (name !== 'whitespace') { // ignore white space
            tokens.push({
                text,
                name
            });
        }
    }

    return tokens;
};

module.exports = {
    getProductionId,
    processTokens
};
