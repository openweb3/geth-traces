# trace examples

本文件夹中为以太坊 holesky 测试网络中典型的几种交易的 trace, 使用 geth v1.3.2 获取. Json 文件中的 `trace` 字段即是 RPC 返回的结果.

1. 普通 eth 转账
2. create, create2
3. erc20 转账, erc721 转账
4. 调用 builtin 函数(keccak256)的行为
5. selfdestruct
6. out of gas fail
7. require, revert, assert fail 
8. try catch
9. precompiled contract
10. refund gas
11. invalid opcode: 0xfe

## 其他

1. 内置合约: https://www.rareskills.io/post/solidity-precompiles
2. [holesky testnet contract internal transactions](https://holesky.etherscan.io/txsInternal)