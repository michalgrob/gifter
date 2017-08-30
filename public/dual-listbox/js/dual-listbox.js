! function(e, t) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var i = t();
        for (var s in i)("object" == typeof exports ? exports : e)[s] = i[s]
    }
}(this, function() {
    return function(e) {
        function t(s) {
            if (i[s]) return i[s].exports;
            var l = i[s] = {
                exports: {},
                id: s,
                loaded: !1
            };
            return e[s].call(l.exports, l, l.exports, t), l.loaded = !0, l.exports
        }
        var i = {};
        return t.m = e, t.c = i, t.p = "", t(0)
    }([function(e, t) {
        "use strict";

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            l = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var s = t[i];
                        s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
                    }
                }
                return function(t, i, s) {
                    return i && e(t.prototype, i), s && e(t, s), t
                }
            }(),
            n = "dual-listbox",
            a = "dual-lsitbox__container",
            o = "dual-listbox__available",
            d = "dual-listbox__selected",
            c = "dual-listbox__title",
            u = "dual-listbox__item",
            r = "dual-listbox__buttons",
            h = "dual-listbox__button",
            v = "dual-listbox__search",
            b = "dual-listbox__item--selected",
            f = function() {
                function e(t) {
                    var s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    i(this, e), this.setDefaults(), this.selected = [], this.available = [], this.isDomElement(t) ? this.select = t : this.select = document.querySelector(t), this._initOptions(s), this._initReusableElements(), this._splitSelectOptions(this.select), this._buildDualListbox(this.select.parentNode), this._addActions(), this.redraw()
                }
                return l(e, [{


                    key: "setDefaults",
                    value: function() {
                        this.addEvent = null, this.removeEvent = null, this.availableTitle = "Available options", this.selectedTitle = "Selected options", this.addButtonText = "add", this.removeButtonText = "remove", this.addAllButtonText = "add all", this.removeAllButtonText = "remove all", this.searchPlaceholder = "Search"
                    }
                }, {
                    key: "addSelected",
                    value: function(e) {
                        var t = this.available.indexOf(e);
                        t > -1 && (this.available.splice(t, 1), this.selected.push(e), this._selectOption(e.dataset.id), this.redraw())
                    }
                }, {
                    key: "redraw",
                    value: function() {
                        this.updateAvailableListbox(), this.updateSelectedListbox()
                    }
                }, {
                    key: "removeSelected",
                    value: function(e) {
                        var t = this.selected.indexOf(e);
                        t > -1 && (this.selected.splice(t, 1), this.available.push(e), this._deselectOption(e.dataset.id), this.redraw())
                    }
                }, {
                    key: "searchLists",
                    value: function(e, t) {
                        for (var i = t.querySelectorAll("." + u), s = e.toLowerCase(), l = 0; l < i.length; l++) {
                            var n = i[l];
                            e && n.textContent.toLowerCase().indexOf(s) === -1 ? n.style.display = "none" : n.style.display = "list-item"
                        }
                    }
                }, {
                    key: "updateAvailableListbox",
                    value: function() {
                        this.availebleList.innerHTML = "", this.availebleList.appendChild(this.availableListTitle);
                        for (var e = 0; e < this.available.length; e++) {
                            var t = this.available[e];
                            this.availebleList.appendChild(t)
                        }
                    }
                }, {
                    key: "updateSelectedListbox",
                    value: function() {
                        this.selectedList.innerHTML = "", this.selectedList.appendChild(this.selectedListTitle);
                        for (var e = 0; e < this.selected.length; e++) {
                            var t = this.selected[e];
                            this.selectedList.appendChild(t)
                        }
                    }
                }, {
                    key: "_actionAllSelected",
                    value: function(e) {
                        for (e.preventDefault(); this.available.length > 0;) this.addSelected(this.available[0])
                    }
                }, {
                    key: "_actionItemSelected",
                    value: function(e) {
                        e.preventDefault();
                        var t = this.dualListbox.querySelector("." + b);
                        t && this.addSelected(t)
                    }
                }, {
                    key: "_actionAllDeselected",
                    value: function(e) {
                        for (e.preventDefault(); this.selected.length > 0;) this.removeSelected(this.selected[0])
                    }
                }, {
                    key: "_actionItemDeselected",
                    value: function(e) {
                        e.preventDefault();
                        var t = this.dualListbox.querySelector("." + b);
                        t && this.removeSelected(t)
                    }
                }, {
                    key: "_actionItemDoubleClick",
                    value: function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                        t && (t.preventDefault(), t.stopPropagation()), this.selected.indexOf(e) > -1 ? this.removeSelected(e) : this.addSelected(e)
                    }
                }, {
                    key: "_actionItemClick",
                    value: function(e, t) {
                        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                        i && i.preventDefault();
                        for (var s = t.querySelectorAll("." + u), l = 0; l < s.length; l++) {
                            var n = s[l];
                            n !== e && n.classList.remove(b)
                        }
                        e.classList.contains(b) ? e.classList.remove(b) : e.classList.add(b)
                    }
                }, {
                    key: "_addActions",
                    value: function() {
                        this._addButtonActions(), this._addSearchActions()
                    }
                }, {
                    key: "_addButtonActions",
                    value: function() {
                        var e = this;
                        this.add_all_button.addEventListener("click", function(t) {
                            return e._actionAllSelected(t)
                        }), this.add_button.addEventListener("click", function(t) {
                            return e._actionItemSelected(t)
                        }), this.remove_button.addEventListener("click", function(t) {
                            return e._actionItemDeselected(t)
                        }), this.remove_all_button.addEventListener("click", function(t) {
                            return e._actionAllDeselected(t)
                        })
                    }
                }, {
                    key: "_addClickActions",
                    value: function(e) {
                        var t = this;
                        return e.addEventListener("dblclick", function(i) {
                            return t._actionItemDoubleClick(e, i)
                        }), e.addEventListener("click", function(i) {
                            return t._actionItemClick(e, t.dualListbox, i)
                        }), e
                    }
                }, {
                    key: "_addSearchActions",
                    value: function() {
                        var e = this;
                        this.search.addEventListener("change", function(t) {
                            return e.searchLists(t.target.value, e.dualListbox)
                        }), this.search.addEventListener("keyup", function(t) {
                            return e.searchLists(t.target.value, e.dualListbox)
                        })
                    }
                }, {
                    key: "_buildDualListbox",
                    value: function(e) {
                        this.select.style.display = "none", this.dualListBoxContainer.appendChild(this.availebleList), this.dualListBoxContainer.appendChild(this.buttons), this.dualListBoxContainer.appendChild(this.selectedList), this.dualListbox.appendChild(this.search), this.dualListbox.appendChild(this.dualListBoxContainer), e.insertBefore(this.dualListbox, this.select)
                    }
                }, {
                    key: "_createButtons",
                    value: function() {
                        this.buttons = document.createElement("div"), this.buttons.classList.add(r), this.add_all_button = document.createElement("button"), this.add_all_button.classList.add(h), this.add_all_button.innerHTML = this.addAllButtonText, this.add_button = document.createElement("button"), this.add_button.classList.add(h), this.add_button.innerHTML = this.addButtonText, this.remove_button = document.createElement("button"), this.remove_button.classList.add(h), this.remove_button.innerHTML = this.removeButtonText, this.remove_all_button = document.createElement("button"), this.remove_all_button.classList.add(h), this.remove_all_button.innerHTML = this.removeAllButtonText, this.buttons.appendChild(this.add_all_button), this.buttons.appendChild(this.add_button), this.buttons.appendChild(this.remove_button), this.buttons.appendChild(this.remove_all_button)
                    }
                }, {
                    key: "_createListItem",
                    value: function(e) {
                        var t = document.createElement("li");
                        return t.classList.add(u), t.innerHTML = e.innerHTML, t.dataset.id = e.value, this._addClickActions(t), t
                    }
                }, {
                    key: "_createSearch",
                    value: function() {
                        this.search = document.createElement("input"), this.search.classList.add(v), this.search.placeholder = this.searchPlaceholder
                    }
                }, {
                    key: "_deselectOption",
                    value: function(e) {
                        for (var t = this.select.options, i = 0; i < t.length; i++) {
                            var s = t[i];
                            s.value === e && (s.selected = !1)
                        }
                        this.removeEvent && this.removeEvent(e)
                    }
                }, {
                    key: "_initOptions",
                    value: function(e) {
                        for (var t in e) this[t] = e[t]
                    }
                }, {
                    key: "_initReusableElements",
                    value: function() {
                        this.dualListbox = document.createElement("div"), this.dualListbox.classList.add(n), this.select.id && this.dualListbox.classList.add(this.select.id), this.dualListBoxContainer = document.createElement("div"), this.dualListBoxContainer.classList.add(a), this.availebleList = document.createElement("ul"), this.availebleList.classList.add(o), this.selectedList = document.createElement("ul"), this.selectedList.classList.add(d), this.availableListTitle = document.createElement("li"), this.availableListTitle.classList.add(c), this.availableListTitle.innerText = this.availableTitle, this.selectedListTitle = document.createElement("li"), this.selectedListTitle.classList.add(c), this.selectedListTitle.innerText = this.selectedTitle, this._createButtons(), this._createSearch()
                    }
                }, {
                    key: "_selectOption",
                    value: function(e) {
                        for (var t = this.select.options, i = 0; i < t.length; i++) {
                            var s = t[i];
                            s.value === e && (s.selected = !0)
                        }
                        this.addEvent && this.addEvent(e)
                    }
                }, {
                    key: "_splitSelectOptions",
                    value: function(e) {
                        for (var t = e.options, i = 0; i < t.length; i++) {
                            var s = t[i],
                                l = this._createListItem(s);
                            s.attributes.selected ? this.selected.push(l) : this.available.push(l)
                        }
                    }
                }, {
                    key: "isDomElement",
                    value: function(e) {
                        return "object" === ("undefined" == typeof HTMLElement ? "undefined" : s(HTMLElement)) ? e instanceof HTMLElement : e && "object" === (void 0 === e ? "undefined" : s(e)) && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName
                    }
                }]), e
            }();
        t.default = f, t.DualListbox = f
    }])
});