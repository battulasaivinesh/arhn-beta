// $('#about-stars canvas').css("top",$('.section-home-banner').height()-3);

window.addEventListener('resize', function () {



})

window.addEventListener("load", function(){ 
  //Events map size - 
  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var imgmeteor=$('#meteor');

  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  
  

  


 // (function() {
 //    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || 
 //                  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function( callback ){
 //                window.setTimeout(callback, 1000 / 60);
 //              };
 //    window.requestAnimationFrame = requestAnimationFrame;
 //  })();

  // Terrain stuff.






  $('#l-one').hover(function(){
      $('#l-one a').css("color","#37a8ee")
  },function(){
      $('#l-one a').css("color","#ffffff")
  });

  $('#l-two').hover(function(){
      $('#l-two a').css("color","#37a8ee")
  },function(){
      $('#l-two a').css("color","#9d9d9d")
  });

  $('#l-three').hover(function(){
      $('#l-three a').css("color","#37a8ee")
  },function(){
      $('#l-three a').css("color","#9d9d9d")
  });

  $('#l-four').hover(function(){
      $('#l-four a').css("color","#37a8ee")
  },function(){
      $('#l-four a').css("color","#9d9d9d")
  });

  $('#l-five').hover(function(){
      $('#l-five a').css("color","#37a8ee")
  },function(){
      $('#l-five a').css("color","#9d9d9d")
  });

  $('#l-six').hover(function(){
      $('#l-six a').css("color","#37a8ee")
  },function(){
      $('#l-six a').css("color","#9d9d9d")
  });

   $('#l-seven').hover(function(){
      $('#l-seven a').css("color","#37a8ee")
  },function(){
      $('#l-seven a').css("color","#9d9d9d")
  });




  var terrain = document.getElementById("terCanvas"),
    background = document.getElementById("bgCanvas"),
    terCtx = terrain.getContext("2d"),
    bgCtx = background.getContext("2d"),
    width = window.innerWidth,
    height = document.body.offsetHeight;
    (height < 400)?height = 400:height;

  terrain.width = background.width = width;
  terrain.height = background.height = height;

  // Some random points
  var points = [],
    displacement = 140,
    power = Math.pow(2,Math.ceil(Math.log(width)/(Math.log(2))));
  
  // set the start height and end height for the terrain
  points[0] = (height - (Math.random()*height/2))-displacement;
  points[power] = (height - (Math.random()*height/2))-displacement;

  // create the rest of the points
  for(var i = 1; i<power; i*=2){
    for(var j = (power/i)/2; j <power; j+=power/i){
      points[j] = ((points[j - (power/i)/2] + points[j + (power/i)/2]) / 2) + Math.floor(Math.random()*-displacement+displacement );
    }
    displacement *= 0.6;
  }

  // draw the terrain
  terCtx.beginPath();
          
  for(var i = 0; i<=width; i++){
    if(i === 0){
      terCtx.moveTo(0, points[0]);
    }else if(points[i] !== undefined){
      terCtx.lineTo(i, points[i]);
    }
  }

  terCtx.lineTo(width,terrain.height);
  terCtx.lineTo(0,terrain.height);
  terCtx.lineTo(0,points[0]);
  // terCtx.fill();

  // Second canvas used for the stars
  bgCtx.fillStyle = 'rgba(13,32,28,1)';
  bgCtx.fillRect(0,0,width,height);

  // stars
  function Star(options){
    this.size = Math.random()*2;
    this.speed = Math.random()*0.5 + 0.1;
    this.x = options.x;
    this.y = options.y;
  }

  Star.prototype.reset = function(){
    this.size = Math.random()*2;
    this.speed = Math.random()*0.5 + 0.1;
    this.x = width;
    this.y = Math.random()*height;
  }
  
  Star.prototype.update = function(){
    this.x-=this.speed;
    if(this.x<0){
      this.reset();
    }else{
      bgCtx.fillRect(this.x,this.y,this.size,this.size); 
    }
  }
  
  function ShootingStar(){
    this.reset();
  }
  
  ShootingStar.prototype.reset = function(){
    this.x = Math.random()*width;
    this.y = 0;
    this.len = (Math.random()*80)+30;
    this.speed = (Math.random()*10)+6;
    this.size = (Math.random()*1)+0.8;
    // this is used so the shooting stars arent constant
    this.waitTime =  new Date().getTime() + (Math.random()*1000);
    this.active = false;
  }
  
  ShootingStar.prototype.update = function(){
    if(this.active){
      this.x-=this.speed;
      this.y+=this.speed;
      if(this.x<0 || this.y >= height){
        this.reset();
      }else{
      bgCtx.lineWidth = this.size;
        bgCtx.beginPath();
        bgCtx.moveTo(this.x,this.y);
        bgCtx.lineTo(this.x+this.len, this.y-this.len);
        bgCtx.stroke();
      }
    }else{
      if(this.waitTime < new Date().getTime()){
        this.active = true;
      }     
    }
  }

  var entities = [];
  
  // init the stars
  for(var i=0; i < height; i++){
    entities.push(new Star({x:Math.random()*width, y:Math.random()*height}));
  }
  
  // Add 2 shooting stars that just cycle.
  entities.push(new ShootingStar());
  entities.push(new ShootingStar());
  
  // //animate background
  function animation(){

    var my_gradient = bgCtx.createLinearGradient(0,0,0,height);
    my_gradient.addColorStop(0.35,"#17223f ");
    my_gradient.addColorStop(1,"#3dc8e9");
    bgCtx.fillStyle = my_gradient
    bgCtx.fillRect(0,0,width,height);
    bgCtx.fillStyle = '#ffffff';
    bgCtx.strokeStyle = '#ffffff';

    var entLen = entities.length;
    
    while(entLen--){
      entities[entLen].update();
    }
    
    requestAnimationFrame(animation);
  }


  animation();

  // (function() {
  //   var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || 
  //                 window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function( callback ){
  //               window.setTimeout(callback, 1000 / 60);
  //             };
  //   window.requestAnimationFrame = requestAnimationFrame;
  // })();

  // Terrain stuff.
  var terrain2 = document.getElementById("terCanvas2"),
    background2 = document.getElementById("bgCanvas2"),
    bgCtx2 = background2.getContext("2d"),
    width = window.innerWidth,
    height2 = document.body.offsetHeight*5.6;
    if(windowWidth < 500){
      height2 = document.body.offsetHeight*5.4;
    }
    // console.log(document.body.offsetHeight)
    // (height2 < 400)?height2 = 400:height2;

  terrain2.width = background2.width = width;
  terrain2.height = background2.height = height2;

  // Some random points
  var points = [],
    displacement = 140,
    power = Math.pow(2,Math.ceil(Math.log(width)/(Math.log(2))));
  
  // set the start height and end height for the terrain
  points[0] = (height2 - (Math.random()*height2/2))-displacement;
  points[power] = (height2 - (Math.random()*height2/2))-displacement;

  // create the rest of the points
  for(var i = 1; i<power; i*=2){
    for(var j = (power/i)/2; j <power; j+=power/i){
      points[j] = ((points[j - (power/i)/2] + points[j + (power/i)/2]) / 2) + Math.floor(Math.random()*-displacement+displacement );
    }
    displacement *= 0.6;
  }


  // Second canvas used for the stars
  bgCtx2.fillStyle = 'rgba(13,32,28,1)';
  bgCtx2.fillRect(0,0,width,height2);

  // stars
  function Star2(options){
    this.size = Math.random()*2;
    this.speed = Math.random()*0.5 + 0.1;
    this.x = options.x;
    this.y = options.y;
  }

  Star2.prototype.reset = function(){
    this.size = Math.random()*2;
    this.speed = Math.random()*0.5 + 0.1;
    this.x = width;
    this.y = Math.random()*height2;
  }
  
  Star2.prototype.update = function(){
    this.x-=this.speed;
    if(this.x<0){
      this.reset();
    }else{
      bgCtx2.fillRect(this.x,this.y,this.size,this.size); 
    }
  }
  

  var entities2 = [];
  
  // init the stars
  for(var i=0; i < height2*0.3; i++){
    entities2.push(new Star2({x:Math.random()*width, y:Math.random()*height2}));
  }
  
  // Add 2 shooting stars that just cycle.
  // entities.push(new ShootingStar());
  // entities.push(new ShootingStar());
  
  //animate background
  function animate2(){
    bgCtx2.fillStyle = "#17223f "
    bgCtx2.fillRect(0,0,width,height2);
    bgCtx2.fillStyle = '#ffffff';
    bgCtx2.strokeStyle = '#ffffff';

    var entLen = entities2.length;
    
    while(entLen--){
      entities2[entLen].update();
    }
    
    requestAnimationFrame(animate2);
  }


  animate2();







  var keys = [37, 38, 39, 40];

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;  
  }

  function keydown(e) {
      for (var i = keys.length; i--;) {
          if (e.keyCode === keys[i]) {
              preventDefault(e);
              return;
          }
      }
  }

  function wheel(e) {
    preventDefault(e);
  }

  function disable_scroll() {
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;

      $(".mob-touch").css("touch-action","none")
      $("body").css("touch-action","none")
      $("#container").css("touch-action","none")
    
  }

  $('body').off('touchmove', false);

  $( '.container' ).on( 'mousewheel', function ( e ) {
    var event = e.originalEvent,
        d = event.wheelDelta || -event.detail;
    
    this.scrollTop += ( d < 0 ? 1 : -1 ) * 30;
    e.preventDefault();
  });

  function enable_scroll() {

       $("body").css("touch-action","auto")
      $("#container").css("touch-action","pan-x")
      if (window.removeEventListener) {
          window.removeEventListener('DOMMouseScroll', wheel, false);
      }
      document.ontouchmove = function(e){ return true; }
      window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
  }

  var base = {width:975, height:523, top:0, left: 0};
  var one = {left:23, top:27, width:444, height:262};
  var two = {left:92, top:279, width:330, height:108};
  var three = {width:166, height:258, top:1, left: 412};
  var four = {width:279, height:190, top:251, left: 363};
  var five = {width:279, height:305, top:27, left: 578};
  var six = {width:245, height:243, top:197, left: 612};
  var seven = {width:200, height:124, top:352, left: 746};
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();

  var scale_factor =windowWidth/975;

  // if(scale_factor<1){
  //   scale_factor = 1;
  // }

  // if($(window).width() < 500){
  //   scale_factor = 0.3;
  // }
  

   


  function resize(id,scale,id_string){
    $('.events-map ' + id_string).css('width',id.width/windowWidth*100*scale + "vw");
    $('.events-map ' + id_string).css('height',id.height/windowHeight*100*scale + "vh");
    $('.events-map ' + id_string).css('left',id.left/windowWidth*100*scale + "vw");
    $('.events-map ' + id_string).css('top',id.top/windowHeight*100*scale + "vh");
  }

  resize(base,scale_factor,"#base");
  resize(base,scale_factor,"#base2");
  resize(one,scale_factor,"#top");
  resize(two,scale_factor,"#two");
  resize(three,scale_factor,'#three');
  resize(four,scale_factor,"#four");
  resize(five,scale_factor,"#five");
  resize(six,scale_factor,"#six");
  resize(seven,scale_factor,"#seven");

  $('img[usemap]').rwdImageMaps();

  var robot1_work = new TimelineMax({paused:true}).to("#land-robot1",1,{
                    rotation:-40, 
                    transformOrigin:"bottom left"
                }).from("#register-robot1",0.5,{
                    scale:0
                })

 var robot2_work = new TimelineMax({paused:true}).to("#land-robot2",1,{
                  rotation:-40, 
                  transformOrigin:"bottom left"
              }).from("#register-robot2",0.5,{
                  scale:0
              })


 var robot3_work = new TimelineMax({paused:true}).to("#land-robot3",1,{
                    rotation:-40, 
                    transformOrigin:"bottom left"
                }).from("#register-robot3",0.5,{
                    scale:0
                })
        
  


  $("#register1").on("click touch", function(e){
      e.preventDefault();
      // robot1_work.play();
      popup('aarohan-2018-421133')
      $('html, body').animate({
              scrollTop: $(".section-home-banner").offset().top
            }, 1000,function(){
                $('#container').animate({
                    scrollTop: 0
                  }, 200,function(){
                      $('#vertical-cont').animate({
                                scrollTop: 0
                       },200,function(){
                          $("container").css("overflow-y","hidden");
                          $("vert-container").css("overflow-y","hidden");
                       });
            });
      });
      enable_scroll();
      console.log("register1");
  });

  $("#register2").on("click touch", function(e){
      e.preventDefault();
      // robot2_work.pay();
      popup('aarohan-2018-421133')
      $('html, body').animate({
              scrollTop: $(".section-home-banner").offset().top
            }, 1000,function(){
                $('#container').animate({
                    scrollTop: 0
                  }, 200,function(){
                      $('#vertical-cont').animate({
                                scrollTop: 0
                       },200,function(){
                          $("container").css("overflow-y","hidden");
                          $("vert-container").css("overflow-y","hidden");
                       });
            });
      });
      work2_tl.reverse()
      enable_scroll();
      console.log("register2");
  });

  $("#register3").on("click touch", function(e){
      e.preventDefault();
      // robot3_work.play();
      popup('aarohan-2018-421133')
      $('html, body').animate({
              scrollTop: $(".section-home-banner").offset().top
            }, 1000,function(){
                $('#container').animate({
                    scrollTop: 0
                  }, 200,function(){
                      $('#vertical-cont').animate({
                                scrollTop: 0
                       },200,function(){
                          $("container").css("overflow-y","hidden");
                          $("vert-container").css("overflow-y","hidden");
                       });
            });
      });
      console.log("register3");
      enable_scroll();
      work3_tl.reverse()
  });


  $("#nav_home").on("click touch", function(e){
      e.preventDefault();
      $('html, body').animate({
              scrollTop: $(".section-home-banner").offset().top
            }, 1000,function(){
                $('#container').animate({
                    scrollTop: 0
                  }, 200,function(){
                      $('#vertical-cont').animate({
                                scrollTop: 0
                       },200,function(){
                          $("container").css("overflow-y","hidden");
                          $("vert-container").css("overflow-y","hidden");
                       });
            });
        });

    });

  $("#nav_about").on("click touch", function(e){
      e.preventDefault();
      $('html, body').animate({
              scrollTop: $("#about-us").offset().top
            }, 1000,function(){
                $('#container').animate({
                    scrollTop: 0
                  }, 200,function(){
                      $('#vertical-cont').animate({
                                scrollTop: 0
                       },200,function(){
                          $("container").css("overflow-y","hidden");
                          $("vert-container").css("overflow-y","hidden");
                       });
            });
  });

});

  $("#nav_events").on("click touch", function(e){
      e.preventDefault();
      $('html, body').animate({
              scrollTop: $("#map").offset().top
            }, 1000,function(){
                $('#container').animate({
                    scrollTop: 0
                  }, 200,function(){
                      $('#vertical-cont').animate({
                                scrollTop: 0
                       },200,function(){
                          $("container").css("overflow-y","hidden");
                          $("vert-container").css("overflow-y","hidden");
                       });
            });
  });

});


  $("#nav_major").on("click touch", function(e){
      e.preventDefault();
      

     if(windowWidth> 500){
        $('html, body').animate({
              scrollTop: $("#city-front").offset().top
            }, 200, function(){
               $('#container').animate({
                    scrollTop: 0
                  }, 200,function(){
                    $('#vertical-cont').animate({
                              scrollTop: 0

                     },200,function(){
                        $("#container").css("overflow-y","scroll")
                        $("#container").css("touch-action","pan-x")
                     });
               });
          });

     }else{

      $('html, body').animate({
              scrollTop: $("#city-front").offset().top
            }, 200, function(){
               $('#container').animate({
                    scrollTop: 0
                  }, 200,function(){
                    $('#vertical-cont').animate({
                              scrollTop: 0

                     },200,function(){
                        $("#container").css("overflow-y","scroll")
                        $("#container").css("touch-action","pan-x")
                     });
               });
          });

     }
          


          

      

     

     

  });


  


    $("#nav_sponsors").on("click touchstart", function(e){
      e.preventDefault();

      if(windowWidth > 500){
          $('html, body').animate({
                scrollTop: $("#city-front").offset().top
              }, 200,function(){
                 $('#container').animate({
                    scrollTop: 9*windowWidth
                  }, 200,function(){
                      $('#vertical-cont').animate({
                                scrollTop: windowHeight*1.5
                       },200,function(){
                          $("#container").css("overflow-y","scroll")
                          $("#container").css("touch-action","pan-x")
                       });
                  });
              });
      }
      else{
           $('html, body').animate({
                scrollTop: $("#city-front").offset().top
              }, 200,function(){
                 $('#container').animate({
                    scrollTop: 16*windowWidth
                  }, 200,function(){
                      $('#vertical-cont').animate({
                                scrollTop: windowHeight*0.5
                       },200,function(){
                          $("#container").css("overflow-y","scroll")
                          $("#container").css("touch-action","pan-x")
                       });
                  });
              });
      }

      
          
      

  });

  $("#nav_team").on("click touchstart", function(e){
          e.preventDefault();

          if(windowWidth > 500){

            $('html, body').animate({
                scrollTop: $("#city-front").offset().top
              }, 200,function(){
                 $('#container').animate({
                    scrollTop: 9*windowWidth
                  }, 200,function(){
                      $('#vertical-cont').animate({
                                scrollTop: windowHeight*3.5
                       },200,function(){
                          $("#container").css("overflow-y","scroll")
                          $("#container").css("touch-action","pan-x")
                       });
                  });
              });
          }else{

            $('html, body').animate({
                scrollTop: $("#city-front").offset().top
              }, 200,function(){
                 $('#container').animate({
                    scrollTop: 16*windowWidth
                  }, 200,function(){
                      $('#vertical-cont').animate({
                                scrollTop: windowHeight*2
                       },200,function(){
                          $("#container").css("overflow-y","scroll")
                          $("#container").css("touch-action","pan-x")
                       });
                  });
              });
          }

            
         
          
   });


  $("#nav_hospitality").on("click touchstart", function(e){
          e.preventDefault();        

          if(windowWidth>500){
            $('html, body').animate({
                scrollTop: $("#city-front").offset().top
              }, 200,function(){
                 $('#container').animate({
                    scrollTop: 9*windowWidth
                  }, 200,function(){
                      $('#vertical-cont').animate({
                                scrollTop: windowHeight*6.5
                       },200,function(){
                          $("#container").css("overflow-y","scroll")
                          $("#container").css("touch-action","pan-x")
                       });
                  });
              });
          }else{

            $('html, body').animate({
                scrollTop: $("#city-front").offset().top
              }, 200,function(){
                 $('#container').animate({
                    scrollTop: 16*windowWidth
                  }, 200,function(){
                      $('#vertical-cont').animate({
                                scrollTop: windowHeight*6.5
                       },200,function(){
                          $("#container").css("overflow-y","scroll")
                          $("#container").css("touch-action","pan-x")
                       });
                  });
              });
      
        }   
              
   });


  $("#nav_contact").on("click touchstart", function(e){
          e.preventDefault();

          if(windowWidth > 500){
              $('html, body').animate({
                scrollTop: $("#city-front").offset().top
              }, 200,function(){
                 $('#container').animate({
                    scrollTop: 9*windowWidth
                  }, 200,function(){
                      $('#vertical-cont').animate({
                                scrollTop: windowHeight*8.5
                       },200,function(){
                          $("#container").css("overflow-y","scroll")
                          $("#container").css("touch-action","pan-x")
                       });
                  });
              });
          }else{
              $('html, body').animate({
                scrollTop: $("#city-front").offset().top
              }, 200,function(){
                 $('#container').animate({
                    scrollTop: 16*windowWidth
                  }, 200,function(){
                      $('#vertical-cont').animate({
                                scrollTop: windowHeight*10.5
                       },200,function(){
                          $("#container").css("overflow-y","scroll")
                          $("#container").css("touch-action","pan-x")
                       });
                  });
              });
          }
            
          
          
   });



  $("#nav_register").on("click touchstart", function(e){
          e.preventDefault();
            popup('aarohan-2018-421133')
      $('html, body').animate({
              scrollTop: $(".section-home-banner").offset().top
            }, 1000,function(){
                $('#container').animate({
                    scrollTop: 0
                  }, 200,function(){
                      $('#vertical-cont').animate({
                                scrollTop: 0
                       },200,function(){
                          $("container").css("overflow-y","hidden");
                          $("vert-container").css("overflow-y","hidden");
                       });
            });
      });
      enable_scroll();
     
            
          
          
   });



  // console.log($("#major-logo").offset().top);
// console.log($("#workshop-logo").offset().top);





  var controller = new ScrollMagic.Controller();
  var windowHeight = window.innerHeight;
  var windowWidth = window.innerWidth;

  var scene2 = new ScrollMagic.Scene({triggerElement: "#major-attractions #trigger2", duration: 0,triggerHook: 1})
            .addTo(controller)
            .on("start", function (e) {
                if(e.state == 'DURING'){
                    $('#container').css('overflow-y','scroll');
                    $('#body').css('overflow-y','hidden');
                    // $('#major-attractions').css('position','fixed');
                } 
                if(e.state == 'BEFORE'){
                    $('#container').css('overflow-y','hidden');
                    $('#body').css('overflow-y','scroll');
                } 
            });

  var scrollArea = window.innerWidth*12;


  var square1 = $('#city-front');


  var tlp = 0;

  var logo_timeline = new TimelineMax({paused:true})
                .to('#major-logo',0.5,{opacity:0});

  var open_timeline = new TimelineMax({paused:true})
                .set('.major-img img', {'-webkit-filter':'blur(5px)'})
                .to('.major-img .heading',1,{opacity:1},0.5)
                .to('.major-img .caption',1,{opacity:1},1);

  var two_timeline = new TimelineMax({paused:true})
                .to('.major-img1 img',1,{'-webkit-filter':'blur(5px)'})
                .to('.major-img1 .heading',1,{opacity:1},0.5)
                .to('.major-img1 .caption',1,{opacity:1},1);

  var three_timeline = new TimelineMax({paused:true})
                .to('.major-img2 img',1,{'-webkit-filter':'blur(5px)'})
                .to('.major-img2 .heading',1,{opacity:1},0.5)
                .to('.major-img2 .caption',1,{opacity:1},1);

  var work1_timeline = new TimelineMax({paused:true})
                .to('.work-img1 img',1,{'-webkit-filter':'blur(5px)'})
                .to('.work-img1 .heading2',1,{opacity:1},0.5)
                .to('.work-img1 .caption',1,{opacity:1},1);

  var work2_timeline = new TimelineMax({paused:true})
                .to('.work-img2 img',1,{'-webkit-filter':'blur(5px)'})
                .to('.work-img2 .heading2',1,{opacity:1},0.5)
                .to('.work-img2 .caption',1,{opacity:1},1);

  var work3_timeline = new TimelineMax({paused:true})
                .to('.work-img3 img',1,{'-webkit-filter':'blur(5px)'})
                .to('.work-img3 .heading2',1,{opacity:1},0.5)
                .to('.work-img3 .caption',1,{opacity:1},1);

  var work4_timeline = new TimelineMax({paused:true})
                .to('.work-img4 img',1,{'-webkit-filter':'blur(5px)'})
                .to('.work-img4 .heading2',1,{opacity:1},0.5)
                .to('.work-img4 .caption',1,{opacity:1},1);


   // var sponsorTimeline = new TimelineMax({paused:true})
   //          .to("#sponsors h1",0.5,{opacity:1,y:'-25'})
   //          .to("#1-sp",0.2,{opacity:1,y:'-5'},0)
   //          .to("#2-sp",0.2,{opacity:1,y:'-5'},0.1)
   //          .to("#3-sp",0.2,{opacity:1,y:'-5'},0.2)
   //          .to("#4-sp",0.2,{opacity:1,y:'-5'},0.3)
   //          .to("#5-sp",0.2,{opacity:1,y:'-5'},0.4)
   //          .to("#6-sp",0.2,{opacity:1,y:'-5'},0.5)
   //          .to("#7-sp",0.2,{opacity:1,y:'-5'},0.6)
   //          .to("#8-sp",0.2,{opacity:1,y:'-5'},0.7)
   //          .to("#9-sp",0.2,{opacity:1,y:'-5'},0.8)
   //          .to("#10-sp",0.2,{opacity:1,y:'-5'},0.9)
   //          .to("#11-sp",0.2,{opacity:1,y:'-5'},1)
   //          .to("#12-sp",0.2,{opacity:1,y:'-5'},1.1)
   //          .to("#13-sp",0.2,{opacity:1,y:'-5'},1.2)
   //          .to("#14-sp",0.2,{opacity:1,y:'-5'},1.3)
   //          .to("#15-sp",0.2,{opacity:1,y:'-5'},1.4)
   //          .to("#16-sp",0.2,{opacity:1,y:'-5'},1.5)
   //          .to("#17-sp",0.2,{opacity:1,y:'-5'},1.6)
   //          .to("#18-sp",0.2,{opacity:1,y:'-5'},1.7)
   //          .to("#19-sp",0.2,{opacity:1,y:'-5'},1.8)
   //          .to("#20-sp",0.2,{opacity:1,y:'-5'},1.9)
   //          .to("#21-sp",0.2,{opacity:1,y:'-5'},2)
   //          .to("#22-sp",0.2,{opacity:1,y:'-5'},2.1)
   //          .to("#23-sp",0.2,{opacity:1,y:'-5'},2.1)
   //          .to("#24-sp",0.2,{opacity:1,y:'-5'},2.3);


    var teamTimeline = new TimelineMax({paused:true})
            .to("#team_title",0.5,{opacity:1,y:'-25'})
            .to("#mem1",0.2,{opacity:1,y:'-5'},0)
            .to("#mem2",0.2,{opacity:1,y:'-5'},0.1)
            .to("#mem3",0.2,{opacity:1,y:'-5'},0.2)
            .to("#mem4",0.2,{opacity:1,y:'-5'},0.3)
            .to("#mem5",0.2,{opacity:1,y:'-5'},0.4)
            .to("#mem6",0.2,{opacity:1,y:'-5'},0.5)
            .to("#mem7",0.2,{opacity:1,y:'-5'},0.6)
            .to("#mem8",0.2,{opacity:1,y:'-5'},0.7)
            .to("#mem9",0.2,{opacity:1,y:'-5'},0.8)
            .to("#mem10",0.2,{opacity:1,y:'-5'},0.9)
            .to("#mem11",0.2,{opacity:1,y:'-5'},1)
            .to("#mem12",0.2,{opacity:1,y:'-5'},1.1)
            .to("#mem13",0.2,{opacity:1,y:'-5'},1.2)
            .to("#mem14",0.2,{opacity:1,y:'-5'},1.3)
            .to("#mem15",0.2,{opacity:1,y:'-5'},1.4)
            .to("#mem16",0.2,{opacity:1,y:'-5'},1.5)
            .to("#mem17",0.2,{opacity:1,y:'-5'},1.6)
            .to("#mem18",0.2,{opacity:1,y:'-5'},1.7)
            .to("#mem19",0.2,{opacity:1,y:'-5'},1.8)
            .to("#mem20",0.2,{opacity:1,y:'-5'},1.9)
            .to("#mem21",0.2,{opacity:1,y:'-5'},2)
            .to("#mem22",0.2,{opacity:1,y:'-5'},2.1)
            .to("#mem23",0.2,{opacity:1,y:'-5'},2.2)
            .to("#mem24",0.2,{opacity:1,y:'-5'},2.3)
            .to("#mem25",0.2,{opacity:1,y:'-5'},2.4)
            .to("#mem26",0.2,{opacity:1,y:'-5'},2.5)
            .to("#mem27",0.2,{opacity:1,y:'-5'},2.6)
            .to("#mem28",0.2,{opacity:1,y:'-5'},2.6)
            .to("#mem29",0.2,{opacity:1,y:'-5'},2.6)
            .to("#mem30",0.2,{opacity:1,y:'-5'},2.7)
            .to("#mem31",0.2,{opacity:1,y:'-5'},2.8);
            

    var hospTimeline = new TimelineMax({paused:true})
            .to("#hospitality #title",0.5,{opacity:1,y:'-25'})
            .from("#hospitality #space_ship",1,{scale:0,y:'-5'},0.5)
            .to("#hospitality .accom",1,{opacity:1,y:'-5'},0.5)
            .to("#hospitality .travel",1,{opacity:1,y:'-5'},1)
            .to("#hospitality .hospitality",1,{opacity:1,y:'-5'},1.5);

   $("#vertical-cont").css("touch-action","pan-down pan-x")

  $('#vertical-cont').scroll(function(){
       var t = $('#vertical-cont').scrollTop();

       var diff = t - $('#sponsors').scrollTop();

       if(t == 0){
          $("#vertical-cont").css("touch-action","pan-down pan-x")
       }

       if(t >= 0.4*windowHeight){
          $("#vertical-cont").css("touch-action","auto")
       }

       if(t > windowHeight*4.2){
          hospTimeline.play();
       }

       if(t < windowHeight/2){
          hospTimeline.pause(0);
       }

       if(t > 2*windowHeight){
          teamTimeline.play();
       }

       if(t < windowHeight/2){
          teamTimeline.pause(0);
       }

       if(t >= windowHeight/2){
          // sponsorTimeline.play();
       }

       // if(t==0){
       //     $('#sponsors-start').animate({
       //                // scrollTop: $(window).height(),
       //                height:windowHeight
       //          }, 800,function(){
       //              enable_scroll();
       //          });
       // }

       // console.log(t);

       // if(t == 0){
       //    sponsorTimeline.pause(0);
       // }
  });

      // $(window).stellar();

  // $(window).scroll(function(){
  //      var t = $(window).scrollTop();
  //      console.log(t);

  //      if(t > windowHeight*0.5){

  //      }
  // });

  if(windowWidth < 500){
    document.getElementById('city-front').src='img/city-front-mob.png'
    document.getElementById('city-front2').src='img/city-front-mob.png'
    document.getElementById('city-front3').src='img/city-front-mob.png'
    document.getElementById('city-front4').src='img/city-front-mob.png'
    document.getElementById('city-front5').src='img/city-front-mob.png'
    document.getElementById('city-front6').src='img/city-front-mob.png'
    document.getElementById('city-front7').src='img/city-front-mob.png'
    document.getElementById('city-front8').src='img/city-front-mob.png'
    document.getElementById('city-front9').src='img/city-front-mob.png'
    document.getElementById('city-front10').src='img/city-front-mob.png'
    document.getElementById('city-front11').src='img/city-front-mob.png'
    document.getElementById('city-front12').src='img/city-front-mob.png'
    document.getElementById('city-front13').src='img/city-front-mob.png'
    document.getElementById('city-front14').src='img/city-front-mob.png'
    document.getElementById('city-front15').src='img/city-front-mob.png'
    document.getElementById('city-front16').src='img/city-front-mob.png'
    document.getElementById('footer-img').src='img/footer-mob.png'

    // console.log("hello");
  }


  var windowWidth = $(window).width();

  if(windowWidth < 500){
    $('#major-ballon').css('left',3*windowWidth);
    $('#major-ballon2').css('left',4.5*windowWidth);
    $('#major-ballon3').css('left',6*windowWidth);
    $('#major-ballon4').css('left',7.5*windowWidth);

    var ballonTimiline = new TimelineMax({repeat:-1, yoyo:true})
              .to("#major-ballon",25,{x:-windowWidth*0.7})
              .set("#major-ballon",{transform:"rotateX(0deg) rotateY(180deg)"});

    var ballonTimiline2 = new TimelineMax({repeat:-1, yoyo:true})
              .to("#major-ballon2",25,{x:-windowWidth*0.7})
              .set("#major-ballon2",{transform:"rotateX(0deg) rotateY(180deg)"})

    var ballonTimiline3 = new TimelineMax({repeat:-1, yoyo:true})
              .to("#major-ballon3",25,{x:-windowWidth*0.7})
              .set("#major-ballon3",{transform:"rotateX(0deg) rotateY(180deg)"})

     var ballonTimiline4 = new TimelineMax({repeat:-1, yoyo:true})
              .to("#major-ballon4",25,{x:-windowWidth*0.7})
              .set("#major-ballon4",{transform:"rotateX(0deg) rotateY(180deg)"})

    $('#major-plane').css('left',windowWidth);

    $('#work-plane').css('left',9*windowWidth);   

     var mPlaneTimiline2 = new TimelineMax({repeat:-1})
              .to("#major-plane",25,{x:-windowWidth*0.7});

    var wPlaneTimiline3 = new TimelineMax({repeat:-1})
              .to("#work-plane",25,{x:-windowWidth*0.7});

    $('#work-ballon1').css('left',10.5*windowWidth);
    $('#work-ballon2').css('left',12*windowWidth);
    $('#work-ballon3').css('left',13.5*windowWidth);
    $('#work-ballon4').css('left',15*windowWidth);

    var ballonTimiline = new TimelineMax({repeat:-1, yoyo:true})
              .to("#work-ballon1",25,{x:-windowWidth*0.7})
              .set("#work-ballon1",{transform:"rotateX(0deg) rotateY(180deg)"});

    var ballonTimiline2 = new TimelineMax({repeat:-1, yoyo:true})
              .to("#work-ballon2",25,{x:-windowWidth*0.7})
              .set("#work-ballon2",{transform:"rotateX(0deg) rotateY(180deg)"})

    var ballonTimiline3 = new TimelineMax({repeat:-1, yoyo:true})
              .to("#work-ballon3",25,{x:-windowWidth*1})
              .set("#work-ballon3",{transform:"rotateX(0deg) rotateY(180deg)"})

    var ballonTimiline4 = new TimelineMax({repeat:-1, yoyo:true})
              .to("#work-ballon4",25,{x:-windowWidth*1})
              .set("#work-ballon4",{transform:"rotateX(0deg) rotateY(180deg)"})
  }
  else{
    $('#major-ballon').css('left',2*windowWidth);
    $('#major-ballon2').css('left',2.8*windowWidth);
    $('#major-ballon3').css('left',3.6*windowWidth);
    $('#major-ballon4').css('left',4.4*windowWidth);

    var ballonTimiline = new TimelineMax({repeat:-1, yoyo:true})
              .to("#major-ballon",25,{ease: Power0.easeNone,x:-windowWidth*0.7})
              .set("#major-ballon",{transform:"rotateX(0deg) rotateY(180deg)"});

    var ballonTimiline2 = new TimelineMax({repeat:-1, yoyo:true})
              .to("#major-ballon2",25,{ease: Power0.easeNone,x:-windowWidth*0.7})
              .set("#major-ballon2",{transform:"rotateX(0deg) rotateY(180deg)"})

    var ballonTimiline3 = new TimelineMax({repeat:-1, yoyo:true})
              .to("#major-ballon3",25,{ease: Power0.easeNone,x:-windowWidth*0.7})
              .set("#major-ballon3",{transform:"rotateX(0deg) rotateY(180deg)"})

    var ballonTimiline4 = new TimelineMax({repeat:-1, yoyo:true})
              .to("#major-ballon4",25,{ease: Power0.easeNone,x:-windowWidth*0.7})
              .set("#major-ballon4",{transform:"rotateX(0deg) rotateY(180deg)"})


    $('#major-plane').css('left',windowWidth);

    $('#work-plane').css('left',5.8*windowWidth);   

     var mPlaneTimiline2 = new TimelineMax({repeat:-1})
              .to("#major-plane",20,{ ease: Power0.easeNone,x:-windowWidth*1.2});

    var wPlaneTimiline3 = new TimelineMax({repeat:-1})
              .to("#work-plane",20,{ ease: Power0.easeNone, x:-windowWidth*0.9});


    $('#work-ballon1').css('left',6.8*windowWidth);
    $('#work-ballon2').css('left',7.6*windowWidth);
    $('#work-ballon3').css('left',8.4*windowWidth);
    $('#work-ballon4').css('left',9.2*windowWidth);

    var ballonTimiline = new TimelineMax({repeat:-1, yoyo:true})
              .to("#work-ballon1",25,{ease: Power0.easeNone,x:-windowWidth*0.7})
              .set("#work-ballon1",{transform:"rotateX(0deg) rotateY(180deg)"});

    var ballonTimiline2 = new TimelineMax({repeat:-1, yoyo:true})
              .to("#work-ballon2",25,{ease: Power0.easeNone,x:-windowWidth*0.7})
              .set("#work-ballon2",{transform:"rotateX(0deg) rotateY(180deg)"})

    var ballonTimiline3 = new TimelineMax({repeat:-1, yoyo:true})
              .to("#work-ballon3",25,{ease: Power0.easeNone,x:-windowWidth*0.7})
              .set("#work-ballon3",{transform:"rotateX(0deg) rotateY(180deg)"})

    var ballonTimiline4 = new TimelineMax({repeat:-1, yoyo:true})
              .to("#work-ballon4",25,{ease: Power0.easeNone,x:-windowWidth*0.7})
              .set("#work-ballon4",{transform:"rotateX(0deg) rotateY(180deg)"})
  }

  

  // var ballonTimiline2 = new TimelineMax()
  //           .from("#major-ballon2",5,{x:-windowWidth});

  // var ballonTimiline3 = new TimelineMax()
  //           .from("#major-ballon3",5,{x:-windowWidth});


 var aarohan_nights_tl  =  new TimelineMax({paused:true,onReverseComplete:enable_scroll})
                                    .to('#major-phone-1',1,{y:-windowHeight})
                                    .to('#major-phone-1',0.5,{backgroundColor: 'rgba(23, 34, 83, 0.5)'});

  var major1_nights_tl  =  new TimelineMax({paused:true,onReverseComplete:enable_scroll})
                                    .to('#major-phone-2',1,{y:-windowHeight})
                                     .to('#major-phone-2',1,{backgroundColor: 'rgba(23, 34, 83, 0.5)'});

  var major2_nights_tl  =  new TimelineMax({paused:true,onReverseComplete:enable_scroll})
                                    .to('#major-phone-3',1,{y:-windowHeight})
                                     .to('#major-phone-3',1,{backgroundColor: 'rgba(23, 34, 83, 0.5)'});

  var major3_nights_tl  =  new TimelineMax({paused:true,onReverseComplete:enable_scroll})
                                    .to('#major-phone-4',1,{y:-windowHeight})
                                     .to('#major-phone-4',1,{backgroundColor: 'rgba(23, 34, 83, 0.5)'});


var work1_tl  =  new TimelineMax({paused:true,onReverseComplete:enable_scroll})
                                    .to('#work-phone-1',1,{y:-windowHeight})
                                     .to('#work-phone-1',1,{backgroundColor: 'rgba(23, 34, 83, 0.5)'});


var work2_tl  =  new TimelineMax({paused:true,onReverseComplete:enable_scroll})
                                    .to('#work-phone-2',1,{y:-windowHeight})
                                     .to('#work-phone-2',1,{backgroundColor: 'rgba(23, 34, 83, 0.5)'});


var work3_tl  =  new TimelineMax({paused:true,onReverseComplete:enable_scroll})
                                    .to('#work-phone-3',1,{y:-windowHeight})
                                     .to('#work-phone-3',1,{backgroundColor: 'rgba(23, 34, 83, 0.5)'});



  $('#major-ballon').on('click touch',function(){
      // console.log("move-phone")
      disable_scroll();

      aarohan_nights_tl.play()
  });

   $('#major-phone-1 .back-touch').on('click touch',function(){
      // console.log("removed-phone")
      aarohan_nights_tl.reverse()
  });

    $('#major-phone-1 #back1').on('click touch',function(){
      // console.log("removed-phone")
      aarohan_nights_tl.reverse()
  });




  $('#major-ballon2').on('click touch',function(){
      // console.log("move-phone")
      disable_scroll();
      major1_nights_tl.play()
  });

  $('#major-phone-2 .back-touch').on('click touch',function(){
      // console.log("removed-phone")
   
     major1_nights_tl.reverse()
  });

    $('#major-phone-2 #back2').on('click touch',function(){
      // console.log("removed-phone")
   
     major1_nights_tl.reverse()
  });

  $('#major-ballon3').on('click touch',function(){
      // console.log("move-phone")
      disable_scroll();
      major2_nights_tl.play()
  });

  $('#major-phone-3 .back-touch').on('click touch',function(){
      // console.log("removed-phone")
     
     major2_nights_tl.reverse()
  });

   $('#major-phone-3 #back3').on('click touch',function(){
      // console.log("removed-phone")
    
     major2_nights_tl.reverse()
  });

  $('#major-ballon4').on('click touch',function(){
      // console.log("move-phone")
      disable_scroll();
      major3_nights_tl.play()
  });

  $('#major-phone-4 .back-touch').on('click touch',function(){
      // console.log("removed-phone")
  
     major3_nights_tl.reverse()
  });

  $('#major-phone-4 #back4').on('click touch',function(){
      // console.log("removed-phone")
     
     major3_nights_tl.reverse()
  });






  $('#work-ballon1').on('click touch',function(){
      // console.log("move-phone")
      disable_scroll();
      work1_tl.play()

  });

  $('#work-phone-1 .back-touch').on('click touch',function(){
      // console.log("removed-phone")
     
     work1_tl.reverse()
     robot1_work.reverse();
  });

   $('#work-phone-1 #back1').on('click touch',function(){
      // console.log("removed-phone")

     work1_tl.reverse()
     robot1_work.reverse();
  });

  $('#work-ballon2').on('click touch',function(){
      // console.log("move-phone")
      disable_scroll();
      work2_tl.play()
  });

  $('#work-phone-2 .back-touch').on('click touch',function(){
      // console.log("removed-phone")
     
     work2_tl.reverse()
     robot2_work.reverse();
  });

   $('#work-phone-2 #back2').on('click touch',function(){
      // console.log("removed-phone")
    
     work2_tl.reverse()
     robot2_work.reverse();
  });

  $('#work-ballon3').on('click touch',function(){
      // console.log("move-phone")
      disable_scroll();
      work3_tl.play()
  });

  $('#work-phone-3 .back-touch').on('click touch',function(){
      // console.log("removed-phone")
   
     work3_tl.reverse()
     robot3_work.reverse();
  });

  $('#work-phone-3 #back3').on('click touch',function(){
      // console.log("removed-phone")
   
     work3_tl.reverse()
     robot3_work.reverse();
  });

  var nav_timeline = new TimelineMax({paused:true}).to("#nav-aarohan",1,{opacity:1});

  var sponsor_timeline = new TimelineMax({paused:true}).to("#main_sponsors",1,{x:0.37*windowWidth})
                                            .to("#main_sponsors2",1,{x:-0.37*windowWidth},0);


  $(window).scroll(function(){
    var a = $(window).scrollTop();
    console.log(a);

    if(a < 1.1*windowWidth){
      nav_timeline.reverse();
    }

    if(a < 0.4*windowWidth && windowWidth > 500){
      sponsor_timeline.reverse();
    }

    if(a > 0.4*windowWidth && a < 1.0*windowWidth  && windowWidth >500){
      sponsor_timeline.play();

      console.log("yes")
    }

    if(a > 1.0*windowWidth && windowWidth > 500){
      sponsor_timeline.reverse();
    }


    if(a > 1.3*windowWidth){
       nav_timeline.play();
       console.log("visible");
    }
  })


  $('#container').scroll(function() {



  var scrollTop = $('#container').scrollTop();
  // console.log(scrollTop);
  var scrollPercent = scrollTop/scrollArea ;
  var scrollWidth = -scrollPercent*window.innerWidth*3;
  

  if(windowWidth<500){
  //    var scrollWidthBaloon1 = $(window).width()*3- scrollPercent*window.innerWidth*5;
  //     $('#major-ballon').css('left', scrollWidthBaloon1 + 'px');


  //     var scrollWidthBaloon2 = $(window).width()*4.5 - scrollPercent*window.innerWidth*5;
  //     $('#major-ballon2').css('left', scrollWidthBaloon2 + 'px');


  //     var scrollWidthBaloon3 = $(window).width()*6 - scrollPercent*window.innerWidth*5;
  //     $('#major-ballon3').css('left', scrollWidthBaloon3 + 'px');

  //      var scrollWidthBaloon4 = $(window).width()*9- scrollPercent*window.innerWidth*5;
  //     $('#work-ballon1').css('left', scrollWidthBaloon4 + 'px');


  //     var scrollWidthBaloon5 = $(window).width()*10.5 - scrollPercent*window.innerWidth*5;
  //     $('#work-ballon2').css('left', scrollWidthBaloon5 + 'px');


  //     var scrollWidthBaloon6 = $(window).width()*12 - scrollPercent*window.innerWidth*5;
  //     $('#work-ballon3').css('left', scrollWidthBaloon6 + 'px');

  //     var scrollWidthBaloon7 = $(window).width()*13.5 - scrollPercent*window.innerWidth*5;
  //     $('#work-ballon4').css('left', scrollWidthBaloon7 + 'px');


  //      var mscrollWidthBaloon6 = $(window).width() - scrollPercent*window.innerWidth*5;
  //     $('#major-plane').css('left', mscrollWidthBaloon6 + 'px');

  //     var wscrollWidthBaloon7 = $(window).width()*7.5 - scrollPercent*window.innerWidth*5;
  //     $('#work-plane').css('left', wscrollWidthBaloon7 + 'px');

  //     $('#city-front').css('left', scrollWidth + 'px');
  // var scrollWidth2 = $(window).width() - scrollPercent*window.innerWidth*3;
  // $('#city-front2').css('left', scrollWidth2 + 'px');

  //     var scrollWidthBack = -scrollPercent*window.innerWidth*1;
  //       $('#city-back').css('left', scrollWidthBack + 'px');
  //       var scrollWidthBack2 = $(window).width() - scrollPercent*window.innerWidth*1;
  //       $('#city-back2').css('left', scrollWidthBack2 + 'px');

  //       var scrollWidth3 = $(window).width()*2 - scrollPercent*window.innerWidth*3;
  //       $('#city-front3').css('left', scrollWidth3 + 'px');
  //       var scrollWidth4 = $(window).width()*3 - scrollPercent*window.innerWidth*3;
  //       $('#city-front4').css('left', scrollWidth4 + 'px');
  //       var scrollWidth8 = $(window).width()*4 - scrollPercent*window.innerWidth*3;
  //       $('#city-front5').css('left', scrollWidth8 + 'px');
  //       var scrollWidth9 = $(window).width()*5 - scrollPercent*window.innerWidth*3;
  //       $('#city-front6').css('left', scrollWidth9 + 'px');
  //        var scrollWidth10 = $(window).width()*6 - scrollPercent*window.innerWidth*3;
  //       $('#city-front7').css('left', scrollWidth10 + 'px');
  //       var scrollWidth11 = $(window).width()*7 - scrollPercent*window.innerWidth*3;
  //       $('#city-front8').css('left', scrollWidth11 + 'px');
  //        var scrollWidth12 = $(window).width()*8 - scrollPercent*window.innerWidth*3;
  //       $('#city-front9').css('left', scrollWidth12 + 'px');
  //       var scrollWidth13 = $(window).width()*9 - scrollPercent*window.innerWidth*3;
  //       $('#city-front10').css('left', scrollWidth13 + 'px');


  //       var scrollWidth5 = $(window).width()*2-scrollPercent*window.innerWidth*12;
  //       $('.major-img').css('left', scrollWidth5 + 'px');
  //       var scrollWidth6 = $(window).width()*3-scrollPercent*window.innerWidth*12;
  //       $('.major-img1').css('left', scrollWidth6 + 'px');
  //       var scrollWidth7 = $(window).width()*4-scrollPercent*window.innerWidth*12;
  //       $('.major-img2').css('left', scrollWidth7 + 'px');

  //       var scrollWork1 = $(window).width()*7-scrollPercent*window.innerWidth*12;
  //       $('.work-img1').css('left', scrollWork1 + 'px');
  //       var scrollWork2 = $(window).width()*8-scrollPercent*window.innerWidth*12;
  //       $('.work-img2').css('left', scrollWork2 + 'px');
  //       var scrollWork3 = $(window).width()*9-scrollPercent*window.innerWidth*12;
  //       $('.work-img3').css('left', scrollWork3 + 'px');
  //       var scrollWork4 = $(window).width()*10-scrollPercent*window.innerWidth*12;
  //       $('.work-img4').css('left', scrollWork4 + 'px');


  }else{
     // var scrollWidthBaloon1 = $(window).width()*2- scrollPercent*window.innerWidth*3.5;
     //  $('#major-ballon').css('left', scrollWidthBaloon1 + 'px');


     //  var scrollWidthBaloon2 = $(window).width()*2.8 - scrollPercent*window.innerWidth*3.5;
     //  $('#major-ballon2').css('left', scrollWidthBaloon2 + 'px');


     //  var scrollWidthBaloon3 = $(window).width()*3.6 - scrollPercent*window.innerWidth*3.5;
     //  $('#major-ballon3').css('left', scrollWidthBaloon3 + 'px');

     //   var scrollWidthBaloon4 = $(window).width()*6- scrollPercent*window.innerWidth*3.5;
     //  $('#work-ballon1').css('left', scrollWidthBaloon4 + 'px');


     //  var scrollWidthBaloon5 = $(window).width()*6.8 - scrollPercent*window.innerWidth*3.5;
     //  $('#work-ballon2').css('left', scrollWidthBaloon5 + 'px');


     //  var scrollWidthBaloon6 = $(window).width()*7.6 - scrollPercent*window.innerWidth*3.5;
     //  $('#work-ballon3').css('left', scrollWidthBaloon6 + 'px');

     //  var scrollWidthBaloon7 = $(window).width()*8.4 - scrollPercent*window.innerWidth*3.5;
     //  $('#work-ballon4').css('left', scrollWidthBaloon7 + 'px');

     //   var mscrollWidthBaloon6 = $(window).width() - scrollPercent*window.innerWidth*3.5;
     //  $('#major-plane').css('left', mscrollWidthBaloon6 + 'px');

     //  var wscrollWidthBaloon7 = $(window).width()*4.6 - scrollPercent*window.innerWidth*3.5;
     //  $('#work-plane').css('left', wscrollWidthBaloon7 + 'px');
  }

 


 

  
  // var scrollWidth8 = $(window).width()*0.25-scrollPercent*window.innerWidth*3;
  // $('#major-logo').css('left', scrollWidth8 + 'px');
  // console.log(window.innerWidth);

 
  

  var k = $('#container').scrollTop();

  // console.log(k);

  if(k==0){
    $('#container').css('overflow-y','hidden');
  }

  if(k>40){
    $('#container').css('touch-action','pan-x')
  }else{
    $('#container').css('touch-action','auto')
  }

  if(windowWidth < 500){
    if(k < $(window).width()*16 && k > $(window).width()*14){
      $('#vertical-cont').css('overflow-y','hidden');

    }

    // if(k< $(window).width()*25){
    //   $('#sponsors-start').animate({
    //                     // scrollTop: $(window).height(),
    //                     height:windowHeight
    //               }, 800,function(){
    //                   enable_scroll();
    //               });
    // }

    if(k == $(window).width()*16){
      $('#vertical-cont').css('overflow-y','scroll');
    }
  }else{
    if(k < $(window).width()*9 && k > $(window).width()*7){
      $('#vertical-cont').css('overflow-y','hidden');

    }

    // if(k< $(window).width()*25){
    //   $('#sponsors-start').animate({
    //                     // scrollTop: $(window).height(),
    //                     height:windowHeight
    //               }, 800,function(){
    //                   enable_scroll();
    //               });
    // }

    if(k == $(window).width()*9){
      $('#vertical-cont').css('overflow-y','scroll');
    }
  }

  

  if(k >= $(window).width()*5 && k <= $(window).width()*8 ){
             
              // var robot_timeline = new TimelineMax()
                            // .to("#robot2",0.2,{opacity:0})
                            // .to("#robot3",0.2,{opacity:1});
  }

  if(k >= $(window).width()*12.5 && k < $(window).width()*13.5){
    var robot_timeline = new TimelineMax()
                  .to("#workshop-logo",0.5,{opacity:1});
  }

  if(k >= $(window).width()*13.5){
    var robot_timeline = new TimelineMax()
                  .to("#workshop-logo",0.5,{opacity:0});
  }

  if(k < $(window).width()*12 && k > $(window).width()*11){
    var robot_timeline = new TimelineMax()
                  // .to("#robot3",0.2,{opacity:0})
                  // .to("#robot2",0.2,{opacity:1})
                  .to("#workshop-logo",0.5,{opacity:0},0);
  }


  // if(scrollWork1 > 0 && scrollWork1 < windowWidth/4){
  //   work1_timeline.play();
  // }

  // if(scrollWork1 > windowWidth){
  //   work1_timeline.pause(0);
  //   $('.work-img1 img').css('-webkit-filter','blur(0px)');
  // }

  // if(scrollWork2 > 0 && scrollWork2 < windowWidth/4){
  //   work2_timeline.play();
  // }

  // if(scrollWork2 > windowWidth){
  //   work2_timeline.pause(0);
  //   $('.work-img2 img').css('-webkit-filter','blur(0px)');
  // }

  // if(scrollWork3 > 0 && scrollWork3 < windowWidth/4){
  //   work3_timeline.play();
  // }

  // if(scrollWork3 > windowWidth){
  //   work3_timeline.pause(0);
  //   $('.work-img3 img').css('-webkit-filter','blur(0px)');
  // }

  // if(scrollWork4 > 0 && scrollWork4 < windowWidth/4){
  //   work4_timeline.play();
  // }

  // if(scrollWork4 > windowWidth){
  //   work4_timeline.pause(0);
  //   $('.work-img4 img').css('-webkit-filter','blur(0px)');
  // }

  // if(scrollWidth7 > 0 && scrollWidth7 < windowWidth/4){
  //   three_timeline.play();

  // }

  // if(scrollWidth7 > windowWidth){
  //   three_timeline.pause(0);
  //   $('.major-img2 img').css('-webkit-filter','blur(0px)');
  // }

  // if(scrollWidth6 > 0 && scrollWidth6 < windowWidth/4){
  //   two_timeline.play();
  // }

  // if(scrollWidth6 > windowWidth){
  //   two_timeline.pause(0);
  //   $('.major-img1 img').css('-webkit-filter','blur(0px)');
  // }

  // if(scrollWidth5 > 0 && scrollWidth5 < windowWidth/10){
  //   open_timeline.play();
  // }

  // if(scrollWidth5 < windowWidth/2 && scrollWidth5 > 0){
  //   logo_timeline.play();
  // }

  // if(scrollWidth5 > windowWidth){
  //   open_timeline.pause(0);
  //   $('.major-img img').css('-webkit-filter','blur(0px)');
  // }

  // if(scrollWidth5 > windowWidth/2 ){
  //   if(logo_timeline.totalProgress() == 1){
  //     logo_timeline.reverse();
  //   }
  // }

});


  var parallax_land = new TimelineMax()
                    // .to("#back1",1,{y:"0%", ease: Linear.easeNone})
                    .to("#back2",1,{y:"10%", ease: Linear.easeNone})
                    .to("#back3",1,{y:"15%", ease: Linear.easeNone},0)
                    .to("#back4",1,{y:"20%", ease: Linear.easeNone},0)
                    .to("#back5",1,{y:"25%", ease: Linear.easeNone},0)
                    .to("#back6",1,{y:"30%", ease: Linear.easeNone},0)
                    .to("#back7",1,{y:"35%", ease: Linear.easeNone},0)
                    .to("#back8",1,{y:"40%", ease: Linear.easeNone},0)
                    .to("#back9",1,{y:"45%", ease: Linear.easeNone},0);



  // build scenes
 var parr_scene =  new ScrollMagic.Scene({triggerElement: "#back1",duration:500,triggerHook:0,offset:-150})
          .setTween(parallax_land)
          // .addIndicators()
          .addTo(controller);



if(windowWidth > 0){


      var k = $('html, body');


  
  
  


// update position of square 1 and square 2 when scroll event fires.







      var scene3 = new ScrollMagic.Scene({triggerElement: "#hz-trigger",triggerHook: 1,offset:100})
                .addTo(controller)
                // .addIndicators()
                .on("enter leave", function (e) {
                    if("FORWARD" == e.scrollDirection ){
                          disable_scroll();
                          
                          console.log("done")
                          jQuery('html, body').animate({

                            scrollTop: jQuery($('#hz-container')).offset().top

                          }, 1000, 'swing', function () {

                              enable_scroll();

                          });
                          if(windowWidth > 0){
                             $("#container").css("overflow-y","scroll");
                          }

                         

                         var majotTimeline = new TimelineMax()
                                  .to("#city-front",0.5,{opacity:1},1)
                                  .to("#city-front2",0.5,{opacity:1},1)
                                  .to("#city-back",0.5,{opacity:1},1.5)
                                  .to("#city-back2",0.5,{opacity:1},1.5)
                                  .to("#major-logo",1,{opacity:1,y:'-25'},0.5);                                  
                                  // .to('#robot-grad',1,{opacity:1},0);
                                  // .to('#robot2',1,{opacity:1},0.5);
                                  
                          // history.replaceState(void 0, void 0, "#major-attractions")
                    } 

                    if("REVERSE" == e.scrollDirection ){
                       $("#container").css("overflow-y","hidden");
                          // disable_scroll();
                          // $('html, body').animate({
                          //     scrollTop: $('#map').offset().top
                          //   }, 800, function(){
                          //       enable_scroll();
                          //   });
                        $('#major-logo').css('opacity','0');
                        // $('#robot-grad').css('opacity','0');
                        // $('#robot2').css('opacity','0');
                        $('#city-front').css('opacity','0');
                        $('#city-front2').css('opacity','0');
                        $('#city-back').css('opacity','0');
                        $('#city-back2').css('opacity','0');
                        
                        var majotTimelineReverse = new TimelineMax()
                                    .to("#major-logo",0.1,{y:'25'},0.5)

                        // history.replaceState(void 0, void 0, "#map")
                    }

    });





  }

$("#register-robot").click(function() {
  window.open("/register","_blank");
})

$("#register_button_arhn").click(function() {
  window.open("/register","_blank");
})


$('#events-title-img').click(function() {
   window.open("/events", "_blank");
});


  // console.log($("#map").outerHeight());
  // console.log($("#events_map").outerHeight());
  

var ratio = 1075/1745;

var map_height = 0.8*$(window).width()*ratio + 0.39*$(window).height()


console.log( $('#major-about').outerHeight() );
console.log( $('#about').outerHeight() );
console.log(map_height);
console.log($("#major-space").outerHeight())

$('#about-stars').css("height", 

              $('#major-about').outerHeight() + 
              $('#about').outerHeight() +
              map_height  +
              $("#major-space").outerHeight() +
              0.5*$(window).height() );

});







