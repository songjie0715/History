/*
 * 来自豆瓣的jQuery插件,感谢豆瓣团队的劳动成果，文本框输入@寻找人
 * */
;(function(e){
    var l, a, j = 0, n = 0, m = "", k = [], p = "", o = "", g = {
        getCarePos: function(c, b){
            var a = e("<em>&nbsp;</em>");
            c = e(c);
            var f = c.offset(), i = {};
            l || (l = e("<pre></pre>").css(this.initPreStyle(c)), l.appendTo("body"));
            l.html(b).append(a);
            i = a.position();
            return {
                left: i.left + f.left + 2,
                top: i.top + f.top + 21
            }
        },
        initPreStyle: function(c){
            return {
                position: "absolute",
                left: -9999,
                width: c.width() + "px",
                padding: "8px",
                font: '14px/20px "Helvetica Neue", Helvetica, Arial',
                "word-wrap": "break-word",
                border: "1px"
            }
        },
        highlightName: function(c, b){
            e.each(c, function(c, a){
                m = a.split(":");
                b = b.replace(RegExp("@" + m[1].replace(/\|/g, "\\|"), "g"), '<b id="' + m[0] + '">@' + m[1] + "</b> ");
            });
            return b
        },
        moveSelectedItem: function(c){
            var b = a.find("li");
            j = a.find(".on").index();
            n && (j += c, j >= n && (j -= n), j < 0 && (j === -2 && (j = -1), j += n), b.removeClass("on"), e(b[j]).addClass("on"))
        },
        getCursorPosition: function(c){
            if (document.selection) {
                c.focus();
                var b = document.selection.createRange(), a = b.duplicate();
                a.moveToElementText(c);
                a.setEndPoint("EndToEnd", b);
                c.selectionStart = a.text.length - b.text.length;
                c.selectionEnd = c.selectionStart + b.text.length;
            }
            return c.selectionStart;
        },
        setCursorPosition: function(c, a){
            this.selectRangeText(c, a, a);
        },
        selectRangeText: function(a, b, e){
            if (document.selection) {
                var f = a.createTextRange();
                f.moveEnd("character", -a.value.length);
                f.moveEnd("character", e);
                f.moveStart("character", b);
                f.select();
            }
            else 
                a.setSelectionRange(b, e), a.focus();
        },
        deleteRangeText: function(a, b){
            var h = this.getCursorPosition(a), f = a.scrollTop, i = a.value;
            a.value = b > 0 ? i.slice(0, h - b) + i.slice(h) : i.slice(0, h) + i.slice(h - b);
            this.setCursorPosition(a, h - (b < 0 ? 0 : b));
            firefox = e.browser.mozilla && setTimeout(function(){
                if (a.scrollTop !== f) 
                    a.scrollTop = f;
            }, 10)
        },
        insertAfterCursor: function(a, b, h){
            if (document.selection) {
                a.focus(), document.selection.createRange().text = b + " ", g = this.highlightName(k, a.value), e(h).html(g)
            }
            else {
                var f = a.selectionStart;
                g = a.value.length;
                var i = a.scrollTop, g = a.value.slice(0, f) + b + a.value.slice(f, g);
                g = this.highlightName(k, g).replace(/\s{2,}/g, " ");
                e(h).html(g);
                a.value = g.replace(/<b[^>]+>|<\/b>/g, "");
                this.setCursorPosition(a, f + b.length + 1);
                firefox = e.browser.mozilla && setTimeout(function(){
                    if (a.scrollTop !== i) 
                        a.scrollTop = i;
                }, 0);
            }
        }
    };
    e.fn.textbox = function(c){
        var b = e.extend({
            mode: "complete",
            itemCount: 10,
            customData: null,
            highlighter: ".highlighter",
            tips: "@\u4F60\u60F3\u63D0\u5230\u8C01\uFF1F"
        }, c), h = !0, f = function(d, c){
            var f = a.find(".on").attr("id").replace(/(<\/|<)b>/g, "") || "", i = e.trim(a.find(".on").text().split("(")[0]);
            k.push(f + ":" + i);
            k = e.unique(k);
            g.deleteRangeText(d, p.length);
            g.insertAfterCursor(d, i, c);
            typeof App !== "undefined" && b.mode === "complete" && App.Widgets.StatusBox.updateNum(140 - e.trim(d.value).length);
            a.hide()
        }, i = function(){
            a.html('<div class="bd">' + b.tips + "</div>")
        }, j = function(d, c, j){
            var h = d.value, k = h.substring(0, j).lastIndexOf("@"), o = h.substring(k, j).indexOf(" "), q = {};
            p = h.substring(k + 1, j);
            b.mode === "complete" ? c === "@" && (q = g.getCarePos(d, h.substring(0, j - 1)), l(d, q)) : m(d);
            k !== -1 && o === -1 ? (b.mode === "complete" && (q = g.getCarePos(d, h.substring(0, k))), p && p.length <= 10 ? e.getJSON(b.dataUrl, {
                count: b.itemCount,
                word: p
            }, function(c){
                c.users.length ? (a.html(Mustache.to_html(b.listTmpl, c)), a.find("li").hasClass("on") || a.find("li:first").attr("class", "on"), n = a.find("li").size(), b.mode === "complete" ? l(d, q) : m(d)) : a.hide()
            }) : b.mode === "complete" ? i() : (c = b.customData(), c.users.length ? (n = c.users.length, a.html(Mustache.to_html(b.listTmpl, c)), a.children().click(function(){
                f(d, b.highlighter)
            })) : i())) : a && a.hide()
        }, l = function(d, c){
            e("#adUser").remove();
            a = e("#adUser-list");
            a.length || (a = e('<div id="{ID}" class="at-somebody"></div>'.replace("{ID}", "adUser-list")), a.appendTo("body"));
            a.css({
                top: c.top + "px",
                left: c.left + "px",
                'z-index': '1000'
            }).show();
            a.children().click(function(){
                f(d, b.highlighter)
            })
        }, m = function(d){
            e("#adUser-list").remove();
            a = e("#adUser");
            a.length || (a = e('<div id="{ID}" class="at-somebody"></div>'.replace("{ID}", "adUser")), e(d).before(a[0]));
            var c = e(".comment-item").length;
            a.css({
                left: 0,
                top: c ? "auto" : "71px",
                bottom: c ? "43px" : "auto",
                width: "272px"
            }).show();
            a.children().click(function(){
                f(d, b.highlighter)
            })
        };
        this.bind("keyup", function(d){
            if (d.keyCode == 27) {
                return false;
            }
            var c = c || e(b.highlighter);
            offset = g.getCursorPosition(this);
            preChar = d.target.value.charAt(offset - 1);
            d.target.value || c.html("");
            d.keyCode !== 38 && d.keyCode !== 40 && d.keyCode !== 13 && d.keyCode !== 16 && d.keyCode !== 9 && j(this, preChar, offset);
            (d.keyCode === 9 || d.keyCode === 13) && a && a.find(".on").size() && a.is(":visible") && f(this, b.highlighter);
        });
        this.bind("keydown", function(d){
            h = (d.ctrlKey || d.metaKey) && d.keyCode === 65 || d.shiftKey && (d.keyCode === 37 || d.keyCode === 39) ? !1 : !0;
            if (a && a.is(":visible") && a.find("ul").length) 
                switch (d.keyCode) {
                    case 27:
                        d.preventDefault();
                        a.hide();
                        break;
                    case 32:
                        a.hide();
                        break;
                    case 38:
                        d.preventDefault();
                        g.moveSelectedItem(-1);
                        break;
                    case 40:
                        d.preventDefault();
                        g.moveSelectedItem(1);
                        break;
                    case 9:
                    case 13:
                        d.preventDefault();
                }
        });

        e(".at-somebody li").live('hover',function(){
            e(this).parent().children(".on").removeClass().end().end().toggleClass("on")
        });

        oBody.click(function(){
            a && a.length && a.hide()
        });
		/*
        this.bind("mention", function(a, c, b, f){
            k.push(c + ":" + b);
            k = e.unique(k);
            g.insertAfterCursor(this, "@" + b, f)
        });*/
    }
})(jQuery);