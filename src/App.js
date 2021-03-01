import React, { useState, useEffect } from 'react';
import './App.css';
import {fadeOut, fadeOutAction, changeOpacity} from './fadeout.js'

function App() {
	const [validInput, setValidInput] = useState('')
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
	const alertDelay = 300;
	
	function showCheckTooltip(isURLValid){
		if (isURLValid) {
			document.getElementById('tooltipcontent').innerText = 'Great!';
			document.querySelector('.p-tooltip-content').style.backgroundColor = '#48E452'
			document.querySelector('.p-tooltip-arrow').style.borderTopColor = '#48E452'
			setTimeout(() => {
				let inputTooltips = document.querySelectorAll('.input-tooltip');
				inputTooltips.forEach((item) => fadeOut(item));
			},800)
		} else {
			document.getElementById('tooltipcontent').innerText = 'Check your URL';
			document.querySelector('.p-tooltip-content').style.backgroundColor = '#cc413e'
			document.querySelector('.p-tooltip-arrow').style.borderTopColor = '#cc413e'
		}

        let inputTooltips = document.querySelectorAll('.input-tooltip');
		inputTooltips.forEach((item) => (item.style.opacity = 1));
	}
	
	function hideCheckTooltip() {
        let inputTooltips = document.querySelectorAll('.input-tooltip');
		inputTooltips.forEach((item) => (item.style.opacity = 0))
	}
	
    function onInputURLChange() {
        let inputURL = document.getElementById('originallink').value;
        // inputURL이 유튜브 링크 맞으면 썸네일 가져오기
		// 
        if (inputURL == '') {
			hideThumbnail();
			hideInfo();
            hideCheckTooltip();
        } else {
            let data = isYoutubeURL(inputURL);
            if (data) {
                showCheckTooltip(true);
                let videoCode = getVideoCode(data.url, data.urltype);
				showData(videoCode);
            } else if (!data) {
                showCheckTooltip(false);
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
            if (data === false || document.querySelector('.input-tooltip').style.opacity == 1) { // 정리 필요
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
            setTimeout(() => alert('URL copied!'), alertDelay);
        }
    }

    function showResult(resultURL, videoCode) {
        document.getElementById('result').value = resultURL;
        setTimeout(() => alert('URL copied!'), alertDelay);
    }

    function showData(videoCode) {
		let data = fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+videoCode+'&key='+process.env.REACT_APP_YOUTUBE_API_KEY)
        	.then( (res) => res.json() )
        	.then( (json) => {
				  let info = JSON.parse(JSON.stringify(json)).items[0] // description, channelId, localized.title, localized.description, tags, thumbnails, etc
				  if (info == undefined) {
					  setValidInput('');
					  document.querySelectorAll('.input-tooltip').forEach((item) => (item.style.opacity = 1));
					  return
				  } else {
					  info = info.snippet
					  setValidInput(document.getElementById('originallink').value);
				  }
				  let title = info.title;
				  let channel = info.channelTitle;
				  let thumbnails = info.thumbnails;
				  let thumbnailURL = '';
				  let tempThumbnailWidth = 0
				  for (let thumbnail of Object.keys(thumbnails)) {
					  if (thumbnails[thumbnail].width > tempThumbnailWidth) {
						  tempThumbnailWidth = thumbnails[thumbnail].width;
						  thumbnailURL = thumbnails[thumbnail].url;
					  }
				  }
				  showThumbnail(thumbnailURL);
				  let infoArea = document.querySelector('#videoInfo')
				  infoArea.innerText = '['+channel+']' + ' ' + title;
				  return ;
				 })
    }
	
	function hideInfo() {
		let infoArea = document.querySelector('#videoInfo')
		infoArea.innerText = '';
	}
	
    function showThumbnail(thumbnailURL) {
		let image = document.getElementById('thumbnail');
        image.src = thumbnailURL;
		image.style.display = '';
    }
	
	function hideThumbnail() {
		let image = document.getElementById('thumbnail');
		image.src = '';
		image.style.display = 'none';
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
			if (!inputURL.includes('?v=')) return false;
			
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
		if ( result ) {
			window.open(result);
		} else if (validInput) {
			window.open(validInput);
		} else return;
	}

    function isNumber(val) {
        if (val == parseInt(val)) return true;
        else return false;
    }

    function isEmpty(val) {
        if (val == null || val == '' || val == undefined) return true;
        else return false;
    }
	
	function showClearButton() {
		if (document.getElementById('originallink').value == '') {
			
		}
	}
	function clearInput() {
		hideCheckTooltip();
        document.getElementById('originallink').value = '';
	}

    function share() {
        let t = document.createElement('textarea');
        document.body.appendChild(t);
        t.value = window.location;
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
        setTimeout(() => alert('URL copied!\nThanks for sharing'), alertDelay);
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1 id="title">Youtube specific time URL Generator</h1>
                <div className="main">
					<div className="inputs width100">
						<button id="clear" onClick={()=>clearInput()}>clear</button>
					</div>
                    <input
                        id="originallink"
                        type="text"
                        className="width100"
                        placeholder="original URL"
                        onChange={() => onInputURLChange()}
                    />
                    <div className="p-tooltip input-tooltip">
                        <div id="tooltipcontent" className="p-tooltip-content input-tooltip">Check your URL</div>
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
			<div id="videoInfo"></div>
            <img id="thumbnail" alt="" onClick={() => {openVideo()}}></img>
            <button id="share" onClick={() => share()}>
                share this page
            </button>
        </div>
    );
}

export default App;