
const baseUrl = "http://192.168.0.108:3000";

async function query(data, url = baseUrl) {
    let pars = Object.keys(data);
    if (pars.length) {
        url += "?";
        for (let i = 0; i < pars.length; ++i) {
            url += `${pars[i]}=${data[pars[i]]}`
            if (i + 1 < pars.length) {
                url += "&";
            }
        }
    }
    return fetch(url);
}

export default query;