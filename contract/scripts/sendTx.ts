import { ethers } from "hardhat";

async function main() {
    // const signer = (await ethers.getSigners())[0];

    const contract = await ethers.getContractAt("EcAddCaller", "0x77073751dd9e88C2b4Ce9A77cfbFBC9C6038035D");

    // const tx = await contract.tryCatchExternalCall(0);
    // 0x51bf5de43f9a1de3d0a289c46eb62c589d268db781c77cf370b28404192e952c  success
    // 0x88dd0e65d2dd7255352837789d48eda6dfe76a02eaba0961030c03566ed73f67  fail

    // const tx = await contract.tryCatchExternalCall('0x0000000000000000000000000000000000000002');
    // 0xd6f35c1b42cec5194169e8011f3fd3041dadc18ff17ae0c63801887226fd1107 Log("invalid address")
    // 0x42e06633441a2c18855c1941cf378e663aa912845aef9c67b31de22c59946bb4 LogBytes("")
    // 0xddb5fb9bce69ff9f9bdf900e413fa143dd768d4fbcf7e1c224e973645e48472e Log("Foo created")

    /* const tx = await signer.sendTransaction({
        // to: '',
        value: ethers.parseEther('0.00001'),
        data: "0xfe",
        gasLimit: '1000000'
    }); */

    // const tx = await contract.setX(0);
    // refund gas
    // 0xf038389f3a24d4ed0aa3c35a5d67e049414c4d7f1c0936ace3ff5d4b6093b884

    const tx = await contract.callEcAddWrongInput1([1, 2], [1, 2]);

    await tx.wait();
    console.log(tx.hash);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1; 
});