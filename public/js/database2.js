var addComma = function(s) {
	var to = String(s);
	var tmp = "";
	while(to != (tmp = to.replace(/^([+-]?\d+)(\d\d\d)/,"$1,$2"))) {
		to = tmp;
	}
	return to;
};

var formatFloat = function(n, r) {
	var b = 1;
	while(0 < r--) {
		b *= 10;
	}
	n = new String(Math.round(n*b));
	r = (new String(b)).length - 1;
	return n.substr(0, n.length-r) + "." + n.substr(n.length-r);
}

var getElements = function(obj, tag, cname) {
	var results = [ ];
	var elements = obj.getElementsByTagName(tag);
	for(var i=0 ; i<elements.length ; i++) {
		var classes = (elements[i].className || '').split(' ');
		while(0 < classes.length) {
			if(classes.shift() == cname) {
				results.push(elements[i]);
			}
		}
	}
	return results;
};

var setHTML = function(obj, html) {
	if(obj && typeof obj.innerHTML != 'undefined') {
		obj.innerHTML = html;
	}
};

var setStyle = function(obj, name, value) {
	if(obj && obj.style) {
		obj.style[name] = value;
	}
};
if(typeof $ == 'undefined') {
	alert('jQuery is not loaded.');
}
(typeof $ == 'function') && $(function() {
	var db = document.getElementById('database2');
	var db_table_area = document.getElementById('table_area2');
	var db_progress = document.getElementById('progress_footer');
	var db_progress_header = document.getElementById('progress_header');
	var rows = [ ];
	var condition = {
		purpose: false,
		area: false,
		searchflg: false
	};
	var filter = function(init) {
		// first, remove everything
		if(!init) {
			for(var i=rows.length-1 ; 0<=i ; i--) {
				if(!rows[i].parentNode) {
					continue;
				}
				rows[i].parentNode.removeChild(rows[i]);
			}
		}
		
		var count = [ 0, 0 ];
		var total = [[ false, false, false, false, 0, 0, 0, 0, false, false ],
 					 [ false, false, false, false, 0, 0, 0, 0, false, false ]];
		for(var i=0 ; i<rows.length ; i++) {
			var cols = rows[i].getElementsByTagName('TD');
			var purpose = getElements(rows[i], 'SPAN', 'purpose');
			if(condition.purpose !== false && purpose.length == 1 && purpose[0].innerHTML != condition.purpose) {
				continue;
			}
			var area = getElements(rows[i], 'SPAN', 'area');
			if(condition.area !== false && area.length == 1 && area[0].innerHTML != condition.area) {
				continue;
			}
			var searchflg = getElements(rows[i], 'SPAN', 'searchflg');
			// 選択したプルダウンのValueが""ではない場合
			// && 物件の要素[searchflg]が1つの場合
			// && 排他的論理和された用途を取得
			if(condition.searchflg !== false && searchflg.length == 1 && !(Number(searchflg[0].innerHTML) & Number(condition.searchflg))) {
				continue;
			}
			var p = 0;
			var rate5_str = 'false';
			var rate6_str = 'false';
			var rate7_str = 'false';
			var rate8_str = 'false';
			var rate9_str = 'false';
			for(var j=0 ; j<=9 ; j++) {
				if ($.isNumeric($(cols).eq(j).children('span.count_key'+j+'').text().replace(/,/g, ''))) {
					total[p][j] += $(cols).eq(j).children('span.count_key'+j+'').text().replace(/,/g, '') * 1;
				} else {
					total[p][j] += $(cols).eq(j).children('span').text().replace(/,/g, '') * 1;
				}
			}
			count[p]++;
			if(!init) {
					db.appendChild(rows[i]);
			}
		}
		//小数点
		function ratioRound(val, precision){
			digit = Math.pow(10, precision);
			val = val * digit;
			val = Math.round(val);
			val = val / digit;
			if(val > 99.0){
				return 100.0.toFixed(1);
			} else{
				return val.toFixed(1);
			}
		}
		var info = {
			normal_total2_4: addComma(formatFloat(total[0][4], 2)),
			normal_total2_5: addComma(Math.floor(total[0][5], 0)),
			normal_total2_6: addComma(Math.floor(total[0][6] / 1000000, 1)),
			normal_total2_7: addComma(ratioRound(total[0][7], 1)),
		};
		for(var id in info) {
			setHTML(document.getElementById(id), info[id]);
		}
	};
	
	// setup grouping tab
	var tabs = document.getElementById('db_group_tabs');
	if(tabs) {
		var tab_list = tabs.getElementsByTagName('TD');
		for(var i=0 ; i<tab_list.length ; i++) {
			tab_list[i].onclick = function() {
				for(var j=0 ; j<tab_list.length ; j++) {
					if(tab_list[j] == this) {
						tab_list[j].className = 'now';
					} else {
						tab_list[j].className = '';
					}
				}
				var area = this.getElementsByTagName('A').item(0).innerHTML;
				if(tab_list[0] == this) {
					area = false;
				}
				condition.area = area;
				filter(false);
				return false;
			};
		}
	}
	
	// setup sorter
	var order = [ 'a', 'd' ];
	var sorter = [ ];
	var cmp_builder = function(col, order) {
		var values = { };
		for(var i=0 ; i<rows.length ; i++) {
			var v = getElements(rows[i], 'SPAN', 'sort2_key'+col);
			if(v.length == 1) {
				v = v[0].innerHTML;
			} else {
				v = rows[i].getElementsByTagName('TD').item(col).innerHTML;
			}
			var vs = v.replace(/,/g, '').split(/[^0-9\.]/);
			v = 0;
			for(var j=0 ; j<vs.length ; j++) {
				if(typeof vs[j] == 'string' && vs[j] == '') {
					continue;
				}
				v = v * 100 + vs[j] * 1;
			}
			if(typeof rows[i].id == 'undefined'
			|| rows[i].id == '') {
				alert('Row id is not found.');
				return;
			}
			values[rows[i].id] = v;
		}
		return function(a, b) {
			if(values[a.id] < values[b.id]) {
				return +1 * order;
			} else if(values[b.id] < values[a.id]) {
				return -1 * order;
			} else {
				return 0;
			}
		};
	};
	
	var sorter_handler = function(col, order) {
		return function() {
			for(var i=0 ; i<sorter.length ; i++) {
				sorter[i].className = (sorter[i]==this) ? 'now' : '';
			}
			rows.sort(cmp_builder(col, order));
			filter(false);
			return false;
		};
	};
	for(var i=0 ; i<=10 ; i++) {
		for(var j=0 ; j<2 ; j++) {
			var anc = document.getElementById('sort2_by_'+i+'_'+order[j]);
			if(anc) {
				anc.onclick = sorter_handler(i, j==0?1:-1);
				sorter.push(anc);
			}
		}
	}
	
	// prepare database
	var collection = db.getElementsByTagName('TR');
	for(var i=0 ; i<collection.length ; i++) {
		rows.push(collection[i]);
	}
	
	// use init=false to move progress item to another area
	filter(false);
});
