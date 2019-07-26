import * as React from 'react';
import Dropzone from 'react-dropzone';

export interface IUploaderProps{

}

export interface IUploaderState{

}

export default class Uploader extends React.Component<IUploaderProps, IUploaderState>{
  constructor(props: IUploaderProps){
    super(props);
  }

  public render(){
    return (
      <Dropzone onDrop={ this.onDrop } >
        {
          ({getRootProps}) => (
            <div { ...getRootProps() } >
              <span>Drop files here to upload...</span>
            </div>
          )
        }
      </Dropzone>
    )
  }

  private onDrop(files: File[]){
    console.log(files);
  }
}