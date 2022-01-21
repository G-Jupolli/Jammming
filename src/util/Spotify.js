import SearchResults from "../Components/SearchResults/SearchResults";


let accessToken;
const clientID = '2c3437505d2c459c9b7c7bb5cce950e1';
const redirectURL = "http://khal-jammming.surge.sh";

const Spotify = {

    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        
        const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenMatch && expiresMatch) {
            accessToken = tokenMatch[1];
            const expirationTime = Number(expiresMatch[1]);
            window.setTimeout(() => 
                accessToken ='', expirationTime * 1000
            );
            window.history.pushState('Acess Token', null, '/')
            return accessToken;
        }

        const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
        window.location = accessURL;
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`}

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: headers
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            console.log(jsonResponse);
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))
        })
    },

    savePlaylist(playlistName, trackURIs) {
        if (!playlistName && !trackURIs) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`}
        let userID;

        return fetch(`https://api.spotify.com/v1/me`, {
            headers: headers
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: playlistName })
            }).then(response => {
                return response.json();
            }).then(jsonResponse => {
                const playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackURIs })
                })
            })
        })


    }
}

export default Spotify;