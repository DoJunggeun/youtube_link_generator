import React, { Componentm, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [link, setLink] = useState('');
    const [min, setMin] = useState('');
    const [sec, setSec] = useState('');

    function onSubmit() {
        let originallink = document.getElementById('originallink');
        let min = document.getElementById('min');
        let sec = document.getElementById('sec');
        let result = originallink + '?t=' + (60 * min + sec);
        result.select();
        document.execCommand('Copy');
    }
    function copyToClipboard() {
        let originallink = document.getElementById('originallink').value;
        let min = document.getElementById('min').value;
        let sec = document.getElementById('sec').value;
        let result = originallink + '?t=' + (60 * min + 1 * sec);
        let t = document.createElement('textarea');
        document.body.appendChild(t);
        t.value = result;
        t.select();
        document.execCommand('copy');
        document.getElementById('result').value = result;
        document.body.removeChild(t);
		document.getElementById('thumbnail').src = 'https://i.ytimg.com/vi/'+ getThumbnailCode() +'/maxresdefault.jpg'
    }
    // https://i.ytimg.com/vi/M03hNLFsRKY/maxresdefault.jpg
	// https://www.youtube.com/watch?v=8Wtvn2LBQHM&feature=youtu.be
	// https://youtu.be/8Wtvn2LBQHM
	
	function getThumbnailCode() {
        let originallink = document.getElementById('originallink').value;
		if (originallink.slice(8,16) == 'youtu.be' ) {
			return originallink.slice(17)
		}
		if ( originallink.slice(8,23) == 'www.youtube.com' ) {
			let start = originallink.indexOf('v=')+2
			let end = originallink.indexOf('&')
			return originallink.slice(start,end)
		}
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