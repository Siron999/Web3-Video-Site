import React, {Component} from "react";
import getWeb3 from "./getWeb3";
import AthenaVideo from './contracts/AthenaVideo.json';
import "./App.css";
import TopBar from "./components/Topbar";
import {Col, Container, Row} from "reactstrap";
import VideoUpload from "./components/VideoUpload";
import VideoViewer from "./components/VideoViewer";
import VideoList from "./components/VideoList";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            buffer: null,
            athenaVideo: null,
            videos: [],
            loading: false,
            currentHash: null,
            currentTitle: null
        };
    }

    setLoading = (loading) => {
        this.setState({
            loading
        });
    }

    setCurrentVideo = (video) => {
        this.setState({
            currentVideo: video
        });
    }

    async componentWillMount() {
        await getWeb3();
        await this.loadData();
    }

    async loadData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        this.setState({
            address: accounts[0]
        });

        const networkId = await web3.eth.net.getId();

        if (AthenaVideo.networks[networkId] && AthenaVideo.networks[networkId].address) {
            const athenaVideo = new web3.eth.Contract(AthenaVideo.abi, AthenaVideo.networks[networkId].address);
            this.setState({athenaVideo});

            //get video count
            const videoCount = await athenaVideo.methods.videoCount().call();
            this.setState({
                videoCount
            });

            //load videos and reverse
            for (let i = videoCount; i >= 1; i--) {
                const video = await athenaVideo.methods.videos(i).call();
                this.setState({
                    videos: [...this.state.videos, video]
                });
            }
            const currentVideo = await athenaVideo.methods.videos(videoCount).call();
            this.setState({
                currentVideo: currentVideo.hashedVideo,
                currentVideoTitle: currentVideo.title
            })
        } else {
            alert("Contract not deployed")
        }
    }

    render() {
        return (
            <>
                <TopBar address={this.state.address}/>
                <Container className="mt-4 p-3">
                    <Row>
                        <Col xs='8' className='h-100'>
                            <VideoViewer currentVideo={this.state.currentVideo}
                                         currentVideoTitle={this.state.currentVideoTitle}/>
                        </Col>
                        <Col xs='4' className='h-100'>
                            <VideoUpload athenaVideo={this.state.athenaVideo} setLoading={this.setLoading}
                                         address={this.state.address}/>
                            <VideoList videos={this.state.videos} setCurrentVideo={this.setCurrentVideo}/>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default App;
