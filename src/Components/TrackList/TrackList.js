import './TrackList.css';
import React from 'react';
import Track from './../Track/Track';

class TrackList extends React.Component{
    render() {
        // console.log(this.props)
        return (
            <div className="TrackList">
                {
                    this.props.tracks.map(track => {
                        return <Track
                            key={track.id}
                            track={track}
                        />;
                    })
                }
            </div>
        )
    }
}

export default TrackList;