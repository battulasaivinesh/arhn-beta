// jQuery(document).ready(function($) {
//     function e() {
//         $("body").on("mousewheel", function(e) {
//             e.preventDefault()
//         })
//     }

//     function t() {
//         $("body").unmousewheel()
//     }

//     function o() {
//         location.hash && "#top" != location.hash ? (a = !0, "#contact" === location.hash ? scroll_to_el(location.hash, -350) : scroll_to_el(location.hash)) : a = !1
//     }

//     function i(e, t) {
//         return Math.floor(Math.random() * (t - e + 1) + e)
//     }
//     var a = !1;
//     if ($(window).on("scroll", function(e) {
//             e.preventDefault()
//         }), o(), $(".banner-nav").length > 0) {
//         var l = $(".banner-nav").find("a");
//         l.on("click", function(t) {
//             var o = $(this).find("span").data("offset"),
//                 i = "undefined" != typeof o ? parseInt(o) : 0;
//             animation = !0, t.preventDefault(), e(), scroll_to_el($(this), i)
//         })
//     }
//     var n = {
//         init: function() {
//             this.addClouds(40, 0), this.animateScene()
//         },
//         addClouds: function(e, t) {
//             this.setGrid({}), this.addCell(e, t)
//         },
//         vars: {
//             cellWidth: 10,
//             cellHeight: 5,
//             windowWidth: 150,
//             windowHeight: 300,
//             cellCols: 0,
//             cellRows: 0,
//             totalCells: 0,
//             grid: [],
//             loadingContainer: $("#banner-bottom"),
//             cloudContainer: $(".clouds"),
//             cloudImg: settings.img_path + "/home-intro/cloud.svg",
//             cloudSize: [120, 180],
//             cloudSpeed: [50, 80],
//             newCloudsPos: [],
//             cloudsTimeline: ""
//         },
//         printGrid: function() {
//             var e = this.vars;
//             $.each(this.vars.grid, function(t, o) {
//                 var i = $("<div/>");
//                 i.css({
//                     width: e.cellWidth + "%",
//                     height: e.cellHeight + "%",
//                     backgroundColor: "#efefef",
//                     border: "1px solid #cccccc",
//                     position: "absolute",
//                     left: e.grid[t][0] * e.cellWidth + "%",
//                     top: e.grid[t][1] * e.cellHeight + "%",
//                     zIndex: 100,
//                     opacity: 1
//                 }), e.cloudContainer.append(i)
//             })
//         },
//         setGrid: function(e) {
//             var t = jQuery.extend({}, this.vars, e);
//             this.vars.cellCols = Math.floor(t.windowWidth / t.cellWidth), this.vars.cellRows = Math.floor(t.windowHeight / t.cellHeight);
//             for (var o = [], i = 0; i < this.vars.cellRows; i++)
//                 for (var a = 0; a < this.vars.cellCols; a++) o.push([a, i]);
//             this.vars.totalCells = this.vars.cellCols * this.vars.cellRows, this.vars.grid = o, this.newClouds()
//         },
//         getCellNeighbors: function(e) {
//             return [e - this.vars.cellCols - 1, e - this.vars.cellCols, e - this.vars.cellCols + 1, e - 1, e, e + 1, e + this.vars.cellCols - 1, e + this.vars.cellCols, e + this.vars.cellCols + 1]
//         },
//         cellHasNeighbors: function(e) {
//             var t = !1;
//             return e.length > 0 && $.each(e, function(o, i) {
//                 $("body").find('[data-pos="' + e[o] + '"]').length > 0 && (t = !0)
//             }), t
//         },
//         addCell: function(e, t) {
//             if (e = e || 0, t = t || [], e > 0)
//                 for (var o = 0; o < e; o++) {
//                     var a = i(0, this.vars.totalCells - 1);
//                     this.renderCell(a)
//                 } else t.length > 0
//         },
//         newClouds: function() {
//             for (var e = [], t = 1; t <= this.vars.cellRows; t++) e.push(t * this.vars.cellCols - 1);
//             this.vars.newCloudsPos = e
//         },
//         resetClouds: function() {
//             this.vars.cloudContainer.find(".cloud").remove(), this.vars.cloudContainer.css({
//                 transform: "translate(0)"
//             }), this.addClouds(10, 0)
//         },
//         renderCell: function(e) {
//             var t = this.getCellNeighbors(e);
//             if (this.cellHasNeighbors(t) === !0) e + 1 >= this.vars.totalCells && (e = -1), this.renderCell(e + 1);
//             else {
//                 var o = $('<div data-pos="' + e + '"/>'),
//                     a = i(50, 100);
//                 o.css({
//                     width: this.vars.cellWidth + "%",
//                     height: this.vars.cellHeight + "%",
//                     backgroundImage: "url(" + this.vars.cloudImg + ")",
//                     backgroundSize: a + "% auto",
//                     backgroundRepeat: "no-repeat",
//                     backgroundPosition: "center",
//                     position: "absolute",
//                     left: this.vars.grid[e][0] * this.vars.cellWidth + "%",
//                     top: this.vars.grid[e][1] * this.vars.cellHeight + "%",
//                     zIndex: 1,
//                     opacity: 1
//                 }), o.addClass("cloud"), this.vars.cloudContainer.append(o)
//             }
//         },
//         animateScene: function() {
//             function o() {
//                 m++, i.vars.windowHeight = 55, media_size("max-width:768px") && (i.vars.windowHeight = 100), i.vars.windowWidth = 150, m > 0 && i.resetClouds();
//                 var e = n.find(".cloud");
//                 i.vars.cloudsTimeline = new TimelineMax({
//                     onComplete: o,
//                     paused: !0
//                 }).from(e, 1, {
//                     opacity: 0,
//                     ease: "linear"
//                 }).to(e, 20, {
//                     delay: -.8,
//                     x: "-=150%",
//                     ease: "linear"
//                 }).to(e, 2, {
//                     delay: -3,
//                     opacity: 0
//                 }), i.vars.cloudsTimeline.play()
//             }
//             var i = this,
//                 l = $("#pnu-logo"),
//                 n = $(".section-home-banner"),
//                 r = i.vars.loadingContainer,
//                 s = l.find(".gradient"),
//                 c = l.find(".white"),
//                 d = $(".banner-text .title"),
//                 h = $(".banner-text .description"),
//                 u = $(".banner-text .banner-nav"),
//                 v = n.find(".clouds"),
//                 g = "-=" + (i.vars.windowHeight - 50) + "%",
//                 p = "-=" + (i.vars.windowHeight + i.vars.windowHeight / 2 + 125) + "%",
//                 m = -1,
//                 f = n.find("#satellite"),
//                 w = $("#main-nav-icon"),
//                 y = $("#public-beta-tag"),
//                 b = new TimelineMax({
//                     paused: !0,
//                     delay: 1
//                 }).to(r, 1, {
//                     opacity: 1
//                 }).from(f, 3, {
//                     scale: .9,
//                     x: "-=50",
//                     ease: "linear"
//                 }).to(f, .5, {
//                     y: p,
//                     delay: -1.5,
//                     ease: Power2.easeOut
//                 }).to(f, .5, {
//                     opacity: 0,
//                     delay: -1.5,
//                     ease: Power2.easeOut
//                 }).to(v, 3, {
//                     delay: -3.3,
//                     y: g,
//                     ease: Circ.easeInOut
//                 }).from(n, 3, {
//                     delay: -2,
//                     backgroundColor: "#346C75",
//                     ease: Power2.easeOut
//                 }).from(s, 2, {
//                     x: "+=5",
//                     delay: -2.2,
//                     opacity: 0,
//                     ease: Power2.easeOut
//                 }).from(c, 2, {
//                     x: "-=5",
//                     opacity: 0,
//                     delay: -2,
//                     ease: Power2.easeOut
//                 }).from(d, 1, {
//                     y: "+=25",
//                     opacity: 0,
//                     delay: -1,
//                     ease: Power2.easeOut
//                 }).from(h, 1, {
//                     y: "+=50",
//                     opacity: 0,
//                     delay: -.5,
//                     ease: Power2.easeOut
//                 });
//             media_size("min-width:769px") && b.fromTo(y, 1, {
//                 x: "+=200",
//                 opacity: 0
//             }, {
//                 x: "0",
//                 opacity: 1,
//                 delay: -.5,
//                 ease: Power2.easeOut
//             }), media_size("max-width:414px") && b.to(w, 1, {
//                 opacity: 1
//             }), b.from(u, 1, {
//                 y: "+=50",
//                 opacity: 0,
//                 delay: -.5,
//                 ease: Power2.easeOut
//             }).staggerFrom($(".scale img"), 2, {
//                 y: "+=100px",
//                 opacity: 0,
//                 scale: .95,
//                 ease: Power4.easeOut,
//                 onComplete: t
//             }, .1, "-=1"), a === !0 ? (o(), b.seek("-=0", !0)) : (e(), o(), b.play());
//             var C = $(".scene.l0"),
//                 S = $(".scene.l1"),
//                 _ = $(".scene.l2"),
//                 x = $(".scene.l3"),
//                 R = [50, 100, 200, 500];
//             media_size("max-width:768px") && (R = [25, 50, 90, 100]);
//             var E = new TimelineMax({}).to(C, 1, {
//                     y: "-=" + R[0]
//                 }).to(S, 1, {
//                     y: "-=" + R[1],
//                     delay: -1
//                 }).to(_, 1, {
//                     y: "-=" + R[2],
//                     delay: -1
//                 }).to(x, 1, {
//                     y: "-=" + R[3],
//                     delay: -1
//                 }),
//                 O = new ScrollMagic.Scene({
//                     triggerElement: n,
//                     duration: $("#banner-bottom").height()
//                 }).offset($("#banner-bottom").height() / 1.8).setTween(E).addTo(controller)
//         }
//     };
//     n.init();
//     var r = {
//         init: function() {
//             var t = new ScrollMagic.Controller,
//                 o = new ScrollMagic.Scene({
//                     triggerElement: $("#about")
//                 }).offset(-300).on("enter leave", function(t) {
//                     media_size("min-width:769px") && ("FORWARD" == t.scrollDirection ? (n.vars.cloudsTimeline.pause(), animation === !1 && (e(), scroll_to_el("#about"), history.replaceState(void 0, void 0, "#about"))) : "REVERSE" == t.scrollDirection && (n.vars.cloudsTimeline.play(), animation === !1 && (e(), scroll_to_el("#top"), history.replaceState(void 0, void 0, "#top"))))
//                 }).addTo(t),
//                 o = new ScrollMagic.Scene({
//                     triggerElement: $("#map")
//                 }).offset(-100).on("enter leave", function(t) {
//                     media_size("min-width:769px") && ("FORWARD" == t.scrollDirection ? animation === !1 && (e(), scroll_to_el("#map"), $("#public-beta-tag").fadeOut(500), history.replaceState(void 0, void 0, "#map")) : "REVERSE" == t.scrollDirection && animation === !1 && (e(), scroll_to_el("#about"), $("#public-beta-tag").fadeIn(500), history.replaceState(void 0, void 0, "#about")))
//                 }).addTo(t),
//                 o = new ScrollMagic.Scene({
//                     triggerElement: $("#technologies")
//                 }).offset(-200).on("enter leave", function(t) {
//                     media_size("min-width:769px") && ("FORWARD" == t.scrollDirection ? animation === !1 && (e(), scroll_to_el("#technologies", 200), $("#public-beta-tag").fadeOut(0), history.replaceState(void 0, void 0, "#technologies")) : "REVERSE" == t.scrollDirection && animation === !1 && (e(), scroll_to_el("#map"), history.replaceState(void 0, void 0, "#map")))
//                 }).addTo(t);
//             if (!isFirefox) var i = $("#meter").find("#needle"),
//                 a = new TimelineMax({
//                     repeat: -1,
//                     delay: 1
//                 }).to(i, 2, {
//                     rotation: "+=30",
//                     transformOrigin: "right bottom",
//                     ease: Power2.easeIn
//                 }).to(i, .25, {
//                     rotation: "-=10",
//                     ease: "linear"
//                 }).to(i, .15, {
//                     rotation: "+=5",
//                     ease: "linear"
//                 }).to(i, .25, {
//                     rotation: "-=5",
//                     ease: "linear"
//                 }).to(i, .15, {
//                     rotation: "+=5",
//                     ease: "linear"
//                 }).to(i, .3, {
//                     rotation: "0",
//                     ease: Power2.easeOut
//                 }),
//                 l = new ScrollMagic.Scene({
//                     triggerElement: $("#technologies")
//                 }).setTween(a).addTo(t);
//             var o = new ScrollMagic.Scene({
//                 triggerElement: $("#contact")
//             }).on("enter leave", function(t) {
//                 media_size("min-width:769px") && ("FORWARD" == t.scrollDirection ? (a.pause(), animation === !1 && (e(), scroll_to_el("#contact"), $("#public-beta-tag").fadeOut(0), history.replaceState(void 0, void 0, "#contact"))) : "REVERSE" == t.scrollDirection && (a.play(), animation === !1 && (e(), scroll_to_el("#technologies", 200), history.replaceState(void 0, void 0, "#technologies"))))
//             }).addTo(t);
//             if (!media_size("min-width:769px")) var o = new ScrollMagic.Scene({
//                     triggerElement: $("#about")
//                 }).on("enter leave", function(e) {
//                     "FORWARD" == e.scrollDirection ? $("#public-beta-tag").animate({
//                         opacity: 1
//                     }) : "REVERSE" == e.scrollDirection && $("#public-beta-tag").animate({
//                         opacity: 0
//                     })
//                 }).addTo(t),
//                 o = new ScrollMagic.Scene({
//                     triggerElement: $("#map")
//                 }).on("enter leave", function(e) {
//                     "FORWARD" == e.scrollDirection ? $("#public-beta-tag").animate({
//                         opacity: 0
//                     }) : "REVERSE" == e.scrollDirection && $("#public-beta-tag").animate({
//                         opacity: 1
//                     })
//                 }).addTo(t)
//         }
//     };
//     r.init()
// });
// //# sourceMappingURL=./home-min.js.map