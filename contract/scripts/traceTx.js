const {HttpProvider} = require('open-jsonrpc-provider');
const hashes = require('./traceHash2.json');
const fs = require('fs');
const path = require('path');

const provider = new HttpProvider({url: 'http://127.0.0.1:8545'});

async function main() {
    for(let h of hashes) {
        const trace = await provider.send('debug_traceTransaction', [h.hash, {
            enableMemory: true,
            disableStack: false,
            disableStorage: false,
            enableReturnData: true
        }]);
        const data = {
            hash: h.hash,
            name: h.name,
            method: "debug_traceTransaction",
            trace: trace
        };
        const fileName = path.join(__dirname, '../../holesky-traces', h.name.replaceAll(' ', '_') + '.json');
        fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    }
}

main();
