import React, { Component } from 'react';
import blockgif from '../media/Block.gif'

class Main extends Component {

  render() {
    return (
      <div className="container-fluid text-monospace bg-dark">
        <br></br>
        &nbsp;
        <br></br>
        <br></br>
        <div className="row" >

          <div className="col-md-10">
            {this.props.currentHash ? (<>
              <div className="embed-responsive embed-responsive-16by9" style={{ maxHeight: '768px' }}>
                {/* Video */}
                <video
                  src={`https://ipfs.infura.io/ipfs/${this.props.currentHash}`}
                  controls
                />
              </div>
              {/* Title */}
              <h3><b><i>{this.props.currentTitle}</i></b></h3>
            </>)
              : (
                <div className='d-flex justify-content-center align-items-center' style={{ height: '649px' }} >
                  <img src={blockgif} width='160' height='160' />
                </div>
              )
            }
          </div>

          <div className="col-md-2 overflow-auto text-center" style={{ maxHeight: '768px', minWidth: '150px' }}>
            <h5 className='formtitle m-2'><b>Share Video</b></h5>


            <form onSubmit={(event) => {
              // {/* Upload Video */ }
              event.preventDefault()
              const title = this.videoTitle.value
              this.props.uploadVideo(title)
            }} >
              &nbsp;
              <div className='formbody'>

                {/* Get Video */}
                <div className="form-group mr-sm-2">
                  <input
                    type='file'
                    className='videoinput'
                    accept='.mp4, .mkv .ogg, .wmv'
                    onChange={this.props.captureFile}
                    style={{ width: '130px' }}
                  />
                </div>
                <div className="form-group mr-sm-2">
                  {/* Input */}
                  <input
                    id='videoTitle'
                    type='text'
                    className='form-control-sm'
                    placeholder='Title of Video'
                    ref={(input) => { this.videoTitle = input }}
                    required
                  />
                </div>
                {/* Button */}
                <button type='submit' className='btn btn-secondary btn-block btn-sm'>Upload</button>

              </div>
              &nbsp;
            </form>


            {/* Map Video */}
            {this.props.videos?.map((video, key) => {
              // {/* Return Video */ }
              return (
                <div id={key} className='card mb-4 text-center bg-secondary mx-auto' style={{ width: '175px' }}>
                  <div className="card-title bg-dark">
                    <small className="text-white"><b>{video.title}</b></small>
                  </div>
                  <div>
                    {/* Change Video */}
                    <p onClick={() => this.props.changeVideo(video.hash, video.title)}>
                      {/* Return Side Videos */}
                      <video
                        src={`https://ipfs.infura.io/ipfs/${video.hash}`}
                        style={{ width: '150px' }}
                      />
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div >
    );
  }
}

export default Main;