(this.webpackJsonphueify=this.webpackJsonphueify||[]).push([[0],{227:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(18),i=n.n(o),s=n(2),c=n(9),l=n(84),u=n(1),p=Object(c.combineReducers)({tokens:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,n=t.type,r=t.payload;switch(n){case"REGISTER_TOKENS":return Object(u.assign)({},e,{refreshToken:r});default:return e}},spotifyPlayerMountStatus:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"NOT_READY",t=arguments.length>1?arguments[1]:void 0,n=t.type;switch(n){case"SPOTIFY_PLAYER_MOUNT_READY":case"SPOTIFY_PLAYER_MOUNTED":return n;default:return e}},spotifyPlayerState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,n=t.type,r=t.state;switch(n){case"SPOTIFY_PLAYER_STATE_CHANGED":return r;default:return e}},bridgeIPs:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,n=t.type,r=t.payload;switch(n){case"HUE_BRIDGES_DISCOVERED":return r;default:return e}},palette:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,n=t.type,r=t.payload;switch(n){case"NEW_PALETTE":return r;case"NO_PALETTE":return{};default:return e}}}),h=n(85);var d=n(10),f=n(11),y=n(13),m=n(12),v=n(14),b=n(86),g=n.n(b),E=(n(35),Object(s.b)((function(e){var t=e.spotifyPlayerState,n=Object(u.chain)(t).get(["track_window","current_track","album","images"]).find({height:300}).value();return{albumArtUrl:n?n.url:""}}))((function(e){var t=e.albumArtUrl;return t?a.a.createElement("img",{alt:"album art",src:t,height:"300",width:"300",decoding:"sync",style:{height:"300px",width:"300px"}}):null}))),O=n(87),k=function(e){function t(){var e;return Object(d.a)(this,t),(e=Object(y.a)(this,Object(m.a)(t).call(this))).swatchStyle={display:"inline-block",width:"50px",height:"50px",fontSize:"6px"},e}return Object(v.a)(t,e),Object(f.a)(t,[{key:"getPaletteID",value:function(e){return Object(u.chain)(e).map((function(e){return e.getHex()})).sort().join("_").value()}},{key:"shouldComponentUpdate",value:function(e){var t=e.albumArtUrl,n=e.palette;return t!==this.props.albumArtUrl||this.getPaletteID(n)!==this.getPaletteID(this.props.palette)}},{key:"sortPalette",value:function(e){return Object(u.chain)(e).keys().sortBy((function(t){return Object(u.sum)(e[t].getRgb())})).map((function(t){return Object(u.assignIn)({},e[t],{name:t})})).value()}},{key:"generateNewPalette",value:function(){var e=this;new O(this.props.albumArtUrl,{filters:[]}).getPalette((function(t,n){e.props.dispatch({type:"NEW_PALETTE",payload:e.sortPalette(n)})}))}},{key:"componentDidUpdate",value:function(e){e.albumArtUrl&&!this.props.albumArtUrl?this.props.dispatch({type:"NO_PALETTE"}):e.albumArtUrl!==this.props.albumArtUrl&&this.generateNewPalette()}},{key:"renderSwatch",value:function(e){var t=e.getHex(),n=Object(u.assign)({},this.swatchStyle,{backgroundColor:t});return a.a.createElement("div",{key:e.name,style:n})}},{key:"render",value:function(){var e=this;if(this.props.palette){var t=Object(u.chain)(this.props.palette).map((function(t){return e.renderSwatch(t)})).value();return a.a.createElement("div",{id:"palette",style:{margin:"20px 0"}},t)}return null}}]),t}(r.Component),P=Object(s.b)((function(e){var t=e.spotifyPlayerState,n=e.palette,r=Object(u.chain)(t).get(["track_window","current_track","album","images"]).find({height:64}).value();return{albumArtUrl:r?r.url:"",palette:n}}))(k),j=Object(s.b)((function(e){return{loggedIn:!!e.tokens.refreshToken}}))((function(e){return e.loggedIn?null:a.a.createElement("a",{className:"button",href:"/login"},"Log in to Spotify")})),_=n(88),S=n(229),w=function(e){function t(){var e;return Object(d.a)(this,t),(e=Object(y.a)(this,Object(m.a)(t).call(this))).state={mounting:!1,error:null},window.onSpotifyWebPlaybackSDKReady=function(){e.props.dispatch({type:"SPOTIFY_PLAYER_MOUNT_READY"})},e}return Object(v.a)(t,e),Object(f.a)(t,[{key:"mountPlayer",value:function(){var e=this;this.setState({mounting:!0});var t=new window.Spotify.Player({name:"_*_HUEIFY_*_",getOAuthToken:function(t){var n="/refresh_token?refresh_token=".concat(e.props.refreshToken);fetch(n).then((function(e){return e.json()})).then((function(e){var n=e.access_token;return t(n)}))}});t.addListener("initialization_error",(function(t){var n=t.message;e.setState({error:n}),console.error(n)})),t.addListener("authentication_error",(function(t){var n=t.message;e.setState({error:n}),console.error(n)})),t.addListener("account_error",(function(t){var n=t.message;e.setState({error:n}),console.error(n)})),t.addListener("playback_error",(function(t){var n=t.message;e.setState({error:n}),console.error(n)})),t.addListener("player_state_changed",(function(t){e.props.dispatch({type:"SPOTIFY_PLAYER_STATE_CHANGED",state:t})})),console.log("player exists: "+!!t),console.log("adding ready listener"),t.addListener("ready",(function(t){var n=t.device_id;console.log("Ready with Device ID",n),e.props.dispatch({type:"SPOTIFY_PLAYER_MOUNTED"}),e.setState({mounting:!1})})),t.addListener("not_ready",(function(e){var t=e.device_id;console.log("Device ID has gone offline",t)})),t.connect()}},{key:"componentDidMount",value:function(){var e=new URLSearchParams(window.location.search).get("refresh_token");e&&this.props.dispatch({type:"REGISTER_TOKENS",payload:e})}},{key:"componentDidUpdate",value:function(e,t){this.props.refreshToken&&this.props.spotifyPlayerMountReady&&!this.state.mounting&&(console.log("mounting player"),this.mountPlayer())}},{key:"renderDeviceInfoLoading",value:function(){if(this.state.error)return a.a.createElement("h4",{className:"error"},this.state.error);var e=this.props.refreshToken&&this.props.spotifyPlayerMountReady&&!this.props.spotifyPlayerMounted;return a.a.createElement(S.a,{in:e,exit:!1,timeout:200,classNames:"device-info",unmountOnExit:!0},a.a.createElement("div",null,a.a.createElement("h4",null,"Connecting to Spotify"),a.a.createElement("h6",null,"This could take a minute...")))}},{key:"renderConnectPrompt",value:function(){return Object(u.isEmpty)(this.props.spotifyPlayerState)?a.a.createElement("div",null,a.a.createElement("h4",null,"Connect to device:"),a.a.createElement("h4",null,a.a.createElement("strong",null,"_*_HUEIFY_*_"))):null}},{key:"renderDeviceInfo",value:function(){return a.a.createElement(S.a,{in:this.props.spotifyPlayerMounted,timeout:200,classNames:"device-info",unmountOnExit:!0},a.a.createElement("div",null,this.renderConnectPrompt()))}},{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement(_.Helmet,null,a.a.createElement("script",{src:"https://sdk.scdn.co/spotify-player.js"})),this.renderDeviceInfoLoading(),this.renderDeviceInfo())}}]),t}(r.Component),T=Object(s.b)((function(e){var t=e.tokens.refreshToken,n=e.spotifyPlayerMountStatus;return{refreshToken:t,spotifyPlayerState:e.spotifyPlayerState,spotifyPlayerMountReady:"SPOTIFY_PLAYER_MOUNT_READY"===n,spotifyPlayerMounted:"SPOTIFY_PLAYER_MOUNTED"===n}}))(w),I=n(55),D=n.n(I),A=n(89),R=function(e){function t(){return Object(d.a)(this,t),Object(y.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){var e=Object(A.a)(D.a.mark((function e(){var t,n;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://discovery.meethue.com");case 2:if(!(t=e.sent).ok){e.next=8;break}return e.next=6,t.json();case 6:n=e.sent,Object(u.isEmpty)(n)||this.props.dispatch({type:"HUE_BRIDGES_DISCOVERED",payload:n.map((function(e){return e.internalipaddress}))});case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"attemptUserCreations",value:function(){this.props.bridgeIPs.forEach((function(e){return fetch("http://".concat(e,"/api"),{method:"POST",body:JSON.stringify({devicetype:"hueify#hueify"})}).then((function(e){if(e.ok)return e.json().then((function(e){Object(u.get)(e,[0,"success"])&&console.log("success!")}))}))}))}},{key:"beginPolling",value:function(){var e=this;this.attemptUserCreations(),this.pollingTimeout=setInterval((function(){return e.attemptUserCreations()}),1e3)}},{key:"componentDidUpdate",value:function(e){Object(u.isEmpty)(e.bridgeIPs)&&!Object(u.isEmpty)(this.props.bridgeIPs)&&this.beginPolling()}},{key:"render",value:function(){return Object(u.isEmpty)(this.props.bridgeIPs)?null:a.a.createElement("ul",{style:{margin:"20px",position:"absolute"}},a.a.createElement("h6",null,"Philips Hue IPs:"),this.props.bridgeIPs.map((function(e){return a.a.createElement("li",{key:e},e)})))}}]),t}(r.Component),U=Object(s.b)((function(e){return{bridgeIPs:e.bridgeIPs}}))(R),x=Object(s.b)((function(e){var t=e.spotifyPlayerState,n=Object(u.get)(t,["track_window","current_track"]);return{title:Object(u.get)(n,"name"),artist:Object(u.get)(n,["artists",0,"name"])}}))((function(e){var t=e.title,n=e.artist;return t&&n?a.a.createElement("div",{id:"track-info",style:{width:"300px"}},a.a.createElement("h4",null,t),a.a.createElement("h5",null,n)):null})),N=function(e){function t(){var e;Object(d.a)(this,t),e=Object(y.a)(this,Object(m.a)(t).call(this));var n=g.a.parse(window.navigator.userAgent);return e.isBrowserSupported="desktop"===Object(u.get)(n,["platform","type"]),e.mainStyleBase={display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",position:"absolute",transition:"background-color 0.5s ease, color 0.5s ease"},e}return Object(v.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){var e=Object(u.assign)({},this.mainStyleBase,{backgroundColor:this.props.darkHex,color:this.props.lightHex});return this.isBrowserSupported?a.a.createElement("div",{className:"App"},a.a.createElement(U,null),a.a.createElement("div",{style:e},a.a.createElement(j,null),a.a.createElement(E,null),a.a.createElement(P,null),a.a.createElement(x,null),a.a.createElement(T,null))):a.a.createElement("div",{className:"App"},a.a.createElement("div",{style:this.mainStyle},a.a.createElement("h4",{className:"error"},"Sorry homie, Hueify only works on Desktop browsers. :'(")))}}]),t}(r.Component),L=Object(s.b)((function(e){var t=e.palette;return{darkHex:Object(u.isEmpty)(t)?null:Object(u.first)(t).getHex(),lightHex:Object(u.isEmpty)(t)?null:Object(u.last)(t).getHex()}}))(N);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(s.a,{store:function(){return arguments.length>0&&void 0!==arguments[0]&&arguments[0],Object(c.createStore)(p,Object(h.composeWithDevTools)(Object(c.applyMiddleware)(l.a)))}()},a.a.createElement(L,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},35:function(e,t,n){},91:function(e,t,n){e.exports=n(227)}},[[91,1,2]]]);
//# sourceMappingURL=main.93aacaa6.chunk.js.map