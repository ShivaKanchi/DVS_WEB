pragma solidity ^0.5.0;

// 2.Store the Video
// 3.Upload the Video
// 4.List the Video
contract DVS_WEB {
    uint public videoCount = 0;
    string public name = "DVS_WEB";
    //Create id=>struct mapping
    mapping(uint => Video) public videos;

    // 1.Model the video
    //Create Struct(Customized Data Types)
    struct Video {
        uint id; //unique identifier
        string hash; //ipfs hash
        string title; //video title
        address author; //address of uploader
    }

    //Create Event
    event VideoUploaded(uint id, string hash, string title, address author);

    constructor() public {}

    function uploadVideo(
        string memory _videoHash,
        string memory _title
    ) public {
        // Make sure the video hash exists
        require(bytes(_videoHash).length > 0); //means this condition is necessary to execute this function
        // Make sure video title exists
        require(bytes(_title).length > 0);
        // Make sure uploader address exists
        require(msg.sender != address(0));

        // Increment video id
        videoCount++;

        // Add video to the contract
        //msg is a global variable in solidity
        videos[videoCount] = Video(videoCount, _videoHash, _title, msg.sender);

        // Trigger an event(to know when the video is uploaded)
        emit VideoUploaded(videoCount, _videoHash, _title, msg.sender);
    }
}
