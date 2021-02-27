import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [loaded, setLoaded] = useState(false);
    function autoPasteVaildURL() {
		alert('hi')
	// if (window.confirm('클립보드의 텍스트를 붙여넣을래?')) 
        let t = document.createElement('textarea');
		t.focus();
		document.execCommand('paste');
		console.log(t)
		console.log(t.textContent)
	// }
    }

    useEffect(() => {
        document.addEventListener("click", autoPasteVaildURL, {once:true})
    }, []);

    function copyToClipboard() {
        if (isYoutubeURL() === false) {
            alert('your URL is not a YouTube video');
        } else {
            let url = isYoutubeURL().url;
            let min = document.getElementById('min').value;
            let sec = document.getElementById('sec').value;
            let result = url + '?t=' + (60 * min + 1 * sec);
            let t = document.createElement('textarea');
            document.body.appendChild(t);
            t.value = result;
            t.select();
            document.execCommand('copy');
            document.getElementById('result').value = result;
            document.body.removeChild(t);
            document.getElementById('thumbnail').src =
                'https://i.ytimg.com/vi/' + getThumbnailCode() + '/maxresdefault.jpg';
        }
    }
    // https://i.ytimg.com/vi/M03hNLFsRKY/maxresdefault.jpg
    // https://www.youtube.com/watch?v=8Wtvn2LBQHM&feature=youtu.be
    // https://youtu.be/8Wtvn2LBQHM

    function getThumbnailCode() {
        if (isYoutubeURL() === false) return null;
        let url = isYoutubeURL().url;
        let urltype = isYoutubeURL().urltype;
        let protocol = isYoutubeURL().protocol;
        if (urltype === 'shortURL') {
            if (protocol === 'https') return url.slice(17);
            else if (protocol === 'http') return url.slice(16);
            else if (protocol === null) return url.slice(9);
        }
        if (urltype === 'fullURL') {
            let start = url.indexOf('v=') + 2;
            let end = url.indexOf('&');

            return url.slice(start, start + 11);
        }
    }

    function isYoutubeURL() {
        let originallink = document.getElementById('originallink').value;
        if (originallink.includes('?t=')) {
            originallink = originallink.slice(0, originallink.indexOf('?t='));
        }
        if (originallink.slice(8, 16) === 'youtu.be') {
            return { protocol: 'https', urltype: 'shortURL', url: originallink };
        } else if (originallink.slice(7, 15) === 'youtu.be') {
            return { protocol: 'http', urltype: 'shortURL', url: originallink };
        } else if (originallink.slice(0, 8) === 'youtu.be') {
            return { protocol: null, urltype: 'shortURL', url: originallink };
        } else if (originallink.slice(0, 15) === 'www.youtube.com') {
            return { protocol: null, urltype: 'fullURL', url: originallink };
        } else if (originallink.slice(7, 22) === 'www.youtube.com') {
            return { protocol: 'http', urltype: 'fullURL', url: originallink };
        } else if (originallink.slice(8, 23) === 'www.youtube.com') {
            return { protocol: 'https', urltype: 'fullURL', url: originallink };
        } else return false;
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Youtube specific time URL Generator</h1>
                <div className="main">
                    <input id="originallink" type="text" size="30" placeholder="link" required />
                    <br />
                    <input
                        id="min"
                        type="text"
                        minLength="1"
                        maxLength="4"
                        size="14"
                        placeholder="min"
                        required
                    />
                    <input
                        id="sec"
                        type="text"
                        minLength="1"
                        maxLength="2"
                        size="14"
                        placeholder="sec"
                        required
                    />
                </div>
                <br />
                <button onClick={() => copyToClipboard()}>submit</button>
                <input id="result" type="text" size="30" placeholder="result" />
                <img id="thumbnail"></img>
            </header>
        </div>
    );
}

export default App;