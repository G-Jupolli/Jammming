import './Track.css';
import React from 'react';

class Track extends React.Component{
    constructor(props) {
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction() {
        if (this.props.isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack} >-</button>
        } else {
            return <button className="Track-action" onClick={this.addTrack} >+</button>
        }
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track)
    }

    render() {
        // console.log(this.props)
        let name = this.props.track.name;
        let artist = this.props.track.artist;
        let album = this.props.track.album;

        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{name}</h3>
                    <p>{artist} |  {album} </p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}

export default Track;