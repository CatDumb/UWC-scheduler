/*
@license
Webix <%= pkg.productName %> v.<%= pkg.version %>
This software is covered by Webix Trial License.
Usage without proper license is prohibited.
(c) XB Software Ltd.
*/
! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).scheduler = {})
}(this, (function (t) {
    "use strict";
    /*! *****************************************************************************
        Copyright (c) Microsoft Corporation.

        Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted.

        THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
        REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
        AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
        INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
        LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
        OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
        PERFORMANCE OF THIS SOFTWARE.
        ***************************************************************************** */
    var e = function (t, i) {
        return (e = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
            })(t, i)
    };

    function i(t, i) {
        function n() {
            this.constructor = t
        }
        e(t, i), t.prototype = null === i ? Object.create(i) : (n.prototype = i.prototype, new n)
    }
    var n = function () {
        return (n = Object.assign || function (t) {
            for (var e, i = 1, n = arguments.length; i < n; i++)
                for (var r in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t
        }).apply(this, arguments)
    };

    function r() {
        for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length;
        var n = Array(t),
            r = 0;
        for (e = 0; e < i; e++)
            for (var a = arguments[e], o = 0, s = a.length; o < s; o++, r++) n[r] = a[o];
        return n
    }
    var a = function () {},
        o = function () {
            function t(t, e) {
                this.webixJet = !0, this.webix = t, this._events = [], this._subs = {}, this._data = {}, e && e.params && t.extend(this._data, e.params)
            }
            return t.prototype.getRoot = function () {
                return this._root
            }, t.prototype.destructor = function () {
                this._detachEvents(), this._destroySubs(), this._events = this._container = this.app = this._parent = this._root = null
            }, t.prototype.setParam = function (t, e, i) {
                if (this._data[t] !== e && (this._data[t] = e, this._segment.update(t, e, 0), i)) return this.show(null)
            }, t.prototype.getParam = function (t, e) {
                var i = this._data[t];
                if (void 0 !== i || !e) return i;
                var n = this.getParentView();
                return n ? n.getParam(t, e) : void 0
            }, t.prototype.getUrl = function () {
                return this._segment.suburl()
            }, t.prototype.getUrlString = function () {
                return this._segment.toString()
            }, t.prototype.getParentView = function () {
                return this._parent
            }, t.prototype.$$ = function (t) {
                if ("string" == typeof t) {
                    var e = this.getRoot();
                    return e.queryView((function (i) {
                        return (i.config.id === t || i.config.localId === t) && i.$scope === e.$scope
                    }), "self")
                }
                return t
            }, t.prototype.on = function (t, e, i) {
                var n = t.attachEvent(e, i);
                return this._events.push({
                    obj: t,
                    id: n
                }), n
            }, t.prototype.contains = function (t) {
                for (var e in this._subs) {
                    var i = this._subs[e].view;
                    if (i === t || i.contains(t)) return !0
                }
                return !1
            }, t.prototype.getSubView = function (t) {
                var e = this.getSubViewInfo(t);
                if (e) return e.subview.view
            }, t.prototype.getSubViewInfo = function (t) {
                var e = this._subs[t || "default"];
                return e ? {
                    subview: e,
                    parent: this
                } : "_top" === t ? (this._subs[t] = {
                    url: "",
                    id: null,
                    popup: !0
                }, this.getSubViewInfo(t)) : this._parent ? this._parent.getSubViewInfo(t) : null
            }, t.prototype._detachEvents = function () {
                for (var t = this._events, e = t.length - 1; e >= 0; e--) t[e].obj.detachEvent(t[e].id)
            }, t.prototype._destroySubs = function () {
                for (var t in this._subs) {
                    var e = this._subs[t].view;
                    e && e.destructor()
                }
                this._subs = {}
            }, t.prototype._init_url_data = function () {
                var t = this._segment.current();
                this._data = {}, this.webix.extend(this._data, t.params, !0)
            }, t.prototype._getDefaultSub = function () {
                if (this._subs.default) return this._subs.default;
                for (var t in this._subs) {
                    var e = this._subs[t];
                    if (!e.branch && e.view && "_top" !== t) {
                        var i = e.view._getDefaultSub();
                        if (i) return i
                    }
                }
            }, t.prototype._routed_view = function () {
                var t = this.getParentView();
                if (!t) return !0;
                var e = t._getDefaultSub();
                return !(!e && e !== this) && t._routed_view()
            }, t
        }();

    function s(t) {
        "/" === t[0] && (t = t.substr(1));
        for (var e = t.split("/"), i = [], n = 0; n < e.length; n++) {
            var r = e[n],
                a = {},
                o = r.indexOf(":");
            if (-1 === o && (o = r.indexOf("?")), -1 !== o)
                for (var s = 0, c = r.substr(o + 1).split(/[\:\?\&]/g); s < c.length; s++) {
                    var h = c[s].split("=");
                    a[h[0]] = decodeURIComponent(h[1])
                }
            i[n] = {
                page: o > -1 ? r.substr(0, o) : r,
                params: a,
                isNew: !0
            }
        }
        return i
    }

    function c(t) {
        for (var e = [], i = 0, n = t; i < n.length; i++) {
            var r = n[i];
            e.push("/" + r.page);
            var a = h(r.params);
            a && e.push("?" + a)
        }
        return e.join("")
    }

    function h(t) {
        var e = [];
        for (var i in t) "object" != typeof t[i] && (e.length && e.push("&"), e.push(i + "=" + encodeURIComponent(t[i])));
        return e.join("")
    }
    var l = function () {
            function t(t, e) {
                this._next = 1, this.route = "string" == typeof t ? {
                    url: s(t),
                    path: t
                } : t, this.index = e
            }
            return t.prototype.current = function () {
                return this.route.url[this.index]
            }, t.prototype.next = function () {
                return this.route.url[this.index + this._next]
            }, t.prototype.suburl = function () {
                return this.route.url.slice(this.index)
            }, t.prototype.shift = function (e) {
                var i = new t(this.route, this.index + this._next);
                return i.setParams(i.route.url, e, i.index), i
            }, t.prototype.setParams = function (t, e, i) {
                if (e) {
                    var n = t[i].params;
                    for (var r in e) n[r] = e[r]
                }
            }, t.prototype.refresh = function () {
                for (var t = this.route.url, e = this.index + 1; e < t.length; e++) t[e].isNew = !0
            }, t.prototype.toString = function () {
                var t = c(this.suburl());
                return t ? t.substr(1) : ""
            }, t.prototype._join = function (t, e) {
                var i = this.route.url;
                if (null === t) return i;
                var n = this.route.url,
                    r = !0;
                if (i = n.slice(0, this.index + (e ? this._next : 0)), t) {
                    i = i.concat(s(t));
                    for (var a = 0; a < i.length; a++) n[a] && (i[a].view = n[a].view), r && n[a] && i[a].page === n[a].page ? i[a].isNew = !1 : i[a].isNew && (r = !1)
                }
                return i
            }, t.prototype.append = function (t) {
                var e = this._join(t, !0);
                return this.route.path = c(e), this.route.url = e, this.route.path
            }, t.prototype.show = function (t, e, i) {
                var n = this,
                    r = this._join(t.url, i);
                return this.setParams(r, t.params, this.index + (i ? this._next : 0)), new Promise((function (t, i) {
                    var o = c(r),
                        s = {
                            url: r,
                            redirect: o,
                            confirm: Promise.resolve()
                        },
                        h = e ? e.app : null;
                    if (h && !h.callEvent("app:guard", [s.redirect, e, s])) return void i(new a);
                    s.confirm.catch((function (t) {
                        return i(t)
                    })).then((function () {
                        if (null !== s.redirect) {
                            if (s.redirect !== o) return h.show(s.redirect), void i(new a);
                            n.route.path = o, n.route.url = r, t()
                        } else i(new a)
                    }))
                }))
            }, t.prototype.size = function (t) {
                this._next = t
            }, t.prototype.split = function () {
                var e = {
                    url: this.route.url.slice(this.index + 1),
                    path: ""
                };
                return e.url.length && (e.path = c(e.url)), new t(e, 0)
            }, t.prototype.update = function (t, e, i) {
                var n = this.route.url[this.index + (i || 0)];
                if (!n) return this.route.url.push({
                    page: "",
                    params: {}
                }), this.update(t, e, i);
                "" === t ? n.page = e : n.params[t] = e, this.route.path = c(this.route.url)
            }, t
        }(),
        u = function (t) {
            function e(e, i) {
                var n = t.call(this, e.webix) || this;
                return n.app = e, n._children = [], n
            }
            return i(e, t), e.prototype.ui = function (t, e) {
                var i = (e = e || {}).container || t.container,
                    n = this.app.createView(t);
                return this._children.push(n), n.render(i, this._segment, this), "object" != typeof t || t instanceof o ? n : n.getRoot()
            }, e.prototype.show = function (t, e) {
                if (e = e || {}, "object" == typeof t) {
                    for (var i in t) this.setParam(i, t[i]);
                    t = null
                } else {
                    if ("/" === t.substr(0, 1)) return this.app.show(t, e);
                    if (0 === t.indexOf("./") && (t = t.substr(2)), 0 === t.indexOf("../")) {
                        var n = this.getParentView();
                        return n ? n.show(t.substr(3), e) : this.app.show("/" + t.substr(3))
                    }
                    var r = this.getSubViewInfo(e.target);
                    if (r) {
                        if (r.parent !== this) return r.parent.show(t, e);
                        if (e.target && "default" !== e.target) return this._renderFrameLock(e.target, r.subview, {
                            url: t,
                            params: e.params
                        })
                    } else if (t) return this.app.show("/" + t, e)
                }
                return this._show(this._segment, {
                    url: t,
                    params: e.params
                }, this)
            }, e.prototype._show = function (t, e, i) {
                var n = this;
                return t.show(e, i, !0).then((function () {
                    return n._init_url_data(), n._urlChange()
                })).then((function () {
                    t.route.linkRouter && (n.app.getRouter().set(t.route.path, {
                        silent: !0
                    }), n.app.callEvent("app:route", [t.route.path]))
                }))
            }, e.prototype.init = function (t, e) {}, e.prototype.ready = function (t, e) {}, e.prototype.config = function () {
                this.app.webix.message("View:Config is not implemented")
            }, e.prototype.urlChange = function (t, e) {}, e.prototype.destroy = function () {}, e.prototype.destructor = function () {
                this.destroy(), this._destroyKids(), this._root && (this._root.destructor(), t.prototype.destructor.call(this))
            }, e.prototype.use = function (t, e) {
                t(this.app, this, e)
            }, e.prototype.refresh = function () {
                this.getUrl();
                return this.destroy(), this._destroyKids(), this._destroySubs(), this._detachEvents(), this._container.tagName && this._root.destructor(), this._segment.refresh(), this._render(this._segment)
            }, e.prototype.render = function (t, e, i) {
                var n = this;
                "string" == typeof e && (e = new l(e, 0)), this._segment = e, this._parent = i, this._init_url_data();
                var r = "string" == typeof (t = t || document.body) ? this.webix.toNode(t) : t;
                return this._container !== r ? (this._container = r, this._render(e)) : this._urlChange().then((function () {
                    return n.getRoot()
                }))
            }, e.prototype._render = function (t) {
                var e = this,
                    i = this.config();
                return i.then ? i.then((function (i) {
                    return e._render_final(i, t)
                })) : this._render_final(i, t)
            }, e.prototype._render_final = function (t, e) {
                var i, n = this,
                    r = null,
                    a = null,
                    o = !1;
                if (this._container.tagName ? a = this._container : (r = this._container).popup ? (a = document.body, o = !0) : a = this.webix.$$(r.id), !this.app || !a) return Promise.reject(null);
                var s = this._segment.current(),
                    c = {
                        ui: {}
                    };
                this.app.copyConfig(t, c.ui, this._subs), this.app.callEvent("app:render", [this, e, c]), c.ui.$scope = this, !r && s.isNew && s.view && s.view.destructor();
                try {
                    if (r && !o) {
                        var h = a,
                            l = h.getParentView();
                        l && "multiview" === l.name && !c.ui.id && (c.ui.id = h.config.id)
                    }
                    this._root = this.app.webix.ui(c.ui, a);
                    var u = this._root;
                    o && u.setPosition && !u.isVisible() && u.show(), r && (r.view && r.view !== this && r.view !== this.app && r.view.destructor(), r.id = this._root.config.id, this.getParentView() || !this.app.app ? r.view = this : r.view = this.app), s.isNew && (s.view = this, s.isNew = !1), i = Promise.resolve(this._init(this._root, e)).then((function () {
                        return n._urlChange().then((function () {
                            return n._initUrl = null, n.ready(n._root, e.suburl())
                        }))
                    }))
                } catch (t) {
                    i = Promise.reject(t)
                }
                return i.catch((function (t) {
                    return n._initError(n, t)
                }))
            }, e.prototype._init = function (t, e) {
                return this.init(t, e.suburl())
            }, e.prototype._urlChange = function () {
                var t = this;
                this.app.callEvent("app:urlchange", [this, this._segment]);
                var e = [];
                for (var i in this._subs) {
                    var n = this._subs[i],
                        r = this._renderFrameLock(i, n, null);
                    r && e.push(r)
                }
                return Promise.all(e).then((function () {
                    return t.urlChange(t._root, t._segment.suburl())
                }))
            }, e.prototype._renderFrameLock = function (t, e, i) {
                if (!e.lock) {
                    var n = this._renderFrame(t, e, i);
                    n && (e.lock = n.then((function () {
                        return e.lock = null
                    }), (function () {
                        return e.lock = null
                    })))
                }
                return e.lock
            }, e.prototype._renderFrame = function (t, e, i) {
                var n = this;
                if ("default" === t) {
                    if (this._segment.next()) {
                        var r = i ? i.params : null;
                        return e.params && (r = this.webix.extend(r || {}, e.params)), this._createSubView(e, this._segment.shift(r))
                    }
                    e.view && e.popup && (e.view.destructor(), e.view = null)
                }
                if (null !== i && (e.url = i.url, e.params && (i.params = this.webix.extend(i.params || {}, e.params))), e.route) {
                    if (null !== i) return e.route.show(i, e.view).then((function () {
                        return n._createSubView(e, e.route)
                    }));
                    if (e.branch) return
                }
                var a = e.view;
                if (!a && e.url) {
                    if ("string" == typeof e.url) return e.route = new l(e.url, 0), i && e.route.setParams(e.route.route.url, i.params, 0), e.params && e.route.setParams(e.route.route.url, e.params, 0), this._createSubView(e, e.route);
                    "function" != typeof e.url || a instanceof e.url || (a = new(this.app._override(e.url))(this.app, "")), a || (a = e.url)
                }
                if (a) return a.render(e, e.route || this._segment, this)
            }, e.prototype._initError = function (t, e) {
                return this.app && this.app.error("app:error:initview", [e, t]), !0
            }, e.prototype._createSubView = function (t, e) {
                var i = this;
                return this.app.createFromURL(e.current()).then((function (n) {
                    return n.render(t, e, i)
                }))
            }, e.prototype._destroyKids = function () {
                for (var t = this._children, e = t.length - 1; e >= 0; e--) t[e] && t[e].destructor && t[e].destructor();
                this._children = []
            }, e
        }(o),
        d = function (t) {
            function e(e, i) {
                var n = t.call(this, e, i) || this;
                return n._ui = i.ui, n
            }
            return i(e, t), e.prototype.config = function () {
                return this._ui
            }, e
        }(u),
        p = function () {
            function t(t, e, i) {
                this.path = "", this.app = i
            }
            return t.prototype.set = function (t, e) {
                this.path = t;
                var i = this.app;
                i.app.getRouter().set(i._segment.append(this.path), {
                    silent: !0
                })
            }, t.prototype.get = function () {
                return this.path
            }, t
        }(),
        f = !0,
        v = function (t) {
            function e(e) {
                var i = this,
                    n = (e || {}).webix || window.webix;
                return e = n.extend({
                    name: "App",
                    version: "1.0",
                    start: "/home"
                }, e, !0), (i = t.call(this, n, e) || this).config = e, i.app = i.config.app, i.ready = Promise.resolve(), i._services = {}, i.webix.extend(i, i.webix.EventSystem), i
            }
            return i(e, t), e.prototype.getUrl = function () {
                return this._subSegment.suburl()
            }, e.prototype.getUrlString = function () {
                return this._subSegment.toString()
            }, e.prototype.getService = function (t) {
                var e = this._services[t];
                return "function" == typeof e && (e = this._services[t] = e(this)), e
            }, e.prototype.setService = function (t, e) {
                this._services[t] = e
            }, e.prototype.destructor = function () {
                this.getSubView().destructor(), t.prototype.destructor.call(this)
            }, e.prototype.copyConfig = function (t, e, i) {
                if ((t instanceof o || "function" == typeof t && t.prototype instanceof o) && (t = {
                        $subview: t
                    }), void 0 !== t.$subview) return this.addSubView(t, e, i);
                var n = t instanceof Array;
                for (var r in e = e || (n ? [] : {}), t) {
                    var a = t[r];
                    if ("function" == typeof a && a.prototype instanceof o && (a = {
                            $subview: a
                        }), !a || "object" != typeof a || a instanceof this.webix.DataCollection || a instanceof RegExp || a instanceof Map) e[r] = a;
                    else if (a instanceof Date) e[r] = new Date(a);
                    else {
                        var s = this.copyConfig(a, a instanceof Array ? [] : {}, i);
                        null !== s && (n ? e.push(s) : e[r] = s)
                    }
                }
                return e
            }, e.prototype.getRouter = function () {
                return this.$router
            }, e.prototype.clickHandler = function (t, e) {
                if (t && (e = e || t.target || t.srcElement) && e.getAttribute) {
                    var i = e.getAttribute("trigger");
                    if (i) return this._forView(e, (function (t) {
                        return t.app.trigger(i)
                    })), t.cancelBubble = !0, t.preventDefault();
                    var n = e.getAttribute("route");
                    if (n) return this._forView(e, (function (t) {
                        return t.show(n)
                    })), t.cancelBubble = !0, t.preventDefault()
                }
                var r = e.parentNode;
                r && this.clickHandler(t, r)
            }, e.prototype.getRoot = function () {
                return this.getSubView().getRoot()
            }, e.prototype.refresh = function () {
                var t = this;
                return this._subSegment ? this.getSubView().refresh().then((function (e) {
                    return t.callEvent("app:route", [t.getUrl()]), e
                })) : Promise.resolve(null)
            }, e.prototype.loadView = function (t) {
                var e = this,
                    i = this.config.views,
                    n = null;
                if ("" === t) return Promise.resolve(this._loadError("", new Error("Webix Jet: Empty url segment")));
                try {
                    i && "string" == typeof (n = "function" == typeof i ? i(t) : i[t]) && (t = n, n = null), n || ("_hidden" === t ? n = {
                        hidden: !0
                    } : "_blank" === t ? n = {} : (t = t.replace(/\./g, "/"), n = this.require("jet-views", t)))
                } catch (e) {
                    n = this._loadError(t, e)
                }
                return n.then || (n = Promise.resolve(n)), n = n.then((function (t) {
                    return t.__esModule ? t.default : t
                })).catch((function (i) {
                    return e._loadError(t, i)
                }))
            }, e.prototype._forView = function (t, e) {
                var i = this.webix.$$(t);
                i && e(i.$scope)
            }, e.prototype._loadViewDynamic = function (t) {
                return null
            }, e.prototype.createFromURL = function (t) {
                var e = this;
                return t.isNew || !t.view ? this.loadView(t.page).then((function (i) {
                    return e.createView(i, name, t.params)
                })) : Promise.resolve(t.view)
            }, e.prototype._override = function (t) {
                var e = this.config.override;
                if (e) {
                    for (var i = void 0; t;) i = t, t = e.get(t);
                    return i
                }
                return t
            }, e.prototype.createView = function (t, i, n) {
                if ("function" == typeof (t = this._override(t))) {
                    if (t.prototype instanceof e) return new t({
                        app: this,
                        name: i,
                        params: n,
                        router: p
                    });
                    if (t.prototype instanceof o) return new t(this, {
                        name: i,
                        params: n
                    });
                    t = t(this)
                }
                return t instanceof o ? t : new d(this, {
                    name: i,
                    ui: t
                })
            }, e.prototype.show = function (t, e) {
                return t && this.app && 0 == t.indexOf("//") ? this.app.show(t.substr(1), e) : this.render(this._container, t || this.config.start, e)
            }, e.prototype.trigger = function (t) {
                for (var e = [], i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
                this.apply(t, e)
            }, e.prototype.apply = function (t, e) {
                this.callEvent(t, e)
            }, e.prototype.action = function (t) {
                return this.webix.bind((function () {
                    for (var e = [], i = 0; i < arguments.length; i++) e[i] = arguments[i];
                    this.apply(t, e)
                }), this)
            }, e.prototype.on = function (t, e) {
                this.attachEvent(t, e)
            }, e.prototype.use = function (t, e) {
                t(this, null, e)
            }, e.prototype.error = function (t, e) {
                if (this.callEvent(t, e), this.callEvent("app:error", e), this.config.debug)
                    for (var i = 0; i < e.length; i++)
                        if (console.error(e[i]), e[i] instanceof Error) {
                            var n = e[i].message;
                            0 === n.indexOf("Module build failed") ? (n = n.replace(/\x1b\[[0-9;]*m/g, ""), document.body.innerHTML = "<pre style='font-size:16px; background-color: #ec6873; color: #000; padding:10px;'>" + n + "</pre>") : (n += "<br><br>Check console for more details", this.webix.message({
                                type: "error",
                                text: n,
                                expire: -1
                            }))
                        }
            }, e.prototype.render = function (t, e, i) {
                var n = this;
                this._container = "string" == typeof t ? this.webix.toNode(t) : t || document.body;
                var r = null;
                !this.$router ? (f && "tagName" in this._container && (this.webix.event(document.body, "click", (function (t) {
                    return n.clickHandler(t)
                })), f = !1), "string" == typeof e && (e = new l(e, 0)), this._subSegment = this._first_start(e), this._subSegment.route.linkRouter = !0) : r = "string" == typeof e ? e : this.app ? e.split().route.path || this.config.start : e.toString();
                var a = i ? i.params : this.config.params || null,
                    o = this.getSubView(),
                    s = this._subSegment,
                    c = s.show({
                        url: r,
                        params: a
                    }, o).then((function () {
                        return n.createFromURL(s.current())
                    })).then((function (e) {
                        return e.render(t, s)
                    })).then((function (t) {
                        return n.$router.set(s.route.path, {
                            silent: !0
                        }), n.callEvent("app:route", [n.getUrl()]), t
                    }));
                return this.ready = this.ready.then((function () {
                    return c
                })), c
            }, e.prototype.getSubView = function () {
                if (this._subSegment) {
                    var t = this._subSegment.current().view;
                    if (t) return t
                }
                return new u(this, {})
            }, e.prototype.require = function (t, e) {
                return null
            }, e.prototype._first_start = function (t) {
                var e = this;
                this._segment = t;
                if (this.$router = new this.config.router((function (t) {
                        return setTimeout((function () {
                            e.show(t).catch((function (t) {
                                if (!(t instanceof a)) throw t
                            }))
                        }), 1)
                    }), this.config, this), this._container === document.body && !1 !== this.config.animation) {
                    var i = this._container;
                    this.webix.html.addCss(i, "webixappstart"), setTimeout((function () {
                        e.webix.html.removeCss(i, "webixappstart"), e.webix.html.addCss(i, "webixapp")
                    }), 10)
                }
                if (t) {
                    if (this.app) {
                        var n = t.current().view;
                        t.current().view = this, t.next() ? (t.refresh(), t = t.split()) : t = new l(this.config.start, 0), t.current().view = n
                    }
                } else {
                    var r = this.$router.get();
                    r || (r = this.config.start, this.$router.set(r, {
                        silent: !0
                    })), t = new l(r, 0)
                }
                return t
            }, e.prototype._loadError = function (t, e) {
                return this.error("app:error:resolve", [e, t]), {
                    template: " "
                }
            }, e.prototype.addSubView = function (t, e, i) {
                var n = !0 !== t.$subview ? t.$subview : null,
                    r = t.name || (n ? this.webix.uid() : "default");
                return e.id = t.id || "s" + this.webix.uid(), (i[r] = {
                    id: e.id,
                    url: n,
                    branch: t.branch,
                    popup: t.popup,
                    params: t.params
                }).popup ? null : e
            }, e
        }(o),
        g = function () {
            function t(t, e) {
                var i = this;
                this.config = e || {}, this._detectPrefix(), this.cb = t, window.onpopstate = function () {
                    return i.cb(i.get())
                }
            }
            return t.prototype.set = function (t, e) {
                var i = this;
                if (this.config.routes) {
                    var n = t.split("?", 2);
                    for (var r in this.config.routes)
                        if (this.config.routes[r] === n[0]) {
                            t = r + (n.length > 1 ? "?" + n[1] : "");
                            break
                        }
                }
                this.get() !== t && window.history.pushState(null, null, this.prefix + this.sufix + t), e && e.silent || setTimeout((function () {
                    return i.cb(t)
                }), 1)
            }, t.prototype.get = function () {
                var t = this._getRaw().replace(this.prefix, "").replace(this.sufix, "");
                if (t = "/" !== t && "#" !== t ? t : "", this.config.routes) {
                    var e = t.split("?", 2),
                        i = this.config.routes[e[0]];
                    i && (t = i + (e.length > 1 ? "?" + e[1] : ""))
                }
                return t
            }, t.prototype._detectPrefix = function () {
                var t = this.config.routerPrefix;
                this.sufix = "#" + (void 0 === t ? "!" : t), this.prefix = document.location.href.split("#", 2)[0]
            }, t.prototype._getRaw = function () {
                return document.location.href
            }, t
        }(),
        m = !1;

    function y(t) {
        if (!m && t) {
            m = !0;
            var e = window;
            e.Promise || (e.Promise = t.promise);
            var i = t.version.split(".");
            10 * i[0] + 1 * i[1] < 53 && (t.ui.freeze = function (e) {
                var i = e();
                return i && i.then ? i.then((function (e) {
                    return t.ui.$freeze = !1, t.ui.resize(), e
                })) : (t.ui.$freeze = !1, t.ui.resize()), i
            });
            var n = t.ui.baselayout.prototype.addView,
                r = t.ui.baselayout.prototype.removeView,
                a = {
                    addView: function (t, e) {
                        if (this.$scope && this.$scope.webixJet && !t.queryView) {
                            var i = this.$scope,
                                r = {};
                            t = i.app.copyConfig(t, {}, r), n.apply(this, [t, e]);
                            var a = function (t) {
                                i._renderFrame(t, r[t], null).then((function () {
                                    i._subs[t] = r[t]
                                }))
                            };
                            for (var o in r) a(o);
                            return t.id
                        }
                        return n.apply(this, arguments)
                    },
                    removeView: function () {
                        if (r.apply(this, arguments), this.$scope && this.$scope.webixJet) {
                            var e = this.$scope._subs;
                            for (var i in e) {
                                var n = e[i];
                                t.$$(n.id) || (n.view.destructor(), delete e[i])
                            }
                        }
                    }
                };
            t.extend(t.ui.layout.prototype, a, !0), t.extend(t.ui.baselayout.prototype, a, !0), t.protoUI({
                name: "jetapp",
                $init: function (e) {
                    this.$app = new this.app(e);
                    var i = t.uid().toString();
                    e.body = {
                        id: i
                    }, this.$ready.push((function () {
                        this.callEvent("onInit", [this.$app]), this.$app.render({
                            id: i
                        })
                    }))
                }
            }, t.ui.proxy, t.EventSystem)
        }
    }
    var w = function (t) {
            function e(e) {
                var i;
                return e.router = e.router || g, y((i = t.call(this, e) || this).webix), i
            }
            return i(e, t), e.prototype.require = function (t, e) {
                return require(t + "/" + e)
            }, e
        }(v),
        _ = (function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            i(e, t), e.prototype._detectPrefix = function () {
                this.prefix = "", this.sufix = this.config.routerPrefix || ""
            }, e.prototype._getRaw = function () {
                return document.location.pathname + (document.location.search || "")
            }
        }(g), function () {
            function t(t, e) {
                this.path = "", this.cb = t
            }
            return t.prototype.set = function (t, e) {
                var i = this;
                this.path = t, e && e.silent || setTimeout((function () {
                    return i.cb(t)
                }), 1)
            }, t.prototype.get = function () {
                return this.path
            }, t
        }());

    function b(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }

    function x(t, e, i) {
        for (var n in t) b(t, n) && e.call(i || t, t[n], n, t)
    }

    function S(t) {
        t = "Warning: " + t, "undefined" != typeof console && console.error(t);
        try {
            throw new Error(t)
        } catch (t) {}
    }
    var D = String.prototype.replace,
        $ = String.prototype.split,
        C = function (t) {
            var e = t % 10;
            return 11 !== t && 1 === e ? 0 : 2 <= e && e <= 4 && !(t >= 12 && t <= 14) ? 1 : 2
        },
        E = {
            arabic: function (t) {
                if (t < 3) return t;
                var e = t % 100;
                return e >= 3 && e <= 10 ? 3 : e >= 11 ? 4 : 5
            },
            bosnian_serbian: C,
            chinese: function () {
                return 0
            },
            croatian: C,
            french: function (t) {
                return t > 1 ? 1 : 0
            },
            german: function (t) {
                return 1 !== t ? 1 : 0
            },
            russian: C,
            lithuanian: function (t) {
                return t % 10 == 1 && t % 100 != 11 ? 0 : t % 10 >= 2 && t % 10 <= 9 && (t % 100 < 11 || t % 100 > 19) ? 1 : 2
            },
            czech: function (t) {
                return 1 === t ? 0 : t >= 2 && t <= 4 ? 1 : 2
            },
            polish: function (t) {
                if (1 === t) return 0;
                var e = t % 10;
                return 2 <= e && e <= 4 && (t % 100 < 10 || t % 100 >= 20) ? 1 : 2
            },
            icelandic: function (t) {
                return t % 10 != 1 || t % 100 == 11 ? 1 : 0
            },
            slovenian: function (t) {
                var e = t % 100;
                return 1 === e ? 0 : 2 === e ? 1 : 3 === e || 4 === e ? 2 : 3
            }
        },
        T = {
            arabic: ["ar"],
            bosnian_serbian: ["bs-Latn-BA", "bs-Cyrl-BA", "srl-RS", "sr-RS"],
            chinese: ["id", "id-ID", "ja", "ko", "ko-KR", "lo", "ms", "th", "th-TH", "zh"],
            croatian: ["hr", "hr-HR"],
            german: ["fa", "da", "de", "en", "es", "fi", "el", "he", "hi-IN", "hu", "hu-HU", "it", "nl", "no", "pt", "sv", "tr"],
            french: ["fr", "tl", "pt-br"],
            russian: ["ru", "ru-RU"],
            lithuanian: ["lt"],
            czech: ["cs", "cs-CZ", "sk"],
            polish: ["pl"],
            icelandic: ["is"],
            slovenian: ["sl-SL"]
        };

    function k(t) {
        var e, i = (e = {}, x(T, (function (t, i) {
            x(t, (function (t) {
                e[t] = i
            }))
        })), e);
        return i[t] || i[$.call(t, /-/, 1)[0]] || i.en
    }

    function L(t) {
        return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    }
    var I = /\$/g,
        A = /%\{(.*?)\}/g;

    function P(t, e, i, n) {
        if ("string" != typeof t) throw new TypeError("Polyglot.transformPhrase expects argument #1 to be string");
        if (null == e) return t;
        var r = t,
            a = n || A,
            o = "number" == typeof e ? {
                smart_count: e
            } : e;
        if (null != o.smart_count && r) {
            var s = $.call(r, "||||");
            r = (s[function (t, e) {
                return E[k(t)](e)
            }(i || "en", o.smart_count)] || s[0]).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
        }
        return r = D.call(r, a, (function (t, e) {
            return b(o, e) && null != o[e] ? D.call(o[e], I, "$$") : t
        }))
    }

    function M(t) {
        var e = t || {};
        this.phrases = {}, this.extend(e.phrases || {}), this.currentLocale = e.locale || "en";
        var i = e.allowMissing ? P : null;
        this.onMissingKey = "function" == typeof e.onMissingKey ? e.onMissingKey : i, this.warn = e.warn || S, this.tokenRegex = function (t) {
            var e = t && t.prefix || "%{",
                i = t && t.suffix || "}";
            if ("||||" === e || "||||" === i) throw new RangeError('"||||" token is reserved for pluralization');
            return new RegExp(L(e) + "(.*?)" + L(i), "g")
        }(e.interpolation)
    }
    M.prototype.locale = function (t) {
        return t && (this.currentLocale = t), this.currentLocale
    }, M.prototype.extend = function (t, e) {
        x(t, (function (t, i) {
            var n = e ? e + "." + i : i;
            "object" == typeof t ? this.extend(t, n) : this.phrases[n] = t
        }), this)
    }, M.prototype.unset = function (t, e) {
        "string" == typeof t ? delete this.phrases[t] : x(t, (function (t, i) {
            var n = e ? e + "." + i : i;
            "object" == typeof t ? this.unset(t, n) : delete this.phrases[n]
        }), this)
    }, M.prototype.clear = function () {
        this.phrases = {}
    }, M.prototype.replace = function (t) {
        this.clear(), this.extend(t)
    }, M.prototype.t = function (t, e) {
        var i, n, r = null == e ? {} : e;
        if ("string" == typeof this.phrases[t]) i = this.phrases[t];
        else if ("string" == typeof r._) i = r._;
        else if (this.onMissingKey) {
            n = (0, this.onMissingKey)(t, r, this.currentLocale, this.tokenRegex)
        } else this.warn('Missing translation for key: "' + t + '"'), n = t;
        return "string" == typeof i && (n = P(i, r, this.currentLocale, this.tokenRegex)), n
    }, M.prototype.has = function (t) {
        return b(this.phrases, t)
    }, M.transformPhrase = function (t, e, i) {
        return P(t, e, i)
    };
    var R = M;
    var O = window.webix;
    O && y(O);
    var N = function (t, e, i) {
            var n = (i = i || {}).storage,
                r = n ? n.get("lang") || "en" : i.lang || "en";

            function a(e, a, o) {
                a.__esModule && (a = a.default);
                var c = {
                    phrases: a
                };
                i.polyglot && t.webix.extend(c, i.polyglot);
                var h = s.polyglot = new R(c);
                if (h.locale(e), s._ = t.webix.bind(h.t, h), r = e, n && n.put("lang", r), i.webix) {
                    var l = i.webix[e];
                    l && t.webix.i18n.setLocale(l)
                }
                return o ? Promise.resolve() : t.refresh()
            }

            function o(e, n) {
                if (!1 !== i.path) {
                    var r = (i.path ? i.path + "/" : "") + e;
                    a(e, t.require("jet-locales", r), n)
                }
            }
            var s = {
                getLang: function () {
                    return r
                },
                setLang: o,
                setLangData: a,
                _: null,
                polyglot: null
            };
            t.setService("locale", s), o(r, !0)
        },
        U = window;
    U.Promise || (U.Promise = U.webix.promise);
    var Y = 1;

    function H(t, e, i) {
        Object.defineProperty(e, i, {
            get: function () {
                return t[i]
            },
            set: function (e) {
                return t[i] = e
            }
        })
    }

    function B(t, e) {
        e = e || {};
        var i = {},
            n = {},
            r = function (t, e) {
                var r = Y++;
                return i[r] = {
                    mask: t,
                    handler: e
                }, e("*" === t ? n : n[t], void 0, t), r
            },
            a = [],
            o = !1,
            s = function (t, e, n, r) {
                if (o) a.push([t, e, n, r]);
                else
                    for (var s = Object.keys(i), c = 0; c < s.length; c++) {
                        var h = i[s[c]];
                        h && ("*" !== h.mask && h.mask !== t || h.handler(n, e, t, r))
                    }
            };
        return Object.defineProperty(n, "$changes", {
            value: {
                attachEvent: r,
                detachEvent: function (t) {
                    delete i[t]
                }
            },
            enumerable: !1,
            configurable: !1
        }), Object.defineProperty(n, "$observe", {
            value: r,
            enumerable: !1,
            configurable: !1
        }), Object.defineProperty(n, "$batch", {
            value: function (t) {
                if ("function" != typeof t) {
                    var e = t;
                    t = function () {
                        for (var t in e) n[t] = e[t]
                    }
                }
                for (o = !0, t(n), o = !1; a.length;) {
                    var i = a.shift();
                    s.apply(this, i)
                }
            },
            enumerable: !1,
            configurable: !1
        }), Object.defineProperty(n, "$extend", {
            value: function (t, i) {
                for (var r in i = i || e, t)
                    if (t.hasOwnProperty(r)) {
                        var a = t[r];
                        i.nested && "object" == typeof a && a ? n[r] = B(a, i) : F(n, a, r, s)
                    }
            },
            enumerable: !1,
            configurable: !1
        }), n.$extend(t, e), n
    }

    function F(t, e, i, n) {
        Object.defineProperty(t, i, {
            get: function () {
                return e
            },
            set: function (t) {
                if (null === e || null === t ? e !== t : e.valueOf() != t.valueOf()) {
                    var r = e;
                    e = t, n(i, r, t, null)
                }
            },
            enumerable: !0,
            configurable: !1
        })
    }
    var V = !1;

    function G(t, e, i) {
        var n = e.$width,
            r = e.$height;
        t.config._fillApp ? t.define({
            width: n,
            height: r
        }) : t.define({
            left: (n - t.$width) / 2,
            top: (r - t.$height) / 2
        }), i || t.resize()
    }

    function j(t, e) {
        var i = e.getRoot();
        t.attachEvent("onHide", (function () {
            i.$destructed || (webix.html.removeCss(i.$view, "webix_win_inside"), i.enable())
        }));
        var n = e.attachEvent("view:resize", (function () {
            G(t, i)
        }));
        t.attachEvent("onDestruct", (function () {
            e.detachEvent(n)
        }))
    }

    function W(t) {
        var e = webix.promise.defer(),
            i = setInterval((function () {
                var n = t.$destructed;
                (n || t.isVisible()) && (n ? e.reject() : e.resolve(), clearInterval(i))
            }), 300);
        return e
    }
    var z = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = this,
                    e = this.app.getService("locale")._,
                    i = this.getParam("compact", !0),
                    n = this.app.config.calendars;
                return {
                    view: "align",
                    body: {
                        view: i ? "icon" : "button",
                        type: "icon",
                        icon: "wxi-plus",
                        css: "webix_primary",
                        label: e("Create"),
                        width: i ? 50 : n ? 185 : 100,
                        height: i ? 50 : webix.skin.$active.inputHeight,
                        on: {
                            onItemClick: function () {
                                return t.AddEvent()
                            }
                        }
                    },
                    align: "middle"
                }
            }, e.prototype.AddEvent = function () {
                this.app.getState().selected = {
                    id: "0"
                }
            }, e
        }(u),
        q = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = this;
                return {
                    cols: [{
                        view: "icon",
                        icon: "wxi-angle-left",
                        tooltip: function () {
                            return t.NavLabel(-1)
                        },
                        align: "left",
                        on: {
                            onItemClick: function () {
                                return t.ChangeDate(-1)
                            }
                        }
                    }, {
                        view: "label",
                        localId: "title",
                        align: "center",
                        width: 160
                    }, {
                        view: "icon",
                        icon: "wxi-angle-right",
                        tooltip: function () {
                            return t.NavLabel(1)
                        },
                        align: "right",
                        on: {
                            onItemClick: function () {
                                return t.ChangeDate(1)
                            }
                        }
                    }]
                }
            }, e.prototype.init = function () {
                var t = this;
                this.State = this.app.getState(), this.on(this.State.$changes, "date", (function () {
                    return t.DateLabel()
                })), this.on(this.State.$changes, "mode", (function () {
                    return t.DateLabel()
                })), this.app.config.timeline && this.on(this.State.$changes, "timelineMode", (function () {
                    return t.DateLabel()
                }))
            }, e.prototype.ChangeDate = function (t) {
                var e = this.State,
                    i = this.GetStep(e.mode),
                    n = webix.Date.add(e.date, t, i, !0);
                if ("month" === e.mode) {
                    var r = Math.abs(e.date.getMonth() - n.getMonth());
                    1 != r && r < 6 && n.setDate(0)
                }
                e.$batch({
                    date: n,
                    selected: null
                })
            }, e.prototype.GetStep = function (t) {
                switch (t) {
                    case "agenda":
                        return "month";
                    case "units":
                        return "day";
                    case "timeline":
                        return this.State.timelineMode;
                    default:
                        return t
                }
            }, e.prototype.DateLabel = function () {
                var t = this.State.date,
                    e = "day" == this.State.mode || "units" == this.State.mode || "timeline" == this.State.mode && "day" == this.State.timelineMode ? webix.i18n.longDateFormatStr(t) : webix.Date.dateToStr("%F %Y")(t);
                this.$$("title").setHTML(e)
            }, e.prototype.NavLabel = function (t) {
                var e = this.app.getService("locale")._,
                    i = this.State.mode;
                return e((t = t > 0 ? "Next" : "Previous") + (i = -1 !== ["month", "week", "day"].indexOf(i) ? " " + i : ""))
            }, e
        }(u),
        X = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = this,
                    e = this.app.getService("locale")._,
                    i = this.getParam("compact", !0),
                    n = !!this.app.config.units,
                    r = {
                        hidden: i,
                        view: "tabbar",
                        bottomOffset: 0,
                        localId: "buttons",
                        borderless: !0,
                        width: 320,
                        optionWidth: 80,
                        options: [{
                            id: "day",
                            value: e("Ngày")
                        }, {
                            id: "week",
                            value: e("Tuần")
                        }, {
                            id: "month",
                            value: e("Tháng")
                        }, {
                            id: "agenda",
                            value: e("Lịch trình")
                        }]
                    };
                return this.app.config.timeline && (r.width += 80, r.options.push({
                    id: "timeline",
                    value: e("Timeline")
                })), i || (r.on = {
                    onChange: function (e) {
                        return t.SetMode(e)
                    }
                }), n && (r.width += 80, r.options.push({
                    id: "units",
                    value: e("Units")
                })), r
            }, e.prototype.init = function () {
                var t = this;
                this.State = this.app.getState(), this.on(this.State.$changes, "mode", (function (e) {
                    t.$$("buttons").setValue(e)
                }))
            }, e.prototype.SetMode = function (t) {
                this.State.$batch({
                    mode: t,
                    selected: null
                })
            }, e
        }(u),
        K = [
            ["#61AEE6", "#01C2A5", "#E88DD9", "#D2FB9E", "#6BA8CB", "#61BBA5", "#CF89D5"],
            ["#EF9C80", "#8289EE", "#74B1A7", "#DD89AF", "#E48882", "#997CEB", "#ADD579"],
            ["#F68896", "#FFE999", "#6D4BCE", "#99CA58", "#D352BE", "#F7CC34", "#DA5C53"]
        ],
        Q = [
            ["#5890DC", "#3AA3E3", "#045AA3", "#014593", "#01C2A5", "#61A649", "#157B7A"],
            ["#04864F", "#AD44AB", "#CB61C8", "#AC3C6E", "#BA282E", "#BD4E1B", "#B87728"],
            ["#B65F06", "#7A67EB", "#4536AD", "#282A8A", "#36337E", "#585B85", "#2A2F50"]
        ],
        J = {
            material: K,
            mini: K,
            flat: K,
            compact: K,
            contrast: K,
            willow: Q,
            dark: Q
        };

    function Z() {
        var t = webix.skin.$active;
        return {
            view: "colorboard",
            css: "webix_scheduler_palette",
            height: 3 * t.optionHeight + 4,
            width: 7 * t.optionHeight + 4,
            palette: J[webix.skin.$name]
        }
    }
    var tt = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = this,
                    e = this.getParam("compact", !0),
                    i = this.app.getService("locale")._,
                    n = {
                        view: "button",
                        value: i("Save"),
                        align: "right",
                        inputWidth: 100,
                        css: "webix_primary",
                        click: function () {
                            return t.Save()
                        }
                    },
                    r = webix.skin.$active,
                    a = {
                        view: "toolbar",
                        padding: {
                            left: r.layoutPadding.form - (r.inputHeight - 20) / 2,
                            right: r.layoutPadding.form
                        },
                        elements: [{
                            view: "icon",
                            icon: "wxi-close",
                            click: function () {
                                return t.getRoot().hide()
                            }
                        }, {}, n]
                    },
                    o = [{
                        view: "button",
                        localId: "removeBtn",
                        value: i("Delete"),
                        css: "webix_danger webix_scheduler_danger",
                        hidden: !0,
                        align: e ? "center" : "left",
                        inputWidth: e ? 330 : 100,
                        click: function () {
                            return t.Delete()
                        }
                    }];
                e || o.push(n);
                var s = this.app.getService("jet-win").updateConfig({
                    view: "window",
                    width: 400,
                    close: !0,
                    borderless: e,
                    fullscreen: e,
                    css: "webix_scheduler_cal_popup",
                    head: e ? a : i("Edit calendar"),
                    body: {
                        view: "form",
                        localId: "calendars:form",
                        elements: [{
                            view: "text",
                            label: i("Title"),
                            name: "text"
                        }, {
                            view: "colorpicker",
                            label: i("Color"),
                            name: "color",
                            suggest: {
                                type: "colorboard",
                                padding: 3,
                                body: Z()
                            }
                        }, {
                            view: "checkbox",
                            label: i("Active"),
                            name: "active"
                        }, {
                            cols: o
                        }]
                    },
                    on: {
                        onHide: function () {
                            t.Form.clear(), t.$$("removeBtn").hide()
                        }
                    }
                });
                return e && s.body.elements.splice(3, 0, {}), s
            }, e.prototype.init = function () {
                this.Cals = this.app.getService("local").calendars(!0), this.Ops = this.app.getService("operations"), this.Form = this.$$("calendars:form")
            }, e.prototype.Show = function (t) {
                if (t) {
                    var e = this.Cals.getItem(t);
                    this.Form.setValues(e), this.$$("removeBtn").show()
                } else this.Form.setValues({
                    color: "#997CEB",
                    active: 1
                });
                this.getRoot().show(), this.Form.focus()
            }, e.prototype.Save = function () {
                var t = this.Form.getValues();
                t.id ? this.Ops.updateCalendar(t.id, t) : this.Ops.addCalendar(t), this.getRoot().hide()
            }, e.prototype.Delete = function () {
                var t = this,
                    e = this.Form.getValues(),
                    i = this.app.getService("locale")._;
                webix.confirm({
                    text: i("Do you really want to remove this calendar?"),
                    container: this.app.getRoot().$view
                }).then((function () {
                    t.Ops.removeCalendar(e.id), t.getRoot().hide()
                }))
            }, e
        }(u),
        et = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = this,
                    e = this.app.getService("locale")._;
                return {
                    view: "popup",
                    relative: "right",
                    body: {
                        rows: [webix.extend(Z(), {
                            localId: "colors",
                            on: {
                                onItemClick: function (e) {
                                    return t.UpdateColor(e)
                                }
                            }
                        }), {
                            css: "webix_scheduler_settings",
                            template: e("Settings"),
                            height: webix.skin.$active.inputHeight,
                            onClick: {
                                webix_template: function () {
                                    return t.ShowEditor()
                                }
                            }
                        }]
                    },
                    on: {
                        onHide: function () {
                            return t.app.callEvent("side:popup:hide", [])
                        }
                    }
                }
            }, e.prototype.init = function () {
                var t = this;
                W(this.getRoot()).then((function () {
                    t.Editor = t.ui(tt)
                }))
            }, e.prototype.Show = function (t, e, i) {
                this.Cid = t, this.getRoot().show(e), this.$$("colors").setValue(i)
            }, e.prototype.ShowEditor = function () {
                this.Editor.Show(this.Cid), this.getRoot().hide()
            }, e.prototype.UpdateColor = function (t) {
                this.app.getService("operations").updateCalendar(this.Cid, {
                    color: t
                }), this.getRoot().hide()
            }, e.prototype.Hide = function () {
                this.getRoot().hide()
            }, e
        }(u),
        it = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = this;
                this.Compact = this.getParam("compact", !0);
                var e = this.app.getService("locale")._,
                    i = this.app.getState(),
                    n = {
                        view: "calendar",
                        localId: "calendar",
                        height: 276,
                        monthSelect: !1,
                        on: {
                            onAfterDateSelect: function (t) {
                                i.date = webix.Date.dayStart(t)
                            }
                        }
                    },
                    r = {
                        view: "list",
                        localId: "calendars",
                        type: this.ListType(e, i),
                        borderless: !0,
                        autoheight: !0,
                        yCount: 5,
                        editable: !0,
                        editValue: "text",
                        editaction: "custom",
                        editor: "text",
                        css: "webix_scheduler_cal_list",
                        tooltip: function () {
                            return ""
                        },
                        onClick: {
                            webix_scheduler_cal_edit: function (e, i) {
                                return t.ShowPopup(e, i)
                            },
                            webix_scheduler_cal_title: function (e, i) {
                                return t.ToggleCalendar(i)
                            },
                            webix_scheduler_active: function (e, i) {
                                return t.ToggleCalendar(i)
                            }
                        },
                        on: {
                            onBeforeEditStop: function (e, i) {
                                return t.SetTitle(i.id, e.value)
                            }
                        }
                    },
                    a = {
                        type: "form",
                        padding: {
                            top: 8
                        },
                        rows: [{
                            maxHeight: 100
                        }, r, {
                            view: "button",
                            localId: "add",
                            value: e("Add calendar"),
                            hidden: !i.readonly,
                            inputWidth: 190,
                            align: "center",
                            click: function () {
                                return t.AddCalendar()
                            }
                        }, {}]
                    };
                return this.Compact || (r.on.onAfterScroll = function () {
                    return t.Popup.Hide()
                }, a = {
                    view: "scrollview",
                    body: {
                        type: "clean",
                        rows: [n, a]
                    }
                }), a
            }, e.prototype.init = function () {
                var t = this;
                this.Cals = this.$$("calendars"), this.Data = this.app.getService("local"), this.Ops = this.app.getService("operations"), this.Popup = this.Compact ? this.ui(tt) : this.ui(et), webix.extend(this.Cals, webix.EditAbility), this.Data.calendars().then((function (e) {
                    return t.Cals.parse(e)
                }));
                var e = this.app.getState();
                this.Compact || (this.on(e.$changes, "date", (function (e) {
                    t.$$("calendar").setValue(e)
                })), this.on(this.app, "side:popup:hide", (function () {
                    t.Cals.unselectAll()
                }))), this.on(e.$changes, "readonly", (function (e) {
                    return t.ToggleState(e)
                }))
            }, e.prototype.ListType = function (t, e) {
                return {
                    checkbox: function (t) {
                        var e = 1 * t.active ? "wxi-checkbox-marked" : "wxi-checkbox-blank";
                        return '<span style="color:' + t.color + ';" \n\t\t\t\t\trole="checkbox" tabindex="-1" \n\t\t\t\t\taria-checked="' + (t.active ? "true" : "false") + '" \n\t\t\t\t\tclass="webix_icon webix_scheduler_active ' + e + '">\n\t\t\t\t</span>'
                    },
                    template: function (i, n) {
                        var r = '\n\t\t\t\t\t<span\n\t\t\t\t\t\twebix_tooltip="' + t("Edit calendar") + '" \n\t\t\t\t\t\tclass="webix_icon wxi-dots webix_scheduler_cal_edit \n\t\t\t\t\t\t\t' + (webix.env.touch ? " webix_scheduler_cal_visible" : "") + '\n\t\t\t\t\t\t">\n\t\t\t\t\t</span>\n\t\t\t\t';
                        return "\n\t\t\t\t\t" + n.checkbox(i) + '\n\t\t\t\t\t<span class="webix_scheduler_cal_title">' + (i.text || t("(no title)")) + "</span>\n\t\t\t\t\t" + (e.readonly ? "" : r) + "\n\t\t\t\t"
                    }
                }
            }, e.prototype.AddCalendar = function () {
                var t = this,
                    e = this.app.getService("locale")._;
                this.Ops.addCalendar().then((function (i) {
                    t.Cals.edit(i), t.Cals.getEditor().getInputNode().setAttribute("placeholder", e("(no title)"))
                }))
            }, e.prototype.ShowPopup = function (t, e) {
                if (this.Compact) this.Popup.Show(e);
                else {
                    this.Cals.select(e);
                    var i = this.Cals.getItem(e).color;
                    this.Popup.Show(e, this.Cals.getItemNode(e), i)
                }
            }, e.prototype.ToggleCalendar = function (t) {
                var e = this.Cals.getItem(t);
                this.Ops.updateCalendar(t, {
                    active: 1 ^ e.active
                })
            }, e.prototype.ToggleState = function (t) {
                var e = this.$$("add");
                t ? e.hide() : e.show(), this.Cals.refresh()
            }, e.prototype.SetTitle = function (t, e) {
                var i = this;
                return this.Ops.updateCalendar(t, {
                    text: e
                }).then((function () {
                    return i.EditStopSilent()
                }), (function () {
                    return i.EditStopSilent(!0)
                })), !1
            }, e.prototype.EditStopSilent = function (t) {
                this.Cals.blockEvent(), t ? this.Cals.editCancel() : this.Cals.editStop(), this.Cals.unblockEvent()
            }, e
        }(u),
        nt = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = this,
                    e = this.app.getService("locale")._,
                    i = !!this.app.config.units,
                    n = {
                        view: "list",
                        css: "webix_scheduler_navlist",
                        localId: "modes",
                        autoheight: !0,
                        data: [{
                            id: "day",
                            value: e("Day"),
                            icon: "shi-day"
                        }, {
                            id: "week",
                            value: e("Week"),
                            icon: "shi-week"
                        }, {
                            id: "month",
                            value: e("Month"),
                            icon: "shi-month"
                        }, {
                            id: "agenda",
                            value: e("Agenda"),
                            icon: "shi-agenda"
                        }],
                        on: {
                            onItemClick: function (e) {
                                return t.SetMode(e)
                            }
                        }
                    };
                i && n.data.push({
                    id: "units",
                    value: e("Units"),
                    icon: "shi-units"
                }), this.app.config.timeline && n.data.push({
                    id: "timeline",
                    value: e("Timeline"),
                    icon: "shi-timeline"
                });
                var r = {
                    view: "sidemenu",
                    animate: !1,
                    borderless: !0,
                    css: "webix_scheduler_sidemenu",
                    width: 300,
                    state: function (e) {
                        var i = webix.skin.$active.tabbarHeight + 10;
                        e.left = t.Parent.left, e.top = t.Parent.top + i + 2, e.height = t.Parent.height - i - 2
                    },
                    body: n
                };
                return this.app.config.calendars && (r.body = {
                    view: "scrollview",
                    body: {
                        type: "clean",
                        rows: [n, it]
                    }
                }), r
            }, e.prototype.init = function () {
                var t = this;
                this.State = this.app.getState(), this.on(this.app, "view:resize", (function () {
                    t.getRoot().isVisible() && t.Show(!0)
                }))
            }, e.prototype.Show = function (t) {
                !t && this.getRoot().isVisible() || (this.Parent = this.app.getRoot().$view.getBoundingClientRect(), this.$$("modes").select(this.State.mode), this.getRoot().show())
            }, e.prototype.SetMode = function (t) {
                var e = this;
                this.getRoot().hide(), setTimeout((function () {
                    return e.State.$batch({
                        mode: t,
                        selected: null
                    })
                }), 500)
            }, e
        }(u),
        rt = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = this,
                    e = this.app.getService("locale")._;
                this.Compact = this.getParam("compact", !0);
                var i = {
                        view: "icon",
                        icon: "wxi-calendar",
                        batch: "compact",
                        tooltip: e("Hôm nay"),
                        click: function () {
                            return t.SetToday()
                        }
                    },
                    n = {
                        view: "align",
                        align: "middle",
                        batch: "full",
                        body: {
                            width: 80,
                            view: "button",
                            css: "webix_transparent",
                            value: e("Today"),
                            click: function () {
                                return t.SetToday()
                            }
                        }
                    };
                return {
                    view: "toolbar",
                    css: "webix_scheduler_toolbar webix_dark",
                    responsive: !0,
                    paddingY: 0,
                    paddingX: 4,
                    height: webix.skin.$active.tabbarHeight + 10,
                    visibleBatch: this.Compact ? "compact" : "full",
                    cols: [{
                        view: "icon",
                        icon: "shi-menu",
                        click: function () {
                            return t.ShowNav()
                        },
                        hidden: !this.Compact && !this.app.config.calendars,
                        responsiveCell: !1
                    }, {
                        view: "proxy",
                        localId: "add",
                        borderless: !0,
                        body: z,
                        batch: "full",
                        responsiveCell: !1
                    }, {}, {
                        view: "proxy",
                        borderless: !0,
                        body: q,
                        responsiveCell: !1
                    }, {}, n, {
                        width: 12
                    }, X, i]
                }
            }, e.prototype.init = function () {
                var t = this;
                this.State = this.app.getState(), this.Compact && (this.NavPopup = this.ui(nt)), this.on(this.State.$changes, "readonly", (function (e) {
                    t.ToggleAdd(e)
                }))
            }, e.prototype.SetToday = function () {
                this.State.date = webix.Date.dayStart(new Date)
            }, e.prototype.ShowNav = function () {
                this.Compact ? this.NavPopup.Show() : this.app.callEvent("show:panel")
            }, e.prototype.ToggleAdd = function (t) {
                var e = this.$$("add");
                t ? e.hide() : this.Compact || e.show()
            }, e
        }(u),
        at = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = this,
                    e = this.app.getService("locale")._;
                return {
                    view: "popup",
                    body: {
                        view: "menu",
                        layout: "y",
                        width: 220,
                        autoheight: !0,
                        data: [{
                            id: "this",
                            value: e("This event")
                        }, {
                            id: "next",
                            value: e("This event and the following")
                        }, {
                            id: "all",
                            value: e("All events")
                        }],
                        on: {
                            onMenuItemClick: function (e) {
                                t.Result && t.Result.resolve(e), t.Result = null, t.Root.hide()
                            }
                        }
                    },
                    on: {
                        onHide: function () {
                            t.Result && t.Result.reject(), t.Result = null
                        }
                    }
                }
            }, e.prototype.init = function (t) {
                this.Root = t
            }, e.prototype.Show = function (t) {
                return this.Result = webix.promise.defer(), this.Root.show(t), this.Result
            }, e
        }(u),
        ot = webix.Date.dateToStr("%Y%m%dT000000Z");

    function st(t) {
        for (var e = t.split(";"), i = {}, n = 0; n < e.length; n++) {
            var r = e[n].split("="),
                a = r[0],
                o = r[1];
            i[a] = o
        }
        return i.UNTIL && (i.UNTIL = ct(i.UNTIL)), i.EXDATE && (i.EXDATE = i.EXDATE.split(",").map((function (t) {
            return ct(t)
        }))), i
    }

    function ct(t) {
        return new Date(1 * t.substr(0, 4), 1 * t.substr(4, 2) - 1, 1 * t.substr(6, 2))
    }

    function ht(t) {
        var e = [];
        for (var i in t) {
            var n = t[i];
            "UNTIL" === i && (n = ot(n)), "EXDATE" === i && (n = (n = n.map((function (t) {
                return ot(t)
            }))).join(",")), n && e.push(i + "=" + n)
        }
        return e.join(";")
    }
    var lt = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"],
        ut = {
            DAILY: "day",
            WEEKLY: "week",
            MONTHLY: "month",
            YEARLY: "year"
        };

    function dt(t, e) {
        if (!t) return !1;
        for (var i = 0; i < t.length; ++i)
            if (webix.Date.equal(webix.Date.dayStart(e), t[i])) return !0;
        return !1
    }

    function pt(t, e) {
        if (t.BYDAY)
            for (var i = e.wdays = [0, 0, 0, 0, 0, 0, 0], n = t.BYDAY.split(",").map((function (t) {
                    return lt.indexOf(t)
                })).sort(), r = 0; r < n.length; r++)
                for (var a = n[r], o = n[r + 1] || n[0] + 7, s = a; s < o; s++) i[s % 7] = o - s
    }

    function ft(t, e, i) {
        var n, r, a = 1 * (e.INTERVAL || 1);
        switch ("YEARLY" == e.FREQ && (a *= 12), e.FREQ) {
            case "DAILY":
                t.setDate(t.getDate() + a);
                break;
            case "WEEKLY":
                n = t.getDay(), (r = i.wdays ? i.wdays[n] : 7) + n > 6 && a > 1 && (r += 7 * (a - 1)), t.setDate(t.getDate() + r);
                break;
            case "YEARLY":
            case "MONTHLY":
                if (n = t.getMonth(), t.setDate(1), t.setMonth(n + a), e.BYMONTHDAY) t.setDate(e.BYMONTHDAY), (n + a) % 12 != t.getMonth() && t.setDate(0);
                else if (e.BYSETPOS) {
                    t.setDate(0);
                    for (var o = 0; o < e.BYSETPOS; o++) r = i.wdays[t.getDay()], t.setDate(t.getDate() + r)
                }
        }
        return t
    }

    function vt(t, e) {
        var i = new Date(t),
            n = e.BYDAY.split(","),
            r = lt[i.getDay()];
        return {
            result: -1 !== n.indexOf(r),
            start: i,
            days: n,
            oldDay: r
        }
    }

    function gt(t, e) {
        var i = vt(t, e),
            n = i.result,
            r = i.days,
            a = i.oldDay;
        return n ? e.BYDAY : ("WEEKLY" === e.FREQ ? r.splice(lt.indexOf(r[0]), 0, a) : r = [a], r.join(","))
    }

    function mt(t) {
        return {
            id: t.$id || t.id,
            date: t.$recurring ? t.id : null
        }
    }

    function yt(t) {
        return webix.Date.dayStart(t.getDate ? t : new Date(1 * t.split("_")[0]))
    }

    function wt(t, e, i) {
        var n = yt(t);
        return (!i || !e.$recurring.UNTIL || e.$recurring.UNTIL > n) && (e.$recurring.UNTIL = n), e.$recurring.COUNT && delete e.$recurring.COUNT, e.$recurring.EXDATE && (e.$recurring.EXDATE = e.$recurring.EXDATE.filter((function (t) {
            return t < n
        }))), ht(e.$recurring)
    }

    function _t(t, e) {
        var i = yt(t);
        return e.$recurring.EXDATE || (e.$recurring.EXDATE = []), e.$recurring.EXDATE.push(i), ht(e.$recurring)
    }

    function bt(t, e) {
        var i = "string" == typeof e ? new Date(1 * e.split("_")[0]) : new Date(e),
            n = (t.end_date - t.start_date) / 1e3 / 60;
        return {
            start_date: i,
            end_date: webix.Date.add(i, n, "minute", !0)
        }
    }

    function xt(t, e) {
        return !!t && (t.getDate ? t : new Date(1 * t.split("_")[0])) <= e
    }

    function St(t, e) {
        return t.origin_id && t.recurring ? this.app.getService("local").isLastPart(t) && (e = "") : e = "all", e
    }

    function Dt(t, e, i) {
        var n = (webix.Date.dayStart(e.start_date) - webix.Date.dayStart(i.start_date)) / 864e5;
        if (n) {
            if (t.UNTIL) {
                var r = webix.Date.add(t.UNTIL, n, "day", !0);
                r > e.end_date ? t.UNTIL = r : t.UNTIL = webix.Date.dayStart(webix.Date.add(e.end_date, 1, "day", !0))
            }
            if (t.BYDAY && ((n %= 7) < 0 && (n += 7), t.BYDAY = t.BYDAY.split(",").map((function (t) {
                    return lt[(lt.indexOf(t) + n) % 7]
                })).join(",")), t.BYMONTHDAY) {
                var a = e.start_date.getDate();
                a != t.BYMONTHDAY && (t.BYMONTHDAY = a)
            }
        }
        if (t.BYSETPOS) {
            var o = $t(e.start_date);
            t.BYSETPOS != o && (t.BYSETPOS = o)
        }
        if (t.BYMONTH) {
            var s = e.start_date.getMonth() + 1;
            s != t.BYMONTH && (t.BYMONTH = s)
        }
        return t
    }

    function $t(t) {
        var e = t.getDate();
        return Math.floor(e / 7) + (e % 7 ? 1 : 0)
    }

    function Ct(t) {
        var e = t.$recurring || st(t.recurring);
        "WEEKLY" !== e.FREQ || e.BYDAY ? "MONTHLY" !== e.FREQ && "YEARLY" !== e.FREQ || e.BYSETPOS || e.BYMONTHDAY ? "YEARLY" !== e.FREQ || e.BYMONTH ? (e.BYDAY && (e.BYDAY = gt(t.start_date, e)), e.BYMONTHDAY && (e.BYMONTHDAY = t.start_date.getDate()), e.BYMONTH && (e.BYMONTH = t.start_date.getMonth() + 1), e.BYSETPOS && (e.BYSETPOS = $t(t.start_date)), t.recurring = ht(e)) : e.BYMONTH = t.start_date.getMonth() : e.BYMONTHDAY = t.start_date.getDate() : e.BYDAY = lt[t.start_date.getDay()]
    }
    var Et = function (t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return i(e, t), e.prototype.config = function () {
            var t = this,
                e = this.app.getService("locale")._,
                i = this.getParam("compact", !0),
                n = webix.skin.$active,
                r = {
                    view: "form",
                    localId: "recurringForm",
                    hidden: !0,
                    elementsConfig: {
                        labelPosition: "left"
                    },
                    padding: {
                        top: n.layoutPadding.form,
                        bottom: 0,
                        left: i ? n.layoutPadding.form : 0,
                        right: i ? 14 : 0
                    },
                    borderless: !0,
                    rows: [this.CreateIntervalControls(e), {
                        localId: "customRecControls",
                        hidden: !0,
                        rows: [this.CreateCheckboxes(e), this.CreateSelect(e)]
                    }, this.CreateRadio(e)]
                };
            return i || (r.on = {
                onChange: function (e, i, n) {
                    return t.UpdateEvent(n)
                }
            }), r
        }, e.prototype.init = function () {
            this.State = this.app.getState(), this.Form = this.$$("recurringForm"), this.Events = this.app.getService("local").events(!0), this.CheckBoxContainer = this.$$("weekly"), this.Checkboxes = this.CheckBoxContainer.getChildViews().slice(1), this.Checkboxes.pop(), this.PatternSelect = this.$$("patternSelect"), this.UntilDateContainer = this.$$("untilDate"), this.UntilDateCalendar = this.Form.elements.untilDate.getPopup().getBody(), this.UntilNumContainer = this.$$("untilCount"), this.UntilNum = this.UntilNumContainer.getBody(), this.CustomRecControls = this.$$("customRecControls")
        }, e.prototype.CreateIntervalControls = function (t) {
            var e = this;
            return {
                margin: 8,
                cols: [{
                    view: "counter",
                    label: t("Every"),
                    labelWidth: 50,
                    min: 1,
                    name: "INTERVAL",
                    css: "webix_scheduler_counter"
                }, {
                    view: "richselect",
                    name: "FREQ",
                    options: [{
                        id: "DAILY",
                        value: t("day")
                    }, {
                        id: "WEEKLY",
                        value: t("week")
                    }, {
                        id: "MONTHLY",
                        value: t("month")
                    }, {
                        id: "YEARLY",
                        value: t("year")
                    }],
                    on: {
                        onChange: function (t) {
                            return e.ChangeControls(t)
                        }
                    }
                }]
            }
        }, e.prototype.ChangeControls = function (t) {
            this._freq = t, "DAILY" === t ? this.CustomRecControls.hide() : (this.CustomRecControls.show(), "WEEKLY" === t ? (this.CheckBoxContainer.show(), this.PatternSelect.hide()) : (this.CheckBoxContainer.hide(), this.PatternSelect.show(), this.PatternSelect.refresh(), this.PatternSelect.getList().refresh()))
        }, e.prototype.CreateCheckboxes = function (t) {
            for (var e = [], i = 0; i < 7; ++i) e.push({
                view: "checkbox",
                label: webix.i18n.calendar.dayShort[i],
                labelPosition: "top",
                labelAlign: "center",
                css: "webix_scheduler_day_checkbox",
                inputWidth: 26,
                width: 45,
                align: "center",
                name: lt[i],
                on: {
                    onChange: function (t, e) {
                        this.$scope.CheckboxGuard(this.config.name, t, e)
                    }
                }
            });
            return {
                localId: "weekly",
                cols: r([{
                    view: "label",
                    label: t("on"),
                    width: 45
                }], e, [{
                    gravity: 1e-5
                }])
            }
        }, e.prototype.CheckboxGuard = function (t, e, i) {
            var n;
            webix.isUndefined(i) || e || this.GetBYDAY() || this.Form.setValues(((n = {})[t] = 1, n), !0)
        }, e.prototype.SetBYDAY = function (t) {
            var e = t.BYDAY.split(",");
            this.Checkboxes.forEach((function (i) {
                t[i.config.name] = !!e.find((function (t) {
                    return t == i.config.name
                }))
            }))
        }, e.prototype.GetBYDAY = function () {
            var t = [];
            return this.Checkboxes.forEach((function (e) {
                e.getValue() && t.push(e.config.name)
            })), t.join(",")
        }, e.prototype.CreateSelect = function (t) {
            var e = this;
            return {
                view: "richselect",
                localId: "patternSelect",
                name: "rec_pattern",
                suggest: {
                    data: [],
                    body: {
                        template: function (i) {
                            var n = [];
                            i.BYDAY && i.BYDAY.forEach((function (t) {
                                return n.push(webix.i18n.calendar.dayFull[t])
                            }));
                            var r = t("Every") + " " + (i.BYMONTHDAY || i.BYSETPOS) + " " + (i.BYDAY ? n.join(", ") : "");
                            return "YEARLY" === e._freq && (r += " " + t("of") + " " + webix.i18n.calendar.monthFull[i.BYMONTH - 1]), r
                        }
                    }
                }
            }
        }, e.prototype.SetPatternOptions = function (t, e) {
            this.PatternSelect.getList().parse([{
                id: 1,
                BYMONTH: t.BYMONTH || e.month + 1,
                BYMONTHDAY: t.BYMONTHDAY || e.day
            }, {
                id: 2,
                BYSETPOS: t.BYSETPOS || e.weekNum,
                BYDAY: [e.weekday],
                BYMONTH: t.BYMONTH || e.month + 1
            }]), this._freq = t.FREQ, t.rec_pattern = t.BYSETPOS ? 2 : 1
        }, e.prototype.GetRecPattern = function (t) {
            var e = webix.copy(this.PatternSelect.getList().getItem(t.rec_pattern));
            return "MONTHLY" === this._freq && delete e.BYMONTH, e.BYDAY && (e.BYDAY = e.BYDAY.map((function (t) {
                return lt[t]
            })).join(",")), delete e.id, e
        }, e.prototype.CreateRadio = function (t) {
            var e = this;
            return {
                rows: [{
                    view: "label",
                    label: t("End repeat")
                }, {
                    cols: [{
                        view: "radio",
                        name: "until",
                        localId: "until",
                        vertical: !0,
                        options: [{
                            id: 1,
                            value: t("never")
                        }, {
                            id: 2,
                            value: t("date")
                        }, {
                            id: 3,
                            value: t("after several occurrences")
                        }],
                        on: {
                            onChange: function (t) {
                                return e.ChangeSelectors(t)
                            }
                        }
                    }, {
                        width: 130,
                        rows: [{
                            localId: "untilDate",
                            align: "middle",
                            view: "align",
                            body: {
                                view: "datepicker",
                                name: "untilDate",
                                icons: !1
                            }
                        }, {
                            localId: "untilCount",
                            view: "align",
                            align: "bottom",
                            body: {
                                name: "untilCount",
                                view: "counter",
                                css: "webix_scheduler_counter",
                                min: 1
                            }
                        }]
                    }]
                }]
            }
        }, e.prototype.ChangeSelectors = function (t) {
            this.UntilDateContainer["2" === t ? "show" : "hide"](), this.UntilNumContainer["3" === t ? "show" : "hide"]()
        }, e.prototype.SetUNTIL = function (t) {
            var e = this._StartDate;
            t.until = t.COUNT ? 3 : t.UNTIL ? 2 : 1, t.untilDate = t.UNTIL || webix.Date.add(e, 1, "year", !0), t.untilCount = t.COUNT || this.CountNum(t), this.UntilDateCalendar.define({
                minDate: e
            })
        }, e.prototype.CountNum = function (t) {
            var e = 0;
            if (t.UNTIL) {
                var i = {};
                pt(t, i);
                for (var n = webix.Date.copy(this._StartDate); n <= t.UNTIL;) n = ft(n, t, i), e++
            } else e = 3;
            return e
        }, e.prototype.SetValues = function (t, e, i) {
            if (!e) return this.Form.setValues(t, !0);
            this._StartDate = t.start_date;
            var n = t.$recurring;
            n || (n = {
                FREQ: "DAILY"
            }), n.INTERVAL || (n.INTERVAL = 1), n.BYDAY || (n.BYDAY = lt[e.weekday]), n.EXDATE || (n.EXDATE = []), this.SetUNTIL(n), this.SetBYDAY(n), this.SetPatternOptions(n, e), this.Form.setValues(n, !0), i && this.Form.setDirty()
        }, e.prototype.GetValues = function () {
            var t = this.Form.getValues(),
                e = {
                    FREQ: t.FREQ,
                    INTERVAL: t.INTERVAL,
                    UNTIL: 2 == t.until ? t.untilDate : this.GetUntil(t),
                    COUNT: 3 == t.until ? t.untilCount : null,
                    EXDATE: t.EXDATE || []
                };
            return "WEEKLY" === t.FREQ ? e.BYDAY = this.GetBYDAY(t) : "MONTHLY" !== t.FREQ && "YEARLY" !== t.FREQ || (e = webix.extend(e, this.GetRecPattern(t))), this.Form.setDirty(), e
        }, e.prototype.GetUntil = function (t) {
            if (3 == t.until) {
                var e = {};
                pt(t, e);
                for (var i = webix.Date.copy(this._StartDate), n = 1; n < t.untilCount; ++n) i = ft(i, t, e);
                return i = webix.Date.add(i, 1, "day", !0), this.Form.setValues({
                    untilDate: i
                }, !0), i
            }
            return null
        }, e.prototype.UpdateEvent = function (t) {
            if ("user" === t) {
                var e = this.GetValues();
                this.app.callEvent("form:update:recurring", [{
                    $recurring: e
                }]), this.Form.setDirty()
            }
        }, e.prototype.IsDirty = function () {
            return this.Form.isDirty()
        }, e.prototype.Show = function () {
            this.getRoot().show()
        }, e.prototype.Hide = function () {
            this.getRoot().hide()
        }, e
    }(u);

    function Tt(t, e, i, n) {
        return t && "next" === t && xt(n, i) && (t = St.call(this, e, t)), t
    }

    function kt(t, e, i, n) {
        for (var r = t.origin_id || t.$id || t.id, a = n.find((function (t) {
                return r == t.origin_id && i < t.start_date
            })).sort((function (t, e) {
                return t.start_date > e.start_date ? -1 : t.start_date < e.start_date ? 1 : 0
            })), o = webix.copy(t.$recurring), s = 0, c = void 0; s < a.length; ++s)
            if ((c = a[s]).$recurring) {
                if (!c.$recurring.COUNT) {
                    o.UNTIL = c.$recurring.UNTIL;
                    break
                }
                if (!o.COUNT || t.$id == c.id) {
                    o.UNTIL = It(c);
                    break
                }
                o.COUNT = 1 * o.COUNT + 1 * c.$recurring.COUNT
            } return "next" !== e || a.length || (o.COUNT ? o.COUNT = function (t, e) {
            var i = yt(e),
                n = {};
            pt(t.$recurring, n);
            var r = webix.Date.dayStart(t.start_date),
                a = 0;
            for (; r < i;) a++, r = ft(r, t.$recurring, n);
            return t.$recurring.COUNT - a
        }(t, i) : o.UNTIL && t.start_date >= o.UNTIL && (o.UNTIL = webix.Date.add(webix.Date.dayStart(t.start_date), 1, ut[o.FREQ], !0))), o
    }

    function Lt(t) {
        if (!t.recurring) return !0;
        if (!t.$recurring.UNTIL) return !1;
        var e = webix.Date.dayStart(webix.Date.add(t.end_date, 1, "day", !0));
        return webix.Date.equal(e, t.$recurring.UNTIL)
    }

    function It(t) {
        var e = t.$recurring,
            i = 1 * e.COUNT;
        return "WEEKLY" === e.FREQ && (i = Math.floor(e.BYDAY.split(",").length / 7 * e.COUNT)), webix.Date.add(t.start_date, i, ut[e.FREQ], !0)
    }

    function At(t) {
        t.ChangeMode = Tt, t.CorrectCountUntil = kt, t.HasOneOccurrence = Lt
    }
    var Pt = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = this,
                    e = this.app.getService("locale")._;
                this.Compact = this.getParam("compact", !0);
                var i = webix.skin.$active,
                    n = {
                        view: "toolbar",
                        borderless: !0,
                        padding: {
                            left: i.layoutPadding.form - (i.inputHeight - 20) / 2,
                            right: 14
                        },
                        elements: [{
                            view: "icon",
                            icon: "wxi-close",
                            tooltip: e("Close"),
                            hotkey: "esc",
                            click: function () {
                                return t.Close()
                            }
                        }, {
                            view: "label",
                            label: e("Edit event")
                        }, {
                            view: "button",
                            width: 130,
                            css: "webix_primary",
                            value: e("Done"),
                            hotkey: "Ctrl+Enter",
                            click: function () {
                                return t.Done()
                            }
                        }]
                    },
                    r = {
                        view: "form",
                        localId: "form",
                        scroll: !0,
                        borderless: !0,
                        padding: {
                            right: 14
                        },
                        elementsConfig: {
                            labelPosition: "top"
                        },
                        elements: [{
                            view: "text",
                            label: e("Event"),
                            name: "text"
                        }, {
                            margin: 8,
                            rows: [this.GetDateTime("start", e, i), this.GetDateTime("end", e, i)]
                        }, {
                            view: "checkbox",
                            name: "all_day",
                            labelPosition: "left",
                            labelWidth: 0,
                            labelRight: e("All Day"),
                            on: {
                                onChange: function (e) {
                                    return t.ToggleTimeControls(e)
                                }
                            }
                        }, this.CreateCalendarColor(e), {
                            view: "textarea",
                            label: e("Notes"),
                            name: "details",
                            height: 150
                        }, {}],
                        on: {
                            onChange: function (e, i, n) {
                                var r = t.Form.getDirtyValues();
                                Object.keys(r).length && t.PrepareChange(r), t.Compact || "user" !== n || t.Wait((function () {
                                    return t.UpdateEvent(r)
                                }))
                            }
                        }
                    };
                if (this.app.config.recurring && r.elements.splice(3, 0, this.CreateRepeat(e, i)), this.app.config.units) {
                    var a = this.app.config.recurring ? 5 : 4;
                    r.elements.splice(a, 0, this.CreateUnitSelector(e))
                }
                if (this.app.config.timeline) {
                    a = this.app.config.recurring ? 5 : 4;
                    this.app.config.units && a++, r.elements.splice(a, 0, this.CreateSectionSelector(e))
                }
                return {
                    view: "proxy",
                    body: {
                        margin: 0,
                        rows: [n, r]
                    }
                }
            }, e.prototype.init = function () {
                var t = this;
                this.State = this.app.getState(), this.Form = this.$$("form"), this.Local = this.app.getService("local").events(!0), this.Ops = this.app.getService("operations"), At(this), this.RecurringOptions = this.$$("recOption"), this.StartTime = this.$$("startTime"), this.EndTime = this.$$("endTime"), this.on(this.State.$changes, "readonly", (function (e, i) {
                    webix.isUndefined(i) || t.Close()
                })), this.on(this.app, "form:update:recurring", (function (e) {
                    Object.keys(e).length && t.PrepareChange(e), t.UpdateEvent(e)
                }));
                var e = this.app.getService("local");
                if (this.app.config.calendars && (this.Calendars = e.calendars(!0), this.$$("calendar").getList().parse(this.Calendars)), this.app.config.units) {
                    var i = e.units(),
                        n = this.Form.elements.units;
                    i.then((function (t) {
                        n.getList().parse(t), n.refresh()
                    }))
                }
                this.app.config.timeline && (this.Sections = e.sections(!0), this.$$("sections").getList().parse(this.Sections))
            }, e.prototype.ready = function () {
                var t = this;
                this.SubForm = this.getSubView("recurringForm"), this.on(this.State.$changes, "selected", (function (e) {
                    e && (t.ClearTempEvent(), t.Wait((function () {
                        return t.FillForm(e)
                    })))
                }))
            }, e.prototype.destroy = function () {
                this.ClearTempEvent()
            }, e.prototype.CreateRepeat = function (t, e) {
                var i = this,
                    n = [{
                        view: "label",
                        label: t("Repeat"),
                        height: e.labelTopHeight
                    }, {
                        margin: 4,
                        cols: [{
                            view: "richselect",
                            localId: "recOption",
                            name: "rec_option",
                            suggest: {
                                data: [{
                                    id: "none",
                                    value: t("never")
                                }, {
                                    id: "daily",
                                    value: t("daily")
                                }, {
                                    id: "weekly"
                                }, {
                                    id: "monthly"
                                }, {
                                    id: "yearly"
                                }, {
                                    id: "work",
                                    value: t("every working day")
                                }, {
                                    id: "custom",
                                    value: t("custom")
                                }]
                            },
                            on: {
                                onChange: function (t, e) {
                                    return i.ToggleSubform(t, e)
                                }
                            }
                        }]
                    }];
                return this.Compact && n[1].cols.push({
                    localId: "editCustomRec",
                    view: "icon",
                    icon: "wxi-pencil",
                    tooltip: t("Change recurring pattern"),
                    hidden: !0,
                    click: function () {
                        return i.ShowSubForm()
                    }
                }), n.push({
                    $subview: Et,
                    name: "recurringForm"
                }), {
                    localId: "repeatControls",
                    rows: n
                }
            }, e.prototype.ToggleTimeControls = function (t) {
                1 == t ? (this.StartTime.hide(), this.EndTime.hide()) : (this.StartTime.show(), this.EndTime.show())
            }, e.prototype.ToggleSubform = function (t, e) {
                "custom" === t ? this.Compact ? (this.$$("editCustomRec").show(), e && this.ShowSubForm()) : this.SubForm.Show() : (this.SubForm.Hide(), this.Compact && this.$$("editCustomRec").hide())
            }, e.prototype.CreateCalendarColor = function (t) {
                var e = {
                    margin: 8,
                    cols: [{
                        view: "colorpicker",
                        label: t("Color"),
                        name: "color",
                        value: "#1abc9c",
                        suggest: {
                            type: "colorboard",
                            padding: 3,
                            body: Z()
                        }
                    }]
                };
                return this.app.config.calendars && e.cols.unshift({
                    view: "richselect",
                    localId: "calendar",
                    label: t("Calendar"),
                    name: "calendar",
                    css: "webix_scheduler_cal_color",
                    options: {
                        css: "webix_scheduler_cal_color_suggest",
                        data: [],
                        body: {
                            tooltip: function () {
                                return ""
                            },
                            template: function (e) {
                                var i = 1 * e.active,
                                    n = i ? "" : "class='webix_scheduler_cal_disabled'";
                                return '<div style="overflow: hidden;" ' + (i ? "" : 'webix_tooltip="' + t("Inactive calendar") + '"') + " " + n + ">" + (e.text || t("(no title)")) + '\n\t\t\t\t\t\t\t\t<span class="webix_scheduler_cal_marker" style="background-color:' + e.color + ';">\n\t\t\t\t\t\t\t</span></div>'
                            }
                        }
                    }
                }), e
            }, e.prototype.CreateUnitSelector = function (t) {
                return {
                    view: "multicombo",
                    name: "units",
                    label: t("Units"),
                    options: []
                }
            }, e.prototype.GetDateTime = function (t, e, i) {
                return {
                    rows: [{
                        view: "label",
                        height: i.labelTopHeight,
                        label: e("start" === t ? "Start" : "End")
                    }, {
                        margin: 8,
                        cols: [{
                            view: "datepicker",
                            name: t + "_date",
                            suggest: {
                                type: "calendar",
                                icons: !1
                            }
                        }, {
                            view: "datepicker",
                            localId: t + "Time",
                            name: t + "_time",
                            type: "time",
                            format: "%H:%i"
                        }]
                    }]
                }
            }, e.prototype.CreateSectionSelector = function (t) {
                return {
                    localId: "sections",
                    view: "richselect",
                    label: t("Section"),
                    name: "section",
                    options: {
                        data: [],
                        body: {
                            template: "#text#"
                        }
                    }
                }
            }, e.prototype.FillForm = function (t) {
                var e, i = this;
                if (this.Id = t.id, this.Form.focus(), this.Date = t.date, "string" == typeof this.Date && (this.Date = new Date(1 * this.Date.slice(0, this.Date.indexOf("_")))), "0" == t.id) {
                    if (this.State.clipboard && this.State.clipboard.selected ? (e = this.State.clipboard.selected, this.$$("repeatControls").hide()) : e = this.NewEvent(t), e.then) return e.then((function (e) {
                        i.Local.add(n({
                            id: t.id
                        }, webix.copy(e))), i.FillFormContinue(e)
                    }));
                    this.Local.add(n({
                        id: t.id
                    }, webix.copy(e)))
                } else {
                    e = webix.copy(this.Local.getItem(t.id));
                    var r = this.getParam("mode", !0);
                    r && (e = this.AdaptObjToMode(r, e))
                }
                this.FillFormContinue(e)
            }, e.prototype.AdaptObjToMode = function (t, e) {
                return t = this.ChangeMode(t, e, e.recurring ? e.start_date : this.Local.getItem(e.origin_id).start_date, e.recurring ? this.State.selected.date : e.start_date), this.setParam("mode", t, !0), "all" !== t && "next" !== t || ("all" === t && e.origin_id && (e = webix.copy(this.Local.getItem(e.origin_id))), e.$recurring || (e.$recurring = webix.copy(this.Local.getItem(e.origin_id).$recurring)), (e.$recurring.COUNT || e.$recurring.UNTIL) && (e.$recurring = this.CorrectCountUntil(e, t, e.start_date, this.Local))), "this" !== t && "next" !== t || (this.State.selected.date && (e = n(n({}, e), bt(e, this.State.selected.date))), "this" === t && (e.$recurring = null, e.recurring = "", this.$$("repeatControls").hide())), e
            }, e.prototype.FillFormContinue = function (t) {
                t.start_time = webix.Date.copy(t.start_date), t.end_time = webix.Date.copy(t.end_date), t.start_date = webix.Date.datePart(t.start_date), t.end_date = webix.Date.datePart(t.end_date), this.app.config.recurring && this.SetRecurring(t), this.Form.setValues(t)
            }, e.prototype.GetFromStartDate = function (t) {
                var e = {
                    weekday: t.getDay(),
                    day: t.getDate(),
                    month: t.getMonth()
                };
                return e.weekNum = Math.floor(e.day / 7) + (e.day % 7 ? 1 : 0), e
            }, e.prototype.SetRecurring = function (t) {
                var e = this.GetFromStartDate(t.start_date),
                    i = this.ResetRecurringOptions(e);
                this.RecurringOptions.getList().parse(i), this.SubForm.SetValues(webix.copy(t), e, !0), t.$recurring ? "MO,TU,WE,TH,FR" === t.$recurring.BYDAY ? t.rec_option = "work" : t.$recurring.UNTIL || t.$recurring.COUNT || t.$recurring.INTERVAL && 1 != t.$recurring.INTERVAL || !("DAILY" === t.$recurring.FREQ || "WEEKLY" === t.$recurring.FREQ && t.$recurring.BYDAY == lt[e.weekday] || "MONTHLY" === t.$recurring.FREQ && t.$recurring.BYSETPOS && t.$recurring.BYSETPOS == e.weekNum && t.$recurring.BYDAY == lt[e.weekday] || "YEARLY" === t.$recurring.FREQ && t.$recurring.BYMONTH == e.month + 1 && t.$recurring.BYMONTHDAY == e.day) ? t.rec_option = "custom" : t.rec_option = t.$recurring.FREQ.toLowerCase() : t.rec_option = "none"
            }, e.prototype.ResetRecurringOptions = function (t) {
                var e = this.app.getService("locale")._;
                return [{
                    id: "weekly",
                    value: e("weekly, every") + " " + webix.i18n.calendar.dayFull[t.weekday]
                }, {
                    id: "monthly",
                    value: e("monthly, every") + " " + t.weekNum + " " + e("week on") + " " + webix.i18n.calendar.dayFull[t.weekday]
                }, {
                    id: "yearly",
                    value: e("yearly, every") + " " + webix.i18n.calendar.monthFull[t.month] + " " + t.day
                }]
            }, e.prototype.Join = function (t, e) {
                return webix.Date.add(t, webix.Date.timePart(e) / 60, "minute", !0)
            }, e.prototype.NewEvent = function (t) {
                var e = this,
                    i = this.GetStartDate(),
                    n = {
                        start_date: i,
                        end_date: this.State.selected.end_date || webix.Date.add(i, 1, "hour", !0),
                        text: "",
                        details: ""
                    };
                if (this.app.config.recurring && (n.recurring = ""), this.app.config.timeline && (n.section = t.section || this.Sections.getFirstId()), this.app.config.calendars) {
                    var r = this.State.active[0];
                    if (!r) {
                        var a = this.Calendars.getFirstId();
                        return (a ? this.Ops.updateCalendar(a, {
                            active: 1
                        }) : this.Ops.addCalendar()).then((function () {
                            return n.calendar = e.State.active[0], n.$color = e.Calendars.getItem(n.calendar).color, n
                        }))
                    }
                    n.calendar = r, n.$color = this.Calendars.getItem(n.calendar).color
                } else n.$color = "#01C2A5";
                return this.app.config.calendars && t.unit && (n.units = t.unit), n
            }, e.prototype.GetStartDate = function () {
                if (this.Date) return webix.Date.copy(this.Date);
                var t = new Date,
                    e = 30 * Math.ceil(t.getMinutes() / 30),
                    i = webix.Date.copy(this.State.date);
                return i.setHours(t.getHours(), e), i
            }, e.prototype.UpdateEvent = function (t) {
                var e = this;
                if (this.Form.setDirty(), "0" === this.Id) {
                    var i = this.PrepareOut(t);
                    this._inProgress = this.Ops.addEvent(i, !0, this.Id)
                } else Object.keys(t).length && (this._inProgress = this.UpdateExisting(this.Id, t));
                return this._inProgress && (this.app.callEvent("backend:operation", [this._inProgress]), this._inProgress.then((function (i) {
                    i && e.UpdateSelection(i), e.ChangeDate(t, e.Form.getValues()), e.setParam("mode", "", !0)
                })).finally((function () {
                    e._inProgress = null
                }))), this._inProgress || webix.promise.resolve()
            }, e.prototype.UpdateExisting = function (t, e) {
                var i = this,
                    n = this.getParam("mode", !0),
                    r = this.Local.getItem(t);
                if ("this" === n && !this.HasOneOccurrence(r) || "next" === n) {
                    e.origin_id = r.origin_id || r.id;
                    var a = this.PrepareOut(e),
                        o = "";
                    if ("this" === n) o = _t(this.State.selected.date, r);
                    else {
                        var s = void 0;
                        r.recurring ? s = [this.State.selected.date, r] : (t = r.origin_id, s = [a.start_date, this.Local.getItem(t)]), o = wt.apply(void 0, s)
                    }
                    return this.Ops.updateEvent(t, {
                        recurring: o
                    }, n, webix.Date.dayStart(a.start_date), !0).then((function () {
                        return "none" === e.rec_option && (i.State.selected.date = null), i.Ops.addEvent(a, !0)
                    }))
                }
                if ("all" === n) {
                    var c = this.Form.getValues().$recurring;
                    c && webix.isUndefined(e.recurring) && (delete c.EXDATE, e.recurring = ht(c), this.Form.setValues({
                        $recurring: c,
                        recurring: e.recurring
                    }, !0), this.SubForm.SetValues({
                        EXDATE: null
                    })), r.origin_id && (this.Id = this.State.selected.id = r.origin_id)
                }
                return this.Ops.updateEvent(this.Id, e, n, void 0, !0).then((function () {
                    "none" === e.rec_option && (i.State.selected.date = null)
                }))
            }, e.prototype.UpdateSelection = function (t) {
                this.State.selected.id = this.Id = t;
                var e = this.State.selected.date;
                if (e instanceof Date) this.State.selected.date = null;
                else if (e) {
                    var i = this.Form.getValues();
                    this.State.selected.date = this.Join(i.start_date, i.start_time).valueOf() + "_" + t
                }
            }, e.prototype.PrepareChange = function (t) {
                t.rec_option ? this.ProcessRecurringOption(t) : webix.isUndefined(t.$recurring) || this.ProcessRecurringPattern(t), this.ProcessDates(t), this.app.config.recurring && t.start_date && this.ApplyDatechangeToRecurring(t), this.ProcessText(t, "text"), this.ProcessText(t, "details"), this._changedValues = t
            }, e.prototype.ProcessRecurringOption = function (t) {
                var e = this.Form.getValues();
                "none" === t.rec_option ? (t.recurring = "", t.series_end_date = "") : "custom" === t.rec_option ? (e.$recurring && this.SubForm.SetValues(n(n({}, e), t), this.GetFromStartDate(e.start_date)), t.$recurring = this.SubForm.GetValues(), this.ProcessRecurringPattern(t), e.$recurring || this.Form.setValues({
                    $recurring: t.$recurring
                }, !0)) : (this.GetRecurring(t.rec_option, t, e.start_date), t.series_end_date = ""), delete t.rec_option, delete t.$recurring
            }, e.prototype.ProcessRecurringPattern = function (t) {
                var e, i = this.Form.getValues(),
                    n = ht(t.$recurring),
                    r = this.Local.getItem(this.State.selected.id);
                r && n === r.recurring || (t.recurring = n, t.series_end_date = t.$recurring.UNTIL, t.$recurring.BYDAY && (e = function (t, e, i) {
                    var n = vt(t, i),
                        r = n.result,
                        a = n.start,
                        o = n.days;
                    if (r) return [t, e];
                    var s = lt.indexOf(o[0]) - a.getDay();
                    a.setDate(a.getDate() + s);
                    var c = new Date(e);
                    return c.setDate(c.getDate() + s), [a, c]
                }(i.start_date, i.end_date, t.$recurring), t.start_date = e[0], t.end_date = e[1]), this.Form.setValues(t, !0)), delete t.$recurring
            }, e.prototype.ProcessDates = function (t) {
                var e = this.Form.getValues();
                webix.isUndefined(t.all_day) ? ((t.start_date || t.start_time) && 0 == e.all_day && (t.start_date = this.Join(e.start_date, e.start_time)), (t.end_date || t.end_time) && 0 == e.all_day && (t.end_date = this.Join(e.end_date, e.end_time))) : 1 == t.all_day ? (t.start_date = e.start_date, t.end_date = e.end_date) : 0 == t.all_day && (t.start_date = this.Join(e.start_date, e.start_time), t.end_date = this.Join(e.end_date, e.end_time)), (t.start_date || t.end_date) && this.CorrectDateTime(t)
            }, e.prototype.CorrectDateTime = function (t) {
                var e = this.Form.getValues(),
                    i = this.Local.getItem(this.State.selected.id),
                    n = (i.end_date - i.start_date) / 1e3 / 60,
                    r = t.start_date ? "start" : "end",
                    a = "start" === r ? "end" : "start",
                    o = t.start_date || i.start_date,
                    s = t.end_date || i.end_date;
                (o >= s && !e.all_day || o > s) && (t[a + "_date"] = webix.Date.add(t[r + "_date"], ("start" === r ? 1 : -1) * (n || 60), "minute", !0), this.Form.setValues({
                    start_date: webix.Date.datePart(t.start_date, !0),
                    end_date: webix.Date.datePart(t.end_date, !0),
                    start_time: t.start_time || webix.Date.copy(t.start_date),
                    end_time: t.end_time || webix.Date.copy(t.end_date)
                }, !0)), delete t.start_time, delete t.end_time
            }, e.prototype.ProcessText = function (t, e) {
                if (!this.webix.isUndefined(t[e])) {
                    t[e] = t[e].replace(/(<[^>]+>|^\s+|\s+$)/gi, "");
                    var i = this.Local.getItem(this.State.selected.id)[e] || "";
                    t[e] === i.trim() && delete t[e]
                }
            }, e.prototype.ApplyDatechangeToRecurring = function (t) {
                var e = this.GetFromStartDate(t.start_date),
                    i = this.Form.getValues();
                if (!t.recurring && i.$recurring)
                    if ("custom" === i.rec_option) {
                        var r = i.$recurring;
                        if (r.BYMONTH && (r.BYMONTH = e.month + 1), r.BYMONTHDAY && (r.BYMONTHDAY = e.day), r.BYSETPOS && (r.BYSETPOS = e.weekNum), r.BYDAY && (r.BYDAY = gt(t.start_date, i.$recurring)), r.UNTIL && r.UNTIL < t.start_date) {
                            var a = this.Local.getItem(this.State.selected.id).start_date,
                                o = (i.$recurring.UNTIL - a) / 1e3 / 60;
                            r.UNTIL = webix.Date.add(t.start_date, o, "minute", !0)
                        }
                        t.recurring = ht(r), this.SubForm.SetValues(n(n({}, i), t), e)
                    } else this.GetRecurring(i.rec_option, t, i.start_date), delete t.$recurring;
                this.RecurringOptions.getList().parse(this.ResetRecurringOptions(e)), this.RecurringOptions.refresh()
            }, e.prototype.GetRecurring = function (t, e, i) {
                var n = this.GetRecurringPreset(t, i);
                if ("work" === t && e.start_date) {
                    var r = gt(e.start_date, n);
                    n.BYDAY !== r && (n.BYDAY = r, t = "custom")
                }
                var a = ht(n),
                    o = this.Local.getItem(this.State.selected.id);
                o && a === o.recurring || (e.$recurring = n, e.recurring = a, this.Form.setValues({
                    $recurring: e.$recurring,
                    recurring: a,
                    rec_option: t
                }, !0))
            }, e.prototype.GetRecurringPreset = function (t, e) {
                var i = this.GetFromStartDate(e);
                switch (t) {
                    case "daily":
                        return {
                            FREQ: "DAILY", INTERVAL: 1
                        };
                    case "weekly":
                        return {
                            FREQ: "WEEKLY", INTERVAL: 1, BYDAY: lt[i.weekday]
                        };
                    case "work":
                        return {
                            FREQ: "WEEKLY", INTERVAL: 1, BYDAY: "MO,TU,WE,TH,FR"
                        };
                    case "monthly":
                        return {
                            FREQ: "MONTHLY", INTERVAL: 1, BYSETPOS: i.weekNum, BYDAY: lt[i.weekday]
                        };
                    case "yearly":
                        return {
                            FREQ: "YEARLY", INTERVAL: 1, BYMONTH: i.month + 1, BYMONTHDAY: i.day
                        };
                    default:
                        return {
                            FREQ: "DAILY", INTERVAL: 1
                        }
                }
            }, e.prototype.ChangeDate = function (t, e) {
                if (t)
                    if (t.start_date && !e.recurring || "" === t.recurring) this.State.selected.date = null, this.UpdateStateDate(t.start_date || e.start_date);
                    else if (t.start_date || t.recurring) {
                    var i = this.GetClosestOccurrenceDate(t, e);
                    this.State.selected.date = i.valueOf() + "_" + this.State.selected.id, this.UpdateStateDate(i)
                }
            }, e.prototype.GetClosestOccurrenceDate = function (t, e) {
                var i = t.start_date ? webix.Date.copy(t.start_date) : this.Join(e.start_date, e.start_time),
                    n = webix.Date.dayStart(this.State.selected.date ? new Date(1 * this.State.selected.date.split("_")[0]) : i);
                e.series_end_date && (n = new Date(Math.min(webix.Date.add(e.series_end_date, -1, "day", !0), n)));
                var r = {};
                pt(e.$recurring, r);
                for (var a = webix.Date.copy(i); webix.Date.dayStart(a) < n;) a = ft(a, e.$recurring, r), Math.abs(n - a) < Math.abs(n - i) && (i = webix.Date.copy(a));
                return i
            }, e.prototype.UpdateStateDate = function (t) {
                t = webix.Date.dayStart(t);
                var e = this.State;
                if ("day" === e.mode || "units" === e.mode || "timeline" === e.mode && "day" === e.timelineMode) {
                    var i = webix.Date.dayStart(e.date);
                    webix.Date.equal(t, i) || (e.date = webix.Date.dayStart(t))
                } else {
                    var n = this.GetModeBounds(),
                        r = n.start,
                        a = n.end;
                    (t < r || t >= a) && (e.date = webix.Date.dayStart(t))
                }
            }, e.prototype.GetModeBounds = function () {
                var t = this.State,
                    e = t.mode;
                "timeline" === e ? e = t.timelineMode : "agenda" === e && (e = "month");
                var i = webix.Date[e + "Start"](t.date),
                    n = webix.Date.add(i, 1, e, !0);
                if ("month" === t.mode) {
                    i = webix.Date.weekStart(i);
                    var r = Math.ceil((n - i) / 864e5 / 7);
                    n = webix.Date.add(i, r, "week", !0)
                }
                return {
                    start: i,
                    end: n
                }
            }, e.prototype.PrepareOut = function (t) {
                var e = this.Form.getValues();
                return e.all_day || (e.start_date = this.Join(e.start_date, e.start_time), e.end_date = this.Join(e.end_date, e.end_time)), e = webix.extend(e, t || {}, !0), t && t.recurring || !e.$recurring || (e.$recurring.EXDATE = [], e.recurring = ht(e.$recurring)), e.origin_id || (e.origin_id = 0), this.app.config.timeline && !e.section && (e.section = 0), e
            }, e.prototype.ClearTempEvent = function () {
                var t = this.Id;
                "0" === t && this.Local.exists(t) && this.Local.remove(t)
            }, e.prototype.Back = function (t) {
                if (this.Form.clear(), t || "0" === this.State.selected.id) this.State.selected = null;
                else {
                    var e = this.Compact ? "event.formpopup/" : "../";
                    this.show(e + "event.info", {
                        target: "edit"
                    })
                }
            }, e.prototype.Close = function () {
                var t = this;
                if (this._inProgress) this._inProgress.then((function () {
                    t.Back(!0)
                }));
                else {
                    var e = this.Form.isDirty() || this.Subform && this.SubForm.IsDirty();
                    if (this.Compact && e) {
                        var i = this.app.getService("locale")._;
                        webix.confirm({
                            text: i("Save changes?"),
                            container: this.app.getRoot().$view
                        }).then((function () {
                            return t.Done(!0)
                        })).catch((function () {
                            return t.Back(!0)
                        }))
                    } else this.Back(!0)
                }
            }, e.prototype.Done = function (t) {
                var e = this;
                if (this._inProgress) this._inProgress.then((function () {
                    e.Back()
                }));
                else if ("0" === this.State.selected.id || this.Compact) {
                    var i = {};
                    this.Compact && (this._changedValues && (i = this._changedValues), this.SubForm.IsDirty() && (i.$recurring = this.SubForm.GetValues(), i.series_end_date = i.$recurring.UNTIL, delete i.rec_option)), this.UpdateEvent(i).then((function () {
                        return e.Back(t)
                    }))
                } else this.Back()
            }, e.prototype.Wait = function (t) {
                this._inProgress ? this._inProgress.then(t) : t.call()
            }, e.prototype.ShowSubForm = function () {
                var t = this;
                this.SubForm.Show();
                var e = this.app.getService("locale")._,
                    i = this.SubForm.getRoot(),
                    n = webix.skin.$active;
                webix.fullscreen.set(i, {
                    head: {
                        view: "toolbar",
                        padding: {
                            left: n.layoutPadding.form - (n.inputHeight - 20) / 2,
                            right: 14
                        },
                        elements: [{
                            view: "icon",
                            icon: "shi-back",
                            click: function () {
                                return t.HideSubPop()
                            }
                        }, {
                            view: "label",
                            label: e("Change recurring pattern")
                        }, {
                            view: "button",
                            value: e("Done"),
                            width: 130,
                            css: "webix_primary",
                            click: function () {
                                return t.HideSubPop()
                            }
                        }]
                    }
                }), i.getTopParentView().define({
                    css: "webix_scheduler_subform_popup"
                })
            }, e.prototype.HideSubPop = function () {
                this.SubForm.Hide(), webix.fullscreen.exit()
            }, e
        }(u),
        Mt = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                return this.app.getService("jet-win").updateConfig({
                    view: "window",
                    fullscreen: !0,
                    head: !1,
                    body: {
                        $subview: !0
                    }
                })
            }, e
        }(u);

    function Rt(t) {
        return {
            attachEvent: function (e, i) {
                return webix.UIManager.addHotKey(e, i, t), {
                    key: e,
                    handler: i
                }
            },
            detachEvent: function (e) {
                var i = e.key,
                    n = e.handler;
                return webix.UIManager.removeHotKey(i, n, t)
            }
        }
    }

    function Ot(t) {
        (t.recurring || t.$id || t.origin_id) && (t.recurring = "", delete t.$recurring, t.origin_id || (t.origin_id = t.$id || t.id), delete t.$id), delete t.id;
        var e = this.app.getService("locale")._;
        t.text && (t.text = e("Copy of") + " " + t.text.replace(e("Copy of") + " ", ""))
    }

    function Nt(t) {
        var e = this;
        this.clipboardModes = ["copy", "cut"], this.Ops = this.app.getService("operations");
        var i = webix.env.isMac ? "COMMAND" : "CTRL";
        this.on(Rt(t), i + "+C", (function (t) {
            return e.AddToClipboard(t, "copy")
        })), this.on(Rt(t), i + "+X", (function (t) {
            return e.AddToClipboard(t, "cut")
        })), this.on(Rt(t), i + "+V", (function (t, i) {
            return e.PasteFromClipboard(i)
        })), this.on(Rt(t), "Esc", (function (t, i) {
            return e.PurgeClipboard(t, i)
        })), this.on(this.State.$changes, "mode", (function () {
            webix.UIManager.setFocus(t)
        })), this.on(this.State.$changes, "clipboard", (function (e, i) {
            e ? webix.html.addCss(t.$view, "webix_scheduler_clipboard_target") : i && webix.html.removeCss(t.$view, "webix_scheduler_clipboard_target")
        })), this.on(this.app, "events:rendered", (function () {
            e.RestoreClipboardSource(t)
        })), this.$multi ? this._globalClickHandler = webix.event(this.List.$view, "click", (function () {
            e.State.clipboard && e.State.clipboard.source && e.ChangePasteTarget(e.List.$view)
        })) : this.on(t, "onItemClick", (function (i, n, r) {
            e.State.clipboard && e.State.clipboard.source && ("timeline" === e.State.mode && (r = e.CreatePasteTarget(t, n)), e.ChangePasteTarget(r))
        }))
    }

    function Ut() {
        this._globalClickHandler && (webix.eventRemove(this._globalClickHandler), this._globalClickHandler = null)
    }

    function Yt(t, e) {
        var i = t.getScrollState(),
            n = e.clientX - t.$view.offsetLeft + i.x,
            r = e.clientY - t.$view.offsetTop + i.y;
        this.mousePosUnit = Math.floor(n / this.Scales.cellWidth);
        var a = webix.html.create("div"),
            o = this.GetSectionHeight();
        a.style.top = r - r % o + "px", a.style.left = n - n % this.Scales.cellWidth + "px", a.style.width = this.Scales.cellWidth + "px", a.style.height = o + "px", a.style.position = "absolute";
        var s = t.$view.firstChild;
        return s.insertBefore(a, s.childNodes[0]), a
    }

    function Ht(t) {
        webix.html.addCss(t, "webix_scheduler_paste_target"), this.State.clipboard.target = t
    }

    function Bt() {
        var t = this.State.clipboard;
        if (t && t.target) {
            if (webix.html.removeCss(this.State.clipboard.target, "webix_scheduler_paste_target"), "timeline" === this.State.mode && t.target.parentNode) {
                var e = t.target;
                e.parentNode.removeChild(e)
            }
            this.State.clipboard.target = null
        }
    }

    function Ft(t) {
        this.State.clipboard.target !== t && (this.ClearPasteTargetStyle(), this.SetPasteTargetStyle(t))
    }

    function Vt(t, e, i) {
        return e && t.contains(e) ? e : t.querySelectorAll('[webix_e_id="' + i + '"]')[0] || t.querySelectorAll('[webix_l_id="' + i + '"]')[0]
    }

    function Gt(t, e) {
        var i = this.State.selected;
        if (i && "0" !== i.id) {
            this.ClearPasteTargetStyle();
            var n = Vt(t.$view, i.node, i.date || i.id);
            n && this.SetClipboardSourceStyle(e, n);
            var r = this.GetEvent(i.date || i.id);
            this.State.clipboard = {
                mode: e,
                selected: webix.copy(r),
                source: n
            }
        }
    }

    function jt(t, e) {
        var i = "webix_scheduler_" + t; - 1 === e.className.indexOf(i) && webix.html.addCss(e, i);
        var n = "webix_scheduler_" + this.clipboardModes[1 ^ this.clipboardModes.indexOf(t)];
        webix.html.removeCss(e, n);
        var r = this.State.clipboard;
        r && r.source && e != r.source && (webix.html.removeCss(this.State.clipboard.source, i), webix.html.removeCss(this.State.clipboard.source, n))
    }

    function Wt(t) {
        var e = this.State.clipboard;
        if (e) {
            var i = Vt(t.$view, e.source, e.selected.id);
            i && (i !== e.source && (this.State.clipboard.source = i), this.SetClipboardSourceStyle(e.mode, i))
        }
    }

    function zt(t) {
        var e = this.State.clipboard;
        if (e && e.source) {
            var i = this.GetEventData(e, t);
            "copy" === e.mode ? this.CopyEvent(i) : "cut" === e.mode && this.MoveEvent(i), this.PurgeClipboard()
        }
    }

    function qt(t, e) {
        var i = t.selected,
            n = Math.floor(i.end_date - i.start_date) / 6e4;
        if (i.start_date = this.GetTargetDate(e.target.getAttribute("webix_l_id")), i.end_date = webix.Date.add(i.start_date, n, "minute", !0), "units" === this.State.mode) i.units = this.Unit.id;
        else if ("timeline" === this.State.mode) {
            var r = e.target.getAttribute("webix_l_id");
            r && (i.section = r)
        }
        return i
    }

    function Xt(t) {
        var e = this;
        Ot.call(this, t), this.Ops.addEvent(t, !0).then((function (i) {
            return e.UpdateSelection(i, t)
        }))
    }

    function Kt(t) {
        var e = this;
        if (t.recurring) {
            var i = _t(t.id, t),
                n = t.$id;
            Ot.call(this, t), this.Ops.updateEvent(n, {
                recurring: i
            }, "this", t.start_date, !0).then((function () {
                return e.Ops.addEvent(t, !0).then((function (i) {
                    return e.UpdateSelection(i, t)
                }))
            }))
        } else {
            var r = {
                start_date: t.start_date,
                end_date: t.end_date
            };
            t.units && (r.units = t.units), t.section && (r.section = t.section), this.Ops.updateEvent(t.id, r, null, null, !0).then((function () {
                e.UpdateSelection(t.id, t)
            }))
        }
    }

    function Qt() {
        var t = this.State.clipboard;
        if (t) {
            var e = t.mode,
                i = t.source;
            return webix.html.removeCss(i, "webix_scheduler_" + e), this.ClearPasteTargetStyle(), this.State.clipboard = null, !1
        }
    }

    function Jt(t, e, i) {
        t.AddToClipboard = Gt, t.SetClipboardSourceStyle = jt, t.RestoreClipboardSource = Wt, t.PasteFromClipboard = zt, t.GetEventData = qt, t.CopyEvent = Xt, t.MoveEvent = Kt, t.ClearPasteTargetStyle = Bt, t.SetPasteTargetStyle = Ht, t.ChangePasteTarget = Ft, t.CreatePasteTarget = Yt, t.PurgeClipboard = Qt, i && i.multi && (t.$multi = !0, t.destroy = Ut), Nt.call(t, e)
    }
    var Zt = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = this,
                    e = this.app.getService("locale")._,
                    i = webix.skin.$active,
                    n = {
                        view: "toolbar",
                        borderless: !0,
                        padding: {
                            left: i.layoutPadding.form - (i.inputHeight - 20) / 2,
                            right: 14
                        },
                        elements: [{
                            view: "icon",
                            icon: "wxi-close",
                            hotkey: "esc",
                            click: function () {
                                return t.Back()
                            }
                        }, {}, {
                            width: 130,
                            view: "button",
                            localId: "edit",
                            label: e("Edit"),
                            css: "webix_primary",
                            click: function () {
                                this.$scope.StartAction("Edit", this.$view)
                            }
                        }]
                    };
                return this.app.config.copypaste && n.elements.splice(-1, 0, {
                    view: "icon",
                    icon: "shi-content-copy",
                    tooltip: e("Copy event"),
                    click: function () {
                        return t.CopyEvent()
                    }
                }), {
                    view: "proxy",
                    body: {
                        margin: 0,
                        rows: [n, {
                            type: "form",
                            padding: {
                                right: 16
                            },
                            borderless: !0,
                            rows: [{
                                localId: "text",
                                view: "template",
                                css: "webix_scheduler_info",
                                template: function (e) {
                                    return e.start_date ? t.InfoTemplate(e) : ""
                                },
                                borderless: !0
                            }, {
                                view: "button",
                                localId: "remove",
                                label: e("Delete event"),
                                css: "webix_danger webix_scheduler_danger",
                                align: "center",
                                inputWidth: 330,
                                click: function () {
                                    this.$scope.StartAction("Delete", this.$view)
                                }
                            }]
                        }]
                    }
                }
            }, e.prototype.init = function () {
                var t = this;
                this.State = this.app.getState(), this.UnitsLocal = this.app.getService("local").units(!0), this.on(this.State.$changes, "readonly", (function (e) {
                    var i = e ? "hide" : "show";
                    t.$$("edit")[i](), t.$$("remove")[i]()
                }));
                var e = this.$$("text");
                (this.on(this.State.$changes, "selected", (function (i) {
                    i && (t.EventObj = t.app.getService("local").events(!0).getItem(i.id), e.setValues(t.EventObj))
                })), this.Menu = this.ui(at), this.app.config.units) && this.app.getService("local").units().then((function () {
                    e.refresh()
                }));
                this.app.config.timeline && this.app.getService("local").sections().then((function (i) {
                    t.Sections = i, e.refresh()
                }))
            }, e.prototype.StartAction = function (t, e) {
                var i = this;
                this.app.config.recurring && ("string" == typeof this.State.selected.date || this.EventObj.origin_id) ? this.Menu.Show(e).then((function (e) {
                    "Delete" === t ? i.DeleteEvent(e) : i.EditEvent(e)
                })) : "Delete" === t ? this.DeleteEvent() : this.EditEvent()
            }, e.prototype.EditEvent = function (t) {
                var e = this.getParam("compact", !0) ? "event.formpopup/" : "../";
                this.show(e + "event.form", {
                    target: "edit",
                    params: {
                        mode: t
                    }
                })
            }, e.prototype.DeleteEvent = function (t) {
                var e = this,
                    i = this.app.getService("locale")._;
                webix.confirm({
                    title: i("Delete event"),
                    text: i("The event will be deleted permanently, are you sure?"),
                    container: this.app.getRoot().$view
                }).then((function () {
                    var i = e.EventObj,
                        n = "";
                    t && "all" !== t && (e.State.selected ? n = e.State.selected.date : i.$id && (n = i.id)), e.app.getService("operations").removeEvent(e.EventObj, t, n), e.Back(!0)
                }))
            }, e.prototype.CopyEvent = function () {
                var t = webix.copy(this.EventObj);
                Ot.call(this, t), this.State.$batch({
                    selected: {
                        id: "0"
                    },
                    clipboard: {
                        mode: "copy",
                        selected: t
                    }
                })
            }, e.prototype.Back = function (t) {
                if (t) {
                    var e = this.State.clipboard;
                    e && (e.selected.id === this.EventObj.id || e.selected.id.indexOf("_" + this.EventObj.id) > -1) && (this.State.clipboard = null)
                }
                this.State.selected = null
            }, e.prototype.InfoTemplate = function (t) {
                var e = this,
                    i = this.app.getService("locale")._;
                this.app.config.recurring && this.State.selected.date && (t = n(n({}, t), bt(t, this.State.selected.date)));
                var r = [t.start_date, t.end_date],
                    a = r[0],
                    o = r[1],
                    s = webix.Date.equal(webix.Date.datePart(a, !0), webix.Date.datePart(o, !0)),
                    c = webix.Date.equal(webix.Date.datePart(a, !0), a) && webix.Date.equal(webix.Date.datePart(o, !0), o) && t.all_day,
                    h = webix.i18n.timeFormatStr,
                    l = webix.i18n.longDateFormatStr,
                    u = '<div class="webix_scheduler_event_title">' + (t.text || i("(No title)")) + "</div>",
                    d = l(a),
                    p = l(o),
                    f = h(a),
                    v = h(o),
                    g = "";
                s ? (g = '<div class="webix_scheduler_event_text">' + d + "</div>", c || (g += '<div class="webix_scheduler_event_text">' + i("from") + " " + f + " " + i("to") + " " + v + "</div>")) : g = '<div class="webix_scheduler_event_text">' + i("from") + " " + (c ? "" : f) + " " + d + '</div><div class="webix_scheduler_event_text">' + i("to") + " " + (c ? "" : v) + " " + p + "</div>";
                var m = this.app.config.recurring && t.recurring ? this.GetRecurringText(t, i) : "",
                    y = "";
                if (this.app.config.units) {
                    if (y += '<div class="webix_scheduler_event_units_title">' + i("Assigned to units") + ':</div><div class="webix_scheduler_event_units">', t.units) {
                        var w = t.units.split(",");
                        w.forEach((function (t, n) {
                            var r = n === w.length - 1,
                                a = e.UnitsLocal.getItem(t),
                                o = a && a.value ? a.value : i("Unknown unit");
                            y += '<div class="webix_scheduler_event_unit_item">' + o + (r ? "" : ",") + "</div>"
                        }))
                    } else y += i("No units");
                    y += "</div>"
                }
                var _ = this.app.config.timeline && this.Sections ? this.GetSection(t, i) : "",
                    b = "";
                return t.details && (b = '<div class="webix_scheduler_event_details_title">' + i("Notes") + '</div>\n\t\t\t\t<div class="webix_scheduler_event_text">' + t.details.replace(/(?:\r\n|\r|\n)/g, "<br>") + "</div>"), u + "\n\t\t\t<div class='webix_scheduler_event_from_to'>" + g + "</div>\n\t\t\t<div class='webix_scheduler_event_recurring_pattern'>" + m + "</div>" + y + _ + b
            }, e.prototype.GetRecurringText = function (t, e) {
                var i = t.$recurring,
                    n = i.INTERVAL && i.INTERVAL > 1 ? i.INTERVAL : "",
                    r = (i.BYDAY ? " " + e("on") + " " + (i.BYSETPOS || "") + " " + i.BYDAY.split(",").map((function (t) {
                        return webix.i18n.calendar.dayFull[lt.indexOf(t)]
                    })).join(", ") : "") + (i.BYMONTHDAY ? " " + e("on") + " " : "") + (i.BYMONTH ? (i.BYSETPOS ? e("of") : "") + " " + webix.i18n.calendar.monthFull[i.BYMONTH - 1] : "") + (i.BYMONTHDAY ? " " + i.BYMONTHDAY : "");
                return e("Repeats each") + " " + n + " " + e(ut[i.FREQ] + (n ? "s" : "")) + " " + r + (i.COUNT ? ", " + i.COUNT + " " + e("times") : i.UNTIL ? " " + e("till") + " " + webix.i18n.longDateFormatStr(i.UNTIL) : "")
            }, e.prototype.GetSection = function (t, e) {
                var i = this.Sections.getItem(t.section);
                return i ? '<div class="webix_scheduler_section_tpl"><span class="webix_scheduler_section_title">' + e("Section") + ":</span> " + i.text + "</div>" : ""
            }, e
        }(u),
        te = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = this,
                    e = this.app.getService("locale")._,
                    i = {
                        margin: webix.skin.$active.layoutMargin.form,
                        cols: [{
                            view: "button",
                            value: e("Cancel"),
                            hotkey: "esc",
                            click: function () {
                                return t.Cancel()
                            }
                        }, {
                            view: "button",
                            value: e("Apply"),
                            css: "webix_primary",
                            hotkey: "enter",
                            click: function () {
                                return t.Done()
                            }
                        }]
                    };
                return this.app.getService("jet-win").updateConfig({
                    view: "window",
                    head: e("Edit recurring event"),
                    autoheight: !0,
                    css: "webix_scheduler_action_popup",
                    body: {
                        type: "form",
                        padding: {
                            top: 0
                        },
                        width: 340,
                        rows: [{
                            view: "radio",
                            localId: "option",
                            vertical: !0,
                            options: [{
                                id: "this",
                                value: e("This event")
                            }, {
                                id: "next",
                                value: e("This event and the following")
                            }, {
                                id: "all",
                                value: e("All events")
                            }]
                        }, i]
                    },
                    on: {
                        onHide: function () {
                            return t.Result = null
                        }
                    }
                })
            }, e.prototype.init = function (t) {
                this.Root = t
            }, e.prototype.Show = function (t) {
                this.Result = t, this.$$("option").setValue("this"), this.Root.show()
            }, e.prototype.Done = function () {
                var t = this.$$("option").getValue();
                this.Result && this.Result.resolve(t), this.Root.hide()
            }, e.prototype.Cancel = function () {
                this.Result && this.Result.reject(), this.Root.hide()
            }, e
        }(u),
        ee = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                V || (V = !0, webix.protoUI({
                    name: "r-layout",
                    sizeTrigger: function (t, e, i) {
                        this._compactValue = i, this._compactHandler = e, this._app = t;
                        var n = t.config;
                        this._forceCompact = void 0 !== n.params.forceCompact, this._compactWidth = n.compactWidth, this._forceCompact || this._checkTrigger(this.$view.width, i)
                    },
                    _checkTrigger: function (t, e) {
                        return !this._compactWidth || !(t <= this._compactWidth && !e || t > this._compactWidth && e) || (this._compactWidth = null, this._compactHandler(!e), !1)
                    },
                    $setSize: function (t, e) {
                        (this._forceCompact || this._checkTrigger(t, this._compactValue)) && webix.ui.layout.prototype.$setSize.call(this, t, e), this._app && this._app.callEvent("view:resize", [])
                    }
                }, webix.ui.layout));
                var t = this.getParam("forceCompact");
                webix.isUndefined(t) || this.setParam("compact", t), this.Compact = this.getParam("compact"), this.Calendars = !this.Compact && this.app.config.calendars;
                var e = [rt, {
                    view: "r-layout",
                    localId: "main",
                    cols: [{
                        $subview: !0
                    }]
                }];
                return this.Compact ? e.push({
                    $subview: !0,
                    name: "edit",
                    popup: !0
                }) : e[1].cols.push({
                    view: "proxy",
                    width: 400,
                    localId: "edit",
                    css: "webix_shadow_medium",
                    borderless: !0,
                    hidden: !0,
                    body: {
                        $subview: !0,
                        name: "edit"
                    }
                }), this.Calendars && e[1].cols.unshift({
                    view: "proxy",
                    localId: "side",
                    borderless: !0,
                    body: it,
                    hidden: !0
                }), {
                    css: "webix_scheduler",
                    view: "abslayout",
                    cells: [{
                        relative: !0,
                        margin: 0,
                        rows: e
                    }, {
                        view: "proxy",
                        css: "webix_scheduler_absbutton",
                        body: z,
                        localId: "add",
                        borderless: !0,
                        right: 20,
                        bottom: 20,
                        hidden: !this.Compact
                    }]
                }
            }, e.prototype.init = function (t) {
                var e = this;
                this.$$("main").sizeTrigger(this.app, (function (t) {
                    return e.SetCompactMode(t)
                }), !!this.Compact), webix.extend(t, webix.ProgressBar), this.on(this.app, "backend:operation", (function (e) {
                    t.showProgress({
                        type: "top",
                        delay: 2e3
                    }), e.finally((function () {
                        t.hideProgress()
                    }))
                })), this.Calendars && this.$$("side").show();
                var i = this.app.getState();
                this.on(i.$changes, "mode", (function (t) {
                    e.show("./modes." + t)
                })), this.on(i.$changes, "readonly", (function (t) {
                    e.ToggleAdd(t)
                })), this.on(i.$changes, "selected", (function (t, i) {
                    return e.ToggleEvent(t, i)
                })), this.on(this.app, "show:panel", (function () {
                    return e.ToggleSidePanel()
                })), W(this.getRoot()).then((function () {
                    return e.app._dndActionPopup = e.ui(te)
                }))
            }, e.prototype.ToggleEvent = function (t, e) {
                t ? this.ShowEvent(t, e) : e && this.HideEvent()
            }, e.prototype.ShowEvent = function (t, e) {
                var i = e && e.id == t.id,
                    n = this.getSubView("edit"),
                    r = n && i ? n.getUrl()[0].page : "event." + ("0" === t.id ? "form" : "info");
                this.Compact ? this.show("event.formpopup/" + r, {
                    target: "edit"
                }) : (this.ToggleSidePanel("hide"), this.$$("edit").show(), this.show(r, {
                    target: "edit"
                }))
            }, e.prototype.HideEvent = function () {
                this.show("_blank", {
                    target: "edit"
                }), this.Compact || (this.$$("edit").hide(), this.ToggleSidePanel("show"))
            }, e.prototype.SetCompactMode = function (t) {
                var e = this;
                webix.delay((function () {
                    e.setParam("compact", t), t || webix.fullscreen.exit(), e.refresh()
                }))
            }, e.prototype.ToggleSidePanel = function (t) {
                var e = this.$$("side");
                e && ("show" !== t && e.isVisible() ? (this._sidePanel = "hide" === t, e.hide()) : (!t || this._sidePanel && "hide" !== t) && (e.show(), this._sidePanel = !1))
            }, e.prototype.ToggleAdd = function (t) {
                var e = this.$$("add");
                t ? e.hide() : this.Compact && e.show()
            }, e
        }(u);

    function ie(t) {
        return '<div class="webix_event_marker"><div class="webix_event_marker_inner" style="background-color:' + (t.color || t.$color) + ';"></div></div>'
    }

    function ne(t) {
        return function (e, i) {
            return '<div class="webix_event_overall"><div class="webix_event_time">' + i.timeStart(e) + "</div>" + ie(e) + '<div class="webix_event_text">' + (e.text || t("(No title)")) + "</div></div>"
        }
    }

    function re(t) {
        return "border-color:" + t.$color + "; background-color:" + (t.color || t.$color) + "; color:" + t.$textColor + ";"
    }

    function ae(t, e) {
        return '<div class="start">' + webix.i18n.timeFormatStr(t) + '</div><div class="end">' + webix.i18n.timeFormatStr(e) + "</div>"
    }

    function oe(t, e, i) {
        var n = e.master;
        return n["$" + i] - (n.config["width" == i ? "xCount" : "yCount"] - 1) * e[i]
    }

    function se(t, e, i) {
        var n = e.width,
            r = e.height;
        return t.right && (n = oe(0, e, "width")), t.bottom && (r = oe(0, e, "height")), '<div webix_l_id="' + t.id + '" class="' + e.classname(t, e, i) + '" ' + e.aria(t, e, i) + ' style="width:' + n + "px; height:" + r + 'px; float:left; overflow:hidden;">'
    }

    function ce(t, e) {
        return function (i) {
            var n = i.start_date <= t,
                r = i.end_date >= e;
            if (n || r) {
                var a = webix.copy(i);
                return n && (a.start_date = t), r && (a.end_date = e), a
            }
            return i
        }
    }

    function he(t) {
        return webix.Date.equal(webix.Date.datePart(t), webix.Date.datePart(new Date))
    }

    function le(t) {
        return t.all_day || t.start_date.getDate() != t.end_date.getDate() && t.end_date - t.start_date >= 864e5
    }

    function ue(t, e) {
        return Math.round((webix.Date.dayStart(e) - webix.Date.dayStart(t)) / 864e5)
    }

    function de(t, e) {
        return webix.Date.equal(webix.Date.dayStart(t), webix.Date.dayStart(e))
    }
    var pe = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = this;
                return {
                    view: "unitlist",
                    localId: "list",
                    uniteBy: function () {
                        return "custom"
                    },
                    type: {
                        template: ne(this.app.getService("locale")._),
                        templateHeader: function (e) {
                            return t.TemplateHeader(e)
                        },
                        timeStart: function (e) {
                            return t.TimeStart(e)
                        },
                        height: 50
                    },
                    on: {
                        onUnits: function () {
                            return t.SetUnits()
                        },
                        onItemClick: function (e, i) {
                            return t.ShowEvent(e, i)
                        }
                    }
                }
            }, e.prototype.init = function () {
                this.State = this.app.getState(), this.List = this.$$("list"), webix.extend(this.List, webix.OverlayBox)
            }, e.prototype.ShowEvent = function (t, e) {
                var i = mt(this.List.getItem(t));
                i.node = e, this.State.selected = i
            }, e.prototype.ToggleOverlay = function () {
                if (this.List.count()) this.List.hideOverlay();
                else {
                    var t = this.app.getService("locale")._;
                    this.List.showOverlay(t("No Events"))
                }
            }, e.prototype.SetUnits = function () {
                var t = this.List.units,
                    e = this.data.all;
                if (Object.keys(t).length) {
                    this.List.units = {};
                    for (var i = this.data.start, n = this.data.end, r = function () {
                            var t = webix.Date.add(i, 1, "day", !0),
                                n = e.filter((function (e) {
                                    return e.start_date < t && (e.end_date > i || e.end_date >= i && e.all_day)
                                })).map((function (t) {
                                    return t.id
                                }));
                            n.length && (a.List.units[i.valueOf()] = n), i = webix.Date.add(i, 1, "day", !0)
                        }, a = this; i < n;) r()
                }
            }, e.prototype.TimeStart = function (t) {
                var e = this.app.getService("locale")._;
                return le(t) ? e("All Day") : ae(t.start_date, t.end_date)
            }, e
        }(u),
        fe = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var e = this,
                    i = this.getParam("compact", !0),
                    n = t.prototype.config.call(this);
                return n.css = "webix_scheduler_agenda", webix.extend(n.type, {
                    height: "auto",
                    headerHeight: 50,
                    classname: function (t) {
                        return e.TemplateCss(t)
                    }
                }, !0), webix.extend(n.on, {
                    onItemRender: function (t) {
                        t.$unit && (e.CurrentUnit = t.$unit)
                    },
                    onItemClick: function (t, n, r) {
                        r = r.firstChild, e.ShowEvent(t, r), i || e.SelectEvent(r)
                    }
                }, !0), n
            }, e.prototype.init = function () {
                var e = this;
                t.prototype.init.call(this), this.Data = this.app.getService("local");
                var i = this.Data.events(!0);
                this.on(this.State.$changes, "date", (function () {
                    return e.RefreshData()
                })), this.on(this.State.$changes, "active", (function () {
                    return e.RefreshData()
                })), this.on(this.State.$changes, "selected", (function (t) {
                    t || e.SelectEvent()
                })), this.on(this.app, "events:refresh", (function () {
                    return e.RefreshData()
                })), this.on(i.data, "onStoreUpdated", (function (t, i, n) {
                    return n && e.RefreshData()
                }))
            }, e.prototype.RefreshData = function () {
                var t = this,
                    e = webix.Date.monthStart(this.State.date),
                    i = webix.Date.add(e, 1, "month", !0);
                this.Data.getEvents(e, i).then((function (n) {
                    t.data = {
                        all: n,
                        start: e,
                        end: i
                    }, t.app && (t.List.clearAll(), t.List.parse(n.map(ce(e, i))), t.ToggleOverlay())
                }))
            }, e.prototype.SelectEvent = function (t) {
                if (t != this._selected) {
                    var e = "webix_agenda_selected";
                    this._selected && webix.html.removeCss(this._selected, e), t && webix.html.addCss(t, e), this._selected = t
                }
            }, e.prototype.TemplateHeader = function (t) {
                var e = new Date(1 * t),
                    i = "%F <span class='webix_scheduler_monthday" + (he(e) ? " webix_scheduler_today" : "") + "'>%j</span><br><span class='webix_scheduler_dayofweek'>%l</span>";
                return webix.Date.dateToStr(i)(e)
            }, e.prototype.TemplateCss = function (t) {
                var e = this.List.getUnitList(this.CurrentUnit),
                    i = "webix_list_item";
                return t.id == e[e.length - 1] && (i += " webix_event_last"), t.id == e[0] && (i += " webix_event_first"), i
            }, e
        }(pe),
        ve = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = this;
                return {
                    view: "list",
                    borderless: !0,
                    localId: "scale",
                    css: "webix_scheduler_scale",
                    type: {
                        height: 42,
                        heightSize: function (e, i) {
                            var n = t.List.getIndexById(e.id);
                            return i.height - (0 === n ? 17 : 0) + "px"
                        }
                    },
                    scroll: !1,
                    autoheight: !0,
                    width: 51,
                    template: function (e) {
                        return t.HourScaleItem(e)
                    }
                }
            }, e.prototype.init = function () {
                this.List = this.$$("scale"), this.ParseHours()
            }, e.prototype.ParseHours = function () {
                for (var t = [], e = 0; e < 24; e++) t.push({
                    id: e + ""
                });
                this.List.parse(t)
            }, e.prototype.HourScaleItem = function (t) {
                return 0 === this.List.getIndexById(t.id) ? "" : (t.id < 10 ? "0" : "") + t.id + ":00"
            }, e
        }(u),
        ge = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = this;
                return {
                    cols: [{
                        view: "template",
                        localId: "more",
                        width: 50,
                        css: "webix_scheduler_multi_space",
                        tooltip: function () {
                            return ""
                        },
                        onClick: {
                            "wxi-angle-down": function () {
                                return t.ExpandData()
                            },
                            "wxi-angle-up": function () {
                                return t.WrapData()
                            }
                        }
                    }, {}]
                }
            }, e.prototype.init = function () {
                this.List = this.$$("multiDayList"), this.MoreIcon = this.$$("more"), this._expandState = "down", this.maxVisibleLines = 3
            }, e.prototype.SetMoreIcon = function (t) {
                if (t) {
                    var e = "up" === t ? "Collapse" : "Expand",
                        i = this.app.getService("locale")._;
                    this.MoreIcon.setHTML('<div class="webix_scheduler_more_icon webix_icon wxi-angle-' + t + '" webix_tooltip="' + i(e + " all-day events") + '"><div>')
                } else this.MoreIcon.setHTML("")
            }, e.prototype.Animate = function (t, e, i) {
                var n = this;
                this.List.$view.style.transition = "height 150ms", e && (this.List.$view.style.height = e + "px"), setTimeout((function () {
                    i && i(), n.List.$view.style.transition = "", n._inAnimation = !1, n.SetMoreIcon(t)
                }), 150)
            }, e
        }(u);

    function me(t, e) {
        var i = this.LocateSelected(t);
        if (i)
            for (var n = 0; n < i.length; n++) e(i[n], "webix_scheduler_event_selected")
    }

    function ye(t) {
        return me.call(this, t, webix.html.addCss)
    }

    function we(t) {
        return me.call(this, t, webix.html.removeCss)
    }

    function _e() {
        var t = this,
            e = this._SelectionMode;
        if (this.State = this.app.getState(), this.on(this.State.$changes, "selected", (function (i, n) {
                if (n && t.Unselect(n.date && "string" == typeof n.date ? n.date : n.id), i) {
                    var r = "0" !== i.id && i.date ? i.date : i.id;
                    setTimeout((function () {
                        return t.Select(r)
                    }), "multi" !== e && "0" === r ? 150 : 0)
                }
            })), "multi" !== e) {
            var i = this.app.getService("local").events(!0);
            this.on(i.data, "onStoreUpdated", (function (e, i, n) {
                "add" === n && "0" != e && t.State.selected && "0" === t.State.selected.id && (t.State.selected.id = e)
            }))
        }
    }

    function be(t, e, i) {
        t._SelectionMode = e, t.Select = ye, t.Unselect = we, t.HandleSelection = _e, t.LocateSelected = function (t) {
            return function (e) {
                return this._DataObj ? Array.prototype.map.call(this._DataObj.querySelectorAll("[webix_" + (t ? "l" : "e") + '_id="' + e + '"]'), (function (e) {
                    return t ? e.firstElementChild : e
                })) : null
            }
        }(i), t.HandleSelection()
    }
    var xe = {
        $dragIn: function () {
            return this.getContext().from.mode === this.mode
        },
        $dragPos: function (t) {
            var e = this.getContext(),
                i = webix.html.offset(e.target),
                n = t.y - i.y;
            n < e.y_diff ? n = e.y_diff : n > i.height && (n = i.height);
            var r = n - e.y_diff;
            xe.updateNodeHeight.call(this, r), e.duration !== r && (e.duration = r, this.updateText(e)), t.x = e.x_diff, t.y = e.y_diff
        },
        updateNodeHeight: function (t) {
            webix.DragControl.getNode().style.height = Math.max(this.master.minEventHeight, t) + "px"
        },
        getActualDate: function (t, e) {
            var i = this.getContext(),
                n = webix.Date.copy(i.event.start_date),
                r = 5 * (Math.round(60 * i.duration / t.List.type.height / 5) || 1);
            return webix.Date.add(n, r, "minute"), !e && webix.Date.equal(n, i.event.end_date) ? null : {
                start_date: webix.Date.copy(i.event.start_date),
                end_date: n
            }
        }
    };
    var Se, De = function (t, e) {
        return t(e = {
            exports: {}
        }, e.exports), e.exports
    }((function (t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = webix.Date;

        function n(t, e) {
            return i.add(t, 1 * e, "day", !0)
        }

        function r(t, e) {
            return (t = new Date(t)).setHours(0, 0, 0, 0), (e = new Date(e)).setHours(0, 0, 0, 0), Math.round((t.getTime() - e.getTime()) / 864e5)
        }

        function a(t, e) {
            return 24 * r(t, e) + (t.getHours() - e.getHours())
        }
        var o = {};

        function s(t, e) {
            return c(e)(t)
        }

        function c(t) {
            var e = o[t];
            return e || (e = o[t] = i.dateToStr(t)), e
        }

        function h(t) {
            var e = t.getDay();
            return i.startOnMonday && (0 === e ? e = 6 : e--), e
        }
        var l = {
            year: function (t, e) {
                return t.getFullYear() - e.getFullYear()
            },
            quarter: function (t, e) {
                return 4 * (t.getFullYear() - e.getFullYear()) + (Math.floor(t.getMonth() / 3) + 1) - (Math.floor(e.getMonth() / 3) + 1)
            },
            month: function (t, e) {
                return 12 * (t.getFullYear() - e.getFullYear()) + (t.getMonth() - e.getMonth())
            },
            week: function (t, e) {
                var i = r(t, e) / 7,
                    n = h(t),
                    a = h(e);
                return Math.ceil(Math.abs(i) - (n <= a ? 0 : 1)) * Math.sign(i)
            },
            day: r,
            hour: a,
            minute: function (t, e) {
                return 60 * a(t, e) + (t.getMinutes() - e.getMinutes())
            }
        };
        var u = {
                year: ["quarter", 4],
                quarter: ["month", 3],
                month: ["day", function (t) {
                    if (!t) return 30;
                    var e = t.getMonth();
                    if (1 === e) {
                        var i = t.getFullYear();
                        return i % 4 ? 28 : i % 100 ? 29 : i % 400 ? 28 : 29
                    }
                    return e % 2 && e < 7 || !(e % 2) && e > 7 ? 30 : 31
                }],
                week: ["day", 7],
                day: ["hour", 24],
                hour: ["minute", 60]
            },
            d = {
                year: function (t, e) {
                    return i.add(t, 1 * e, "year", !0)
                },
                quarter: function (t, e) {
                    return i.add(t, 3 * e, "month", !0)
                },
                month: function (t, e) {
                    return i.add(t, 1 * e, "month", !0)
                },
                week: function (t, e) {
                    return i.add(t, 1 * e, "week", !0)
                },
                day: n,
                hour: function (t, e) {
                    return i.add(t, 1 * e, "hour", !0)
                },
                minute: function (t, e) {
                    return i.add(t, 1 * e, "minute", !0)
                }
            };

        function p(t, e, i, n, r) {
            var a = n ? u[t][0] : t,
                o = i,
                s = e;
            if (r && (o = m(a, i), (s = m(a, e)) < e && (s = g(a)(s, 1))), n) {
                var c = l[a](s, o),
                    h = u[t][1];
                return c / ("number" == typeof h ? h : h(i))
            }
            return l[a](s, o)
        }

        function f(t) {
            return function (e, i, n, r) {
                return "month" === t && n ? function (t, e, i) {
                    if (v(e, t)) return p("month", t, e, !0, i);
                    var n = 0;
                    if (e.getDate() > 1) {
                        var r = new Date(e.getFullYear(), e.getMonth() + 1, 1);
                        n = p("month", r, e, !0), e = r
                    }
                    var a = 0;
                    v(e, t) || (a = p("month", webix.Date.monthStart(t), e), e = webix.Date.add(e, a, "month", !0));
                    return n + a + p("month", t, e, !0)
                }(e, i, r) : p(t, e, i, n, r)
            }
        }

        function v(t, e) {
            return webix.Date.equal(webix.Date.monthStart(t), webix.Date.monthStart(e))
        }

        function g(t) {
            return d[t]
        }

        function m(t, e) {
            var i;
            switch (t) {
                case "year":
                    return new Date(e.getFullYear(), 0, 1);
                case "quarter":
                    return new Date(e.getFullYear(), 3 * Math.floor(e.getMonth() / 3), 1);
                case "month":
                    return new Date(e.getFullYear(), e.getMonth(), 1);
                case "week":
                    return (i = new Date(e.getFullYear(), e.getMonth(), e.getDate())).setDate(e.getDate() - h(e)), i;
                case "day":
                    return (i = new Date(e.getFullYear(), e.getMonth(), e.getDate())).setHours(0, 0, 0, 0), i;
                case "hour":
                    return (i = new Date(e.getFullYear(), e.getMonth(), e.getDate())).setHours(e.getHours(), 0, 0, 0), i;
                default:
                    return new Date(e)
            }
        }

        function y(t, e, i, n, r) {
            var a = i.start,
                o = i.end,
                s = i.cellWidth,
                c = i.cellHeight,
                h = i.diff,
                l = i.minUnit,
                u = i.precise,
                d = t.start_date < a ? a : t.start_date,
                p = t.end_date > o ? o : t.end_date,
                f = m(l, a),
                v = "milestone" == t.type;
            t.$h = n, t.$x = Math.round(h(d, f, u) * s) - (v ? t.$h / 2 : 0), t.$w = v ? t.$h : Math.round(h(p, d, u, !0) * s), t.$y = webix.isUndefined(r) ? c * e + (c - n) / 2 : r
        }

        function w(t) {
            t.duration = 0, t.end_date = t.start_date
        }

        function _(t) {
            return t.duration < 1 ? g("hour")(t.start_date, Math.floor(24 * t.duration)) : g("day")(t.start_date, t.duration)
        }

        function b(t, e) {
            if (t.duration < 1) return _(t);
            for (var r = function (t) {
                    return i.datePart(t, !0)
                }(t.start_date), a = 0, o = 0; a < t.duration;) e.isHoliday(r) ? 30 == ++o && D() : (++a, o = 0), r = n(r, 1);
            return r
        }

        function x(t, e) {
            var i = f("day")(t.end_date, t.start_date, !0);
            if (i < 1) return parseFloat(i.toFixed(2));
            if (!e) return Math.floor(i);
            for (var r = t.start_date, a = 0; r < t.end_date;) e.isHoliday(r) || ++a, r = n(r, 1);
            return a
        }

        function S(t, e) {
            for (var i, r = t, a = t, o = 0; o < 30 && (i = e.isHoliday(a)) && e.isHoliday(r);) r = n(r, -1), a = n(a, 1), o++;
            return 30 === o && D(), i ? r : a
        }

        function D() {
            throw alert("No work days found within 30 days, check your isHoliday function!", "error"), "Wrong isHoliday function"
        }

        function $(t, e, i, r) {
            for (var a = 0; a < 30 && i.isHoliday(C(t, e));) t = n(t, r), a++;
            return 30 === a && D(), t
        }

        function C(t, e) {
            return e && ! function (t) {
                return i.timePart(t)
            }(t) ? n(t, -1) : t
        }
        e.addUnit = g, e.getDiff = f, e.getUnitStart = m, e.grid = function (t, e, i) {
            var n = document.createElement("canvas");
            n.setAttribute("width", t), n.setAttribute("height", e);
            var r = n.getContext("2d");
            return r.strokeStyle = i, r.moveTo(0, e), r.lineTo(t, e), r.lineTo(t, 0), r.stroke(), n.toDataURL()
        }, e.newLink = function (t, e, i) {
            if (e && i) {
                var n = i.x - e.x,
                    r = i.y - e.y,
                    a = (n > 0 ? e.x : i.x) - t.left,
                    o = (r > 0 ? e.y : i.y) - t.top,
                    s = (n > 0 ? 0 : -n) + "," + (r > 0 ? 0 : -r) + "," + (n > 0 ? n : 0) + "," + (r > 0 ? r : 0);
                return {
                    width: Math.abs(n),
                    height: Math.abs(r),
                    left: a,
                    top: o,
                    p: s
                }
            }
            return null
        }, e.resetScales = function (t, e, i, n, r, a, o) {
            var l = function (t) {
                    var e = new Date;
                    return t.map((function (t) {
                        return {
                            item: t,
                            len: g(t.unit)(e, 1)
                        }
                    })).sort((function (t, e) {
                        return t.len < e.len ? -1 : 1
                    }))[0].item.unit
                }(a),
                u = f(l),
                d = m(l, e);
            t = m(l, t), e = d < e ? g(l)(d, 1) : d;
            var p = u(e, t) * n,
                v = r * a.length;
            return {
                rows: a.map((function (i) {
                    for (var a = [], o = g(i.unit), d = i.step || 1, p = "week" === l && "week" !== i.unit, f = m(i.unit, t); f < e;) {
                        var v = o(f, d);
                        f < t && (f = t), v > e && (v = e);
                        var y = f,
                            w = v;
                        p && (h(f) > 3 && (y = webix.Date.add(f, 1, "week", !0)), h(v) > 3 && (w = webix.Date.add(v, 1, "week", !0)));
                        var _ = (u(w, y) || 1) * n,
                            b = "function" == typeof i.format ? i.format(f, v) : s(f, i.format),
                            x = "";
                        i.css && (x += "function" == typeof i.css ? i.css(f) : i.css), a.push({
                            width: _,
                            value: b,
                            css: x,
                            date: f,
                            format: c(i.format)
                        }), f = v
                    }
                    return {
                        cells: a,
                        add: o,
                        height: r,
                        type: i.unit,
                        step: i.step || 1
                    }
                })),
                width: p,
                height: v,
                cellWidth: n,
                cellHeight: r,
                diff: u,
                start: t,
                end: e,
                minUnit: l,
                precise: i = !!("day" === l ? i : 0 != i),
                isHoliday: o
            }
        }, e.smallerCount = u, e.updateLink = function (t, e, i, n) {
            var r, a, o, s, c = Math.round(n / 2);
            if (!e || !i) return t.$p = "", t;
            var h, l, u = !1,
                d = !1;
            switch (t.type) {
                case 0:
                    d = !0;
                    break;
                case 1:
                    u = !0, d = !0;
                    break;
                case 3:
                    u = !0
            }
            if (r = u ? e.$x : e.$x + e.$w, a = e.$y, o = d ? i.$x : i.$x + i.$w, s = i.$y, function (t, e, i, n, r) {
                    return "milestone" === t.type || "milestone" === e.type ? Math.abs(i - n) > r / 2 : i !== n
                }(e, i, r, o, n) || a !== s) {
                var p = function (t, e, i, n, r, a, o) {
                        var s = t + 20 * (r ? -1 : 1),
                            c = i + 20 * (a ? -1 : 1),
                            h = [t, e, s, e, 0, 0, 0, 0, c, n, i, n],
                            l = c - s,
                            u = n - e,
                            d = a === r;
                        !d && (c <= t && a || c > t && !a) && (u -= o);
                        d && a && s > c || d && !a && s < c ? (h[4] = h[2] + l, h[5] = h[3], h[6] = h[4], h[7] = h[5] + u) : (h[4] = h[2], h[5] = h[3] + u, h[6] = h[4] + l, h[7] = h[5]);
                        return h.join(",")
                    }(r, a + c, o, s + c, u, d, 19),
                    f = (h = o, l = s + c, d ? h - 5 + "," + (l - 3) + "," + (h - 5) + "," + (l + 3) + "," + h + "," + l : h + 5 + "," + (l + 3) + "," + (h + 5) + "," + (l - 3) + "," + h + "," + l);
                t.$p = p + "," + f
            } else t.$p = "";
            return t
        }, e.updateTask = function (t, e, i, n, r) {
            return "split" === t.type && t.$data && t.$data.length ? t.$data.forEach((function (t) {
                return y(t, e, i, n)
            })) : y(t, e, i, n, r), t
        }, e.updateTaskDuration = function (t, e, i, n) {
            t.start_date && t.end_date && t.start_date.valueOf() >= t.end_date.valueOf() && (t.end_date = null, t.duration = 1, i && (i = "move")), e ? function (t, e, i, n) {
                if ("milestone" == t.type) return t.start_date = i ? $(t.start_date, !1, e, n) : S(t.start_date, e), w(t);
                i ? "start" == i || "move" == i ? (t.start_date = $(t.start_date, !1, e, n), t.duration || (t.duration = x(t, e)), t.end_date || (t.end_date = b(t, e))) : (t.end_date || (t.end_date = b(t, e)), t.duration || (t.end_date = $(t.end_date, !0, e, n), t.duration = x(t, e))) : (t.start_date = S(t.start_date, e), t.end_date = b(t, e), t.duration = x(t, e))
            }(t, e, i, n) : "milestone" == t.type ? w(t) : (t.duration || (t.duration = x(t)), t.end_date || (t.end_date = _(t)))
        }
    }));
    (Se = De) && Se.__esModule && Object.prototype.hasOwnProperty.call(Se, "default") && Se.default;
    var $e = De.addUnit,
        Ce = (De.getDiff, De.getUnitStart),
        Ee = De.grid,
        Te = (De.newLink, De.resetScales),
        ke = De.smallerCount,
        Le = (De.updateLink, De.updateTask);
    De.updateTaskDuration;
    var Ie = {
        start: function (t, e) {
            t._auto_scroll_delay = webix.delay(Ie.autoScroll, t, [e, webix.html.pos(e)], 250)
        },
        reset: function (t) {
            t._auto_scroll_delay && (t._auto_scroll_delay = window.clearTimeout(t._auto_scroll_delay))
        },
        autoScroll: function (t, e) {
            var i = -1 !== this.direction.indexOf("y"),
                n = -1 !== this.direction.indexOf("x"),
                r = webix.html.offset(this.from.view.$view),
                a = !1;
            i && Ie.autoYScroll.call(this, e, r, this.senseY) && (a = !0), n && Ie.autoXScroll.call(this, e, r, this.senseX) && (a = !0), a && (! function (t, e) {
                if (webix.DragControl.active) {
                    var i = webix.DragControl.getNode();
                    e = webix.copy(e), webix.DragControl.$dragPos(e, t), i.style.top = e.y + webix.DragControl.top + "px", i.style.left = e.x + webix.DragControl.left + "px"
                }
            }(t, e), this._auto_scroll_delay = webix.delay(Ie.autoScroll, this, [t, e], 100))
        },
        autoYScroll: function (t, e, i) {
            var n = this.from.view.getScrollState();
            return t.y < e.y + i ? Ie.autoScrollTo.call(this, n.x, n.y - i, "y") : t.y > e.y + e.height - i && Ie.autoScrollTo.call(this, n.x, n.y + i, "y")
        },
        autoXScroll: function (t, e, i) {
            var n = this.from.view.getScrollState();
            if (t.x < e.x + i) return Ie.autoScrollTo.call(this, n.x - i, n.y, "x");
            if (t.x > e.x + e.width - i) {
                var r = this.snode ? Math.min(n.x + i, this.snode.scrollWidth - e.width) : n.x + i;
                return r != n.x && Ie.autoScrollTo.call(this, r, n.y, "x")
            }
            return !1
        },
        autoScrollTo: function (t, e, i) {
            this.from.view.scrollTo(t, e), this.from.view.callEvent("onAfterAutoScroll", []);
            var n = this.from.view.getScrollState();
            return Math.abs(("x" === i ? t : e) - n[i]) < 1
        }
    };

    function Ae(t, e, i) {
        var n = webix.copy(Ke[e]);
        n.view = t, n.master = this, n.State = this.app.getState();
        var r = this.app.getService("local");
        n.Local = r.events(!0), n.Calendars = r.calendars(!0), n.Ops = this.app.getService("operations"), webix.DragControl.addDrag(t.$view, n), i || webix.DragControl.addDrop(t.$view, n, !0)
    }

    function Pe(t, e, i) {
        var n, r, a = t.target;
        do {
            r = (n = a.getAttribute ? a.getAttribute(i || "webix_e_id") : null) ? a : null, a = a.parentNode
        } while (!n && a && a !== e);
        return {
            id: n,
            node: r
        }
    }

    function Me(t, e) {
        if (this.State.selected) {
            var i = mt(t);
            t.$recurring && (i.date = e.start_date.valueOf() + "_" + t.$id), this.State.selected = i
        }
    }

    function Re(t, e, i) {
        var r = this,
            a = e.$id || e.id,
            o = this.Local.getItem(a);
        if ("this" === t && this.master.HasOneOccurrence(n(n({}, e), {
                start_date: o.start_date,
                end_date: o.end_date
            }))) return this.Ops.updateEvent(a, i, void 0, void 0, !0);
        if (!(t = this.master.ChangeMode(t, e, this.Local.getItem(e.recurring ? a : e.origin_id).start_date, e.recurring ? e.id : e.start_date))) return e.$recurring = Dt(e.$recurring, i, e), i.recurring = ht(e.$recurring), this.Ops.updateEvent(a, i, void 0, void 0, !0);
        if ("this" === t || "next" === t) {
            var s, c = "";
            "this" === t ? c = _t(e.id, e) : e.recurring ? c = wt(e.id, webix.copy(e)) : (a = e.origin_id, s = webix.copy(this.Local.getItem(a)), c = wt(i.start_date, webix.copy(s), !0));
            var h = Ue.call(this, a, t, e, i, s);
            return this.Ops.updateEvent(a, {
                recurring: c
            }, t, webix.Date.dayStart(h.start_date), !0).then((function () {
                return r.Ops.addEvent(h, !0)
            }))
        }
        if ("all" === t) {
            var l = e.origin_id || e.$id,
                u = webix.copy(this.Local.getItem(l)),
                d = u.$recurring;
            return (d.COUNT || d.UNTIL) && (d = this.master.CorrectCountUntil(u, t, i.start_date, this.Local)), !i.start_date || de(e.start_date, i.start_date) ? (i.start_date && (i.start_date = Ne(u.start_date, i.start_date)), i.end_date && (de(e.end_date, i.end_date) ? i.end_date = Ne(u.end_date, i.end_date) : i.end_date = Oe(u.end_date, e.end_date, i.end_date))) : (i.end_date || (i.start_date = Oe(u.start_date, e.start_date, i.start_date)), d = Dt(d, i, u)), i.start_date && (d.EXDATE && delete d.EXDATE, i.recurring = ht(d)), this.Ops.updateEvent(e.origin_id || a, i, t, void 0, !0)
        }
    }

    function Oe(t, e, i) {
        return new Date(1 * t + (i - e))
    }

    function Ne(t, e) {
        var i = 1e3 * webix.Date.timePart(e);
        return new Date(1 * webix.Date.dayStart(t) + i)
    }

    function Ue(t, e, i, r, a) {
        var o = n(n(n({}, i), r), {
            recurring: ""
        });
        if (o.origin_id || (o.origin_id = t), "next" === e) {
            var s = webix.copy(i.recurring ? i.$recurring : a.$recurring);
            (s.COUNT || s.UNTIL) && (s = this.master.CorrectCountUntil(n(n({}, this.Local.getItem(t)), {
                $recurring: s
            }), e, o.start_date, this.Local)), (s = Dt(s, o, i)).EXDATE = [], o.recurring = ht(s)
        }
        return delete o.$id, o
    }
    var Ye = {
            mode: "common",
            $longTouchLimit: !0,
            $dragDestroy: function (t, e) {
                var i = this.getContext();
                return !i.$waitUpdate && i.node && (i.node.style.visibility = "visible"), i.$resize && webix.html.removeCss(document.body, "webix_active_resize"), webix.html.remove(e), "move" !== i.moveMode || i.more || Ie.reset(i), !1
            },
            getContext: function () {
                return webix.DragControl.getContext()
            },
            setDragOffset: function (t, e, i) {
                var n = this.getContext(),
                    r = webix.html.pos(i),
                    a = webix.html.offset(t);
                n.width = a.width, n.height = a.height, n.x_offset = a.x - r.x, n.y_offset = a.y - r.y
            },
            updateEvent: function (t, e) {
                var i = this;
                if (t.$id || t.origin_id) this.master._waitPopup = webix.promise.defer(), this.master._waitPopup.then((function (n) {
                    var r = Re.call(i, n, t, e);
                    r.then((function () {
                        return Me.call(i, t, e)
                    })), i.master.app.callEvent("backend:operation", [r])
                })).finally((function () {
                    return i.master._waitPopup = null
                })), this.master.app._dndActionPopup.Show(this.master._waitPopup);
                else {
                    var n = this.Ops.updateEvent(t.$id || t.id, e, void 0, void 0, !0);
                    this.finishOperation(n, t, e)
                }
            },
            addEvent: function (t, e) {
                var i = {
                    text: t.text,
                    start_date: e.start_date,
                    end_date: e.end_date,
                    details: ""
                };
                this.master.app.config.calendars && (i.calendar = t.calendar), this.master.app.config.timeline && (i.section = e.section || t.section), this.master.app.config.units && t.units && (i.units = e.units || t.units);
                var n = this.Ops.addEvent(i, !0);
                this.finishOperation(n, i, e)
            },
            copyEvent: function (t, e) {
                var i = n(n({}, t), e);
                Ot.call(this.master, i);
                var r = this.Ops.addEvent(i, !0);
                this.finishOperation(r, i, e)
            },
            finishOperation: function (t, e, i) {
                var r = this,
                    a = this.getContext();
                t.then((function (t) {
                    return Me.call(r, t ? n(n({}, e), {
                        id: t
                    }) : e, i)
                })), this.master.app.callEvent("backend:operation", [t]), a.$waitUpdate = !0
            }
        },
        He = webix.extend({
            mode: "day",
            $dragIn: function (t, e) {
                var i = this.getContext();
                if (i.$resize) return xe.$dragIn.apply(this, arguments);
                if (i.from.mode !== this.mode) return !1;
                if (i.target != e) {
                    var n = webix.DragControl.getNode();
                    e.firstChild.appendChild(n), i.target = e
                }
                return !0
            },
            $drop: function (t, e, i) {
                var n = this.getContext(),
                    r = this.master.app;
                if (n.from.mode !== this.mode || !r.callEvent("app:beforedrop", [n, i])) return !1;
                var a = this.getActualDate(this.master);
                a && ("0" == n.event.id ? n.$creation ? this.State.selected = {
                    id: "0",
                    date: n.event.start_date,
                    end_date: a.end_date
                } : this.addEvent(n.event, a) : n.$copy && !n.$resize ? this.copyEvent(n.event, a) : this.updateEvent(n.event, a))
            },
            $dragPos: function (t) {
                var e = this.getContext();
                if (e.$resize) return xe.$dragPos.apply(this, arguments);
                var i = webix.html.offset(e.target),
                    n = i.height - e.height;
                t.x = e.x_diff, t.y += e.y_offset - i.y, t.y < 0 ? t.y = 0 : t.y > n && (t.y = n), webix.extend(e, t, !0), e.$last_y !== t.y && (this.updateText(e), e.$last_y = t.y)
            },
            $dragCreate: function (t, e) {
                if (this.State.readonly) return !1;
                var i = this.getContext(),
                    n = Pe(e, t);
                if (n.id) {
                    webix.extend(i, n, !0), webix.extend(i, {
                        from: this,
                        target: t
                    }, !0), i.event = this.master.GetEvent(n.id), this.setDragOffset(n.node, t, e), e.target.getAttribute("webix_resizer") && (i.$resize = !0);
                    var r = this.master.app;
                    return !!r.callEvent("app:beforedrag", [i, e]) && (i.$resize && webix.html.addCss(document.body, "webix_active_resize", !0), (l = n.node.cloneNode(!0)).className += " webix_drag_zone webix_" + (i.$resize ? "resize" : "drag") + "_event", t.firstChild.appendChild(l), i.$copy = (e.ctrlKey || e.metaKey) && r.config.copypaste, i.$copy && "0" !== n.id && !i.$resize || (n.node.style.visibility = "hidden"), l)
                }
                if (this.master.app.config.dragCreate && !this.State.clipboard) {
                    var a = this.view.getScrollState().y,
                        o = webix.html.offset(t).y;
                    i.y = webix.html.pos(e).y - o + a;
                    var s = this.getActualDate(this.master, !0),
                        c = s.start_date,
                        h = s.end_date;
                    i.event = {
                        id: "0",
                        text: "",
                        start_date: c,
                        end_date: h,
                        $color: "#997CEB",
                        $textColor: "#fff",
                        $top: i.y,
                        $left: 0,
                        $height: this.master.minEventHeight,
                        $width: this.master.List.$width - 8
                    };
                    var l, u = this.Calendars.getFirstId();
                    u && (i.event.$color = this.Calendars.getItem(u).color), webix.extend(i, {
                        from: this,
                        target: t
                    }, !0), (l = webix.html.create("div")).innerHTML = this.master.ToHTML(i.event), l.firstChild.className += " webix_drag_zone webix_resize_event", webix.html.addCss(document.body, "webix_active_resize", !0);
                    var d = t.firstChild.appendChild(l.firstChild);
                    return this.setDragOffset(d, t, e), i.$resize = !0, i.$creation = !0, d
                }
                return !1
            },
            getActualDate: function (t, e) {
                var i = this.getContext();
                if (i.$resize) return xe.getActualDate.apply(this, arguments);
                var n = webix.Date.copy(t.Day),
                    r = t.List.getFirstId() * t.List.type.height,
                    a = 5 * Math.round(60 * (i.y + r) / t.List.type.height / 5);
                if (webix.Date.add(n, a, "minute"), !e && webix.Date.equal(n, i.event.start_date)) return null;
                var o = i.event ? i.event.end_date - i.event.start_date : 36e5;
                return {
                    start_date: n,
                    end_date: new Date(n.valueOf() + o)
                }
            },
            updateText: function (t) {
                var e = webix.DragControl.getNode(),
                    i = webix.DragControl.getMaster(t.target),
                    n = this.getActualDate(i.master, !0);
                n.text = t.event.text, e.innerHTML = "", e.innerHTML = i.master.EventTemplate(n)
            },
            setDragOffset: function (t, e, i) {
                var n = this.getContext(),
                    r = webix.html.pos(i),
                    a = webix.html.offset(t);
                n.height = a.height, n.x_offset = a.x - r.x, n.y_offset = a.y - r.y;
                var o = webix.html.offset(e);
                n.x_diff = a.x - o.x - 1, n.y_diff = a.y - o.y
            }
        }, Ye),
        Be = webix.extend({
            mode: "month",
            $dragIn: function (t, e, i) {
                var n = this.getContext();
                if (n.from.mode !== this.mode) return !1;
                n.offset = n.offset || webix.html.offset(e);
                var r = this.locate(i),
                    a = this.view.getIdByIndex(r),
                    o = this.view.getItemNode(a);
                return n.$marked !== a && this.markDropArea(a), o
            },
            $dragOut: function (t, e, i) {
                return e !== i && this.markDropArea(), null
            },
            $drop: function (t, e, i) {
                var n = this.getContext(),
                    r = this.master.app;
                if (n.from.mode !== this.mode || !r.callEvent("app:beforedrop", [n, i])) return !1;
                this.markDropArea();
                var a = n.$copy,
                    o = this.getActualDate(i, a);
                o && ("0" == n.event.id ? this.addEvent(n.event, o) : a ? this.copyEvent(n.event, o) : this.updateEvent(n.event, o))
            },
            $dragPos: function (t) {
                var e = this.getContext();
                t.x += e.x_offset, t.y += e.y_offset
            },
            $dragCreate: function (t, e) {
                if (this.State.readonly) return !1;
                var i = Pe(e, t);
                if (i.id && "$wsh_multi_more" != i.id) {
                    var n = this.getContext();
                    webix.extend(n, i, !0), webix.extend(n, {
                        from: this,
                        offset: webix.html.offset(t)
                    }, !0), n.event = this.master.Events.getItem(i.id), n.start = this.view.getIdByIndex(this.locate(e)), this.setDragOffset(i.node, t, e);
                    var r = this.master.app;
                    if (!r.callEvent("app:beforedrag", [n, e])) return !1;
                    var a = document.createElement("DIV"),
                        o = i.node.cloneNode(!0);
                    return o.style.position = "static", a.appendChild(o), a.className = t.className + " webix_drag_zone webix_drag_event", document.body.appendChild(a), n.$copy = (e.ctrlKey || e.metaKey) && r.config.copypaste, n.$copy && "0" !== n.event.id || (i.node.style.visibility = "hidden"), webix.callEvent("onClick", [e]), a
                }
                return !1
            },
            getActualDate: function (t, e) {
                var i = this.getContext(),
                    n = this.locate(t) - this.view.getIndexById(i.start);
                return n || e ? {
                    start_date: webix.Date.add(i.event.start_date, n, "day", !0),
                    end_date: webix.Date.add(i.event.end_date, n, "day", !0)
                } : null
            },
            markDropArea: function (t) {
                var e = this.getContext();
                if (e.$marked && e.$marked != t && (this.view.removeCss(e.$marked, "webix_drag_over"), e.$marked = null, e.$extra && (webix.html.removeCss(this.view.$view, e.$extra), e.$extra = null)), !e.$marked && t) {
                    this.view.addCss(t, "webix_drag_over"), e.$marked = t;
                    var i = void 0;
                    this.view.getFirstId() == t ? i = "webix_scheduler_dnd_1" : this.view.getLastId() == t && (i = "webix_scheduler_dnd_n"), i && (webix.html.addCss(this.view.$view, i, !0), e.$extra = i)
                }
            },
            locate: function (t) {
                var e = this.getContext(),
                    i = webix.html.pos(t);
                return i.x -= e.offset.x, i.y -= e.offset.y, Math.min(Math.floor(i.y / this.view.type.height), this.view.config.yCount - 1) * this.view.config.xCount + Math.min(Math.floor(i.x / this.view.type.width), this.view.config.xCount - 1)
            }
        }, Ye),
        Fe = webix.extend({
            mode: "multiday"
        }, Be),
        Ve = webix.extend({
            $dragCreate: function (t, e) {
                if (this.State.readonly) return !1;
                var i = this.view.locate(e);
                if (i) {
                    var n = this.getContext(),
                        r = this.view.getItemNode(i).children[0];
                    if (webix.extend(n, {
                            from: this,
                            id: i
                        }, !0), n.event = this.master.Events.getItem(i), n.start = this.master.ID, this.setDragOffset(r, t, e), !this.master.app.callEvent("app:beforedrag", [n, e])) return !1;
                    var a = document.createElement("DIV");
                    return a.style.width = n.width + "px", a.style.height = n.height + "px", a.appendChild(r.cloneNode(!0)), a.className = t.className + " webix_drag_zone webix_drag_event", document.body.appendChild(a), this.master.HideWindow(), a
                }
                return !1
            },
            $dragDestroy: function (t, e) {
                return webix.html.remove(e), !1
            }
        }, Be),
        Ge = webix.extend({
            mode: "units",
            $drop: function (t, e, i) {
                var n = this.getContext(),
                    r = this.master.app;
                if (n.from.mode !== this.mode || !r.callEvent("app:beforedrop", [n, i])) return !1;
                var a = n.$copy,
                    o = this.getActualDate(this.master, a),
                    s = this.getEventUnits(n);
                if (o || s) {
                    var c = webix.extend(o || {}, s || {});
                    "0" == n.event.id ? n.$creation ? this.State.selected = {
                        id: "0",
                        date: n.event.start_date,
                        end_date: c.end_date,
                        unit: c.units
                    } : this.addEvent(n.event, c) : a && !n.$resize ? this.copyEvent(n.event, c) : this.updateEvent(n.event, c)
                }
            },
            getEventUnits: function (t) {
                var e = t.from.master.Unit.id + "";
                if (t.event.units) {
                    var i = t.event.units.split(","),
                        n = this.master.Unit.id + "";
                    if (n == e || t.$resize) return;
                    var r = i.filter((function (t) {
                        return t != e
                    }));
                    return -1 === i.indexOf(n) && r.push(n), {
                        units: r.join(",")
                    }
                }
                return {
                    units: e
                }
            }
        }, He),
        je = webix.extend({
            mode: "multidayUnits",
            $dragCreate: function (t, e) {
                if (this.State.readonly) return !1;
                var i = Pe(e, t, "webix_l_id");
                if (i.id && "$wsh_multi_more" != i.id) {
                    var n = this.getContext();
                    webix.extend(n, i, !0), webix.extend(n, {
                        from: this,
                        target: t
                    }, !0), n.event = this.master.GetEvent(i.id), this.setDragOffset(i.node, t, e);
                    var r = this.master.app;
                    if (!r.callEvent("app:beforedrag", [n, e])) return !1;
                    var a = i.node.cloneNode(!0);
                    return a.className += " webix_drag_zone webix_drag_event", a.style.width = "100%", t.firstChild.appendChild(a), n.$copy = (e.ctrlKey || e.metaKey) && r.config.copypaste, n.$copy || (i.node.style.visibility = "hidden"), a
                }
                return !1
            },
            $dragPos: function (t) {
                var e = this.getContext(),
                    i = webix.html.offset(e.target),
                    n = i.height - e.height;
                t.x = e.x_diff, t.y += e.y_offset - i.y, t.y < 0 ? t.y = 0 : t.y > n && (t.y = n), webix.extend(e, t, !0)
            },
            getActualDate: function (t, e) {
                var i = t.State.date,
                    n = this.getContext();
                if (!e && webix.Date.equal(i, n.event.start_date)) return null;
                var r = n.event.end_date - n.event.start_date;
                return {
                    start_date: i,
                    end_date: new Date(i.valueOf() + r)
                }
            }
        }, Ge),
        We = webix.extend({
            mode: "timeline",
            dragScroll: {
                direction: "xy"
            },
            locate: function (t) {
                var e = this.getContext(),
                    i = this.view.getScrollState(),
                    n = this.view.$scope.Sections.count(),
                    r = this.getEventContext(t, e).y - e.offset.y + i.y;
                return Math.min(Math.floor(r / this.view.type.height), n - 1)
            },
            $dragCreate: function (t, e, i) {
                var r = this.getContext();
                r.$touch = "touch" === i;
                var a = this.master.app;
                if (this.State.readonly) return !1;
                var o = Pe(e, t);
                if (o.id && "$wsh_multi_more" != o.id) {
                    var s = o.node,
                        c = this.getEventContext(e, r),
                        h = qe(s, c.x),
                        l = this.view.getScrollState();
                    if (webix.extend(r, n(n({}, o), {
                            from: this,
                            offset: webix.html.offset(t),
                            moveMode: h,
                            step: this.getStep(),
                            dx: 0,
                            scroll: l,
                            x: c.x,
                            t: parseInt(s.style.top),
                            l: parseInt(s.style.left),
                            w: parseInt(s.style.width)
                        }), !0), r.event = this.master.Events.getItem(o.id), r.start = this.view.getIdByIndex(this.locate(e)), this.setDragOffset(s, t, e), !a.callEvent("app:beforedrag", [r, e])) return !1;
                    "move" === r.moveMode && webix.extend(r, Xe.call(this, this.dragScroll, this.view.$scope.Scales));
                    var u = document.createElement("DIV"),
                        d = s.cloneNode(!0);
                    return d.style.position = "static", u.appendChild(d), u.className = t.className + " webix_drag_zone webix_drag_event", s.parentNode.appendChild(u), r.$copy = (e.ctrlKey || e.metaKey) && a.config.copypaste, r.$copy && "0" !== r.event.id && "move" === r.moveMode || (s.style.visibility = "hidden"), webix.callEvent("onClick", [e]), u
                }
                return !1
            },
            getEventContext: function (t, e) {
                if (e.$touch) {
                    if (t.changedTouches && (!t.touches || !t.touches[0])) {
                        var i = t.changedTouches[0];
                        return {
                            x: i.pageX,
                            y: i.pageY
                        }
                    }
                    return t.time ? t : webix.env.touch.context(t)
                }
                return {
                    x: t.clientX,
                    y: t.clientY
                }
            },
            $dragIn: function (t, e, i) {
                var n = this.getContext();
                return n.from.mode === this.mode && (n.offset = n.offset || webix.html.offset(e), "move" !== n.moveMode || n.more || (Ie.reset(n), Ie.start(n, i)), !0)
            },
            $dragPos: function (t) {
                var e = this.getContext(),
                    i = e.x,
                    n = e.t,
                    r = e.l,
                    a = e.w,
                    o = e.scroll,
                    s = e.step,
                    c = e.moveMode,
                    h = this.view.getScrollState();
                e.dx = t.x - i - (o ? o.x : 0) + h.x;
                var l = webix.DragControl.getNode();
                if ("move" === c) {
                    var u = e.more ? {
                        x: 0,
                        y: 0
                    } : e.offset;
                    t.x += e.x_offset - u.x + h.x, t.y += e.y_offset - u.y + h.y
                } else "start" === c ? (t.x = Math.min(r + e.dx, r + a - s), t.y = n, l.childNodes[0].style.width = l.style.width = Math.max(s, a - e.dx) + "px") : "end" === c && (t.x = r, t.y = n, l.childNodes[0].style.width = l.style.width = Math.max(a + e.dx, s) + "px")
            },
            $drop: function (t, e, i) {
                var n = this.getContext(),
                    r = this.master.app;
                if (n.from.mode !== this.mode || !r.callEvent("app:beforedrop", [n, i])) return !1;
                var a = this.getData(i);
                a && ("0" == n.event.id ? this.addEvent(n.event, a) : n.$copy && "move" === n.moveMode ? this.copyEvent(n.event, a) : this.updateEvent(n.event, a))
            },
            getData: function (t) {
                var e = this.getContext(),
                    i = {},
                    n = this.view.getIdByIndex(this.locate(t)),
                    r = e.moveMode,
                    a = e.dx,
                    o = e.step,
                    s = Math.round(a / (o || this.getStep()));
                if (n != e.start || e.$copy && "0" !== e.event.id || s) {
                    "move" === r && (i.section = n);
                    var c = this.view.$scope.Scales;
                    return webix.extend(i, function (t, e, i, n) {
                        var r = {},
                            a = e.precise ? ke[e.minUnit][0] : e.minUnit;
                        if ("start" === i || "move" === i) {
                            var o = e.precise ? t.start_date : Ce(a, t.start_date);
                            r.start_date = $e(a)(o, n), "start" === i && ze(r.start_date, t.end_date, r.all_day) && (r.start_date = $e(a)(t.end_date, -1)), webix.Date.equal(r.start_date, t.start_date) && delete r.start_date
                        }
                        if ("end" === i || "move" === i) {
                            var s = Ce(a, t.end_date);
                            o = e.precise || webix.Date.equal(s, t.end_date) ? t.end_date : $e(a)(s, 1);
                            r.end_date = $e(a)(o, n), ze(r.start_date || t.start_date, r.end_date, r.all_day) && (r.end_date = $e(a)(t.start_date, 1)), webix.Date.equal(r.end_date, t.end_date) && delete r.end_date
                        }
                        return r
                    }(e.event, c, r, s)), i
                }
                return null
            },
            getStep: function () {
                var t = this.view.$scope.Scales,
                    e = t.cellWidth;
                if (t.precise) {
                    var i = ke[t.minUnit][1];
                    e = Math.round(e / ("number" == typeof i ? i : i()))
                }
                return e
            }
        }, Ye);

    function ze(t, e, i) {
        return i ? e < t : e <= t
    }

    function qe(t, e) {
        var i = t.getBoundingClientRect(),
            n = (e - i.left) / i.width,
            r = webix.env.touch ? 400 : 200,
            a = .2 / (i.width > r ? i.width / r : 1);
        return n < a && -1 == t.className.indexOf("webix_scheduler_event_break_left") ? "start" : n > 1 - a && -1 == t.className.indexOf("webix_scheduler_event_break_right") ? "end" : "move"
    }

    function Xe(t, e) {
        return t.senseX = Math.round(e.cellWidth * (webix.env.touch ? 1 : .5)), t.senseY = Math.round(e.cellHeight * (webix.env.touch ? 3 : 1)), t
    }
    var Ke = {
            day: He,
            month: Be,
            more: Ve,
            multiday: Fe,
            units: Ge,
            multidayUnits: je,
            timeline: We,
            timelineMore: webix.extend({
                mode: "timeline",
                dragScroll: null,
                $dragCreate: function (t, e, i) {
                    var n = this.getContext();
                    if (n.$touch = "touch" === i, this.State.readonly) return !1;
                    var r = this.view.locate(e);
                    if (r) {
                        var a = this.view.getItemNode(r).children[0];
                        if (webix.extend(n, {
                                from: this,
                                id: r,
                                moveMode: "move",
                                more: !0
                            }, !0), n.event = this.master.Events.getItem(r), n.x = n.event.$x + parseInt(t.offsetParent.style.left), n.start = this.master.ID, this.setDragOffset(a, t, e), !this.master.app.callEvent("app:beforedrag", [n, e])) return !1;
                        var o = document.createElement("DIV");
                        return o.style.width = n.width + "px", o.style.height = n.height + "px", o.appendChild(a.cloneNode(!0)), o.className = t.className + " webix_drag_zone webix_drag_event", document.body.appendChild(o), this.master.HideWindow(), o
                    }
                    return !1
                },
                $dragDestroy: function (t, e) {
                    return webix.html.remove(e), !1
                }
            }, We)
        },
        Qe = function (t) {
            function e(e, i) {
                var n = t.call(this, e) || this;
                return i && (n.WeekDayNum = i.day), n
            }
            return i(e, t), e.prototype.config = function () {
                var t = this;
                return {
                    view: "list",
                    localId: "dayList",
                    css: "webix_scheduler_day_events",
                    scroll: !1,
                    autoheight: !0,
                    template: "",
                    type: {
                        height: 42,
                        css: "webix_scheduler_day_scale_item"
                    },
                    onClick: {
                        webix_scheduler_day_event: function (e) {
                            return t.ShowEvent(e)
                        }
                    },
                    onDblClick: {
                        webix_scheduler_day_scale_item: function (e, i) {
                            return t.ShowNew(i)
                        }
                    }
                }
            }, e.prototype.init = function () {
                var t = this;
                this.State = this.app.getState(), this.List = this.$$("dayList"), be(this, "scale"), At(this), this.List.$setSize = function (t, e) {
                    webix.ui.view.prototype.$setSize.call(this, t, e) && this.render()
                }, this.minEventHeight = 62, this.ParseHours(), this.on(this.State.$changes, "readonly", (function () {
                    return t.List.render()
                })), this.List.attachEvent("onAfterRender", (function () {
                    return t.RenderEvents()
                })), Ae.call(this, this.List, "day");
                var e = this.getParam("compact", !0);
                !this.app.config.copypaste || webix.env.mobile || e || Jt(this, this.List)
            }, e.prototype.urlChange = function () {
                var t = this;
                if (this.data = this.getParam("data"), this.data) {
                    if (this.Day = webix.Date.datePart(this.State.date, !0), this.WeekDayNum > -1) {
                        var e = this.data.start;
                        this.Day = webix.Date.add(e, this.WeekDayNum, "day", !0)
                    }
                    var i = webix.Date.add(this.Day, 1, "day", !0);
                    this.Events = this.FilterToday(this.Day, i), this._marker_update_interval && (this._marker_update_interval = clearInterval(this._marker_update_interval)), he(this.Day) && (this._marker_update_interval = setInterval((function () {
                        he(t.Day) ? t.UpdateMarkerPosition() : (webix.html.remove(t._Marker), t._Marker = t._marker_update_interval = clearInterval(t._marker_update_interval))
                    }), 3e5)), this.List.render()
                }
            }, e.prototype.GetEvent = function (t) {
                for (var e = 0; e < this.Events.length; e++)
                    if (this.Events[e].id == t) return this.Events[e];
                return null
            }, e.prototype.FilterToday = function (t, e) {
                return this.WeekDayNum > -1 ? this.data.single.filter((function (i) {
                    return i.start_date < e && i.end_date > t
                })) : this.data.single
            }, e.prototype.MarkToday = function () {
                if (this.Day && he(this.Day)) {
                    var t = webix.html.create("div", {
                        class: "webix_scheduler_today_marker"
                    });
                    this._Marker = this.List.$view.firstChild.appendChild(t), this.UpdateMarkerPosition()
                } else this._Marker = null
            }, e.prototype.UpdateMarkerPosition = function () {
                if (this._Marker) {
                    var t = new Date,
                        e = 60 * t.getHours() + t.getMinutes();
                    this._Marker.style.top = Math.round(e * this.List.type.height / 60) + "px"
                }
            }, e.prototype.RenderEvents = function () {
                var t = this,
                    e = this.Events;
                if (e && e.length) {
                    this.PrepareEvents();
                    var i = webix.html.create("div", {
                        role: "presentation"
                    });
                    i.innerHTML = e.map((function (e) {
                        return t.ToHTML(e)
                    })).join(""), this._DataObj = this.List.$view.firstChild.appendChild(i), this.app.callEvent("events:rendered", [])
                }
                this.MarkToday()
            }, e.prototype.PrepareEvents = function () {
                for (var t = this.Events, e = [], i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.$inner = !1;
                    var r = this.PruneStack(n, e);
                    e.length && (e[e.length - 1].$inner = !0), r || (e.length ? (n.$sorder = e[e.length - 1].$sorder + 1, n.$inner = !1) : n.$sorder = 0), e.splice(n.$sorder, 0, n), e.length > (e.max_count || 0) && (e.max_count = e.length)
                }
                this.SetPosition(e, t)
            }, e.prototype.PruneStack = function (t, e) {
                for (; e.length && this.GetEventEndDate(e[e.length - 1]) <= t.start_date;) e.splice(e.length - 1, 1);
                for (var i = 0; i < e.length; i++)
                    if (this.GetEventEndDate(e[i]) <= t.start_date) return t.$sorder = e[i].$sorder, e.splice(i, 1), t.$inner = !0, !0;
                return !1
            }, e.prototype.SetPosition = function (t, e) {
                for (var i = this.List.getFirstId() * this.List.type.height, n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.$count = t.max_count;
                    var a = Math.floor(this.List.$width / r.$count);
                    r.$left = r.$sorder * a, r.$inner || (a *= r.$count - r.$sorder), r.$width = a - 8;
                    var o = ce(this.Day, webix.Date.add(this.Day, 1, "day", !0))(r),
                        s = 60 * o.start_date.getHours() + o.start_date.getMinutes(),
                        c = 60 * o.end_date.getHours() + o.end_date.getMinutes() || 1440;
                    r.$top = Math.round(s * this.List.type.height / 60) - i, r.$height = Math.max(this.minEventHeight, (c - s) * this.List.type.height / 60)
                }
            }, e.prototype.ToHTML = function (t) {
                var e = this.EventTemplate(t);
                return this.EventTemplateStart(t) + e + "</div>"
            }, e.prototype.GetEventEndDate = function (t) {
                var e = t.end_date;
                return (t.end_date - t.start_date) / 6e4 * this.List.type.height / 60 < this.minEventHeight && (e = webix.Date.add(t.start_date, Math.ceil(this.minEventHeight / this.List.type.height * 60), "minute", !0)), e
            }, e.prototype.EventTemplateStart = function (t) {
                var e = 'class="webix_scheduler_day_event ' + (!this.State.selected || t.id != this.State.selected.id && t.id != this.State.selected.date ? "" : "webix_scheduler_event_selected") + '"';
                return "<div webix_e_id='" + t.id + "' " + e + " style='left:" + t.$left + "px; top:" + t.$top + "px; width:" + t.$width + "px; height:" + t.$height + "px; " + re(t) + "'>"
            }, e.prototype.EventTemplate = function (t) {
                var e = this.app.getService("locale")._,
                    i = this.State.readonly ? "" : "<div class='webix_icon webix_scheduler_resizer' webix_resizer='true'></div>";
                return '<div class="webix_scheduler_inner_day"><span class="webix_scheduler_event_name">' + (t.text || e("(No title)")) + '</span><div class="webix_scheduler_event_time">' + webix.i18n.timeFormatStr(t.start_date) + " - " + webix.i18n.timeFormatStr(t.end_date) + "</div></div>" + i
            }, e.prototype.ShowEvent = function (t) {
                var e = Pe(t, this.List.$view);
                if (e.id && "0" != e.id) {
                    var i = this.GetEvent(e.id),
                        n = webix.extend(e, mt(i), !0);
                    this.State.selected = n
                }
                return !1
            }, e.prototype.GetTargetDate = function (t) {
                var e = webix.Date.copy(this.Day || this.State.date);
                return t && e.setHours(t), e
            }, e.prototype.ShowNew = function (t) {
                var e = this.State;
                e.readonly || e.clipboard || (e.selected = {
                    id: "0",
                    date: this.GetTargetDate(t)
                })
            }, e.prototype.UpdateSelection = function (t, e) {
                this.State.selected && (e.id = t, this.State.selected = mt(e))
            }, e
        }(ve),
        Je = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var e = this,
                    i = t.prototype.config.call(this);
                return i.cols[1] = {
                    view: "list",
                    localId: "multiDayList",
                    autoheight: !0,
                    scroll: !1,
                    css: "webix_scheduler_multilist",
                    type: {
                        height: 36,
                        template: function (t, i) {
                            return e.EventTemplate(t, i)
                        }
                    },
                    onClick: {
                        webix_scheduler_multiday_event: function (t, i, n) {
                            return e.ShowEvent(i, n)
                        }
                    }
                }, i
            }, e.prototype.init = function () {
                var e = this;
                this.State = this.app.getState(), t.prototype.init.call(this), this._DataObj = this.List.$view.firstChild, be(this, "multi", !0), this.MoreIcon = this.$$("more"), this._moreBtn = {
                    id: "$wsh_multi_more",
                    $css: "webix_scheduler_multi_more"
                }, this.on(this.$$("multiDayList"), "onAfterRender", (function () {
                    e.app.callEvent("events:rendered", [])
                })), this.app.config.copypaste && !webix.env.mobile && (At(this), Jt(this, this.List, {
                    multi: !0
                }))
            }, e.prototype.urlChange = function () {
                var t = this.getParam("data");
                t && (this.LimitData(t.multi), this.List.clearAll(), this.List.parse(t.multi))
            }, e.prototype.EventTemplate = function (t, e) {
                var i = e.height - 8,
                    n = "height:" + i + "px; line-height:" + i + "px; width:calc(100% - 5px);",
                    r = "$wsh_multi_more" !== t.id ? re(t) : "",
                    a = this.GetStyle(t),
                    o = this.app.getService("locale")._;
                return '\n\t\t\t<div\n\t\t\t\tclass="' + a + '"\n\t\t\t\tstyle="' + n + " " + r + '">\n\t\t\t\t\t' + (t.text || o("(No title)")) + "\n\t\t\t</div>\n\t\t"
            }, e.prototype.GetStyle = function (t) {
                var e = "webix_scheduler_multiday_event";
                if ("$wsh_multi_more" == t.id) return e;
                var i = this.State.date,
                    n = t.all_day || webix.Date.timePart(t.end_date) ? t.end_date : webix.Date.add(t.end_date, -1, "day", !0);
                return e += !this.State.selected || t.id != this.State.selected.id && t.id != this.State.selected.date ? "" : " webix_scheduler_event_selected", t.start_date < i && (e += " webix_scheduler_event_break_left"), n >= webix.Date.add(i, 1, "day", !0) && (e += " webix_scheduler_event_break_right"), e
            }, e.prototype.LimitData = function (t) {
                if (t.length > this.maxVisibleLines) {
                    var e = t.length - 2,
                        i = this.app.getService("locale")._;
                    this._moreBtn.text = e + " " + i("more"), "down" === this._expandState ? this._reserve = t.splice(2, e, this._moreBtn) : this._reserve = t.slice(2), this.SetMoreIcon(this._expandState), this._reserveIds = this._reserve.map((function (t) {
                        return t.id
                    }))
                } else this.SetMoreIcon()
            }, e.prototype.WrapData = function () {
                var t = this;
                if (!this._inAnimation) {
                    this._inAnimation = !0, this._expandState = "down";
                    var e = this.List.$height - (this._reserveIds.length - 1) * this.List.type.height;
                    this.Animate("down", e, (function () {
                        t.List.add(t._moreBtn), t.List.remove(t._reserveIds)
                    }))
                }
            }, e.prototype.ExpandData = function () {
                this._inAnimation || (this._inAnimation = !0, this._expandState = "up", this.Animate("up"), this.List.remove("$wsh_multi_more"), this.List.parse(this._reserve))
            }, e.prototype.Animate = function (t, e, i) {
                var n = this;
                this.List.$view.style.transition = "height 150ms", e && (this.List.$view.style.height = e + "px"), setTimeout((function () {
                    i && i(), n.List.$view.style.transition = "", n._inAnimation = !1, n.SetMoreIcon(t)
                }), 150)
            }, e.prototype.SetMoreIcon = function (t) {
                if (t) {
                    this._expandState = t;
                    var e = "up" === t ? "Collapse" : "Expand",
                        i = this.app.getService("locale")._;
                    this.MoreIcon.setHTML('<div class="webix_scheduler_more_icon webix_icon wxi-angle-' + t + '" webix_tooltip="' + i(e + " all-day events") + '"><div>')
                } else this.MoreIcon.setHTML("")
            }, e.prototype.ShowEvent = function (t, e) {
                if ("$wsh_multi_more" === t) this.ExpandData();
                else {
                    var i = mt(this.List.getItem(t));
                    i.node = e, this.State.selected = i
                }
                return !1
            }, e.prototype.GetEvent = function (t) {
                return this.List.getItem(t)
            }, e.prototype.GetTargetDate = function () {
                return this.State.date
            }, e
        }(ge),
        Ze = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                return {
                    css: "webix_scheduler_day",
                    rows: [{
                        view: "template",
                        localId: "header",
                        css: "webix_scheduler_day_header",
                        height: 32,
                        template: function (t) {
                            return t.date ? webix.Date.dateToStr("%l")(t.date) : ""
                        }
                    }, {
                        localId: "multi",
                        hidden: !0,
                        cols: [Je]
                    }, {
                        localId: "scroll",
                        view: "scrollview",
                        css: "webix_scheduler_day_scroll",
                        body: {
                            cols: [ve, Qe]
                        }
                    }]
                }
            }, e.prototype.init = function () {
                var t = this,
                    e = this.app.getState();
                this.on(e.$changes, "date", (function (e) {
                    return t.RefreshData(e)
                })), this.on(e.$changes, "active", (function () {
                    return t.RefreshData(e.date)
                })), this.on(this.app, "events:refresh", (function () {
                    return t.RefreshData(e.date)
                }));
                var i = this.app.getService("local").events(!0);
                this.on(i.data, "onStoreUpdated", (function (i, n, r) {
                    return r && t.RefreshData(e.date)
                })), this.on(e.$changes, "selected", (function (i) {
                    i && !e.clipboard && t.ScrollScale(i)
                }))
            }, e.prototype.RefreshData = function (t) {
                var e = this;
                this.$$("header").setValues({
                    date: t
                }), this.GetDay(t).then((function (t) {
                    e.app && e.setParam("data", t, !0), t.multi.length ? e.$$("multi").show() : e.$$("multi").hide()
                }))
            }, e.prototype.GetDay = function (t) {
                var e = webix.Date.add(t, 1, "day", !0);
                return this.app.getService("local").getEvents(t, e).then((function (t) {
                    var e = [],
                        i = [];
                    return t.forEach((function (t) {
                        le(t) ? e.push(t) : i.push(t)
                    })), {
                        multi: e,
                        single: i
                    }
                }))
            }, e.prototype.ScrollScale = function (t) {
                var e = this;
                "0" !== t.id || t.date || setTimeout((function () {
                    var t = 40 * ((new Date).getHours() + 2);
                    e.$$("scroll").scrollTo(0, t)
                }), 100)
            }, e
        }(u),
        ti = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = this;
                return this.Events = {}, {
                    view: "calendar",
                    localId: "calendar",
                    events: function (e, i) {
                        return t.MarkEvent(e, i)
                    },
                    icons: !1,
                    navigation: !1,
                    monthHeader: !1,
                    skipEmptyWeeks: !0,
                    width: 0,
                    height: 410
                }
            }, e.prototype.init = function () {
                var t = this;
                this.Calendar = this.getRoot(), this.Calendar.attachEvent("onAfterDateSelect", (function (e) {
                    t.app.getState().date = webix.Date.dayStart(e)
                }))
            }, e.prototype.urlChange = function () {
                this.data = this.getParam("data"), this.data && this.RefreshData()
            }, e.prototype.RefreshData = function () {
                var t = this.data,
                    e = t.start,
                    i = t.weeks,
                    n = t.data,
                    r = webix.Date.add(e, i, "week", !0);
                for (this.Events = {}; e < r;) {
                    for (var a = webix.Date.add(e, 1, "day", !0), o = 0; o < n.length; o++)(n[o].all_day ? n[o].end_date >= e : n[o].end_date > e) && n[o].start_date < a && (this.Events[e.valueOf()] = !0);
                    e = a
                }
                this.Calendar.setValue(this.app.getState().date)
            }, e.prototype.MarkEvent = function (t, e) {
                var i = "";
                return e || (i += webix.Date.isHoliday(t) || ""), this.Events[t.valueOf()] && (i += " webix_cal_day_with_event"), i
            }, e
        }(u),
        ei = function (t) {
            function e(e, i) {
                var n = t.call(this, e) || this;
                return n.Events = i.events, n
            }
            return i(e, t), e.prototype.config = function () {
                var t = this,
                    e = this.app.getService("locale")._;
                return {
                    view: "popup",
                    width: 266,
                    padding: 8,
                    minHeight: 70,
                    relative: "right",
                    body: {
                        view: "list",
                        css: "webix_scheduler_more_list",
                        borderless: !0,
                        autoheight: !0,
                        yCount: 3,
                        tooltip: {
                            template: ""
                        },
                        onClick: {
                            webix_scheduler_month_event: function (e, i) {
                                return t.ShowEvent(i)
                            },
                            webix_scheduler_month_event_single: function (e, i) {
                                return t.ShowEvent(i)
                            }
                        },
                        type: {
                            height: 56,
                            template: function (i, n) {
                                return t.MoreTemplate(i, n, e)
                            }
                        }
                    }
                }
            }, e.prototype.init = function (t) {
                this.Win = t, At(this), Ae.call(this, t.getBody(), "more", !0)
            }, e.prototype.MoreTemplate = function (t, e, i) {
                var n = webix.i18n,
                    r = !ue(t.start_date, t.all_day ? webix.Date.add(t.end_date, 1, "day", !0) : t.end_date),
                    a = r ? "" : re(t),
                    o = !r && this.webix.Date.equal(t.start_date, t.end_date);
                return '\n\t\t\t<div\n\t\t\t\tclass="webix_scheduler_month_event' + (r ? "_single" : "") + '"\n\t\t\t\tstyle="' + a + '"\n\t\t\t>\n\t\t\t\t' + (r ? ie(t) : "") + '\n\t\t\t\t<div webix_tooltip="' + t.text + '" class="webix_event_text">' + (t.text || i("(No title)")) + '</div>\n\t\t\t\t<div class="webix_event_time">\n\t\t\t\t\t' + this.DayFormatStr(t.start_date) + "\n\t\t\t\t\t" + (o ? "" : n.timeFormatStr(t.start_date) + " -\n\t\t\t\t\t\t" + (r ? "" : " " + this.DayFormatStr(t.end_date)) + "\n\t\t\t\t\t\t" + n.timeFormatStr(t.end_date)) + "\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t"
            }, e.prototype.DayFormatStr = function (t) {
                return webix.Date.dateToStr("%F %j")(t)
            }, e.prototype.ShowEvent = function (t) {
                var e = this.Events.getItem(t);
                this.app.getState().selected = mt(e), this.HideWindow()
            }, e.prototype.ShowWindow = function (t, e, i) {
                var n = this;
                if (this.ID === t && this.Win.isVisible()) return this.Win.hide();
                this.ID = t, i = i.map((function (t) {
                    return n.Events.getItem(t)
                }));
                var r = this.Win.getBody();
                r.clearAll(), r.parse(i), this.Win.show(e)
            }, e.prototype.HideWindow = function () {
                this.Win.hide()
            }, e
        }(u),
        ii = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = this;
                return {
                    view: "dataview",
                    css: "webix_scheduler_calendar",
                    prerender: !0,
                    xCount: 7,
                    yCount: 5,
                    width: 0,
                    height: 0,
                    scroll: !1,
                    tooltip: {
                        template: ""
                    },
                    onClick: {
                        webix_cal_date: function (e, i) {
                            return t.ShowDay(i)
                        },
                        webix_scheduler_month_event: function (e) {
                            return t.ShowEvent(e)
                        },
                        webix_scheduler_month_event_single: function (e) {
                            return t.ShowEvent(e)
                        },
                        webix_scheduler_more: function (e, i) {
                            return t.ShowMore(i)
                        }
                    },
                    onDblClick: {
                        webix_cal_day: function (e, i) {
                            return t.ShowNew(i)
                        }
                    },
                    type: {
                        height: "auto",
                        width: "auto",
                        template: function (e, i) {
                            return t.CalendarTemplate(e, i)
                        },
                        templateStart: se,
                        headerHeight: 32,
                        eventHeight: 28,
                        padding: 8
                    }
                }
            }, e.prototype.init = function (t) {
                var e = this;
                this.State = this.app.getState(), this.Calendar = t, t.type.master = this.Calendar, be(this, "month"), At(this), this.Events = new webix.DataCollection({}), this.MoreWindow = this.ui(new(this.app.dynamic(ei))(this.app, {
                    events: this.Events
                })), t.attachEvent("onAfterRender", (function () {
                    return e.RenderEvents()
                })), Ae.call(this, this.Calendar, "month"), this.app.config.copypaste && !webix.env.mobile && Jt(this, t)
            }, e.prototype.urlChange = function () {
                this.data = this.getParam("data", !0), this.data && this.RefreshData()
            }, e.prototype.CalendarTemplate = function (t) {
                var e = this.app.getService("locale")._,
                    i = '<span class="webix_cal_date">' + t.date.getDate() + "</span>";
                return t.$more && t.$more.length && (i += '<div class="webix_scheduler_more">' + t.$more.length + " " + e("more") + "</div>"), i
            }, e.prototype.GetDayCss = function (t, e) {
                var i = "webix_cal_day";
                return he(t) && (i += " webix_cal_today"), t.getMonth() != e ? i += " webix_cal_outside" : i += " " + (webix.Date.isHoliday(t) || ""), i
            }, e.prototype.GetMonthData = function () {
                for (var t = [], e = this.data, i = e.start, n = e.weeks, r = webix.Date.add(i, 1, "week", !0).getMonth(), a = webix.Date.copy(i), o = 0; o < 7 * n; o++) {
                    var s = {
                        date: webix.Date.copy(a),
                        $css: this.GetDayCss(a, r)
                    };
                    (o + 1) % 7 == 0 && (s.right = !0), o >= 7 * (n - 1) && (s.bottom = !0), t.push(s), webix.Date.add(a, 1, "day")
                }
                return t
            }, e.prototype.RenderEvents = function () {
                if (this.Events.count() && this.Calendar.count()) {
                    var t = webix.html.create("div", {
                            role: "presentation",
                            class: "webix_scheduler_month_events"
                        }),
                        e = this.data.start,
                        i = this.Calendar.type,
                        n = Math.floor((i.height - i.headerHeight + i.padding - 2) / (i.eventHeight + i.padding)),
                        r = webix.Date.copy(e),
                        a = webix.Date.add(r, 1, "week", !0),
                        o = "",
                        s = {},
                        c = this.GetTargetDate(this.Calendar.getLastId()),
                        h = this.GetTargetDate(this.Calendar.getFirstId());
                    this.Calendar.data.each((function (t, e) {
                        t.date >= a && (s = {}, r = a, a = webix.Date.add(r, 1, "week", !0));
                        var i = [],
                            l = [];
                        this.Events.data.each((function (o) {
                            var u = o.id;
                            if (!(o.start_date >= a || o.end_date < r || !o.all_day && webix.Date.equal(o.end_date, r)))
                                if (webix.isUndefined(s[u])) {
                                    if (o.start_date < webix.Date.add(t.date, 1, "day", !0) && o.end_date >= t.date) {
                                        for (var d = 0; !webix.isUndefined(l[d]);) d++;
                                        if (s[u] = d, d >= n) return i.push(u);
                                        var p = {
                                            ms: h,
                                            me: c
                                        };
                                        p.single = !ue(o.start_date, o.all_day ? webix.Date.add(o.end_date, 1, "day", !0) : o.end_date), p.length = 1, p.single || (p.es = o.start_date, p.ee = o.all_day || webix.Date.timePart(o.end_date) ? o.end_date : webix.Date.add(o.end_date, -1, "day", !0), p.length += ue(p.ls = new Date(Math.max(r, p.es)), p.le = new Date(Math.min(a - 1, p.ee)))), p.index = e, l[d] = this.ToHTML(o, d, p)
                                    }
                                } else t.date <= o.end_date && o.all_day || t.date < o.end_date ? s[u] >= n ? i.push(u) : l[s[u]] = "" : delete s[u]
                        }), this);
                        var u = t.$more && t.$more.length;
                        t.$more = i, u != i.length && this.Calendar.render(t.id, t, "paint"), o += l.join("")
                    }), this), t.innerHTML = o, this._DataObj = this.Calendar.$view.firstChild.appendChild(t), this.app.callEvent("events:rendered", [])
                }
            }, e.prototype.ToHTML = function (t, e, i) {
                var n = this.Calendar.type,
                    r = i.single ? "" : re(t),
                    a = i.length * n.width - n.padding,
                    o = n.eventHeight,
                    s = this.GetPosition(n, e, i.index),
                    c = "";
                i.single && (c = ie(t) + '<span class="webix_event_time">' + webix.i18n.timeFormatStr(t.start_date) + "</span>");
                var h = this.GetStyle(t, i),
                    l = this.app.getService("locale")._;
                return '\n\t\t\t<div\n\t\t\t\twebix_tooltip="' + t.text + '"\n\t\t\t\twebix_e_id="' + t.id + '"\n\t\t\t\tclass="' + h + '"\n\t\t\t\tstyle="height:' + o + "px;line-height:" + o + "px; width:" + a + "px; " + (s + r) + '">\n\t\t\t\t\t' + (c + (t.text || l("(No title)"))) + "\n\t\t\t</div>\n\t\t"
            }, e.prototype.GetStyle = function (t, e) {
                var i = "webix_scheduler_month_event" + (e.single ? "_single" : "");
                return i += !this.State.selected || t.id != this.State.selected.id && t.id != this.State.selected.date ? "" : " webix_scheduler_event_selected", e.single || (e.es < e.ms && webix.Date.equal(e.ms, webix.Date.dayStart(e.ls)) ? i += " webix_scheduler_event_break_left" : e.ee >= webix.Date.add(e.me, 1, "day", !0) && webix.Date.equal(e.me, webix.Date.dayStart(e.le)) && (i += " webix_scheduler_event_break_right")), i
            }, e.prototype.GetPosition = function (t, e, i) {
                var n = Math.floor(i / this.Calendar.config.xCount),
                    r = i % this.Calendar.config.xCount;
                return "\n\t\t\ttop:" + (n * t.height + t.headerHeight + e * (t.eventHeight + t.padding)) + "px;\n\t\t\tleft:" + r * t.width + "px;\n\t\t"
            }, e.prototype.RefreshData = function () {
                var t = this.data,
                    e = t.data,
                    i = t.weeks;
                this.Events.clearAll(), this.Events.parse(e), this.Events.sort((function (t, e) {
                    var i = webix.Date.dayStart(t.start_date),
                        n = webix.Date.dayStart(e.start_date);
                    if (webix.Date.equal(i, n)) {
                        var r = ue(t.start_date, t.end_date);
                        return ue(e.start_date, e.end_date) - r || t.start_date - e.start_date
                    }
                    return i - n
                }));
                var n = this.GetMonthData();
                this.Calendar.clearAll(), this.Calendar.config.yCount != i && (this.Calendar.define("yCount", i), this.Calendar.resize()), this.Calendar.parse(n)
            }, e.prototype.ShowMore = function (t) {
                return this.MoreWindow.ShowWindow(t, this.Calendar.getItemNode(t), this.Calendar.getItem(t).$more || []), !1
            }, e.prototype.ShowEvent = function (t) {
                var e = Pe(t, this.Calendar.$view);
                if (e.id && "0" != e.id) {
                    var i = this.Events.getItem(e.id),
                        n = webix.extend(e, mt(i), !0);
                    this.State.selected = n
                }
                return !1
            }, e.prototype.ShowNew = function (t) {
                var e = this.State;
                if (!e.readonly && !e.clipboard) {
                    var i = this.GetTargetDate(t);
                    e.selected = {
                        id: "0",
                        date: i
                    }
                }
            }, e.prototype.ShowDay = function (t) {
                return this.app.getState().$batch({
                    date: this.GetTargetDate(t),
                    mode: "day"
                }), !1
            }, e.prototype.GetTargetDate = function (t) {
                return t ? this.Calendar.getItem(t).date : this.State.date
            }, e.prototype.GetEvent = function (t) {
                return this.Events.getItem(t)
            }, e.prototype.UpdateSelection = function (t, e) {
                this.State.selected && (e.id = t, this.State.selected = mt(e))
            }, e
        }(u),
        ni = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                return {
                    view: "dataview",
                    css: "webix_scheduler_calendar_header",
                    xCount: 7,
                    yCount: 1,
                    width: 0,
                    height: 32,
                    scroll: !1,
                    type: {
                        height: "auto",
                        width: "auto",
                        templateStart: se
                    }
                }
            }, e.prototype.init = function (t) {
                t.type.master = t, t.parse(this.GetHeaderData())
            }, e.prototype.GetHeaderData = function () {
                for (var t = [], e = webix.Date.startOnMonday ? 1 : 0, i = 0; i < 7; i++) t.push({
                    value: webix.i18n.calendar.dayShort[(e + i) % 7]
                });
                return t[t.length - 1].right = !0, t
            }, e
        }(u),
        ri = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = this;
                return {
                    view: "list",
                    type: {
                        height: 50,
                        template: ne(this.app.getService("locale")._),
                        timeStart: function (e) {
                            return t.TimeStart(e)
                        }
                    },
                    on: {
                        onItemClick: function (e) {
                            return t.ShowEvent(e)
                        }
                    }
                }
            }, e.prototype.init = function () {
                this.List = this.getRoot(), this.State = this.app.getState(), webix.extend(this.List, webix.OverlayBox)
            }, e.prototype.urlChange = function () {
                this.data = this.getParam("data"), this.data && this.RefreshData()
            }, e.prototype.RefreshData = function () {
                var t = this,
                    e = webix.Date.datePart(this.State.date, !0),
                    i = webix.Date.add(e, 1, "day", !0);
                this.app.getService("local").getEvents(e, i).then((function (n) {
                    t.List.clearAll(), t.List.parse(n.map(ce(e, i))), t.ToggleOverlay()
                }))
            }, e.prototype.ToggleOverlay = function () {
                if (this.List.count()) this.List.hideOverlay();
                else {
                    var t = this.app.getService("locale")._;
                    this.List.showOverlay(t("No Events"))
                }
            }, e.prototype.ShowEvent = function (t) {
                var e = this.List.getItem(t);
                this.State.selected = mt(e)
            }, e.prototype.TimeStart = function (t) {
                var e = this.app.getService("locale")._;
                return le(t) ? e("All Day") : ae(t.start_date, t.end_date)
            }, e
        }(u),
        ai = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                return {
                    rows: this.getParam("compact", !0) ? [ti, ri] : [ni, ii]
                }
            }, e.prototype.init = function () {
                var t = this;
                this.Data = this.app.getService("local");
                var e = this.app.getState();
                this.on(e.$changes, "date", (function (e) {
                    return t.RefreshData(e)
                })), this.on(e.$changes, "active", (function () {
                    return t.RefreshData(e.date)
                })), this.on(this.app, "events:refresh", (function () {
                    return t.RefreshData(e.date)
                }));
                var i = this.app.getService("local").events(!0);
                this.on(i.data, "onStoreUpdated", (function (i, n, r) {
                    return r && t.RefreshData(e.date)
                }))
            }, e.prototype.RefreshData = function (t) {
                var e = this,
                    i = webix.Date.monthStart(t),
                    n = webix.Date.add(i, 1, "month", !0);
                i = webix.Date.weekStart(new Date(i.getFullYear(), i.getMonth(), 1));
                var r = Math.ceil((n - i) / 864e5 / 7);
                n = webix.Date.add(i, r, "week", !0), this.Data.getEvents(i, n).then((function (t) {
                    e.app && e.setParam("data", {
                        start: i,
                        weeks: r,
                        data: t
                    }, !0)
                }))
            }, e
        }(u),
        oi = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = webix.skin.$active,
                    e = this.app.getService("locale")._,
                    i = this.getParam("state", !0);
                return {
                    view: "toolbar",
                    height: t.barHeight,
                    elements: [{}, {
                        view: "richselect",
                        label: e("Timeline scale"),
                        labelWidth: 120,
                        width: 260,
                        value: i.timelineMode,
                        options: [{
                            id: "day",
                            value: e("Day")
                        }, {
                            id: "week",
                            value: e("Week")
                        }, {
                            id: "month",
                            value: e("Month")
                        }],
                        on: {
                            onChange: function (t) {
                                i.timelineMode = t
                            }
                        }
                    }]
                }
            }, e
        }(u),
        si = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var e = t.prototype.config.call(this);
                return e.width = 360, e.relative = "bottom", e
            }, e.prototype.init = function (t) {
                this.Win = t, At(this), Ae.call(this, t.getBody(), "timelineMore", !0)
            }, e.prototype.ShowWindow = function (t, e, i) {
                var n = this;
                if (this.ID === t && this.Win.isVisible()) return this.Win.hide();
                this.ID = t, i = i.map((function (t) {
                    return n.Events.getItem(t)
                }));
                var r = this.Win.getBody();
                r.clearAll(), r.parse(i), this.Win.show(e, {
                    x: e.clientWidth
                })
            }, e
        }(ei),
        ci = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = this,
                    e = this.GetSectionHeight();
                return {
                    cols: [{
                        view: "treetable",
                        localId: "sections",
                        css: "webix_scheduler_timeline_sections",
                        width: this.getParam("compact", !0) ? 80 : 200,
                        header: !1,
                        scroll: "y",
                        rowHeight: e,
                        scrollAlignY: !1,
                        columns: [{
                            id: "text",
                            header: "",
                            fillspace: !0
                        }]
                    }, {
                        view: "list",
                        localId: "list",
                        type: {
                            height: e,
                            template: ""
                        },
                        css: "webix_scheduler_timeline" + (webix.env.touch ? "_touch" : "") + "_bars",
                        onClick: {
                            webix_scheduler_timeline_event: function (e) {
                                return t.ShowEvent(e)
                            }
                        },
                        onDblClick: {
                            webix_list_item: function (e, i) {
                                return t.ShowNew(e, i)
                            }
                        },
                        tooltip: {
                            template: ""
                        },
                        scroll: "xy"
                    }]
                }
            }, e.prototype.init = function () {
                var t = this;
                this.Tree = this.$$("sections"), this.Bars = this.$$("list"), this.State = this.getParam("state", !0), this.InnerState = this.getParam("innerState", !0), this.Data = this.app.getService("local"), this.Events = new webix.DataCollection({
                    scheme: {
                        $change: function (e) {
                            return t.RefreshTask(e.id)
                        }
                    }
                }), this.MoreWindow = this.ui(new(this.app.dynamic(si))(this.app, {
                    events: this.Events
                })), be(this, "month"), At(this), this._sectionsReady = this.Data.sections().then((function (e) {
                    t.Sections = e, t.Tree.parse(e), t.Bars.parse(e)
                })), this.HandleScroll();
                var e = this.app.getService("local").events(!0);
                this.on(e.data, "onStoreUpdated", (function (e, i, n) {
                    return n && t.RefreshData()
                })), this.on(this.app, "events:refresh", (function () {
                    return t.RefreshData()
                })), this.on(this.State.$changes, "active", (function (e, i) {
                    return i && t.RefreshData()
                })), Ae.call(this, this.Bars, "timeline"), this._mousemove_handler = webix.event(this.Bars.$view, "pointermove", (function (e) {
                    "mouse" == e.pointerType && function (t, e) {
                        if (!webix.DragControl.active) {
                            var i = Pe(t, e),
                                n = i.id,
                                r = i.node;
                            if (n) {
                                var a = qe(r, t.clientX);
                                r.style.cursor = "move" == a ? "pointer" : "ew-resize"
                            }
                        }
                    }(e, t.Bars.$view)
                }));
                var i = this.getParam("compact", !0);
                !this.app.config.copypaste || webix.env.mobile || i || Jt(this, this.Bars)
            }, e.prototype.urlChange = function () {
                var t = this.Scales = this.getParam("scales", !0);
                this.DrawGrid(t), this.RefreshData(t)
            }, e.prototype.GetSectionHeight = function () {
                var t = webix.skin.$active;
                return this._sectionSize = 5, (t.barHeight - 2 * t.borderWidth) * this._sectionSize
            }, e.prototype.RefreshData = function (t) {
                var e = this;
                t || (t = this.Scales), webix.promise.all([this._sectionsReady, this.Data.getEvents(t.start, t.end)]).then((function (t) {
                    e.ClearCollections(), e.Events.parse(t[1]), e.RenderEvents()
                }))
            }, e.prototype.ClearCollections = function () {
                this.Events.clearAll(), this._processed = [], this._lastRow = {}, this._moreEvents = {}
            }, e.prototype.RefreshTask = function (t) {
                var e = this,
                    i = this.GetEvent(t),
                    n = function (t, e) {
                        for (var i = 0; i < t.length; ++i)
                            if (t[i] == e) return i;
                        return -1
                    }(this.Sections.data.order, i.section);
                if (-1 != n) {
                    var r = this.State.timelineMode,
                        a = this.GetUnitCount(r);
                    "day" === r && "week" === r || (a = this.GetUnitCount(a));
                    var o, s = this._processed.find((function (t) {
                        if (t.section == i.section) {
                            if ("day" === r) return e.CheckDates(t.end_date, i.start_date, t.all_day);
                            var n = webix.Date.timePart(t.end_date) ? e.GetUnitStart(a, webix.Date.add(t.end_date, 1, a, !0)) : t.end_date,
                                o = e.GetUnitStart(a, i.start_date);
                            return e.CheckDates(n, o, t.all_day)
                        }
                        return !1
                    }));
                    s ? (o = s.$y, this._processed.splice(this._processed.findIndex((function (t) {
                        return s.id == t.id
                    })), 1)) : (webix.isUndefined(this._lastRow[i.section]) ? this._lastRow[i.section] = 0 : this._lastRow[i.section]++, this._lastRow[i.section] >= this._sectionSize - 1 ? i.$more = !0 : i.$more = !1), this.UpdateTask(i, n, o), this._processed.push(i), this._processed.sort((function (t, e) {
                        return t.$y - e.$y
                    }))
                } else i.$hide = !0
            }, e.prototype.CheckDates = function (t, e, i) {
                return (i ? webix.Date.add(t, 1, "day", !0) : t) <= e
            }, e.prototype.RenderEvents = function () {
                var t = this;
                if (this._DataObj && (this.Bars.$view.firstChild.removeChild(this._DataObj), delete this._DataObj), this.Events.count() && this.Bars.count()) {
                    var e = webix.html.create("div", {
                            role: "presentation"
                        }),
                        i = "",
                        n = this.app.getService("locale")._;
                    this.Events.data.each((function (e) {
                        e.$hide || (e.$more && 4 != t._lastRow[e.section] ? (t._moreEvents[e.section] || (t._moreEvents[e.section] = [], i += t.MoreBarTemplate(e, n)), t._moreEvents[e.section].push(e.id)) : i += t.BarsTemplate(e, n))
                    })), e.innerHTML = i, this._DataObj = this.Bars.$view.firstChild.appendChild(e), this.app.callEvent("events:rendered", [])
                }
            }, e.prototype.DrawGrid = function (t) {
                var e = this.Bars;
                e.$view.style.backgroundImage = "url(" + this.GetGrid(t, {
                    contrast: "#808080",
                    dark: "#384047"
                } [webix.skin.$name] || "#ddd") + ")", e.$view.style.marginTop = "0px", e.$view.style.backgroundPosition = "-" + this.InnerState.left + "px -" + this.InnerState.top + "px", this.Resize(t.width)
            }, e.prototype.Resize = function (t) {
                var e = this.Bars.$view.querySelector(".webix_scroll_cont");
                e.style.width = t + "px", e.style.minHeight = "1px"
            }, e.prototype.HandleScroll = function () {
                var t = this;
                this.InnerState = this.getParam("innerState", !0), this._scroll_handler = webix.event(this.Bars.$view, "scroll", (function (e) {
                    var i = e.target,
                        n = Math.round(i.scrollTop),
                        r = Math.round(i.scrollLeft);
                    t.Bars.$view.style.backgroundPosition = "-" + r + "px -" + n + "px", t.InnerState.$batch({
                        top: n,
                        left: r
                    }), t.Tree.scrollTo(0, n), t.MoreWindow.HideWindow()
                })), this.on(this.Tree, "onScrollY", (function () {
                    var t = this.getScrollState().y;
                    this.$scope.Bars.scrollTo(this.$scope.InnerState.left, t)
                }))
            }, e.prototype.BarsTemplate = function (t, e) {
                var i = re(t),
                    n = this.Scales,
                    r = t.$w - 2;
                t.all_day && t.end_date < n.end && (r += this.GetUnitWidth(n, t.start_date));
                var a = '<div class="webix_scheduler_timeline_content">' + (t.text || e("(no title)")) + "</div>",
                    o = "webix_scheduler_timeline_event";
                o += !this.State.selected || t.id != this.State.selected.id && t.id != this.State.selected.date ? "" : " webix_scheduler_event_selected", t.start_date < this.Scales.start ? o += " webix_scheduler_event_break_left" : t.end_date > this.Scales.end && (o += " webix_scheduler_event_break_right");
                var s = this.GetTooltip(t);
                return '<div webix_e_id="' + t.id + '" \n\t\t\twebix_tooltip="' + s + '" class="' + o + '" \n\t\t\tstyle="left:' + t.$x + "px;top:" + t.$y + "px;width:" + r + "px;height:" + t.$h + "px;" + i + '">\n\t\t\t' + a + "\n\t\t</div>"
            }, e.prototype.GetTooltip = function (t) {
                return t.text
            }, e.prototype.MoreBarTemplate = function (t, e) {
                var i = e("Show more"),
                    n = '<div class="webix_scheduler_timeline_content" webix_tooltip="' + i + '">' + i + "</div>";
                return '<div webix_e_id="$wsh_multi_more" webix_r_id="' + t.section + '" class="webix_scheduler_timeline_event webix_scheduler_multi_more" style="left:0px;top:' + t.$y + "px;width:100%;height:" + t.$h + 'px;">\n\t\t\t' + n + "\n\t\t</div>"
            }, e.prototype.ShowEvent = function (t) {
                var e = Pe(t, this.Bars.$view);
                if ("$wsh_multi_more" === e.id) {
                    var i = e.node.getAttribute("webix_r_id");
                    this.MoreWindow.ShowWindow(i, this.Tree.getItemNode(i), this._moreEvents[i] || [])
                } else if (e.id && "0" != e.id) {
                    var n = this.GetEvent(e.id),
                        r = webix.extend(e, mt(n), !0);
                    this.State.selected = r
                }
                return !1
            }, e.prototype.ShowNew = function (t, e) {
                var i = this.State;
                if (!i.readonly && !i.clipboard) {
                    var n = this.Scales,
                        r = n.start,
                        a = n.precise ? this.GetUnitCount(n.minUnit) : n.minUnit,
                        o = Math.floor(t.offsetX / this.GetUnitWidth(n)),
                        s = this.AddUnit(a, r, o);
                    i.selected = {
                        id: "0",
                        date: s,
                        section: e
                    }
                }
            }, e.prototype.GetEvent = function (t) {
                return this.Events.getItem(t)
            }, e.prototype.UpdateSelection = function (t, e) {
                this.State.selected && (e.id = t, this.State.selected = mt(e))
            }, e.prototype.GetTargetDate = function () {
                var t = this.mousePosUnit || 0,
                    e = this.Scales;
                return this.AddUnit(e.minUnit, e.start, t)
            }, e.prototype.GetUnitCount = function (t) {
                return ke[t][0]
            }, e.prototype.GetUnitStart = function (t, e) {
                return Ce(t, e)
            }, e.prototype.AddUnit = function (t, e, i) {
                return $e(t)(e, i)
            }, e.prototype.GetGrid = function (t, e) {
                return Ee(t.cellWidth, t.cellHeight, e)
            }, e.prototype.UpdateTask = function (t, e, i) {
                return Le(t, this._lastRow[t.section] + e * this._sectionSize, this.Scales, this.Scales.cellHeight - 12, i)
            }, e.prototype.GetUnitWidth = function (t, e) {
                if (t.precise && ("day" !== t.minUnit || "month" !== t.minUnit)) {
                    var i = ke[t.minUnit][1],
                        n = "number" == typeof i ? i : i(e);
                    return Math.floor(t.cellWidth / n)
                }
                return t.cellWidth
            }, e
        }(u);
    var hi = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                return {
                    cols: [{
                        width: this.getParam("compact", !0) ? 80 : 200,
                        css: "webix_scheduler_timeline_space",
                        borderless: !1
                    }, {
                        view: "template",
                        localId: "scale",
                        height: 20,
                        css: "webix_scheduler_timeline_scale"
                    }]
                }
            }, e.prototype.init = function () {
                var t = this.$$("scale"),
                    e = this.InnerState = this.getParam("innerState", !0);
                this.on(e.$changes, "left", (function (e) {
                    return t.scrollTo(e, null)
                }))
            }, e.prototype.urlChange = function () {
                this.RenderScales()
            }, e.prototype.RenderScales = function () {
                var t = this,
                    e = this.getParam("scales", !0),
                    i = this.$$("scale"),
                    n = e.rows.map((function (i) {
                        return '<div class="webix_scheduler_timeline_scale_row" style=\'height:' + i.height + "px;width:" + e.width + "px'>" + i.cells.map((function (e) {
                            return t.CellTemplate(e, i.type)
                        })).join("") + "</div>"
                    })).join("");
                i.config.height = e.height, i.setHTML(n), i.resize()
            }, e.prototype.CellTemplate = function (t) {
                return '<div class="' + ("webix_scheduler_timeline_scale_cell " + t.css) + '" style="width:' + t.width + 'px;">' + t.format(t.date) + "</div>"
            }, e.prototype.DateIsToday = function (t) {
                var e = webix.Date.dayStart(new Date);
                return webix.Date.equal(e, webix.Date.dayStart(t))
            }, e
        }(u),
        li = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                return {
                    rows: [oi, hi, ci]
                }
            }, e.prototype.init = function () {
                var t = this,
                    e = this.State = this.getParam("state", !0),
                    i = this.InnerState = B({
                        top: 0,
                        left: 0
                    });
                this.setParam("innerState", i, !0), this.on(e.$changes, "date", (function (i) {
                    return t.SetScales(i, e.timelineMode)
                })), this.on(e.$changes, "timelineMode", (function (i, n) {
                    n && t.SetScales(e.date, i)
                }))
            }, e.prototype.SetScales = function (t, e) {
                var i = this.ResetScales(e, t);
                this.setParam("scales", i, !0)
            }, e.prototype.GetScalesArray = function (t) {
                switch (t) {
                    case "day":
                        return [{
                            unit: "hour",
                            format: "%H:00"
                        }];
                    case "week":
                        return [{
                            unit: "day",
                            step: 1,
                            format: "%d"
                        }];
                    case "month":
                        return [{
                            unit: "week",
                            format: function (t) {
                                var e = webix.Date.dateToStr("%d %M"),
                                    i = webix.Date.weekStart(t),
                                    n = webix.Date.add(webix.Date.add(i, 1, "week", !0), -1, "day", !0);
                                return e(i) + " - " + e(n)
                            }
                        }];
                    default:
                        return [{
                            unit: this.GetDefaultScaleUnit(t),
                            format: function (t, e) {
                                var i = webix.Date.dateToStr("%d %M %YYYY");
                                return i(t) + " - " + i(e)
                            }
                        }]
                }
            }, e.prototype.GetScalesCellWidth = function (t) {
                switch (t) {
                    case "day":
                        return 80;
                    case "week":
                        return 300;
                    case "month":
                        return 400;
                    default:
                        return 100
                }
            }, e.prototype.GetScalePrecision = function (t) {
                switch (t) {
                    case "day":
                    case "week":
                        return !1;
                    case "month":
                    default:
                        return !0
                }
            }, e.prototype.AddUnit = function (t, e, i) {
                return $e(t)(e, i)
            }, e.prototype.GetUnitStart = function (t, e) {
                return Ce(t, e)
            }, e.prototype.ResetScales = function (t, e) {
                var i = this.GetUnitStart(t, e),
                    n = this.AddUnit(t, i, 1),
                    r = webix.skin.$active;
                return Te(i, n, this.GetScalePrecision(t), this.GetScalesCellWidth(t), r.barHeight - 2 * r.borderWidth, this.GetScalesArray(t))
            }, e.prototype.GetDefaultScaleUnit = function (t) {
                return ke[t][0] || t
            }, e
        }(u),
        ui = function (t) {
            function e(e, i) {
                var n = t.call(this, e) || this;
                return i && (n.Unit = i.unit), n
            }
            return i(e, t), e.prototype.config = function () {
                var t = this;
                return {
                    view: "list",
                    localId: "unitList",
                    css: "webix_scheduler_day_events",
                    scroll: !1,
                    autoheight: !0,
                    template: "",
                    type: {
                        height: 42,
                        css: "webix_scheduler_day_scale_item"
                    },
                    onClick: {
                        webix_scheduler_day_event: function (e) {
                            return t.ShowEvent(e)
                        }
                    },
                    onDblClick: {
                        webix_scheduler_day_scale_item: function (e, i) {
                            return t.ShowNew(i)
                        }
                    }
                }
            }, e.prototype.init = function () {
                var t = this;
                this.State = this.app.getState(), this.List = this.$$("unitList"), be(this, "scale"), At(this), this.List.$setSize = function (t, e) {
                    webix.ui.view.prototype.$setSize.call(this, t, e) && this.render()
                }, this.minEventHeight = 62, this.ParseHours(), this.on(this.State.$changes, "readonly", (function () {
                    return t.List.render()
                })), this.List.attachEvent("onAfterRender", (function () {
                    return t.RenderEvents()
                })), Ae.call(this, this.List, "units");
                var e = this.getParam("compact", !0);
                !this.app.config.copypaste || webix.env.mobile || e || Jt(this, this.List)
            }, e.prototype.FilterToday = function (e, i) {
                var n = this;
                return t.prototype.FilterToday.call(this, e, i).filter((function (t) {
                    if (t.units) {
                        var e = t.units.split(","),
                            i = n.Unit.id + "";
                        return -1 !== e.indexOf(i)
                    }
                    return !1
                }))
            }, e.prototype.ShowNew = function (t) {
                var e = this.State;
                if (!e.readonly && !e.clipboard) {
                    var i = webix.Date.copy(this.Day || e.date),
                        n = this.Unit.id;
                    i.setHours(t), e.selected = {
                        id: "0",
                        date: i,
                        unit: n
                    }
                }
            }, e
        }(Qe),
        di = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                return {
                    type: "clean",
                    cols: [{
                        borderless: !1,
                        width: 51
                    }, {
                        view: "dataview",
                        localId: "header",
                        css: "webix_scheduler_day_header",
                        xCount: 1,
                        yCount: 1,
                        width: 0,
                        height: 32,
                        scroll: !1,
                        type: {
                            height: "auto",
                            width: "auto"
                        },
                        template: function (t) {
                            return t.value
                        }
                    }]
                }
            }, e.prototype.init = function () {
                var t = this;
                this.Header = this.$$("header"), this.Units = this.app.getService("local").units(), this.Units.then((function (e) {
                    t.Header.sync(e, (function () {
                        t.Header.define({
                            xCount: e.count()
                        }), t.Header.resize()
                    }))
                }))
            }, e
        }(u),
        pi = function (t) {
            function e(e, i) {
                var n = t.call(this, e) || this;
                return i && (n.Unit = i.unit), n
            }
            return i(e, t), e.prototype.config = function () {
                var t = this;
                return {
                    view: "list",
                    localId: "multiDayList",
                    autoheight: !0,
                    scroll: !1,
                    css: "webix_scheduler_multilist",
                    type: {
                        height: 36,
                        template: function (e, i) {
                            return t.EventTemplate(e, i)
                        }
                    },
                    onClick: {
                        webix_scheduler_multiday_event: function (e, i, n) {
                            return t.ShowEvent(i, n)
                        }
                    }
                }
            }, e.prototype.init = function () {
                var t = this;
                this.State = this.app.getState(), this.List = this.$$("multiDayList"), this._expandState = "down", this.maxVisibleLines = 3, this._DataObj = this.List.$view.firstChild, be(this, "multi", !0), this._moreBtn = {
                    id: "$wsh_multi_more",
                    $css: "webix_scheduler_multi_more"
                }, this.on(this.app, "units:multi:state", (function (e) {
                    e !== t._expandState && ("down" === e ? t.WrapData() : t.ExpandData())
                })), Ae.call(this, this.List, "multidayUnits"), At(this), this.app.config.copypaste && !webix.env.mobile && Jt(this, this.List, {
                    multi: !0
                })
            }, e.prototype.urlChange = function () {
                var t = this.getParam("data");
                if (t) {
                    var e = webix.copy(t.multi),
                        i = this.FilterByUnits(e);
                    this.LimitData(i), this.List.clearAll(), this.List.parse(i)
                }
            }, e.prototype.EventTemplate = function (t, e) {
                var i = e.height - 8,
                    n = "height:" + i + "px; line-height:" + i + "px; width:calc(100% - 5px);",
                    r = "$wsh_multi_more" !== t.id ? re(t) : "",
                    a = this.GetStyle(t),
                    o = this.app.getService("locale")._;
                return '\n\t\t\t<div\n\t\t\t\tclass="' + a + '"\n\t\t\t\tstyle="' + n + " " + r + '">\n\t\t\t\t\t' + (t.text || o("(No title)")) + "\n\t\t\t</div>\n\t\t"
            }, e.prototype.GetStyle = function (t) {
                var e = "webix_scheduler_multiday_event";
                if ("$wsh_multi_more" == t.id) return e;
                var i = this.State.date,
                    n = t.all_day || webix.Date.timePart(t.end_date) ? t.end_date : webix.Date.add(t.end_date, -1, "day", !0);
                return e += !this.State.selected || t.id != this.State.selected.id && t.id != this.State.selected.date ? "" : " webix_scheduler_event_selected", t.start_date < i && (e += " webix_scheduler_event_break_left"), n >= webix.Date.add(i, 1, "day", !0) && (e += " webix_scheduler_event_break_right"), e
            }, e.prototype.LimitData = function (t) {
                if (delete this._reserve, delete this._reserveIds, t.length > this.maxVisibleLines) {
                    var e = t.length - 2,
                        i = this.app.getService("locale")._;
                    this._moreBtn.text = e + " " + i("more"), "down" === this._expandState ? this._reserve = t.splice(2, e, this._moreBtn) : this._reserve = t.slice(2), this._reserveIds = this._reserve.map((function (t) {
                        return t.id
                    })), this.app.callEvent("units:multi:state", [this._expandState, !1])
                }
            }, e.prototype.WrapData = function () {
                var t = this;
                if (!this._inAnimation && (this._expandState = "down", this._reserveIds)) {
                    this._inAnimation = !0;
                    var e = this.List.$height - (this._reserveIds.length - 1) * this.List.type.height;
                    this.Animate("down", e, (function () {
                        t.List.add(t._moreBtn), t.List.remove(t._reserveIds)
                    }))
                }
            }, e.prototype.ExpandData = function () {
                var t = this.List.exists("$wsh_multi_more");
                this._inAnimation || (this._expandState = "up", t && (this._inAnimation = !0, this.Animate("up"), this.List.remove("$wsh_multi_more"), this.List.parse(this._reserve)))
            }, e.prototype.Animate = function (t, e, i) {
                var n = this;
                this.List.$view.style.transition = "height 150ms", e && (this.List.$view.style.height = e + "px"), setTimeout((function () {
                    i && i(), n.List.$view.style.transition = "", n._inAnimation = !1
                }), 150)
            }, e.prototype.ShowEvent = function (t, e) {
                if ("$wsh_multi_more" === t) this.app.callEvent("units:multi:state", ["up", !0]);
                else {
                    var i = mt(this.List.getItem(t));
                    i.node = e, this.State.selected = i
                }
                return !1
            }, e.prototype.FilterByUnits = function (t) {
                var e = this;
                return t.filter((function (t) {
                    if (t.units) {
                        var i = t.units.split(","),
                            n = e.Unit.id + "";
                        return -1 !== i.indexOf(n)
                    }
                    return !1
                }))
            }, e.prototype.GetEvent = function (t) {
                return this.List.getItem(t)
            }, e.prototype.GetTargetDate = function () {
                return this.State.date
            }, e
        }(u),
        fi = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var e = this,
                    i = t.prototype.config.call(this),
                    n = this.app.getService("local").units();
                return i.cols[0].onClick = {
                    "wxi-angle-down": function () {
                        return e.app.callEvent("units:multi:state", ["up", !0])
                    },
                    "wxi-angle-up": function () {
                        return e.app.callEvent("units:multi:state", ["down", !0])
                    }
                }, i.cols[1] = {
                    cols: []
                }, n.then((function (t) {
                    for (var n = t.serialize(), r = 0; r < n.length; ++r) i.cols[1].cols.push(new(e.app.dynamic(pi))(e.app, {
                        unit: n[r]
                    }));
                    return i
                }))
            }, e.prototype.init = function () {
                var t = this;
                this.State = this.app.getState(), this.MoreIcon = this.$$("more"), this.on(this.State.$changes, "date", (function () {
                    t.SetMoreIcon()
                })), this.on(this.app, "units:multi:state", (function (e, i) {
                    t.Animate(e, i ? 150 : 1)
                }))
            }, e.prototype.Animate = function (t, e) {
                var i = this;
                setTimeout((function () {
                    i.SetMoreIcon(t)
                }), e)
            }, e
        }(ge),
        vi = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var t = this;
                this.Compact = this.getParam("compact", !0);
                var e = this.app.getService("local").units(),
                    i = {
                        localId: "multi",
                        hidden: !0,
                        cols: [fi]
                    },
                    n = {
                        localId: "scroll",
                        view: "scrollview",
                        scroll: "y",
                        css: "webix_scheduler_week_days",
                        body: {
                            cols: [ve]
                        }
                    };
                return e.then((function (e) {
                    for (var r = e.serialize(), a = 0; a < r.length; ++a) n.body.cols.push(new(t.app.dynamic(ui))(t.app, {
                        unit: r[a]
                    }));
                    return {
                        rows: [di, i, n]
                    }
                }))
            }, e.prototype.init = function () {
                var t = this,
                    e = this.app.getState();
                this.on(e.$changes, "date", (function (e) {
                    return t.RefreshData(e)
                })), this.on(e.$changes, "active", (function () {
                    return t.RefreshData(e.date)
                })), this.on(this.app, "events:refresh", (function () {
                    return t.RefreshData(e.date)
                }));
                var i = this.app.getService("local").events(!0);
                this.on(i.data, "onStoreUpdated", (function (i, n, r) {
                    return r && t.RefreshData(e.date)
                }))
            }, e.prototype.RefreshData = function (t) {
                var e = this;
                this.GetDay(t).then((function (t) {
                    e.app && e.setParam("data", t, !0), t.multi.length ? e.$$("multi").show() : e.$$("multi").hide()
                }))
            }, e.prototype.GetDay = function (t) {
                var e = webix.Date.add(t, 1, "day", !0);
                return this.app.getService("local").getEvents(t, e).then((function (t) {
                    var e = [],
                        i = [];
                    return t.forEach((function (t) {
                        le(t) ? e.push(t) : i.push(t)
                    })), {
                        multi: e,
                        single: i
                    }
                }))
            }, e
        }(u),
        gi = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var e = t.prototype.config.call(this);
                return e.css = "webix_scheduler_week", e.type.headerHeight = 28, e
            }, e.prototype.urlChange = function () {
                this.data = this.getParam("data"), this.data && (this.List.clearAll(), this.List.parse(this.data.all), this.ToggleOverlay())
            }, e.prototype.TemplateHeader = function (t) {
                var e = new Date(1 * t),
                    i = "%l, %F <span class='webix_scheduler_monthday" + (he(e) ? " webix_scheduler_today" : "") + "'>%j</span>";
                return '<span class="webix_unit_header_inner">' + webix.Date.dateToStr(i)(e) + "</span>"
            }, e
        }(pe),
        mi = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                return {
                    type: "clean",
                    cols: [{
                        borderless: !1,
                        width: 51
                    }, {
                        view: "dataview",
                        localId: "header",
                        css: "webix_scheduler_day_header",
                        xCount: 7,
                        yCount: 1,
                        width: 0,
                        height: 32,
                        scroll: !1,
                        type: {
                            height: "auto",
                            width: "auto"
                        },
                        template: function (t) {
                            return '<span class="webix_scheduler_weekday">' + t.day + '</span> <span class="webix_scheduler_monthday">' + t.date + "</span>"
                        }
                    }]
                }
            }, e.prototype.urlChange = function () {
                this.data = this.getParam("data"), this.data && this.RefreshData()
            }, e.prototype.RefreshData = function () {
                for (var t = this.data.start, e = []; t < this.data.end;) {
                    var i = {
                        day: webix.i18n.calendar.dayShort[t.getDay()],
                        date: t.getDate()
                    };
                    he(t) && (i.$css = "webix_scheduler_list_today"), e.push(i), t = webix.Date.add(t, 1, "day", !0)
                }
                var n = this.$$("header");
                n.clearAll(), n.parse(e)
            }, e
        }(u),
        yi = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                var e = this,
                    i = t.prototype.config.call(this);
                return i.cols[1] = {
                    view: "dataview",
                    localId: "multiDayList",
                    css: "webix_scheduler_multidays",
                    scroll: !1,
                    height: 32,
                    xCount: 7,
                    yCount: 1,
                    width: 0,
                    type: {
                        width: "auto",
                        height: "auto",
                        itemHeight: 36
                    },
                    template: "",
                    tooltip: {
                        template: ""
                    },
                    onClick: {
                        webix_scheduler_multiday_event: function (t) {
                            return e.ShowEvent(t)
                        }
                    }
                }, i
            }, e.prototype.init = function () {
                var e = this;
                this.State = this.app.getState(), t.prototype.init.call(this), be(this, "multi"), At(this), this.Events = new webix.DataCollection({}), this.List.attachEvent("onAfterRender", (function () {
                    return e.RenderEvents()
                })), Ae.call(this, this.List, "multiday"), this.app.config.copypaste && !webix.env.mobile && Jt(this, this.List)
            }, e.prototype.urlChange = function () {
                this.data = this.getParam("data"), this.data && this.ParseDays(this.data.multi)
            }, e.prototype.ParseDays = function (t) {
                if (t.length) {
                    this.Events.clearAll(), this.Events.parse(t);
                    for (var e = [], i = 0; i < 7; i++) e.push({
                        id: i + 1,
                        date: webix.Date.add(this.data.start, i, "day", !0)
                    });
                    this.BreakEventsByDay(e), this.SetMoreIcon(this._maxEvents > this.maxVisibleLines ? this._expandState : null), this.List.blockEvent(), this.List.parse(e), this.ResetListHeight(), this.List.unblockEvent(), this.RenderEvents()
                }
            }, e.prototype.BreakEventsByDay = function (t) {
                var e = this;
                this.Days = [];
                var i = {};
                this._maxEvents = 0, t.forEach((function (t, n) {
                    var r = t.date;
                    e.Days.push([]), e.Events.data.each((function (t) {
                        if (webix.isUndefined(i[t.id])) {
                            if (t.start_date < webix.Date.add(r, 1, "day", !0) && t.end_date >= r) {
                                for (var a = 0; !webix.isUndefined(e.Days[n][a]);) a++;
                                i[t.id] = a;
                                var o = {};
                                o.es = t.start_date, o.ee = t.all_day || webix.Date.timePart(t.end_date) ? t.end_date : webix.Date.add(t.end_date, -1, "day", !0), o.length = 1 + ue(o.ls = new Date(Math.max(e.data.start, o.es)), o.le = new Date(Math.min(e.data.end - 1, o.ee))), t.$config = o, e.Days[n][a] = t
                            }
                        } else r <= t.end_date && t.all_day || r < t.end_date ? e.Days[n][i[t.id]] = "" : delete i[t.id]
                    })), e.Days[n].length > e._maxEvents && (e._maxEvents = e.Days[n].length)
                }))
            }, e.prototype.RenderEvents = function () {
                var t = this,
                    e = this.Events.count();
                if (e) {
                    var i = webix.html.create("div", {
                            role: "presentation"
                        }),
                        n = "",
                        r = 0,
                        a = "down" === this._expandState && this._maxEvents > this.maxVisibleLines;
                    this.List.data.each((function (e, i) {
                        for (var o = [], s = a ? t.maxVisibleLines - 1 : t.Days[i].length, c = 0; c < s; ++c) o[c] = t.Days[i][c], o[c] && (o[c] = t.ToHTML(o[c], i, c), r++);
                        n += o.join("")
                    })), a && (n += this.MoreOption(e - r)), i.innerHTML = n, this._DataObj = this.List.$view.firstChild.appendChild(i), this.app.callEvent("events:rendered", [])
                }
            }, e.prototype.ToHTML = function (t, e, i) {
                var n = re(t),
                    r = this.GetSizePosition(t.$config.length, e, i),
                    a = this.GetStyle(t, t.$config),
                    o = this.app.getService("locale")._;
                return '\n\t\t\t<div\n\t\t\t\twebix_tooltip="' + (t.text || o("(No title)")) + '"\n\t\t\t\twebix_e_id="' + t.id + '"\n\t\t\t\tclass="' + a + '"\n\t\t\t\tstyle="' + r + " " + n + '">\n\t\t\t\t\t' + (t.text || o("(No title)")) + "\n\t\t\t</div>\n\t\t"
            }, e.prototype.GetStyle = function (t, e) {
                var i = this.data,
                    n = i.start,
                    r = i.end,
                    a = "webix_scheduler_multiday_event";
                return a += !this.State.selected || t.id != this.State.selected.id && t.id != this.State.selected.date ? "" : " webix_scheduler_event_selected", e.es < n && webix.Date.equal(n, webix.Date.dayStart(e.ls)) && (a += " webix_scheduler_event_break_left"), e.ee >= r && webix.Date.equal(webix.Date.add(r, -1, "day", !0), webix.Date.dayStart(e.le)) && (a += " webix_scheduler_event_break_right"), a
            }, e.prototype.MoreOption = function (t) {
                var e = this.app.getService("locale")._;
                return '<div webix_e_id="$wsh_multi_more" class="webix_scheduler_multiday_event webix_scheduler_multi_more" style="' + this.GetSizePosition(this.List.config.xCount, 0, this.maxVisibleLines - 1) + '">' + t + " " + e("more") + "</div>"
            }, e.prototype.GetSizePosition = function (t, e, i) {
                var n = t * this.List.type.width - 4,
                    r = this.List.type.itemHeight - 8;
                return "width:" + n + "px; height:" + r + "px; line-height:" + r + "px; left:" + (this.List.type.width * e + 1) + "px; top:" + (i * this.List.type.itemHeight + 4) + "px;"
            }, e.prototype.ShowEvent = function (t) {
                var e = Pe(t, this.List.$view);
                if (e.id) {
                    if ("$wsh_multi_more" === e.id) return this.ExpandData();
                    var i = this.Events.getItem(e.id),
                        n = webix.extend(e, mt(i), !0);
                    this.State.selected = n
                }
                return !1
            }, e.prototype.ExpandData = function () {
                this._inAnimation || (this._inAnimation = !0, this._expandState = "up", this.Animate("up"), this.ResetListHeight(this._maxEvents))
            }, e.prototype.WrapData = function () {
                var t = this;
                if (!this._inAnimation) {
                    this._inAnimation = !0, this._expandState = "down";
                    var e = this.List.$height - (this._maxEvents - this.maxVisibleLines) * this.List.type.height;
                    this.Animate("down", e, (function () {
                        t.ResetListHeight(t.maxVisibleLines)
                    }))
                }
            }, e.prototype.ResetListHeight = function (t) {
                t || (t = "down" === this._expandState ? Math.min(this._maxEvents, this.maxVisibleLines) : this._maxEvents);
                var e = t * this.List.type.itemHeight;
                this.List.type.height !== e && (this.List.type.height = e, this.List.define("height", e), this.List.resize())
            }, e.prototype.GetEvent = function (t) {
                return this.Events.getItem(t)
            }, e.prototype.GetTargetDate = function (t) {
                return t ? this.List.getItem(t).date : this.State.date
            }, e
        }(ge),
        wi = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return i(e, t), e.prototype.config = function () {
                if (this.Compact = this.getParam("compact", !0), this.Compact) return {
                    rows: [gi]
                };
                for (var t = {
                        localId: "scroll",
                        view: "scrollview",
                        scroll: "y",
                        css: "webix_scheduler_week_days",
                        body: {
                            cols: [ve]
                        }
                    }, e = 0; e < 7; ++e) t.body.cols.push(new(this.app.dynamic(Qe))(this.app, {
                    day: e
                }));
                return {
                    rows: [mi, {
                        localId: "multi",
                        hidden: !0,
                        cols: [yi]
                    }, t]
                }
            }, e.prototype.init = function () {
                var t = this,
                    e = this.app.getState();
                this.on(e.$changes, "date", (function (e) {
                    return t.RefreshData(e)
                })), this.on(e.$changes, "active", (function () {
                    return t.RefreshData(e.date)
                })), this.on(this.app, "events:refresh", (function () {
                    return t.RefreshData(e.date)
                }));
                var i = this.app.getService("local").events(!0);
                this.on(i.data, "onStoreUpdated", (function (i, n, r) {
                    return r && t.RefreshData(e.date)
                })), this.Compact || this.on(e.$changes, "selected", (function (e) {
                    return e && t.ScrollScale(e)
                }))
            }, e.prototype.RefreshData = function (t) {
                var e = this,
                    i = webix.Date.weekStart(t),
                    n = webix.Date.add(i, 1, "week", !0);
                this.GetWeek(i, n).then((function (t) {
                    e.app && e.setParam("data", t, !0), t.multi.length ? e.$$("multi").show() : e.$$("multi").hide()
                }))
            }, e.prototype.GetWeek = function (t, e) {
                var i = this;
                return this.app.getService("local").getEvents(t, e).then((function (n) {
                    if (i.Compact) return {
                        start: t,
                        end: e,
                        all: n
                    };
                    var r = [],
                        a = [];
                    return n.forEach((function (t) {
                        le(t) ? r.push(t) : a.push(t)
                    })), {
                        start: t,
                        end: e,
                        multi: r,
                        single: a
                    }
                }))
            }, e.prototype.ScrollScale = function (t) {
                var e = this;
                "0" !== t.id || t.date || setTimeout((function () {
                    var t = 40 * ((new Date).getHours() + 2);
                    e.$$("scroll").scrollTo(0, t)
                }), 100)
            }, e
        }(u),
        _i = {
            JetView: u
        };
    _i["bars/add"] = z, _i["bars/date"] = q, _i.bars = rt, _i["bars/nav"] = X, _i["bars/navpopup"] = nt, _i["event/actionmenu"] = at, _i["event/form"] = Pt, _i["event/formpopup"] = Mt, _i["event/info"] = Zt, _i["event/recurringform"] = Et, _i.main = ee, _i["modes/agenda"] = fe, _i["modes/common/actionpopup"] = te, _i["modes/common/hourscale"] = ve, _i["modes/common/multimore"] = ge, _i["modes/common/unitlist"] = pe, _i["modes/day/events"] = Qe, _i["modes/day"] = Ze, _i["modes/day/multiday"] = Je, _i["modes/month/compact"] = ti, _i["modes/month/events"] = ii, _i["modes/month/header"] = ni, _i["modes/month"] = ai, _i["modes/month/list"] = ri, _i["modes/month/more"] = ei, _i["modes/timeline/bar"] = oi, _i["modes/timeline/chart"] = ci, _i["modes/timeline"] = li, _i["modes/timeline/more"] = si, _i["modes/timeline/scale"] = hi, _i["modes/units/events"] = ui, _i["modes/units/header"] = di, _i["modes/units"] = vi, _i["modes/units/multiday"] = fi, _i["modes/units/multidaylist"] = pi, _i["modes/week/compact"] = gi, _i["modes/week/header"] = mi, _i["modes/week"] = wi, _i["modes/week/multiday"] = yi, _i["side/editor"] = tt, _i.side = it, _i["side/popup"] = et;
    var bi = function () {
        function t(t) {
            this.app = t, this.store = this.createEvents(), this.events_ready = null, !1 !== t.config.calendars && (this.cals = this.createCalendars(), this.cals_ready = null), !1 !== t.config.units && (this.unitsCache = this.createUnits(), this.units_ready = null), t.config.timeline && (this._sections = this.createSections(), this.sections_ready = null);
            var e = t.config.serverUTC;
            this.strToDate = webix.Date.strToDate(webix.i18n.parseFormat, e), this.dateToStr = webix.Date.dateToStr(webix.i18n.parseFormat, e), this.dateToLocalStr = webix.Date.dateToStr(webix.i18n.parseFormat), this.loaded_ranges = {}
        }
        return t.prototype.createEvents = function () {
            var t = this;
            return new webix.DataCollection({
                scheme: {
                    $change: function (e) {
                        "string" == typeof e.start_date && (e.start_date = t.strToDate(e.start_date)), "string" == typeof e.end_date && (e.end_date = t.strToDate(e.end_date)), t.app.config.recurring && (e.$recurring = e.recurring ? st(e.recurring) : null, e.$recurring && Ct(e), "string" != typeof e.origin_id || isNaN(e.origin_id) || (e.origin_id *= 1)), "string" == typeof e.all_day && (e.all_day *= 1), t.getColor(e, t.cals && t.cals.getItem(e.calendar))
                    },
                    $serialize: function (e) {
                        return t.eventOut(e)
                    },
                    $export: function (e) {
                        return t.eventOut(e)
                    }
                }
            })
        }, t.prototype.events = function (t, e) {
            var i = this,
                n = this.store;
            return t ? n : this.calendars().then((function () {
                return i.app.config.dynamic ? i.events_ready || (i.events_ready = webix.promise.resolve(i.store)) : i.events_ready && !e || (i.events_ready = i.app.getService("backend").events().then((function (t) {
                    return n.clearAll(), n.parse(t), n
                }))), i.events_ready
            }))
        }, t.prototype.getEvents = function (t, e) {
            var i, n = this,
                r = this.app.config.dynamic;
            if (r) {
                var a = this.getParams(r);
                i = a.then ? a.then((function () {
                    return n.getLocal(t, e)
                })) : !0 === a ? this.getLocal(t, e) : this.loaded_ranges[a.from] = this.getDynamic(a).then((function () {
                    return n.getLocal(t, e)
                }))
            } else i = this.getLocal(t, e);
            return i
        }, t.prototype.getLocal = function (t, e) {
            var i = this;
            return this.events().then((function (n) {
                var r = i.app.config,
                    a = i.app.getState().active,
                    o = [];
                return n.data.each((function (n) {
                    (!r.calendars || function (t, e) {
                        for (var i = 0; i < t.length; ++i)
                            if (t[i] == e) return !0;
                        return !1
                    }(a, n.calendar)) && n.start_date < e && (n.end_date > t || n.end_date >= t && n.all_day || n.$recurring && (!n.$recurring.UNTIL || n.$recurring.UNTIL > t)) && (i.app.config.recurring && n.recurring ? o = o.concat(function (t, e, i) {
                        var n = i.$recurring,
                            r = {},
                            a = [];
                        pt(n, r);
                        for (var o = new Date(i.start_date), s = i.end_date - i.start_date, c = 1; t - o >= (s || 1) && (!n.UNTIL || o < n.UNTIL) && (!n.COUNT || c <= n.COUNT) || dt(n.EXDATE, o);) ++c, ft(o, n, r);
                        for (; e > o && (!n.UNTIL || o < n.UNTIL) && (!n.COUNT || c <= n.COUNT);) {
                            if (!dt(n.EXDATE, o)) {
                                var h = webix.copy(i);
                                o.setHours(i.start_date.getHours()), h.start_date = new Date(o), h.end_date = new Date(1 * o + s), h.$id = i.id, h.id = h.start_date.valueOf() + "_" + i.id, a.push(h)
                            }
                            c++, ft(o, n, r)
                        }
                        return a
                    }(t, e, n)) : (delete n.recurring, o.push(n))), n.start_date = i.roundTime(n.start_date), n.end_date = i.roundTime(n.end_date)
                })), o.sort((function (t, e) {
                    return t.start_date - e.start_date || t.end_date - e.end_date
                })), o
            }))
        }, t.prototype.getDynamic = function (t) {
            var e = this;
            return this.app.getService("backend").events(t).then((function (i) {
                return e.store.parse(i), e.loaded_ranges[t.from] = !0, i
            }))
        }, t.prototype.getParams = function (t) {
            var e = this.app.getState(),
                i = webix.i18n.parseFormatStr,
                n = webix.Date[t + "Start"](e.date),
                r = webix.Date.add(n, 1, t, !0);
            "month" !== t && "year" !== t || "week" !== e.mode && "month" !== e.mode || (n.getDay() && (n = webix.Date.weekStart(n)), r.getDay() && (r = webix.Date.add(webix.Date.weekStart(r), 1, "week")));
            var a = i(n);
            return this.loaded_ranges[a] ? this.loaded_ranges[a] : {
                from: a,
                to: i(r)
            }
        }, t.prototype.createCalendars = function () {
            var t = this;
            return new webix.DataCollection({
                scheme: {
                    $sort: {
                        dir: "desc",
                        by: "active",
                        as: xi
                    }
                },
                on: {
                    onAfterDelete: function () {
                        return t.setActive()
                    },
                    onAfterAdd: function () {
                        return t.setActive()
                    },
                    "data->onDataUpdate": function (e, i, n) {
                        n && (i.color !== n.color && (t.store.data.each((function (n) {
                            n.calendar == e && t.getColor(n, i)
                        })), t.app.callEvent("events:refresh")), i.active !== n.active && (t.setActive(), setTimeout((function () {
                            t.cals.sort("#active#", "desc", xi)
                        }), 400)))
                    }
                }
            })
        }, t.prototype.calendars = function (t, e) {
            var i = this;
            if (0 == this.app.config.calendars) return !t && webix.promise.resolve();
            var n = this.cals;
            return t ? n : (this.cals_ready && !e || (this.cals_ready = this.app.getService("backend").calendars().then((function (t) {
                return n.clearAll(), n.parse(t), i.setActive(), n
            }))), this.cals_ready)
        }, t.prototype.eventOut = function (t, e, i) {
            t = webix.copy(t), !i && t.recurring && Ct(t);
            var n = e ? this.dateToStr : this.dateToLocalStr;
            return t.start_date && (t.start_date = n(t.start_date)), t.end_date && (t.end_date = n(t.end_date)), e || (delete t.$recurring, delete t.$textColor, delete t.$color), t
        }, t.prototype.setActive = function () {
            var t = [];
            this.cals.data.each((function (e) {
                1 * e.active && t.push(e.id)
            })), this.app.getState().active = t
        }, t.prototype.getColor = function (t, e) {
            var i, n;
            t.$color = e ? e.color : t.color || "#01C2A5", t.$textColor = (i = t.color || t.$color, n = webix.color.toRgb(i), Math.round((299 * n[0] + 587 * n[1] + 114 * n[2]) / 1e3) > 180 ? "#475466" : "#ffffff")
        }, t.prototype.roundTime = function (t) {
            var e = webix.Date.copy(t);
            return e.setMinutes(5 * Math.round(e.getMinutes() / 5)), e
        }, t.prototype.isLastPart = function (t) {
            return !this.store.find((function (e) {
                return t.origin_id == e.origin_id && (t.$id || t.id) != e.id && t.start_date < e.start_date
            }), !0)
        }, t.prototype.createUnits = function () {
            return new webix.DataCollection({
                data: []
            })
        }, t.prototype.units = function (t, e) {
            if (0 == this.app.config.units) return !t && webix.promise.resolve();
            var i = this.unitsCache;
            return t ? i : (this.units_ready && !e || (this.units_ready = this.app.getService("backend").units().then((function (t) {
                return i.clearAll(), i.parse(t), i
            }))), this.units_ready)
        }, t.prototype.createSections = function () {
            return new webix.DataCollection({})
        }, t.prototype.sections = function (t, e) {
            var i = this._sections;
            return t ? i : (this.sections_ready && !e || (this.sections_ready = this.app.getService("backend").sections().then((function (t) {
                return i.clearAll(), i.parse(t), i
            }))), this.sections_ready)
        }, t.prototype.clearAll = function () {
            this.loaded_ranges = {}, this.store.clearAll(), this.events_ready = null, !1 !== this.app.config.calendars && (this.cals.clearAll(), this.cals_ready = null), !1 !== this.app.config.units && (this.unitsCache.clearAll(), this.units_ready = null), !1 !== this.app.config.timeline && (this._sections.clearAll(), this.sections_ready = null)
        }, t
    }();

    function xi(t, e, i) {
        return 1 * t[i] > 1 * e[i] ? 1 : -1
    }
    var Si = function () {
            function t(t) {
                this.app = t, this.Back = t.getService("backend");
                var e = this.Local = t.getService("local");
                this.Events = e.events(!0), this.Cals = e.calendars(!0), this.State = t.getState()
            }
            return t.prototype.addEvent = function (t, e, i) {
                var n = this,
                    r = this.Local.eventOut(t, !0, e);
                return this.Back.addEvent(r).then((function (e) {
                    return i && n.Events.remove(i), t.id = e.id, n.Events.add(t)
                }))
            }, t.prototype.updateEvent = function (t, e, i, n, r) {
                var a = this,
                    o = this.Local.eventOut(e, !0, r);
                return this.Back.updateEvent(t, o, i, n).then((function () {
                    if (a.Events.updateItem(t, e), "all" === i) {
                        var r = a.Events.find((function (e) {
                            return e.origin_id == t
                        })).map((function (t) {
                            return t.id
                        }));
                        a.Events.remove(r)
                    } else if ("next" === i && n) {
                        var o = a.Events.getItem(t);
                        o.origin_id && (t = o.origin_id);
                        r = a.Events.find((function (e) {
                            return e.origin_id == t && e.start_date >= n
                        })).map((function (t) {
                            return t.id
                        }));
                        a.Events.remove(r)
                    }
                }))
            }, t.prototype.removeEvent = function (t, e, i) {
                var n = this,
                    r = this.State.selected ? this.State.selected.id : t.$id || t.id,
                    a = !!e && xt(i, t.start_date);
                if ("next" === e && a && (e = St.call(this, t, e)), !e || "all" === e || "this" === e && !i || "next" === e && t.origin_id && a) "all" === e && t.origin_id && (r = t.origin_id), this.Back.removeEvent(r).then((function () {
                    n.Events.remove(r);
                    var t = n.Events.find((function (t) {
                        return t.origin_id == r
                    })).map((function (t) {
                        return t.id
                    }));
                    n.Events.remove(t)
                }));
                else if ("this" === e || "next" === e) {
                    i || (r = t.origin_id, t = this.Events.getItem(r));
                    var o = webix.Date.dayStart(i ? new Date(1 * i.split("_")[0]) : t.start_date),
                        s = "this" === e ? _t(o, t) : wt(o, t);
                    this.updateEvent(r, {
                        recurring: s
                    }, e, o, !0)
                }
            }, t.prototype.addCalendar = function (t) {
                var e = this;
                return t || (t = {
                    text: "",
                    color: "#997CEB",
                    active: 1
                }), this.Back.addCalendar(t).then((function (i) {
                    return t.id = i.id, e.Cals.add(t, 0), t.id
                }))
            }, t.prototype.updateCalendar = function (t, e) {
                var i = this;
                return this.app.getState().readonly ? webix.promise.resolve(this.Cals.updateItem(t, e)) : this.Back.updateCalendar(t, e).then((function () {
                    return i.Cals.updateItem(t, e)
                }))
            }, t.prototype.removeCalendar = function (t) {
                var e = this;
                this.Back.removeCalendar(t).then((function () {
                    e.Cals.remove(t)
                }))
            }, t
        }(),
        Di = function () {
            function t(t, e) {
                this.app = t, this._url = e
            }
            return t.prototype.url = function (t) {
                return this._url + t
            }, t.prototype.events = function (t) {
                return webix.ajax(this.url("events"), t).then((function (t) {
                    return t.json()
                }))
            }, t.prototype.addEvent = function (t) {
                return webix.ajax().post(this.url("events"), t).then((function (t) {
                    return t.json()
                }))
            }, t.prototype.updateEvent = function (t, e, i, n) {
                var r = e;
                return i && (r.recurring_update_mode = i), n && (r.recurring_update_date = n), webix.ajax().put(this.url("events/" + t), r).then((function (t) {
                    return t.json()
                }))
            }, t.prototype.removeEvent = function (t) {
                return webix.ajax().del(this.url("events/" + t)).then((function (t) {
                    return t.json()
                }))
            }, t.prototype.calendars = function () {
                return webix.ajax(this.url("calendars")).then((function (t) {
                    return t.json()
                }))
            }, t.prototype.addCalendar = function (t) {
                return webix.ajax().post(this.url("calendars"), t).then((function (t) {
                    return t.json()
                }))
            }, t.prototype.updateCalendar = function (t, e) {
                return webix.ajax().put(this.url("calendars/" + t), e).then((function (t) {
                    return t.json()
                }))
            }, t.prototype.removeCalendar = function (t) {
                return webix.ajax().del(this.url("calendars/" + t)).then((function (t) {
                    return t.json()
                }))
            }, t.prototype.units = function (t) {
                return webix.ajax().get(this.url("units"), t).then((function (t) {
                    return t.json()
                }))
            }, t.prototype.sections = function () {
                return webix.ajax(this.url("sections")).then((function (t) {
                    return t.json()
                }))
            }, t
        }(),
        $i = function (t) {
            function e(e) {
                var i, r, a, o = this,
                    s = B({
                        mode: e.mode || "month",
                        date: webix.Date.datePart(e.date || new Date),
                        readonly: e.readonly || !1,
                        active: [],
                        selected: null,
                        timelineMode: e.timelineMode || "week"
                    }),
                    c = {
                        router: _,
                        version: "10.0.2",
                        debug: !0,
                        start: "/main",
                        params: {
                            state: s,
                            forceCompact: (e = e || {}).compact
                        },
                        compactWidth: 780,
                        recurring: !0,
                        calendars: !0,
                        timeline: !!e.timeline,
                        copypaste: !0,
                        dragCreate: !0
                    };
                return (o = t.call(this, n(n({}, c), e)) || this).setService("backend", new(o.dynamic(Di))(o, o.config.url)), o.setService("local", new(o.dynamic(bi))(o, e)), o.setService("operations", new(o.dynamic(Si))(o)), a = {
                    updateConfig: function (t) {
                        var e = i.getRoot(),
                            n = e.$view;
                        r ? r && !n.id && (n.id = r) : (n.id ? r = n.id : n.id = r = "webix_" + webix.uid(), webix.html.addStyle(".webix_win_inside *:not(.webix_modal_box):not(.webix_modal_cover){ z-index: 0; }"), webix.html.addStyle("#" + r + "{ position: relative; }"), webix.html.addStyle("#" + r + " .webix_window{ z-index:2 !important; }"), webix.html.addStyle("#" + r + " .webix_disabled{ z-index:1 !important; }")), t.container = r, t.fullscreen && (t._fillApp = !0, delete t.fullscreen), t.on || (t.on = {});
                        var a = !0,
                            o = t.on.onShow;
                        return t.on.onShow = function () {
                            var t = this;
                            o && o.apply(this, arguments), a && (this.$setSize = function (i, n) {
                                G(t, e, !0), webix.ui.window.prototype.$setSize.apply(t, [i, n])
                            }, j(this, i), a = null), webix.callEvent("onClick", []), webix.html.addCss(n, "webix_win_inside"), e.disable(), G(this, e)
                        }, t
                    }
                }, (i = o).setService("jet-win", a), o.use(N, o.config.locale || {
                    lang: "en",
                    webix: {
                        en: "en-US"
                    }
                }), o
            }
            return i(e, t), e.prototype.dynamic = function (t) {
                return this.config.override && this.config.override.get(t) || t
            }, e.prototype.require = function (t, e) {
                return "jet-views" === t ? _i[e] : "jet-locales" === t ? Ei[e] : null
            }, e.prototype.getState = function () {
                return this.config.params.state
            }, e
        }(w);
    webix.protoUI({
        name: "scheduler",
        app: $i,
        defaults: {
            borderless: !0
        },
        $init: function () {
            var t = this;
            this.name = "scheduler";
            var e = this.$app.getState();
            for (var i in e) H(e, this.config, i);
            e.$changes.attachEvent("date", (function () {})), this.$app.attachEvent("app:beforedrag", (function (e, i) {
                return t.callEvent("onBeforeEventDrag", [e, i])
            })), this.$app.attachEvent("app:beforedrop", (function (e, i) {
                return t.callEvent("onBeforeEventDrop", [e, i])
            }))
        },
        $exportView: function (t) {
            return "png" === t.export_mode || "pdf" === t.export_mode && "image" === t.display ? this.$app.getRoot() : this.$app.getService("local").events(!0)
        },
        getState: function () {
            return this.$app.getState()
        },
        getService: function (t) {
            return this.$app.getService(t)
        },
        clearAll: function () {
            this.$app.getService("local").clearAll()
        }
    }, webix.ui.jetapp);
    var Ci = {
            Backend: Di,
            LocalData: bi,
            Operations: Si
        },
        Ei = {
            en: {
                Week: "Tuần",
                Day: "Ngày",
                Month: "Tháng",
                Agenda: "Lịch",
                Units: "Đơn vị",
                Timeline: "Dòng TG",
                Today: "Hôm nay",
                Create: "Tạo",
                Next: "Tiếp",
                Previous: "Trướcc",
                "Next day": "Hôm sau",
                "Previous day": "Hôm trước",
                "Next week": "Tuần sau",
                "Previous week": "Tuần trước",
                "Next month": "Tháng sau",
                "Previous month": "Tháng trước",
                "Add calendar": "Thêm lịch",
                "Do you really want to remove this calendar?": "Bạn có muốn bỏ lịch?",
                "Edit calendar": "Chỉnh lịch",
                Delete: "Xóa",
                Save: "Lưu",
                Title: "Tên",
                Color: "Màu",
                Active: "Hoạt động",
                Settings: "Cài đặt",
                "(no title)": "(không tiêu đề)",
                "Inactive calendar": "Lịch không bật",
                "No Events": "Không hoạt động",
                "All Day": "Cả ngày",
                more: "thêm",
                "Expand all-day events": "Mở rộng",
                "Collapse all-day events": "Thu nhỏ",
                "The event will be deleted permanently, are you sure?": "Bạn có chắc muốn xóa vĩnh viễn?",
                Done: "Xong",
                "Delete event": "Xóa sự kiện",
                Close: "Đóng",
                Edit: "Chỉnh",
                "(No title)": "(không tiêu đề)",
                Event: "Sự kiện",
                Start: "Bắt đầu",
                End: "Hết",
                Calendar: "Lịch",
                Notes: "Ghi chú",
                from: "từ",
                to: "tới",
                "Edit event": "Xong",
                "Assigned to units": "Gán đơn vị",
                "No units": "Không đơn vị",
                "Unknown unit": "Không rõ đơn vị",
                never: "không bao giờ",
                none: "không",
                daily: "mỗi ngày",
                day: "ngày",
                days: "ngày",
                every: "Mỗi",
                weekly: "hàng tuần",
                week: "tuần",
                weeks: "tuần",
                each: "Mỗi",
                monthly: "hàng tháng",
                month: "tháng",
                months: "tháng",
                yearly: "hàng năm",
                year: "năm",
                years: "năm",
                Repeat: "lặp lại",
                "End repeat": "Dừng lặp",
                "Repeats each": "Lặp mỗi",
                till: "tới",
                times: "thời gian",
                "weekly, every": "tuần, mỗi",
                "monthly, every": "tháng, mỗi",
                "yearly, every": "năm, mỗi",
                "every working day": "mỗi ngày làm việc",
                custom: "tùy chỉnh",
                Every: "Mỗi",
                on: "vào",
                of: "của",
                "after several occurrences": "sau vài lần",
                date: "ngày",
                "week on": "tuần vào",
                "Change recurring pattern": "Thay đổi thói quen",
                "Save changes?": "Lưu thay đổi?",
                "All events": "Tất cả sự kiện",
                "This event": "Sự kiện này",
                "This event and the following": "Sự kiện này và sau",
                Cancel: "Hủy",
                Apply: "Áp dụng",
                "Edit recurring event": "Thay đổi sự kiện lặp lại",
                "Timeline scale": "Scale dòng tg",
                Section: "Vùng",
                "Show more": "Thêm...",
                "Copy of": "Bản sao của",
                "Copy event": "Sao chép sự kiện"
            }
        };
    t.App = $i, t.locales = Ei, t.services = Ci, t.views = _i, Object.defineProperty(t, "__esModule", {
        value: !0
    })
}));
//# sourceMappingURL=scheduler.min.js.map