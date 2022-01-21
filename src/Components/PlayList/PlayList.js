import './Playlist.css';
import React from 'react';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component{
    constructor(props) {
        super(props);

        this.handleNamechange = this.handleNamechange.bind(this);
    }


    handleNamechange(event) {
        this.props.onNamechange(event.target.value)
    }

    render() {
        // console.log(this.props)
        return (
            <div className="Playlist">
            <input defaultValue={"New Playlist"} onChange={this.handleNamechange}/>
            <TrackList 
                tracks={this.props.playlistTracks}
                onRemove={this.props.onRemove}
                isRemoval={true}
            />
            <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;