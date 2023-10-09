// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OrganizationRegistry {
    address public owner;
    
    struct Organization {
        bool isRegistered;
        address transactionAddress;
    }
    
    mapping(address => Organization) public organizations;
    
    event OrganizationRegistered(address indexed organizationAddress, address transactionAddress);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function registerOrganization() external {
        require(!organizations[msg.sender].isRegistered, "Organization is already registered");
        
        address uniqueTransactionAddress = address(uint160(uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp)))));

        
        organizations[msg.sender] = Organization(true, uniqueTransactionAddress);
        emit OrganizationRegistered(msg.sender, uniqueTransactionAddress);
    }
    
    function getOrganizationTransactionAddress(address organizationAddress) external view returns (address) {
        require(organizations[organizationAddress].isRegistered, "Organization is not registered");
        return organizations[organizationAddress].transactionAddress;
    }
}
