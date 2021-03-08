# [youtube_link_generator](https://dojunggeun.github.io/youtube_link_generator/)

## Motivation
PC로 Youtube를 보다가 링크를 공유할 때, 영상에 우클릭하면 영상의 현재 시점부터 시작되는 링크를 공유하는 기능이 있다. 그런데 모바일 앱에서는 해당 기능이 없다. 나는 주로 모바일로 영상을 보기에, 모바일로도 지인들과 특정 시점(장면)을 공유하고 싶어서 만들었다.

## Features
- URL 기본 형식 검증
	- youtube.com, youtu.be
- 이후 Youtube api를 이용하여 
	- 입력된 URL의 Video Code 검증
	- Valid URL이면 채널명, 제목, 썸네일 정보 노출
- 분, 초 입력 검증
	- ex. 입력이 숫자가 아닌 경우, 초가 60 이상인 경우, etc.

## What I learn (Practiced)
- Mostly vanilla JS
- Youtube APi basics
- React .env setting
- goorm IDE