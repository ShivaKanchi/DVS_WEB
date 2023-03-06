pragma solidity ^0.5.0;
//Model the video
//Store the Video
//Upload the Video
//List the Video
contract DVS_WEB {
  uint public videoCount = 0;
  string public name = "DVS_WEB";
  //Create id=>struct mapping

  //Create Struct
struct Video{
  uint id;
  string hash;
  string title;
  address author;
}

  //Create Event


  constructor() public {
  }

  function uploadVideo(string memory _videoHash, string memory _title) public {
    // Make sure the video hash exists

    // Make sure video title exists

    // Make sure uploader address exists


    // Increment video id

    // Add video to the contract

    // Trigger an event

  }
}
