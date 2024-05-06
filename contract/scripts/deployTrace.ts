import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.deployContract("Trace");

  await contract.waitForDeployment();

  console.log(
    `Trace deployed to ${contract.target} deploy hash: ${contract.deploymentTransaction()?.hash}`
  );
  // Trace deployed to 0x14D52FDb2A7556ac8Db928bFC1121Ea7D2BEDa40 deploy hash: 0x1cfb5a0f1e2358772ca9398a92c14c66bb56ddc956ae15ca332b5ef11a0daee1 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
