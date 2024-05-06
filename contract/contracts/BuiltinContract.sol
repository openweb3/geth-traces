pragma solidity ^0.8.0;

contract EcAddAssembly {
    function callEcAdd(uint256[2] memory point1, uint256[2] memory point2) public returns (uint256[2] memory) {
        uint256[2] memory result;

        assembly {
            // Free memory pointer
            let ptr := mload(0x40)

            // Store point1 and point2 in memory
            mstore(ptr, mload(point1))
            mstore(add(ptr, 0x20), mload(add(point1, 0x20)))
            mstore(add(ptr, 0x40), mload(point2))
            mstore(add(ptr, 0x60), mload(add(point2, 0x20)))

            // Call the ecAdd precompiled contract (address 0x6)
            let success := staticcall(
                gas(),           // Use all available gas
                0x6,             // Address of ecAdd
                ptr,             // Inputs are at ptr
                0x80,            // Input size (128 bytes = 4 * 32 bytes)
                ptr,             // Store output over inputs
                0x40             // Output size (64 bytes = 2 * 32 bytes)
            )

            // Check for success
            if iszero(success) {
                revert(0, 0)
            }

            // Load the result
            mstore(result, mload(ptr))
            mstore(add(result, 0x20), mload(add(ptr, 0x20)))
        }

        return result;
    }
}

contract EcAddCaller {
    function callEcAdd(uint256[2] memory point1, uint256[2] memory point2) public returns (bytes memory) {
        // Address of the ecAdd precompiled contract
        address ecAddContract = 0x0000000000000000000000000000000000000006;

        // Encode the points into the format expected by the contract
        bytes memory data = abi.encodePacked(point1[0], point1[1], point2[0], point2[1]);

        // Call the ecAdd precompiled contract with the encoded data
        (bool success, bytes memory returnData) = ecAddContract.call(data);

        // Ensure the call was successful
        require(success, "Call to ecAdd contract failed");

        // Return the data returned by the ecAdd contract
        return returnData;
    }

    function callEcAddWrongInput1(uint256[2] memory point1, uint256[2] memory point2) public returns (bytes memory) {
        // Address of the ecAdd precompiled contract
        address ecAddContract = 0x0000000000000000000000000000000000000006;

        // Encode the points into the format expected by the contract
        bytes memory data = abi.encodePacked(point1[0], point1[1], point2[0]);

        // Call the ecAdd precompiled contract with the encoded data
        (bool success, bytes memory returnData) = ecAddContract.call(data);

        // Ensure the call was successful
        require(success, "Call to ecAdd contract failed");

        // Return the data returned by the ecAdd contract
        return returnData;
    }

    function callEcAddWrongInput2(uint256[2] memory point1, uint256[2] memory point2) public returns (bytes memory) {
        // Address of the ecAdd precompiled contract
        address ecAddContract = 0x0000000000000000000000000000000000000006;

        // Encode the points into the format expected by the contract
        bytes memory data = abi.encodePacked(point1[0], point1[1], point2[0], point2[1], point2[1]);

        // Call the ecAdd precompiled contract with the encoded data
        (bool success, bytes memory returnData) = ecAddContract.call(data);

        // Ensure the call was successful
        require(success, "Call to ecAdd contract failed");

        // Return the data returned by the ecAdd contract
        return returnData;
    }
}
