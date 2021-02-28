import React, { useState, useEffect } from 'react';
import './App.css';
import key from './api/youtubeapi.js'

function App() {
    // const [loaded, setLoaded] = useState(false);
    // function autoPasteVaildURL() {
    //     alert('hi');
    //     // if (window.confirm('클립보드의 텍스트를 붙여넣을래?'))
    //     let t = document.createElement('textarea');
    //     t.focus();
    //     document.execCommand('paste');
    //     console.log(t);
    //     console.log(t.textContent);
    //     // }
    // }

    // useEffect(() => {
    //     document.addEventListener('click', autoPasteVaildURL, { once: true });
    // }, []);

    function onSubmit() {
        let data;
        let inputURL = document.getElementById('originallink').value;
        let min = document.getElementById('min');
        let sec = document.getElementById('sec');

        if (isEmpty(inputURL)) {
            alert('enter your URL');
            return;
        } else {
            data = isYoutubeURL(inputURL);
            if (data === false) {
                alert('check your URL.\nyour URL may not a YouTube video');
                return;
            }
        }
        if (!isNumber(min.value) && !isEmpty(min.value)) {
            alert(min.value + ' is not a integer'); return;
        } else if (!isNumber(sec.value) && !isEmpty(sec.value)) {
            alert(sec.value + ' is not a integer'); return;
        } else if (sec.value >= 60) {
            alert('sec must be smaller than 60'); return;
        }
        if (isEmpty(min.value)) min.value = 0;
        if (isEmpty(sec.value)) sec.value = 0;
		let videoCode = getVideoCode(data);
		let resultURL = makeResult(data, min.value, sec.value);
        copyToClipboard(resultURL);
		showResult(resultURL, videoCode);
    }
	
	function makeResult(data, min, sec) {
		let videoCode = getVideoCode(data);
        let result = 'https://youtu.be/'+videoCode+'?t=' + (60 * min + 1 * sec);
		// https://youtu.be/cxNIewNXpcg?list=RDcxNIewNXpcg
        if (min == 0 && sec == 0) {
            result = 'https://youtu.be/'+videoCode;
        } else {
            result = 'https://youtu.be/'+videoCode+'?t=' + (60 * min + 1 * sec);
        }
		return result;
	}

    function copyToClipboard(textdata) {
        let t = document.createElement('textarea');
        document.body.appendChild(t);
        t.value = textdata;
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
    }
	
	function copyResultToClipboard() {
		let result = document.querySelector('#result').value;
		if (result) {
			copyToClipboard(result);
			setTimeout(() => alert('URL copied!'),300)
		}
	}
		
	function showResult(resultURL, videoCode){
		// fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+videoCode+'&key='+key)
		// 	.then( (res) => { alert(res); res.json(); console.log(res);})
		// 	.then( (json) => console.log(JSON.stringify(json)) )
        document.getElementById('result').value = resultURL;
        let thumbnailURL = 'https://i.ytimg.com/vi/' + videoCode + '/maxresdefault.jpg';
        document.getElementById('thumbnail').src = thumbnailURL;
		setTimeout(() => alert('URL copied!'),300)
	}
    // https://i.ytimg.com/vi/M03hNLFsRKY/maxresdefault.jpg (maxresdefault, sddefault, 0)
    // https://www.youtube.com/watch?v=8Wtvn2LBQHM&feature=youtu.be
    // https://youtu.be/8Wtvn2LBQHM

    function getVideoCode(data) {
        let _url = data.url;
        let urltype = data.urltype;
        if (urltype === 'shortURL') {
            return _url.slice(9);
        }
        if (urltype === 'fullURL') {
            let start = _url.indexOf('v=') + 2;
            let end = start + 11;
            return _url.slice(start, end);
        }
    }

    function isYoutubeURL(inputURL) {
		let listcode = null;
        if (inputURL.includes('?t=')) {
            inputURL = inputURL.slice(0, inputURL.indexOf('?t='));
        }
        if (inputURL.includes('?list=')) {
			let start = inputURL.indexOf('?list=')+6
            listcode = inputURL.slice(start,start+13);
        }
        if (inputURL.slice(8, 16) === 'youtu.be') {
            return { protocol: 'https', urltype: 'shortURL', url: inputURL.slice(8), listcode };
        } else if (inputURL.slice(7, 15) === 'youtu.be') {
            return { protocol: 'http', urltype: 'shortURL', url: inputURL.slice(7), listcode };
        } else if (inputURL.slice(0, 8) === 'youtu.be') {
            return { protocol: null, urltype: 'shortURL', url: inputURL, listcode };
        } else if (inputURL.slice(0, 15) === 'www.youtube.com') {
            return { protocol: null, urltype: 'fullURL', url: inputURL.slice(4), listcode };
        } else if (inputURL.slice(7, 22) === 'www.youtube.com') {
            return { protocol: 'http', urltype: 'fullURL', url: inputURL.slice(11), listcode };
        } else if (inputURL.slice(8, 23) === 'www.youtube.com') {
            return { protocol: 'https', urltype: 'fullURL', url: inputURL.slice(12), listcode };
        } else if (inputURL.slice(0, 11) === 'youtube.com') {
            return { urltype: 'fullURL', url: inputURL };
        } else return false;
    }

    function isNumber(val) {
        if (val == parseInt(val)) return true;
        else return false;
    }

    function isEmpty(val) {
        if (val == null || val == '' || val == undefined) return true;
        else return false;
    }
	
	function share(){
        let t = document.createElement('textarea');
        document.body.appendChild(t);
        t.value = window.location;
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
		setTimeout(() => alert('URL copied!'),300)
	}

    return (
        <div className="App">
            <header className="App-header">
                <h1 id="title">Youtube specific time URL Generator</h1>
                <div className="main">
                    <input id="originallink" type="text" className='width100' placeholder="original URL" />
					<div className="inputs width100">
                    <input
                        id="min"
                        type="text"
                        minLength="1"
                        maxLength="4"
                        size="6"
                        placeholder="min"
                    />&nbsp;&nbsp;:&nbsp;&nbsp;
                    <input
                        id="sec"
                        type="text"
                        minLength="1"
                        maxLength="2"
                        size="6"
                        placeholder="sec"
                    />
						<button id="submit" onClick={() => onSubmit()}>submit</button>
					</div>
                	<input id="result" type="text" placeholder="result" readOnly style={{width:'100%'}} onClick={() => copyResultToClipboard()}/>
                </div>
            </header>
			<img id="thumbnail" alt=""></img>
			<button id="share" onClick={() => share()}>share this page</button>
        </div>
    );
}

export default App;