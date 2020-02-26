

// returns a good response
const goodResponse = () => {
    return '200';
}

// returns a bad response
const badResponse = (err) => {
    console.log(err);
    return '400';
}