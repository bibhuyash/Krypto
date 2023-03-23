const { expect } = require('chai');
const { ethers } = require('hardhat')

describe("Transactions", function () {
  let transactions;

  beforeEach(async function () {
    const Transactions = await ethers.getContractFactory("Transactions");
    transactions = await Transactions.deploy();
    await transactions.deployed();
  });

  it("should add a transaction to the blockchain and emit an event", async function () {
    const sender = ethers.constants.AddressZero;
    const receiver = "0x1234567890123456789012345678901234567890";
    const amount = ethers.utils.parseEther("1");
    const message = "Test transaction";
    const keyword = "Test keyword";

    const tx = await transactions.addToBlockchain(receiver, amount, message, keyword);
    const receipt = await tx.wait();

    expect(receipt.events).to.have.lengthOf(1);
    expect(receipt.events[0].event).to.equal("Transfer");
    expect(receipt.events[0].args.receiver).to.equal(receiver);
    expect(receipt.events[0].args.amount).to.equal(amount);
    expect(receipt.events[0].args.message).to.equal(message);
    expect(receipt.events[0].args.keyword).to.equal(keyword);

    const txCount = await transactions.getTransactionCount();
    expect(txCount).to.equal(1);

    const allTransactions = await transactions.getAllTransaction();
    expect(allTransactions).to.have.lengthOf(1);
    expect(allTransactions[0].receiver).to.equal(receiver);
    expect(allTransactions[0].amount).to.equal(amount);
    expect(allTransactions[0].message).to.equal(message);
    expect(allTransactions[0].keyword).to.equal(keyword);
  });
});
