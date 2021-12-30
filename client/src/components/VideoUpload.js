import React, {useState} from 'react'
import {Button, Card, CardBody, CardTitle, Form, FormGroup, Input} from "reactstrap";
import {create} from 'ipfs-http-client'

const ipfs = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})

const VideoUpload = (props) => {
    const [title, setTitle] = useState('');
    const [buffer, setBuffer] = useState('');

    const uploadFile = async (e) => {
        e.preventDefault();
        props.setLoading(true);
        const result = await ipfs.add(buffer);
        props.athenaVideo.methods.uploadVideo(result.path, title).send({from: props.address}).on('transactionHash', (hash) => {
            window.location.reload();
            props.setLoading(false);
        })
    }

    const getFile = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            setBuffer(Buffer(reader.result));
        }
    }

    return (
        <>
            <Card className='p-3'>
                <CardTitle className='border-bottom border-1 pb-2'>
                    Upload Content
                </CardTitle>
                <CardBody>
                    <Form onSubmit={uploadFile}>
                        <FormGroup>
                            <Input type="text" placeholder="Title" value={title}
                                   onChange={(e) => setTitle(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Input type="file" onChange={getFile}/>
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" color="dark" className="me-auto ms-auto">Upload</Button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </>
    )
};

export default VideoUpload;
