import React, {useEffect} from 'react'
import {Card, CardBody, Col, Row,} from "reactstrap";
import {Player, ControlBar} from 'video-react';

let videoPlayer;

const VideoViewer = (props) => {
    useEffect(() => {
        videoPlayer.load();
    }, [props.currentVideo])
    return (
        <>
            <Card className='p-3'>
                <CardBody>
                    {/*/>*/}
                    <Player ref={(player) => {
                        videoPlayer = player
                    }} width="800" height="600">
                        <source src={`https://ipfs.infura.io/ipfs/${props.currentVideo}`}/>
                        <ControlBar autoHide={false}/>
                    </Player>
                    <h5 className='mt-3'>{props.currentVideoTitle}</h5>
                </CardBody>
            </Card>
        </>
    )
}

export default VideoViewer;
