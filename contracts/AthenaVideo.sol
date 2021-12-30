pragma solidity >=0.4.21 <0.7.0;

contract AthenaVideo {
    uint public videoCount;
    string public title;
    mapping(uint => Video) public videos;

    struct Video {
        uint id;
        string title;
        string hashedVideo;
        address author;
    }

    event VideoUploaded(
        uint id,
        string hash,
        string title,
        address author
    );

    constructor() public {
    }

    function uploadVideo(string memory _hash, string memory _title) public {

        require(bytes(_hash).length > 0);
        require(bytes(_title).length > 0);
        require(msg.sender != address(0));

        videoCount++;
        videos[videoCount] = Video(videoCount, _title, _hash, msg.sender);

        //emit event
        emit VideoUploaded(videoCount, _title, _hash, msg.sender);
    }
}
