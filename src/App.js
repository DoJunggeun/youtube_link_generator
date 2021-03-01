import React, { useState, useEffect } from 'react';
import './App.css';
import key from './api/youtubeapi.js';

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

    function onInputURLChange() {
        let inputURL = document.getElementById('originallink').value;
        let inputTooltips = document.querySelectorAll('.input-tooltip');
        // inputURL이 유튜브 링크 맞으면 썸네일 가져오기
        if (inputURL == '') {
            inputTooltips.forEach((item) => (item.style.opacity = 0));
        } else {
            let data = isYoutubeURL(inputURL);
            if (data) {
                inputTooltips.forEach((item) => (item.style.opacity = 0));
                let videoCode = getVideoCode(data.url, data.urltype);
                showThumbnail(videoCode);
            } else if (!data) {
                inputTooltips.forEach((item) => (item.style.opacity = 1));
            }
        }
    }

    function onTimeChange() {
        // validate min & sec
        let min = document.getElementById('min');
        let sec = document.getElementById('sec');
        if (!isNumber(min.value) && !isEmpty(min.value)) {
            alert(min.value + ' is not a integer');
            min.value = '';
            return;
        } else if (!isNumber(sec.value) && !isEmpty(sec.value)) {
            alert(sec.value + ' is not a integer');
            sec.value = '';
            return;
        } else if (sec.value >= 60) {
            alert('sec must be smaller than 60');
            sec.value = sec.value.slice(0, 1);
            return;
        }
    }

    function onSubmit() {
        let data;
        let inputURL = document.getElementById('originallink').value;
        let min = document.getElementById('min');
        let sec = document.getElementById('sec');

        if (isEmpty(inputURL)) {
            alert('Enter your URL');
            return;
        } else {
            data = isYoutubeURL(inputURL);
            if (data === false) {
                alert('Check your URL\nYour URL might be wrong');
                return;
            }
        }
        if (isEmpty(min.value)) min.value = 0;
        if (isEmpty(sec.value)) sec.value = 0;
        let videoCode = getVideoCode(data.url, data.urltype);
        let resultURL = makeResult(data, min.value, sec.value);
        copyToClipboard(resultURL);
        showResult(resultURL, videoCode);
		showData(videoCode);
		let submitTooltips = document.querySelectorAll('.submit-tooltip');
		submitTooltips.forEach((item) => (item.style.opacity = 1));
    }

    function makeResult(data, min, sec) {
        let videoCode = getVideoCode(data.url, data.urltype);
        let result = 'https://youtu.be/' + videoCode + '?t=' + (60 * min + 1 * sec);
        // https://youtu.be/cxNIewNXpcg?list=RDcxNIewNXpcg
        if (min == 0 && sec == 0) {
            result = 'https://youtu.be/' + videoCode;
        } else {
            result = 'https://youtu.be/' + videoCode + '?t=' + (60 * min + 1 * sec);
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
            setTimeout(() => alert('URL copied!'), 300);
        }
    }

    function showResult(resultURL, videoCode) {
        document.getElementById('result').value = resultURL;
        setTimeout(() => alert('URL copied!'), 300);
    }

    function showData(videoCode) {
        fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+videoCode+'&key='+key)
        	.then( (res) => res.json() )
        	.then( (json) => console.log(JSON.stringify(json)) )
    }
	
	
	
    function showThumbnail(videoCode) {
        let image = document.getElementById('thumbnail');
        let thumbnailURL = 'https://i.ytimg.com/vi/' + videoCode + '/maxresdefault.jpg';
        image.src = thumbnailURL;
        if (image.naturalHeight == 90)
            image.src = 'https://i.ytimg.com/vi/' + videoCode + '/hddefault.jpg';
        if (image.naturalHeight == 90)
            image.src = 'https://i.ytimg.com/vi/' + videoCode + '/sddefault.jpg';
        if (image.naturalHeight == 90) image.src = 'https://i.ytimg.com/vi/' + videoCode + '/0.jpg';
    }
    // https://i.ytimg.com/vi/M03hNLFsRKY/maxresdefault.jpg (maxresdefault, sddefault, 0)
    // https://www.youtube.com/watch?v=8Wtvn2LBQHM&feature=youtu.be
    // https://youtu.be/8Wtvn2LBQHM

    function getVideoCode(url, urltype) {
        let _url = url;
        let _urltype = urltype;
        if (_urltype === 'shortURL') {
            return _url.slice(9);
        }
        if (_urltype === 'fullURL') {
            let start = _url.indexOf('v=') + 2;
            let end = start + 11;
            return _url.slice(start, end);
        }
    }

    function isYoutubeURL(inputURL) {
        let listcode = null;
        if (inputURL.includes('?t=')) {
            // t 있는지 check
            inputURL = inputURL.slice(0, inputURL.indexOf('?t='));
        }
        if (inputURL.includes('?list=')) {
            // list 있는지 체크
            let start = inputURL.indexOf('?list=') + 6;
            listcode = inputURL.slice(start, start + 13);
        }
        if (inputURL.includes('youtu.be')) {
            let videoCodeStart = inputURL.indexOf('youtu.be') + 9; // youtu.be/(videoCode)
            let videoCodeEnd = videoCodeStart + 11;
            if (inputURL.slice(videoCodeStart, videoCodeEnd).length < 11) {
                return false;
            }
            if (inputURL.slice(8, 16) === 'youtu.be') {
                // https
                return { urltype: 'shortURL', url: inputURL.slice(8), listcode };
            }
            if (inputURL.slice(7, 15) === 'youtu.be') {
                // http
                return { urltype: 'shortURL', url: inputURL.slice(7), listcode };
            }
            if (inputURL.slice(0, 8) === 'youtu.be') {
                return { urltype: 'shortURL', url: inputURL, listcode };
            }
        }
        if (inputURL.includes('youtube.com')) {
            let videoCodeStart = inputURL.indexOf('?v=') + 3;
            let videoCodeEnd = videoCodeStart + 11;
            if (inputURL.slice(videoCodeStart, videoCodeEnd).length < 11) {
                return false;
            }
            if (inputURL.slice(0, 11) === 'youtube.com') {
                // www 생략
                return { urltype: 'fullURL', url: inputURL, listcode };
            }
            if (inputURL.slice(4, 15) === 'youtube.com') {
                return { urltype: 'fullURL', url: inputURL.slice(4), listcode };
            }
            if (inputURL.slice(11, 22) === 'youtube.com') {
                // http
                return { urltype: 'fullURL', url: inputURL.slice(11), listcode };
            }
            if (inputURL.slice(12, 23) === 'youtube.com') {
                // https
                return { urltype: 'fullURL', url: inputURL.slice(12), listcode };
            }
        } else return false;
    }
	
	function openVideo() {
		let result = document.getElementById('result').value
		let input = document.getElementById('originallink').value
		if ( result ) {
			window.open(result);
		} else {
			window.open(input);
		}
	}

    function isNumber(val) {
        if (val == parseInt(val)) return true;
        else return false;
    }

    function isEmpty(val) {
        if (val == null || val == '' || val == undefined) return true;
        else return false;
    }

    function share() {
        let t = document.createElement('textarea');
        document.body.appendChild(t);
        t.value = window.location;
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
        setTimeout(() => alert('URL copied!\nThanks for sharing'), 300);
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1 id="title">Youtube specific time URL Generator</h1>
                <div className="main">
                    <input
                        id="originallink"
                        type="text"
                        className="width100"
                        placeholder="original URL"
                        onChange={() => onInputURLChange()}
                    />
                    <div className="p-tooltip input-tooltip">
                        <div className="p-tooltip-content input-tooltip">check your URL</div>
                        <div className="p-tooltip-arrow input-tooltip" />
                    </div>

                    <div className="inputs width100">
                        <input
                            id="min"
                            type="text"
                            minLength="1"
                            maxLength="4"
                            size="6"
                            placeholder="min"
                            onChange={() => onTimeChange()}
                        />
                        &nbsp;&nbsp;:&nbsp;&nbsp;
                        <input
                            id="sec"
                            type="text"
                            minLength="1"
                            maxLength="2"
                            size="6"
                            placeholder="sec"
                            onChange={() => onTimeChange()}
                        />
                        <button id="submit" onClick={() => onSubmit()}>
                            submit
                        </button>
                    </div>
                    <input
                        id="result"
                        type="text"
                        placeholder="result"
                        readOnly
                        style={{ width: '100%' }}
                        onClick={() => copyResultToClipboard()}
                    />
                </div>
            </header>
            <img id="thumbnail" alt="" onClick={() => {openVideo()}}></img>
            <button id="share" onClick={() => share()}>
                share this page
            </button>
        </div>
    );
}

export default App;