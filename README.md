# Gulp Starter Kit

![Alt text](http://www.kolszewski.com/images/vendors_v2.png)

Gulp Starter Kit 은 [Gulp](http://gulpjs.com/), [Node](https://nodejs.org/), [NPM](https://www.npmjs.com/), [Bower](http://bower.io/), [Babel](https://babeljs.io/), [Sass](http://sass-lang.com/), and [Pug](https://pugjs.org/) 를 기반으로 하는 프론트 엔드 웹 개발을 위한 빌드 자동화도구입니다.

Gulp Starter Kit 은 html, css, js 를 처리하기위해 bower 를 사용해서 추가적으로 필요한 플러그인을 포함해서 처리하는 방식을 취하고 있습니다.


## Table of Contents

1. [Dependencies](#dependencies)
1. [Javascript task](#javascript-task)
1. [CSS task](#css-task)
1. [Views task](#views-task)
1. [Assets](#assets)
    1. [Fonts](#fonts)
    1. [Vendor Fonts](#vendor-fonts)
    1. [Images](#images)
1. [Build](#build)
    1. [Environments](#environments)
        1. [Development](#development)
        1. [Stage](#stage)
        1. [Production](#production)
1. [Server](#server)
    1. [Local URLs](#local-urls)
    1. [Options](#options)

## Dependencies

```console
npm i && bower i
# 또는
yarn && bower i
```

*참고: Web Start Kit 을 설치하기전에 [Gulp](http://gulpjs.com/), [Node](https://nodejs.org/), [NPM](https://www.npmjs.com/), [Bower](http://bower.io/) 를 설치해야합니다.*


## Javascript task

`Javascript task` 는 3개의 작업으로 구성되어 있습니다.

1. bower 에서 설치한 여러개의 js 등을 `./build/js/bundle.js` 로 합칩니다.
1. `./src/js` 폴더에 생성한 여러개의 js 등을 `./build/js/main.js` 로 합칩니다.
1. `./build/js` 에 있는 js 파일을 압축해서 min.js 로 만듭니다.

```console
gulp js:task
```


## CSS task

`CSS task` 는 3개의 작업으로 구성되어 있습니다.

1. bower 에서 설치한 여러개의 css 등을 `./build/css/bundle.css` 로 합칩니다.
1. `./src/scss` 폴더에 생성한 여러개의 scss 등을 컴파일하여 `./build/css/main.css` 로 합칩니다.
1. `./build/css` 에 있는 css 파일을 압축해서 min.css 로 만듭니다.

```console
gulp css:task
```

## Views task
1. include 를 사용할수 있으며 `views/site/**/*.html` 파일을 `./build` 에 html 로 컴파일합니다.

```console
gulp views
```

## Assets

정적파일들을 `./src` 에서 `./build` 로 복사합니다.

```console
gulp assets
```

### Fonts

기본 글꼴인경우 `./src/fonts` 를 `./build/fonts` 로 복사합니다.

Run: `gulp fonts`

### Vendor Fonts

Bower 로 설치한 글꼴인경우 `./bower_components/***` 에서 `./build/fonts` 로 복사합니다.

### Images

`./src/images` 에 이미지를 최적화하여 `./build/images` 에 복사합니다.

Run: `gulp images`

## Build

프로젝트를 빌드하세요. `./src` 파일내에 여러 개별 작업을 실행한 다음 `./build` 로 출력합니다..

```console
gulp build
```

### Environments

빌드할 환경을 지정할 수 있습니다.`env` 옵션으로 지정하지 않으면 `dev` 가 기본적으로 사용됩니다.

#### Development

```console
gulp build --env=dev
```

#### Stage

```console
gulp build --env=stage
```

#### Production

```console
gulp build --env=prod
```

## Server

로컬 dev 서버로 시작합니다. 또한 gulp 는 서버가 실행되는 동안 파일에 대한 변경 사항을 보고 브라우저를 다시 로드합니다.

```console
gulp server
```

### Local URLs

* Local - http://localhost:3000
* UI - 기본적으로 `false` 로 설정

### Options

`./gulpfile.babel.js` 에서 포트, 프록시 및 기타 여러 설정을 수정할 수 있습니다. BrowserSync 에 대한 자세한 내용을 [http://www.browsersync.io/](http://www.browsersync.io/) 를 참조하십시요.

[back to top](#table-of-contents)
