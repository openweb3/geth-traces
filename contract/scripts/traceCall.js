const {HttpProvider} = require('open-jsonrpc-provider');
const fs = require('fs');
const path = require('path');
const ethers = require('ethers');
const provider = new HttpProvider({url: 'http://127.0.0.1:8545'});

async function main() {
    const name = 'precompiled contract call 3 more parameter';
    const address = '0x77073751dd9e88C2b4Ce9A77cfbFBC9C6038035D';
    const contractMeta = require('../artifacts/contracts/BuiltinContract.sol/EcAddCaller.json');
    const contract = new ethers.Contract(address, contractMeta.abi);

    const tx = await contract.callEcAddWrongInput2.populateTransaction([1,2], [1,2]);
    // https://holesky.etherscan.io/tx/0x87f604753a97564128bcb98e41a1bc92b9de22b3e7f54dd84c5899d3f7bf000b
    const trace = await provider.send('debug_traceCall', [tx, 'latest', {
        enableMemory: true,
        disableStack: false,
        disableStorage: false,
        enableReturnData: true
    }]);
    const data = {
        // hash: h.hash,
        name,
        method: "debug_traceCall",
        trace: trace
    };
    const fileName = path.join(__dirname, '../../holesky-traces', data.name.replaceAll(' ', '_') + '.json');
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
}

main();
