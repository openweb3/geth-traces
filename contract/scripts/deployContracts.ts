import { ethers } from "hardhat";

async function main() {
    const toDeployContracts = [
        // 'Trace', 
        // 'AssemblyVariable', 
        // 'Receiver', 
        // 'contracts/Call.sol:Caller',
        // 'contracts/CommonCall.sol:Caller',
        // 'CarFactory', 
        // 'Callee', 
        // 'Factory', 
        // 'FactoryAssembly', 
        // 'DelegateB',
        // "DelegateA",
        // "Error",
        // "MultiCall",
        // "TestMultiCall",
        // "Selfdestruct",
        // "BytecodeContractFactory",
        // 'EcAddAssembly',
        'EcAddCaller',
        // 'TryCatchFoo',
        // 'TryCatchBar',
        // 'RefundGas',
    ];

    for(let contractName of toDeployContracts) {
        const contract = await ethers.deployContract(contractName);
        await contract.waitForDeployment();
        console.log(
            `${contractName} deployed to ${contract.target} deploy hash: ${contract.deploymentTransaction()?.hash}`
        );
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
