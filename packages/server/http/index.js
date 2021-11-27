const axios = require("axios").default;

export async function get(url, options) {
    const { params } = options;
    const resp = await axios.get(url, {
        params,
    });
    return resp.data;
}
