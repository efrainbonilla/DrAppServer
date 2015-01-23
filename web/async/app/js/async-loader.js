! function(that, $document, $window) {
	var lang = 'es';
	var contenterror = 0;
	var d = 0;
	var jslcomplete = 0;
	var jsl = [];

	$window.pages = [];
	var xhr_progress = [0, 0, 0, 0];

	var jsl_current = 0;
	var jsl_total = 0;
	var xhr_stack = Array(xhr_progress.size);
	var jsli = 0;

	var staticpath = '';

	var Utils = function() {

		return {
			xhr: function() {
				var xmlHttp;
				// esto debe funcionar para todos los navegadores excepto IE6 y más antiguos
				try {
					// intenta crear el objeto XMLHttpRequest
					xmlHttp = new XMLHttpRequest();
				} catch (e) {
					// asume IE6 o más antiguo
					var XmlHttpVersions = new Array("MSXML2.XMLHTTP.6.0",
						"MSXML2.XMLHTTP.5.0",
						"MSXML2.XMLHTTP.4.0",
						"MSXML2.XMLHTTP.3.0",
						"MSXML2.XMLHTTP",
						"Microsoft.XMLHTTP");
					// prueba cada id hasta que uno funciona
					for (var i = 0; i < XmlHttpVersions.length && !xmlHttp; i++) {
						try {
							// prueba a crear el objeto XMLHttpRequest
							xmlHttp = new ActiveXObject(XmlHttpVersions[i]);
						} catch (e) {} // ignora error potencial
					}
				}
				// devuelve el objeto creado o muestra un mensaje de error
				if (!xmlHttp) alert("lo sentimos, su navegador no soporta peticiones a sincrónicas");

				return xmlHttp;
			},
			jsl_progress: function() {
				if (d) console.log(jsl_total);
				var p = jsl_current;
				if (d) console.log(p);
				if (d) console.log(xhr_progress);
				for (var i = xhr_progress.length; i--;) p += xhr_progress[i];
				if (d) console.log("Progress: " + (p / jsl_total));

				document.getElementById('loading_progress_porce').innerHTML = Math.floor(p / jsl_total) + '%';
				document.getElementById('loading_progress_fill').style.width = Math.floor(p / jsl_total) + '%';
			},
			jsl_load: function(xhri) {
				if (d) console.log("jsl_load " + xhri);
				if (jsl[jsli]) this.xhr_load(staticpath + jsl[jsli].f, jsli++, xhri);
			},
			xhr_load: function(url, jsi, xhri) {
				url = url + '?update=' + Math.random();

				xhr_stack[xhri] = this.xhr();

				var that = this;
				// if (!d) console.log("Dispatching " + url);
				xhr_stack[xhri].onreadystatechange = function() {
					if (xhr_stack[xhri].readyState === 4 && xhr_stack[xhri].status === 200) {
						jsl[this.jsi].text = this.response || this.responseText;

						if (!contenterror) {
							jsl[this.jsi].text = jsl[this.jsi].text;

							jsl_current += jsl[this.jsi].w || 1;
							that.jsl_progress();
							if (++jslcomplete == jsl.length) that.initall();
							else that.jsl_load(this.xhri);
						}
					}
				};

				xhr_stack[xhri].onload = function(oEvent) {

				};
				xhr_stack[xhri].onerror = function(oEvent) {
					xhr_progress[this.xhri] = 0;
					that.xhr_load(this.url, this.jsi, this.xhri);
				};
				xhr_stack[xhri].url = url;
				xhr_stack[xhri].jsi = jsi;
				xhr_stack[xhri].xhri = xhri;
				xhr_stack[xhri].open("GET", url, true);
				xhr_stack[xhri].send(null);
			},

			initall: function() {

				xhr_stack = undefined;
				var t = new Date().getTime();
				var fulltext = '';
				var i;
				for (i in jsl) {
					var script = $document.createElement('script');
					if ((jsl[i].j === 1) && (!d)) {
						script.type = "text/javascript";
						script.id = jsl[i].n;

						script.text = jsl[i].text;
						$document.getElementsByTagName('head')[0].appendChild(script);

					} else if ((jsl[i].j === 2) && (!d)) {
						// var s = jsl[i].text.replace(/\.\.\/\.\.\//g, staticpath).replace(new RegExp("\\/en\\/", "g"), '/' + lang + '/');
						/*var link = $document.createElement('link');
						link.setAttribute('type', 'text/css');
						link.setAttribute('rel', 'stylesheet');
						link.href = staticpath + jsl[i].f;
						$document.getElementsByTagName('head')[0].appendChild(link);*/

						var link = $document.createElement('style');
						link.setAttribute('type', 'text/css');
						link.innerHTML = jsl[i].text;
						$document.getElementsByTagName('head')[0].appendChild(link);

						/*} else if (jsl[i].j === 3) {
							l = JSON.parse(jsl[i].text);*/
					} else {
						pages[jsl[i].n] = jsl[i].text;
					}
				}

				$document.getElementById('loading').style.display = 'none';

				this.next();
			},
			next: function() {
				if (typeof this.getCallback() === 'function') {
					this.getCallback()();
				}
			},
			setCallback: function(callback) {
				this.callbackLoader = callback;
				return this;
			},
			getCallback: function() {
				return this.callbackLoader || null;
			}
		};
	}

	var script = function(sourceLoader, config, callback) {
		if (config && config.browserSupport) return;

		jsl = sourceLoader;
		staticpath = config.staticUrl;

		if (d) {
			for (var i in jsl) {
				if (jsl[i].j === 1) document.write('<' + 'script type="text/javascript" src="' + staticpath + jsl[i].f + '"></sc' + 'ript>');
				else if (jsl[i].j === 2) document.write('<link rel="stylesheet" type="text/css" href="' + staticpath + jsl[i].f + '" />');
			}
		}

		var extjsloaded = false;
		for (var i = jsl.length; i--;) jsl_total += jsl[i].w || 1;
		jsl_total /= 100;

		if (d) console.log(jsl_total);


		var utils = Utils();
		utils.setCallback(callback);
		for (var i = xhr_progress.length; i--;) utils.jsl_load(i);
	};

	script.loaderBody = function(browserSupport, browserFirefox) {
		var dataBrowser = {};
		if (browserSupport) {
			dataBrowser = {
				agent: 'chrome',
				download: 'Descargar Google Chrome',
				url: 'http://www.google.com/chrome'
			}
			if (browserFirefox) {
				dataBrowser = {
					agent: 'ff',
					download: 'Descargar Mozilla Firefox',
					url: 'http://www.mozilla.org/firefox'
				};
			}
			document.write('<link rel="stylesheet" type="text/css" href="' + staticpath + 'css/style-upgrade.css"><center><div class="help-mid-block"><div class="main_bg_image"><div class="register-mid-pad"><div class="' + dataBrowser.agent + '-bg"></div><div class="' + dataBrowser.agent + '-block"><h1>Por favor actualiza tu navegador</h1><p id="' + dataBrowser.agent + '_msg"><span class="red">Advertencia:</span> Usted está utilizando un navegador obsoleto que no es soportado. Por favor, actualice su navegador y asegúrese de que usted mantenga la configuración predeterminada.</p><a href="' + dataBrowser.url + '" class="' + dataBrowser.agent + '-button btn">' + dataBrowser.download + '</a></div><div class="clear"></div></div></div></div></center>');
		} else {
			document.write('<style type="text/css">.slprogressbar { background-color: #B8BCBF; -webkit-border-radius: 15px; -moz-border-radius: 15px; -ms-border-radius: 15px; -o-border-radius: 15px; border-radius: 15px; height: 16px; -moz-box-sizing: border-box; -ms-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; border: 4px solid #B8BCBF !important; overflow: hidden; margin: 0 60px 0 0 !important; } .slprogress-block { margin: 3px 10px 3px 1px !important; } .slprogressbar-percents { background-color: #D8290A; -webkit-border-radius: 15px; -moz-border-radius: 15px; -ms-border-radius: 15px; -o-border-radius: 15px; border-radius: 15px; height: 16px; -moz-box-sizing: border-box; -ms-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; width: 50px; font-family: Arial, Helvetica, sans-serif; color: white; font-size: 13px; text-align: center; float: right; line-height: 15px !important; margin: 0 !important; } .slprogressbarfill { height: 8px !important; background-color: white !important; margin: 0 !important; -moz-border-radius: 15px; -ms-border-radius: 15px; -o-border-radius: 15px; border-radius: 15px; line-height: none !important; width: 0px;}</style><div id="loading" style="position:absolute; left:0px; top:0px; width:100%; height:100%; background: url(\'css/img/bg.png\');"><div style="width: 263px; height: 138px; position: absolute; top: 50%; left: 50%; margin-top: -69px; margin-left: -131px;"><div style="width: 193px; height: 138px; position: absolute; background:url(\'css/img/350.gif\') no-repeat;"></div><div id="loading_progress_porce" style="text-align:right; font-size: 2em; line-height:7;"></div><div style="position:absolute; left:5px; top:135px;"><div class="slprogress-block" style="width:320px;" id="loading_progress"><div class="slprogressbar"><div class="slprogressbarfill" id="loading_progress_fill" style="width:0px;"></div></div><div class="clear"></div></div></div></div></div>');
		}
	}

	that.$script = script;
}(this, document, window);