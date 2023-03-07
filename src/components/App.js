import React, { Component } from 'react';
import DVS_WEB from '../abis/DVS_WEB.json'
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  //connects with blockchain with metamask for web application
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    //Load accounts
    const accounts = await web3.eth.getAccounts()//returns all acounts in metmask
    // console.log(accounts)

    //Add first account the the state
    this.setState({ account: accounts[0] })

    //Get network ID
    const networkId = await web3.eth.net.getId()

    //Get network data
    const networkData = DVS_WEB.networks[networkId]

    //Check if net data exists, then
    if (networkData) {

      //Assign DVS_WEB contract to a variable 
      const dvs_video = new web3.eth.Contract(DVS_WEB.abi, networkData.address)
      // console.log("->", dvs_video)

      //Add DVS_WEB to the state
      this.setState({ dvs_video })

      //Check videoAmounts
      const videosCount = await dvs_video.methods.videoCount().call()

      //Add videoAmounts to the state
      this.setState({ videosCount })

      //Load Videos
      //Iterate throught videos and add them to the state (sort by newest)
      for (var i = videosCount; i >= 1; i--) {
        const video = await dvs_video.methods.videos(i).call()
        this.setState({
          videos: [...this.state.videos, video]
        })
      }

      //Set latest video and it's title to view as default 
      const latest = await dvs_video.methods.videos(videosCount).call()

      //Set loading state to false
      this.state({
        currentHash: latest.hash,
        currentTitle: latest.title
      })
      this.setState({ loading: false })

    }

    //If network data doesn't exisits, log error
    else {
      window.alert('DVS contract not deployed to detected network')
    }

  }

  //Get video
  captureFile = event => {

  }

  //Upload video
  uploadVideo = title => {

  }

  //Change Video
  changeVideo = (hash, title) => {

  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      //set states     
      account: ''
    }

    //Bind functions
  }

  render() {
    return (
      <div>
        <Navbar
          //Account
          account={this.state.account}
        />
        {this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
          //states&functions
          />
        }
      </div>
    );
  }
}

export default App;