export const truncateAddress = (address, dots = 6) => {
    if (!address) return "No Account";
    const match = address.match(
      /^(0x[a-zA-Z0-9]{7})[a-zA-Z0-9]+([a-zA-Z0-9]{12})$/
    );
    if (!match) return address;
    return `${match[1]}${' .'.repeat(dots)} ${match[2]}`;
};

export const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
};

export const copy2Clipboard = (text) => {
    navigator.clipboard.writeText(text);
}

export const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return true
    }
    return false
}

export function batchCall(web3, calls, callFrom = undefined) {
    let batch = new web3.BatchRequest();
    let promises = calls.map(call => {
        return new Promise((resolve, reject) => {
            let request = call.request({from: callFrom}, (error, data) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
            batch.add(request);
        });
    });

    batch.execute();

    return Promise.all(promises);
}
