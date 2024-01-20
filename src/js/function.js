/* ===========================================================

	Title: function.js
	Created: 2016-5-31
	Last Created:		2016-10-28

=========================================================== */
/* ===========================================================

	言語取得

=========================================================== */
function getLang() {
	return $("html").attr("lang") || "ja";
}

/* ===========================================================

	値判定

=========================================================== */
function isReallyNaN(x) {
  return x !== x;    // xがNaNであればtrue, それ以外ではfalse
}

/* ===========================================================

	URL操作

=========================================================== */
//URL分割
function parseUri(uri) {
	var reg = /^(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/;
	var m = uri.match(reg);
	if (m) {
		return {"scheme":m[1], "authority":m[2], "path":m[3], "query":m[4], "fragment":m[5]};
	} else {
		return null;
	}
}
function queryToObject(query) {
	if (typeof query === "undefined") {return null;}
	var hash = query.split('&');
	var obj = {}
	for (var i = 0; i < hash.length; i++) {
		var arr = hash[i].split('=');
		obj[arr[0]] = arr[1];
	}
	return obj;
}
//パラメータ書き換え
function setQuery(queryObj) {
	var query = [];
	for (var key in queryObj) { if (queryObj.hasOwnProperty(key)) {
		if (key && queryObj[key]) {
			query.push(key + "=" + queryObj[key]);
		}
	}}
	history.replaceState('', '', location.pathname + "?" + query.join("&"));
}

/* ===========================================================

	値判定

=========================================================== */
//数値判定
var isNumber = function(x) {
	if (typeof(x) !== 'number' && typeof(x) !== 'string') {
		return false;
	} else {
		return (x == parseFloat(x) && isFinite(x));
	}
}
//型判定
function is(type, obj) {
	var clas = Object.prototype.toString.call(obj).slice(8, -1);
	return obj !== undefined && obj !== null && clas === type;
}

/* ===========================================================

	文字列操作

=========================================================== */
//ゼロパディング
function zeroPad(number, digit, char) {
	digit = digit || 4;	//デフォルト桁数
	char = char || "0";	//デフォルト文字
	var numberLength = String(number).length;
	if (digit > numberLength) {
		return (new Array((digit - numberLength) + 1).join(char)) + number;
	} else {
		return number;
	}
}
//序数
function ordinal(num) {
	//引数が数値でなければ終了
	//if(!isNumber(num)) return num;
	var suffix = "th";
	var pattern = {
		1: "st",
		2: "nd",
		3: "rd"
	};
	var dig1 = (num + "").slice(-1);	//1の位
	var dig10 = (num + "").slice(-2, -1);	//10の位
	//末尾が数値でなければ終了
	//if(!isNumber(dig1)) return num;
	if (dig10 != "1" && pattern[dig1]) {
		suffix = pattern[dig1];
	}
	return num + suffix;
}

/* ===========================================================

	currentLink

=========================================================== */
function currentLink(target, pattern, curClass) {
	target = target || ["a"];
	pattern = pattern || [];
	curClass = curClass || "current";
	//パス取得
	var path = window.location.pathname;
	for (var i = 0; i < target.length; i++) {
		//パスに一致するリンクにカレントクラス設置
		$(target[i] + '[href="' + path + '"]').addClass(curClass);
		//パスを読替えてカレント設置
		for (var j = 0; j < pattern.length; j++) {
			//読替えパターンに一致した場合
			if (path.match(pattern[j][0])) {
				//読替えパスにカレントクラス設置
				var alterPath = path.replace(pattern[j][0], pattern[j][1]);
				$(target[i] + '[href="' + alterPath + '"]').addClass(curClass);
			}
		}
	}
}

/* ===========================================================

	celljoin
		対象テーブル内の[celljoin]属性が付されたセルを列方向に結合する

	引数：
		table: 対象テーブルをセレクタで指定
		targetRow: テーブル内でセル結合対象とする行をセレクタで指定
	タグ：
		celljoin="blank|same"： blank→空白セル結合、same→同値セル結合

=========================================================== */
function celljoin(table, targetRow) {
	var $table = $(table);
	targetRow = targetRow || "tr";
	$table.each(function() {
		//結合基準セル一時格納用変数
		var target = [];
		$(targetRow, this).each(function() {
			$("*[celljoin]", this).each(function(i) {
				if (!target[i]) {
					//初回のみ
					target[i] = {cnt: 1, cell: $(this)};
				} else {
					//結合判定
					var flg = false;
					var joinType = $(this).attr("celljoin");
					if (joinType == "blank") {
						//空白セル判定
						flg = $(this).text() == "";
					} else if (joinType == "same") {
						//同値セル判定
						flg = $(this).text() == target[i].cell.text();
					}
					//セル結合
					if (flg) {
						$(this).css("display", "none");
						target[i].cnt++;
					} else {
						target[i].cell.attr("rowspan", target[i].cnt);
						target[i].cell = $(this);
						target[i].cnt = 1;
					}
				}
			});
		});
		//終端処理
		for (var i = 0; i < target.length; i++) {
			target[i].cell.attr("rowspan", target[i].cnt);
		}
	});

}

/* ===========================================================

	accordion

=========================================================== */
// アコーディオン一括設置
var accordion = function(range) {
	$(range).each(function() {
		var acOption = $(this).attr("ac-option").split(",");
		var acItem = acOption[0];
		var acBtn = acOption[1];
		var limit = acOption[2];
		var acSub = acOption[3];
		//アコーディオン設置
		accordAct(this, acItem, acBtn, limit, acSub);
	});
};
// アコーディオンアニメーション
var accordAct =  function(range, acItem, acBtn, limit, acSub){
	//アニメーション
	var animate = true;
	//引数整形
	$range = $(range);
	acItem = acItem || ".accord-item";
	//初期表示件数：不正な値の場合は全件表示（Gyroで設定できる以上の値を代入）
	limit = isNumber(limit) ? limit : 1000;
	var $acBtn = $(acBtn || ".accord-btn", $range);
	acSub = acSub || ".ac-sub";

	// アコーディオン対象要素の取得
	var $targetItems = $(acItem + ":not(" + acSub + ")", $range);

	// 開閉イベント設置
	if ($targetItems.size() > limit) {
		// 開閉基準要素
		var $acTarget = $targetItems.eq(limit);
		// 初期表示
		$acTarget.hide();
		$acTarget.nextAll(acItem).hide();
		$(".close-txt", $acBtn).hide();
		//イベント設置
		$acBtn.on("click", function(e) {
			var type = $acTarget.get(0).tagName;
			if($(this).hasClass('active')){
				if (!animate) {
					$acTarget.hide();
					$acTarget.nextAll(acItem).hide();
				} else if (type == "TR") {
					$acTarget.slideRow("up");
					$acTarget.nextAll(acItem).slideRow("up");
				} else {
					$acTarget.slideUp();
					$acTarget.nextAll(acItem).slideUp();
				}
				$(".open-txt", $acBtn).show();
				$(".close-txt", $acBtn).hide();
				$acBtn.addClass("link-button__open");
				$acBtn.removeClass("link-button__close");
			} else {
				if (!animate) {
					$acTarget.show();
					$acTarget.nextAll(acItem).show();
				} else if (type == "TR") {
					$acTarget.slideRow("down");
					$acTarget.nextAll(acItem).slideRow("down");
				} else {
					$acTarget.slideDown();
					$acTarget.nextAll(acItem).slideDown();
				}
				$(".open-txt", $acBtn).hide();
				$(".close-txt", $acBtn).show();
				$acBtn.addClass("link-button__close");
				$acBtn.removeClass("link-button__open");
			}
			$acBtn.toggleClass('active');
			return false;
		});
	} else {
		// アコーディオン対象要素が初期表示件数未満の場合は開閉ボタンを削除
		$acBtn.remove();
	}
};
// テーブル用アコーディオンアニメーション
(function($) {
	var sR = {
		defaults: {
			slideSpeed: 400,
			easing: false,
			callback: false
		},
		thisCallArgs: {
			slideSpeed: 400,
			easing: false,
			callback: false
		},
		methods: {
			up: function (arg1,arg2,arg3) {
				if(typeof arg1 == 'object') {
					for(p in arg1) {
						sR.thisCallArgs.eval(p) = arg1[p];
					}
				}else if(typeof arg1 != 'undefined' && (typeof arg1 == 'number' || arg1 == 'slow' || arg1 == 'fast')) {
					sR.thisCallArgs.slideSpeed = arg1;
				}else{
					sR.thisCallArgs.slideSpeed = sR.defaults.slideSpeed;
				}

				if(typeof arg2 == 'string'){
					sR.thisCallArgs.easing = arg2;
				}else if(typeof arg2 == 'function'){
					sR.thisCallArgs.callback = arg2;
				}else if(typeof arg2 == 'undefined') {
					sR.thisCallArgs.easing = sR.defaults.easing;
				}
				if(typeof arg3 == 'function') {
					sR.thisCallArgs.callback = arg3;
				}else if(typeof arg3 == 'undefined' && typeof arg2 != 'function'){
					sR.thisCallArgs.callback = sR.defaults.callback;
				}
				var $cells = $(this).find('td');
				$cells.wrapInner('<div class="slideRowUp" />');
				var currentPadding = $cells.css('padding');
				$cellContentWrappers = $(this).find('.slideRowUp');
				$cellContentWrappers.slideUp(sR.thisCallArgs.slideSpeed,sR.thisCallArgs.easing).parent().animate({
					paddingTop: '0px',
					paddingBottom: '0px'},{
					complete: function () {
						$(this).children('.slideRowUp').replaceWith($(this).children('.slideRowUp').contents());
						$(this).parent().css({'display':'none'});
						$(this).css({'padding': currentPadding});
				}});
				var wait = setInterval(function () {
					if($cellContentWrappers.is(':animated') === false) {
						clearInterval(wait);
						if(typeof sR.thisCallArgs.callback == 'function') {
							sR.thisCallArgs.callback.call(this);
						}
					}
				}, 100);
				return $(this);
			},
			down: function (arg1,arg2,arg3) {
				if(typeof arg1 == 'object') {
					for(p in arg1) {
						sR.thisCallArgs.eval(p) = arg1[p];
					}
				}else if(typeof arg1 != 'undefined' && (typeof arg1 == 'number' || arg1 == 'slow' || arg1 == 'fast')) {
					sR.thisCallArgs.slideSpeed = arg1;
				}else{
					sR.thisCallArgs.slideSpeed = sR.defaults.slideSpeed;
				}

				if(typeof arg2 == 'string'){
					sR.thisCallArgs.easing = arg2;
				}else if(typeof arg2 == 'function'){
					sR.thisCallArgs.callback = arg2;
				}else if(typeof arg2 == 'undefined') {
					sR.thisCallArgs.easing = sR.defaults.easing;
				}
				if(typeof arg3 == 'function') {
					sR.thisCallArgs.callback = arg3;
				}else if(typeof arg3 == 'undefined' && typeof arg2 != 'function'){
					sR.thisCallArgs.callback = sR.defaults.callback;
				}
				var $cells = $(this).find('td');
				$cells.wrapInner('<div class="slideRowDown" style="display:none;" />');
				$cellContentWrappers = $cells.find('.slideRowDown');
				$(this).show();
				$cellContentWrappers.slideDown(sR.thisCallArgs.slideSpeed, sR.thisCallArgs.easing, function() { $(this).replaceWith( $(this).contents()); });

				var wait = setInterval(function () {
					if($cellContentWrappers.is(':animated') === false) {
						clearInterval(wait);
						if(typeof sR.thisCallArgs.callback == 'function') {
							sR.thisCallArgs.callback.call(this);
						}
					}
				}, 100);
				return $(this);
			}
		}
	};

	$.fn.slideRow = function(method,arg1,arg2,arg3) {
		if(typeof method != 'undefined') {
			if(sR.methods[method]) {
				return sR.methods[method].apply(this, Array.prototype.slice.call(arguments,1));
			}
		}
	};
})(jQuery);

/* ===========================================================

	popup

=========================================================== */
function popup(lang) {
	var lang = lang || "ja";
	var closeTxt = {
		ja: "閉じる",
		en: "close"
	}
	//ポップアップを非表示にする
	$(".popup-area").hide();
	//closeボタンの設置
	var popupClose = "<p class='align-center'><span class='popup-close'>" + closeTxt[lang] + "</span></p>";
	$(".popup-area").each(function() {
		if (!$(".popup-close", this).get(0)) {
			$(this).append(popupClose);
		}
	});
	//open
	$(".popup-open").on("click", function() {
		var target = $(this).attr("href") || $(this).attr("popup-area");
		$(".popup-area").hide();
		$(target).fadeIn("300");
		return false;
	});
	//close
	$(".popup-close").on("click", function() {
		$(this).closest(".popup-area").fadeOut("300");
		return false;
	});
}

/* ===========================================================

	Ajax

=========================================================== */
//Ajax複数リクエスト処理
var MultiAjax = (function() {
	//取得済みデータ格納用
	var stockData = {};
	//データ取得時間
	var timestamp = {};
	//データ保持期限（ミリ秒）
	var expired = 1800000;

	//単発Ajax実行
	//取得データまたはnullを返す
	var ajxGetData = function(url, type) {
		var dfd = new $.Deferred();
		$.ajax({
			url: url,
			type: "GET",
			dataType: type || "html",
			chache: false,
			timeout: 5000
		})
		.done(function(data) {
			dfd.resolve(data);
		})
		.fail(function() {
			dfd.resolve(null);
		});
		return dfd.promise();
	};

	//複数リクエストの並列実行
	//すべてのリクエストの終了を待って取得データを返す
	//エラーの発生したリクエストはnullを返す
	var getData = function(urlList, type, reload) {
		// urlList: リクエストurlの配列
		// type: データタイプ
		// reload: データ再取得
		var dfd = new $.Deferred();
		if (is("String", urlList)) {
			urlList = [urlList];
		} else if (!is("Array", urlList)) {
			dfd.resolve();
		}
		type = type || "html";
		reload = reload || false;
		var retData = {};
		var dfdList = [];
		var reqList = [];
		//urlListのデータをリクエスト
		for (var i = 0; i < urlList.length; i++) {
			//データ再取得判定
			if (!reload && timestamp[urlList[i]]) {
				var elapsed = new Date() - timestamp[urlList[i]];
				reload = elapsed > expired;
			}
			//取得済みデータがあり、期限切れでない場合はそちらを利用する
			if (reload || !stockData[urlList[i]]) {
				//リクエスト
				reqList.push(urlList[i]);
				dfdList.push(ajxGetData(urlList[i], type));
			} else {
				//取得済みデータ
				retData[urlList[i]] = stockData[urlList[i]];
			}
		}
		//すべてのリクエストの処理が終了したらデータを返す
		if (reqList.length > 0) {
			$.when.apply($, dfdList)
			.done(function () {
				for (var i = 0; i < arguments.length; i++) {
					stockData[reqList[i]] = arguments[i];
					timestamp[reqList[i]] = new Date();
					retData[reqList[i]] = arguments[i];
				}
				//データをコピーして返す
				dfd.resolve($.extend(true, {}, retData));
			});
		} else {
			//データをコピーして返す
			dfd.resolve($.extend(true, {}, retData));
		}
		return dfd.promise();
	};

	return {
		getData: getData
	};
}());

/* ===========================================================

	html整形

=========================================================== */
//要素をインデントテーブルに変換
function toIndentTable(target, marker, markerTag) {
	marker = marker || '■,●';
	var markerList = marker.split(',');
	markerTag = markerTag || 'em';
	var tag = ['<' + markerTag + '>', '</' + markerTag + '>'];
	//正規表現の準備
	var regTxt = new RegExp('(?:' + markerList.join('|') + ')(?:.|\n)*');
	var regList = new RegExp('((' + markerList.join('|') + ')((?!' + markerList.join('|') + ')(.|\n))*)', 'g');
	var regMarker = new RegExp('(' + markerList.join(')|(') + ')');
	//console.dir(regTxt);
	$(target).each(function(){
		var txt = $(this).html();
		var matches = txt.match(regTxt);
		//console.dir(matches);
		if (matches) {
			//マーカー付きテキストをhtmlに変換
			var tr = matches[0].replace(regList, function(matche) {
				return '<tr><th>' + matche.replace(regMarker, tag[0] + '$&' + tag[1] + ' </th><td>') + '</td></tr>';
			});
			$('<table />').html(tr).addClass('indent-table').insertAfter(this);
			//リスト化しないテキストの処理
			txt = txt.replace(matches[0], '');
			if (txt) {
				$(this).html(txt);
			} else {
				$(this).remove();
			}
		}
	});
	return;
}


/* ===========================================================

	スマホ関連

=========================================================== */
//スマホ判定
function isSp() {
	var ua = navigator.userAgent;
	return ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0;
}
//スクロールエリア
function scrollArea(lang) {
	lang = lang || "ja";
	//クラスと説明文の定義
	var scrollTxt = {
		".scroll-table": {ja: "この表は左右にスクロールできます。", en : "This table can be scrolled sideways."},
		".scroll-graph": {ja: "このグラフは左右にスクロールできます。", en : "This graph can be scrolled sideways."},
		".scroll-area": {ja: "この図は左右にスクロールできます。", en : "This area can be scrolled sideways."}
	};
	//スクロールエリアの設置
	for (var key in scrollTxt) { if (scrollTxt.hasOwnProperty(key)) {
		$(key).each(function() {
			var $this = $(this);
			//スクロール対象エリアの外側にdiv作成
			$this.wrap("<div class='scroll-wrap'></div>");
			var $scrollWrap = $this.closest(".scroll-wrap");
			//スクロール説明文の設置
			$scrollWrap.before("<p class='scroll-caution'>" + scrollTxt[key][lang] + "</p>");
		});
	}}
}
