jQuery(document).ready(function($) {
    var p = {
        init: function(a) {
            var e = {
                    preSelect: !1
                },
                t = jQuery.extend({}, e, a);
            p.createMap(), p.populateMapItems(t), this.popup(t), media_size("max-width:768px") && this.popupMobile()
        },
        mapContainer: $(".map .island-wrap"),
        objContainer: $(".map .island-wrap .objects"),
        popupObj: $("#map-popup"),
        activeObjs: [],
        activeObjsKeys: [],
        popupMobile: function() {},
        popup: function(p) {
            var a = this.popupObj,
                e = a.find(".content"),
                t = this.activeObjs,
                i = $(".objects"),
                o = this.activeObjsKeys;
            i.on("click", ".popup-item", function() {
                p.preSelect || i.find(".popup-item").removeClass("active"), a.hasClass("active") || a.addClass("active");
                var o = $(this).data("group");
                e.html(t[o]), $(".objects").find('[data-group="' + o + '"]').addClass("active")
            }), a.find(".close").on("click", function(e) {
                if (e.preventDefault(), !p.preSelect) {
                    var t = i.find(".obj-group.active");
                    t.removeClass("active")
                }
                a.removeClass("active")
            }), p.preSelect ? this.popupObj.find(".arrow").remove() : a.find(".arrow").on("click", function() {
                var p = o.length,
                    a = i.find(".obj-group.active"),
                    s = a.data("group"),
                    r = o.indexOf(s),
                    n = r + 1,
                    m = r - 1;
                n > p - 1 && (n = 0), m < 0 && (m = p - 1), a.removeClass("active"), $(this).hasClass("next") ? (e.html(t[o[n]]), i.find('[data-group="' + o[n] + '"]').addClass("active")) : (e.html(t[o[m]]), i.find('[data-group="' + o[m] + '"]').addClass("active"))
            })
        },
        createMap: function() {
            mapObj.map_image && this.mapContainer.append('<img src="' + mapObj.map_image.url + '" alt="' + mapObj.map_image.title + '" id="island"/>')
        },
        formatPopupContent: function(p) {
            var a = "";
            return p && (a += '<div class="popup-title">' + p.name + "</div>", a += '<div class="popup-description">' + p.description + "</div>", p.link.url && p.link.title && (p.link.target || (p.link.target = "_self"), a += '<a href="' + p.link.url + '" class="popup-link" target="' + p.link.target + '">' + p.link.title + " &raquo;</a>")), a
        },
        populateMapItems: function(p) {
            if (mapObj.map_groups) {
                var a = this,
                    e = a.objContainer,
                    t = a.activeObjs,
                    i = a.activeObjsKeys;
                $.each(mapObj.map_groups, function(o, s) {
                    var r = "group_" + o;
                    mapObj.map_groups[o].group_items && $.each(mapObj.map_groups[o].group_items, function(a, t) {
                        var i = $("<div/>"),
                            s = "item_" + a;
                        i.addClass("obj-group popup-item"), i.attr("data-group", r), i.css({
                            width: mapObj.map_groups[o].group_items[a].item_width + "%",
                            top: mapObj.map_groups[o].group_items[a].item_position_top + "%",
                            left: mapObj.map_groups[o].group_items[a].item_position_left + "%",
                            opacity: mapObj.map_groups[o].group_items[a].item_opacity ? mapObj.map_groups[o].group_items[a].item_opacity : 1,
                            zIndex: o + 1
                        });
                        var n = $("<img/>");
                        n.addClass("obj"), n.addClass(s), n.prop("src", mapObj.map_groups[o].group_items[a].item_image.url), n.prop("alt", mapObj.map_groups[o].group_items[a].item_image.alt), e.append(i), p.preSelect && mapObj.selected_items.items.indexOf(r) == -1 && i.removeClass("popup-item"), "" == mapObj.map_groups[o].group_description && i.removeClass("popup-item"), i.append(n), $('.obj-group[data-group="' + r + '"]').find("." + s).on("load", function() {
                            var a = $(this).height(),
                                e = $(this).width(),
                                t = $("<div/>"),
                                i = "100%",
                                s = 0;
                            a > e && (i = "50%", s = "50%"), t.addClass("hover"), t.css({
                                width: "100%",
                                height: i,
                                top: s,
                                left: 0,
                                zIndex: -1
                            }), p.preSelect && t.css({
                                backgroundColor: mapObj.selected_items.color
                            }), "" == mapObj.map_groups[o].group_description && t.css({
                                backgroundColor: "transparent"
                            }), $(this).parent().append(t)
                        })
                    });
                    var n = a.formatPopupContent({
                        name: mapObj.map_groups[o].group_name,
                        description: mapObj.map_groups[o].group_description,
                        link: mapObj.map_groups[o].group_link
                    });
                    "" != mapObj.map_groups[o].group_description && (t[r] = n, i.push(r))
                }), p.preSelect ? a.preSelectMap() : $("body .obj-group").hover(function() {
                    $(this).addClass("hactive")
                }, function() {
                    $(this).removeClass("hactive")
                })
            }
        },
        preSelectMap: function() {
            $.each(mapObj.selected_items.items, function(p, a) {
                var e = $('[data-group="' + a + '"]');
                e.addClass("active")
            })
        }
    };
    $("body").hasClass("single-technology") ? p.init({
        preSelect: !0
    }) : p.init();
    var a = document.getElementById("map-content");
    Ps.initialize(a)
});