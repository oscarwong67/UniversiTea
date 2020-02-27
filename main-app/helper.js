

// returns a good response
const goodResponse = (h) => {
    const data = { key: 'value' }
    return h.response(data).code(200);
}

// returns a bad response
const badResponse = (err, h) => {
    console.log(err);
    const data = { key: 'value' }
    return h.response(data).code(400);
}

module.exports = {goodResponse, badResponse};