const {ethers, JsonRpcProvider, parseEther, Wallet, Contract} = require('ethers');
require('dotenv').config();
const path = require('path');

const { PRIVATE_KEY, RPC_URL } = process.env;

const provider = new JsonRpcProvider(RPC_URL);
const wallet = new Wallet(PRIVATE_KEY, provider);

async function main() {
    // await deployGLDToken();
    let contract = getContarct('GLDToken', '0x216F470C25eb0Bc43840Fca9d1c7533c865Fc51f');

    let tx = await contract.transfer(process.env.TEST_ADDRESS, parseEther('1'));
    await tx.wait();
    console.log('tx hash', tx.hash);
}

main()

async function deployGLDToken() {
    await deployContract('GLDToken', parseEther('10000000'));
}

async function deployLock() {
    let timestamp = Date.now() + 1000*1000;
    await deployContract('Lock', parseInt(timestamp / 1000));
}

function getContarct(name, address) {
    let {abi} = getAbiInfo(name);
    return new Contract(address, abi, wallet);
}

function getAbiInfo(name) {
    return require(path.join(__dirname, `../artifacts/contracts/${name}.sol/${name}.json`));
}

async function deployContract(name, ...args) {
    try {
        let {abi, bytecode} = getAbiInfo(name);
        let factory = new ethers.ContractFactory(abi, bytecode, wallet);
        let contract = await factory.deploy(...args);
        await contract.waitForDeployment();
        let tx = await contract.deploymentTransaction();
        console.log(`${name} deployed to: ${await contract.getAddress()} deploy tx hash ${tx.hash}`);
        return contract;
    } catch (e) {
        console.log(e);
        throw e;
    }
}