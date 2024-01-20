/* ===========================================================

	Title:				news.js
	Created:			2016-6-24

=========================================================== */
var News = (function(){
	var lang = getLang();
	var uri = parseUri(location.href);
	var query = queryToObject(uri.query);
	//初期動作
	var init = function(type, range, yearCtrl, cateCtrl) {
		type = type || "news";
		range = range || ".news";
		yearCtrl = yearCtrl || ".ul-backnumber a";
		cateCtrl = cateCtrl || ".ul-sort a";
		//データ制御オブジェクトの作成
		var nm = new NewsManager(type, range, yearCtrl, cateCtrl, lang);
		//初期表示
		$(".no-record").hide();
		var cate = "all";
		var year = $(yearCtrl + ":eq(0)").attr("year");
		if (query) {
			cate = query.cate;
			year = query.year;
		}
		//フィルター実行
		nm.filter(cate, year).done(function() {
			//全年のデータ取りに行っておく
			nm.getNewsData();
		});
	};


	//ニュース表示制御オブジェクト
	var NewsManager = function(type, range, yearCtrl, cateCtrl, lang) {
		//基本設定
		this.type = type || "news";	//更新情報／プレスリリースの別
		this.range = range || ".news";
		this.yearCtrl = yearCtrl || ".ul-backnumber a";
		this.cateCtrl = cateCtrl || ".ul-sort a";
		this.lang = lang || "ja";
		//タイプ別設定
		this.settings = {
			news: {
				dataType: "html",
				dataFileName: "news-{YEAR}",
				icon: {
					category: {
						1: {ja: "更新", en: "Update"},
						2: {ja: "お知らせ", en: "Announcement"},
						3: {ja: "その他", en: "Other"},
						10: {ja: "リリース", en: "Release"},
						11: {ja: "リリース", en: "Release"},
						12: {ja: "リリース", en: "Release"},
						13: {ja: "リリース", en: "Release"},
						14: {ja: "リリース", en: "Release"}
					},
					class: "ic-top-press"
				}
			},
			press: {
				dataType: "html",
				dataFileName: "press-{YEAR}",
				icon: {
					category: {
						10: {ja: "物件", en: "Properties"},
						11: {ja: "決算", en: "Financial/Results"},
						12: {ja: "借入", en: "Loans/Bonds"},
						13: {ja: "増資", en: "Capital"},
						14: {ja: "格付け", en: "Rating"},
						15: {ja: "その他", en: "Others"}
					},
					class: "ic-press"
				}
			}
		};
		//データ保持用変数
		this.newsData = {};
		this.allYears = [];
		this.year = "all";
		this.cate = "all";
		/***初期動作***/
		var self = this;
		//年リスト取得
		$(self.yearCtrl).each(function() {
			if ($(this).attr("year")) {
				self.allYears.push($(this).attr("year"));
			}
		});
		//カテゴリフィルター
		$(self.cateCtrl).on("click", function() {
			self.cate = $(this).attr("cate");
			self.filter();
			return false;
		});
		//年フィルター
		$(self.yearCtrl).on("click", function() {
			self.year = $(this).attr("year");
			self.filter();
			return false;
		});

	};
	NewsManager.prototype = {
		//フィルタ実行
		filter: function(cate, year) {
			var self = this;
			if (typeof cate !== "undefined") {self.cate = cate;}
			if (typeof year !== "undefined") {self.year = year;}
			var dfd = new $.Deferred();
			var yearList = self.year != "all" ? self.year.split(","): self.allYears;
			yearList.sort(function(a,b){
				return b-a;
			});
			self.getNewsData(yearList)
			.done(function() {
				$(self.range).html("");
				$(".no-record").hide();
				for (var i = 0; i < yearList.length; i++) {
					var $yearData = self.newsData[yearList[i]];
					if ($yearData) {
						if (self.cate == "all") {
							$(self.range).append($yearData.html());
						} else if (self.cate) {
							var cates = self.cate.split(",");
							var selectors = [];
							for (var j = 0; j < cates.length; j++) {
								selectors.push("[cate='" + cates[j] + "']");
							}
							$(self.range).append($(selectors.join(","), $yearData).clone());
						}
					}
				}
				if (!$(self.range).html()) {
					$(".no-record").show();
				}
				//カレント設置
				self.setCurrent();
				//アイコン書き換え
				//※特殊対応：通常はコメントアウト
				self.replaceNewsIcon();
				//クエリ書き換え
				var query = {
					cate: self.cate,
					year: self.year
				}
				setQuery(query);
				dfd.resolve();
			});
			return dfd.promise();
		},
		//ニュースデータ取得
		getNewsData: function(yearList, reload) {
			var self = this;
			yearList = yearList || self.allYears;
			var dataFileName = self.settings[self.type].dataFileName;
			var dataType = self.settings[self.type].dataType;
			var dfd = new $.Deferred();
			var urlList = [];
			var reqYearList = [];
			for (var i = 0; i < yearList.length; i++) {
				if (!self.newsData[yearList[i]]) {
					urlList.push(dataFileName.replace("{YEAR}", yearList[i]) + "." + dataType);
					reqYearList.push(yearList[i]);
				}
			}
			if (urlList.length > 0) {
				MultiAjax.getData(urlList, dataType, reload)
				.done(function(data) {
					for (var i = 0; i < urlList.length; i++) {
						if (data[urlList[i]]) {
							self.newsData[reqYearList[i]] = self[dataType + "ToNewsData"](data[urlList[i]]);
							self.setNewsIcon(self.newsData[reqYearList[i]]);
						}
					}
					dfd.resolve();
				});
			} else {
				dfd.resolve();
			}
			return dfd.promise();
		},
		//データ整形
		htmlToNewsData: function(html) {
			return $(html);
		},
		xmlToNewsData: function(xml) {
			//データをxmlで持つなら
			var data;
			return data;
		},
		jsonToNewsData: function(json) {
			//データをjsonで持つなら
			var data;
			return data;
		},
		//カテゴアイコン設置
		setNewsIcon: function(range) {
			var icon = this.settings[this.type].icon;
			range = range || "body";
			for (var key in icon.category) { if (icon.category.hasOwnProperty(key)) {
				$("." + icon.class + key, range).text(icon.category[key][this.lang]);
			}}
		},
		//特殊対応：最新情報でリリースのカテゴリを選択した際、アイコンの表示をプレスリリースに切り替える
		//※通常は使用しない
		replaceNewsIcon: function() {
			if (this.type == "news") {
				var cates = this.cate.split(",");
				var newsIcon = this.settings.news.icon;
				var pressIcon = this.settings.press.icon;
				for (var i = 0; i < cates.length; i++) {
					if (pressIcon.category[cates[i]]) {
						$("." + newsIcon.class + cates[i], this.range)
							.addClass(pressIcon.class + cates[i])
							.removeClass(newsIcon.class + cates[i])
							.text(pressIcon.category[cates[i]][lang]);
					}
				}
			}
		},
		//カレント設置
		setCurrent: function() {
			var selectors = [];
			//カテゴリ
			$(this.cateCtrl).removeClass("current");
			if (this.cate) {
				selectors.push(this.cateCtrl + "[cate='" + this.cate + "']");
				var cates = this.cate.split(",");
				for (var i = 0; i < cates.length; i++) {
					selectors.push(this.cateCtrl + "[cate='" + cates[i] + "']");
				}
			} else {
				$(this.cateCtrl + ":eq(0)").addClass("current");
			}
			//年度
			$(this.yearCtrl).removeClass("current");
			if (this.year) {
				selectors.push(this.yearCtrl + "[cate='" + this.year + "']");
				var years = this.year.split(",");
				for (var i = 0; i < years.length; i++) {
					selectors.push(this.yearCtrl + "[year='" + years[i] + "']");
				}
			} else {
				$(this.yearCtrl + ":eq(0)").addClass("current");
			}
			//カレント設置
			if (selectors.length > 0) {
				$(selectors.join(",")).addClass("current");
			}
		}

	};

	return init;

})();
