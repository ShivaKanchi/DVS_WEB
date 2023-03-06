pragma solidity ^0.5.0;

// 2.Store the Video
// 3.Upload the Video
// 4.List the Video
contract DVS_WEB {
    uint public videoCount = 0;
    string public name = "DVS_WEB";
    //Create id=>struct mapping
    mapping(uint => Video) public Videos;

    // 1.Model the video
    //Create Struct(Customized Data Types)
    struct Video {
        uint id; //unique identifier
        string hash; //ipfs hash
        string title; //video title
        address author; //address of uploader
    }

    //Create Event

    constructor() public {}

    function uploadVideo(
        string memory _videoHash,
        string memory _title
    ) public {
        // Make sure the video hash exists
        // Make sure video title exists
        // Make sure uploader address exists
        // Increment video id
        videoCount++;
        // Add video to the contract
        //msg is a global variable in solidity
        Videos[videoCount] = Video(videoCount, _videoHash, _title, msg.sender);
        // Trigger an event
    }
}
