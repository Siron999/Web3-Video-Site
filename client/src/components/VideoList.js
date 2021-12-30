import {Card, CardBody, CardTitle} from "reactstrap";
import React from "react";

const VideoList = (props) => {

    const handleVideo = (currentVideo) => {
        props.setCurrentVideo(currentVideo);
    }

    return (
        <>
            <Card className="mt-3 p-2">
                <CardTitle className='border-bottom border-1 pb-2'>
                    Recommended Videos
                </CardTitle>
                <CardBody>
                    <div className="d-flex justify-content-start align-items-center flex-column" style={{
                        overflowY: "scroll"
                    }}>
                        {
                            props.videos && props.videos.map((x) => (
                                <>
                                    <div onClick={() => handleVideo(x.hashedVideo)} className='my-1 d-flex flex-column'
                                         style={{
                                             cursor: 'pointer',
                                             border: '1px solid #3333',
                                             borderRadius: "8px"
                                         }}>
                                        <video src={`https://ipfs.infura.io/ipfs/${x.hashedVideo}`} height="140px"
                                               width="200px" style={{
                                            marginTop: "auto", marginBottom: "auto"
                                        }}/>
                                    </div>
                                    <p className="text-center">{x.title}</p>
                                </>
                            ))
                        }
                    </div>
                </CardBody>
            </Card>
        </>
    )
}

export default VideoList;
