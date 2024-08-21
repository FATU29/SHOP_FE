
import { NextPage } from 'next';
import React from 'react';
import { useDropzone } from 'react-dropzone';



type TProps = {
    children: React.ReactNode,
    uploadFunc: (file: File) => void,
    objectAcceptFile?: Record<string,string[]>
}


const WrapperFileUpload: NextPage<TProps> = (props: TProps) => {

    const { children, uploadFunc, objectAcceptFile } = props;


    const { getRootProps, getInputProps } = useDropzone({
        accept:objectAcceptFile ? objectAcceptFile : {},
        onDrop: (acceptedFiles) => {
            uploadFunc(acceptedFiles[0])
        },
        maxFiles: 1
    });




    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                {children}
            </div>
        </section>
    );
}


export default WrapperFileUpload;
