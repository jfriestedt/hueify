(this.webpackJsonphueify=this.webpackJsonphueify||[]).push([[0],{223:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(13),i=n.n(o),l=n(2),c=n(9),s=n(83),u=n(1),p=Object(c.combineReducers)({tokens:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REGISTER_TOKENS":return Object(u.assign)({},e,Object(u.pick)(t,"refreshToken"));default:return e}},spotifyPlayerMountStatus:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"NOT_READY",t=arguments.length>1?arguments[1]:void 0,n=t.type;switch(n){case"SPOTIFY_PLAYER_MOUNT_READY":case"SPOTIFY_PLAYER_MOUNTED":return n;default:return e}},spotifyPlayerState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,n=t.type,r=t.state;switch(n){case"SPOTIFY_PLAYER_STATE_CHANGED":return r;default:return e}}}),d=n(84);var h=n(14),f=n(15),m=n(17),y=n(16),v=n(18),g=(n(54),Object(l.b)((function(e){var t=e.spotifyPlayerState,n=Object(u.chain)(t).get(["track_window","current_track","album","images"]).find({height:300}).value();return{albumArtUrl:n?n.url:""}}))((function(e){var t=e.albumArtUrl;return t?a.a.createElement("img",{alt:"album art",src:t,height:"300",width:"300",decoding:"sync",style:{height:"300px",width:"300px",marginBottom:"20px"}}):null}))),b=n(85),E=function(e){function t(){var e;return Object(h.a)(this,t),(e=Object(m.a)(this,Object(y.a)(t).call(this))).state={palette:[]},e.swatchStyle={display:"inline-block",width:"50px",height:"50px",fontSize:"6px"},e}return Object(v.a)(t,e),Object(f.a)(t,[{key:"getPaletteId",value:function(e){return Object(u.keys)(e).map((function(t){return e[t].getHex()})).sort().join("_")}},{key:"shouldComponentUpdate",value:function(e,t){var n=e.albumArtUrl,r=t.palette;return n!==this.props.albumArtUrl||this.getPaletteId(r)!==this.getPaletteId(this.state.palette)}},{key:"componentDidUpdate",value:function(e){var t=this;e.albumArtUrl!==this.props.albumArtUrl&&(window.vib=b.from(this.props.albumArtUrl),window.vib.clearFilters().getPalette((function(e,n){t.setState({palette:n})})))}},{key:"renderSwatch",value:function(e){var t=this.state.palette[e].getHex(),n=Object(u.assign)({},this.swatchStyle,{backgroundColor:t});return a.a.createElement("div",{key:e,style:n},e)}},{key:"render",value:function(){var e=this;if(this.state.palette){var t=Object(u.keys)(this.state.palette).map((function(t){return e.renderSwatch(t)}));return a.a.createElement("div",{id:"palette",style:{marginBottom:"20px"}},t)}return null}}]),t}(r.Component),O=Object(l.b)((function(e){var t=e.spotifyPlayerState,n=Object(u.chain)(t).get(["track_window","current_track","album","images"]).find({height:64}).value();return{albumArtUrl:n?n.url:""}}))(E),_=Object(l.b)((function(e){return{loggedIn:!!e.tokens.refreshToken}}))((function(e){return e.loggedIn?null:a.a.createElement("a",{className:"button",href:"/login"},"Log in to Spotify")})),k=n(86),P=n(225),j=function(e){function t(){var e;return Object(h.a)(this,t),(e=Object(m.a)(this,Object(y.a)(t).call(this))).state={mounting:!1},window.onSpotifyWebPlaybackSDKReady=function(){e.props.dispatch({type:"SPOTIFY_PLAYER_MOUNT_READY"})},e}return Object(v.a)(t,e),Object(f.a)(t,[{key:"mountPlayer",value:function(){var e=this;this.setState({mounting:!0});var t=new window.Spotify.Player({name:"_*_HUEIFY_*_",getOAuthToken:function(t){var n="/refresh_token?refresh_token=".concat(e.props.refreshToken);fetch(n).then((function(e){return e.json()})).then((function(e){var n=e.access_token;return t(n)}))}});t.addListener("initialization_error",(function(e){var t=e.message;console.error(t)})),t.addListener("authentication_error",(function(e){var t=e.message;console.error(t)})),t.addListener("account_error",(function(e){var t=e.message;console.error(t)})),t.addListener("playback_error",(function(e){var t=e.message;console.error(t)})),t.addListener("player_state_changed",(function(t){e.props.dispatch({type:"SPOTIFY_PLAYER_STATE_CHANGED",state:t})})),console.log("player exists: "+!!t),console.log("adding ready listener"),t.addListener("ready",(function(t){var n=t.device_id;console.log("Ready with Device ID",n),e.props.dispatch({type:"SPOTIFY_PLAYER_MOUNTED"}),e.setState({mounting:!1})})),t.addListener("not_ready",(function(e){var t=e.device_id;console.log("Device ID has gone offline",t)})),t.connect()}},{key:"componentDidMount",value:function(){var e,t=new URLSearchParams(window.location.search).get("refresh_token");t&&this.props.dispatch((e={refreshToken:t},Object(u.assign)(e,{type:"REGISTER_TOKENS"})))}},{key:"componentDidUpdate",value:function(e,t){this.props.refreshToken&&this.props.spotifyPlayerMountReady&&!this.state.mounting&&(console.log("mounting player"),this.mountPlayer())}},{key:"renderDeviceInfoLoading",value:function(){var e=this.props.refreshToken&&this.props.spotifyPlayerMountReady&&!this.props.spotifyPlayerMounted;return a.a.createElement(P.a,{in:e,exit:!1,timeout:200,classNames:"device-info",unmountOnExit:!0},a.a.createElement("div",null,a.a.createElement("h4",null,"Connecting to Spotify"),a.a.createElement("h6",null,"This could take a minute...")))}},{key:"renderConnectPrompt",value:function(){return Object(u.isEmpty)(this.props.spotifyPlayerState)?a.a.createElement("div",null,a.a.createElement("h4",null,"Connect to device:"),a.a.createElement("h4",null,a.a.createElement("strong",null,"_*_HUEIFY_*_"))):null}},{key:"renderDeviceInfo",value:function(){return a.a.createElement(P.a,{in:this.props.spotifyPlayerMounted,timeout:200,classNames:"device-info",unmountOnExit:!0},a.a.createElement("div",null,this.renderConnectPrompt()))}},{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement(k.Helmet,null,a.a.createElement("script",{src:"https://sdk.scdn.co/spotify-player.js"})),this.renderDeviceInfoLoading(),this.renderDeviceInfo())}}]),t}(r.Component),w=Object(l.b)((function(e){var t=e.tokens.refreshToken,n=e.spotifyPlayerMountStatus;return{refreshToken:t,spotifyPlayerState:e.spotifyPlayerState,spotifyPlayerMountReady:"SPOTIFY_PLAYER_MOUNT_READY"===n,spotifyPlayerMounted:"SPOTIFY_PLAYER_MOUNTED"===n}}))(j),S=Object(l.b)((function(e){var t=e.spotifyPlayerState,n=Object(u.get)(t,["track_window","current_track"]);return{title:Object(u.get)(n,"name"),artist:Object(u.get)(n,["artists",0,"name"])}}))((function(e){var t=e.title,n=e.artist;return t&&n?a.a.createElement("div",{id:"track-info",style:{width:"300px"}},a.a.createElement("h2",null,t),a.a.createElement("h3",null,n)):null})),T=function(e){function t(){var e;return Object(h.a)(this,t),(e=Object(m.a)(this,Object(y.a)(t).call(this))).appStyle={display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",position:"absolute"},e}return Object(v.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"App",style:this.appStyle},a.a.createElement(_,null),a.a.createElement(S,null),a.a.createElement(O,null),a.a.createElement(g,null),a.a.createElement(w,null))}}]),t}(r.Component),A=Object(l.b)()(T);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(l.a,{store:function(){return arguments.length>0&&void 0!==arguments[0]&&arguments[0],Object(c.createStore)(p,Object(d.composeWithDevTools)(Object(c.applyMiddleware)(s.a)))}()},a.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},54:function(e,t,n){},88:function(e,t,n){e.exports=n(223)}},[[88,1,2]]]);
//# sourceMappingURL=main.fa85cf32.chunk.js.map