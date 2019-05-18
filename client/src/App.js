import React, { Component } from "react";
import WHO from "./contracts/WHO.json";
import Web3 from "web3";
import "./App.css";

class App extends Component {
  state = { vacCount: null, vaccines: null, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = new Web3('http://127.0.0.1:8545');

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = WHO.networks[networkId];
      const instance = new web3.eth.Contract(
        WHO.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.vaccinate("yellow-feber","1O/O5/19", true).send({ from: accounts[1],gas: 1500000,
    gasPrice: '30000000000000'});
    await contract.methods.vaccinate("Hepatitis A","11/O1/O1", true).send({ from: accounts[1],gas: 1500000,
    gasPrice: '30000000000000'});

    var response = await contract.methods.vaccines("1").call();
    var vacCountResponse =  await contract.methods.vaccinesId().call();

    var result = Object.keys(response).map(function(key) {
      return <li>{[response[key]]}</li>;
    });

    this.setState({ vaccines: result, vacCount: vacCountResponse });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>International certificate of vaccination</h1>
        <p>Decentralized version of WHO Yellow Card </p>
        <h4>Patient address {this.state.accounts[1]}</h4>
        <h4>Total vaccines {this.state.vacCount}</h4>
        <div>
          <ul>{this.state.vaccines}</ul>
        </div>
      </div>
    );
  }
}

export default App;
