//
// main js
// --------------------------------------------------
//

var $ = jQuery.noConflict();

(function($) {
  'use strict';

//
// function start
// --------------------------------------------------
//

//
// variable
// --------------------------------------------------
//

  var $html = $('html');
  var $body = $('body');

//
// ie10 viewport fix
// --------------------------------------------------
//

  (function() {
    'use strict';
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement('style')
      msViewportStyle.appendChild(
        document.createTextNode(
          '@-ms-viewport{width:auto!important}'
        )
      )
      document.querySelector('head').appendChild(msViewportStyle)
    }
  })();

//
// core
// --------------------------------------------------
//
  // device detect
  if (!$html.hasClass('desktop')) {
    var isMobile = true;
    $html.addClass('is-mobile');
  } else {
    var isMobile = false;
    $html.addClass('is-desktop');
  }

  // browser detect
  if ($html.hasClass('ie9')) {
    var isIE9 = true;
  }

//
// init
// --------------------------------------------------
//

  function fn_init() {
    var id;    

    id = '#' + $('.section').filter('.is-active').attr('id');
    $('[data-link="' + id + '"]').addClass('is-active');

    // scrollbar init
    fn_scrollbar();

    if ($html.hasClass('cssanimations')) {
      $(id).find('[data-animation-in]').each(function() {
        var $this = $(this);
        var animationIn = 'fadeIn';
        var animationInDelay = 1;

        if ($this.data('animation-in')) {
          animationIn = $this.data('animation-in');
        }

        if ($this.data('animation-in-delay')) {
          animationInDelay = $this.data('animation-in-delay');
        }

        $this.css('animation-delay', animationInDelay + 500 + 'ms').addClass('animated').addClass(animationIn);
      });
    }

    // add loader class
    if (!_section_change_loader) {
      $body.addClass('is-site-loader-off');
    }

    // overlay
    if (_site_bg_overlay_toggle) {
      $body.addClass('is-overlay-on');
    } else {
      $body.addClass('is-overlay-off');
    }

    $('.site-bg-overlay').css('background-color', _site_bg_overlay_color);

  }

  function fn_siteLoader() {
    $('.site-loader').velocity('fadeOut', {
      queue: false,
      delay: 500,
      duration: 800,
      complete: function () {
        $('body').addClass('is-loaded');
        $(document).trigger('is-loaded');
      }
    });
  }

  $(window).on('load', function() {
    fn_init();
    fn_siteLoader();
  });


//
// size
// --------------------------------------------------
//

  function fn_size() {
    var $size = $('[data-size]');

    $size.each(function() {
      var $this = $(this);

      $this.css({'width': $this.data('size'), 'height': $this.data('size')});
    });
  }
  fn_size();

//
// scrollbar
// --------------------------------------------------
//

  function fn_scrollbar() {
    var $scrollBlock = $('.site-wrap');

    if (!isMobile) {
      $scrollBlock.perfectScrollbar({
        suppressScrollX: true
      });
    }
  }


//
// site background
// --------------------------------------------------
//

  function fn_siteBgImg() {
    $body.addClass('is-site-bg-img');
  }
  fn_siteBgImg();


//
// background effect
// --------------------------------------------------
//

  function fn_siteBgEffect() {
    if (_bg_effect == 0) {
    } else if (_bg_effect == 1) {
      $(window).on('load', function() {
        fn_siteBgCloud();
      });
    } else if (_bg_effect == 2) {
      $(window).on('load', function() {
        fn_siteBgParallaxStar();
      });
    } else if (_bg_effect == 3) {
      $(window).on('load', function() {
        fn_siteBgStar();
      });
    } else if (_bg_effect == 4) {
      $(window).on('load', function() {
        fn_siteBgBubble();
      });
    } else if (_bg_effect == 5) {
      $(window).on('load', function() {
        fn_siteBgSnow();
      });
    } else if (_bg_effect == 6) {
      $(window).on('load', function() {
        fn_siteBgParticles();
      });
    }
  }

  function fn_siteBgCloud() {
    var $siteBgEffect = $('.site-bg-effect');

    if ($siteBgEffect.length) {
      $siteBgEffect.append(
        '<div class="cloud"></div>' +
        '<div class="cloud"></div>' +
        '<div class="cloud"></div>'
      )

      $body.addClass('is-site-bg-cloud');

      fn_cloud01();
      fn_cloud02();
      fn_cloud03();

      $siteBgEffect.velocity({
        translateZ: '0',
        opacity: [_cloud_opacity, '0'],
      }, {
        display: 'block',
        duration: 3000
      });
    }
    $(document).trigger('is-bg-animation-loaded');
  }

  function fn_cloud01() {
    var $cloud = $('.cloud:nth-child(1)');

    $cloud.velocity({
      translateZ: '0',
      translateX: ['-100%', '100%']
    }, {
      duration: 25000,
      easing: 'linear',
      queue: false,
      complete: function() {
        $(this).velocity({
          translateX: '100%'
        }, {
          duration: 0,
          queue: false,
          complete: fn_cloud01
        });
      }
    });
  }

  function fn_cloud02() {
    var $cloud = $('.cloud:nth-child(2)');

    $cloud.velocity({
      translateZ: '0',
      translateX: ['-100%', '100%']
    }, {
      duration: 35000,
      easing: 'linear',
      queue: false,
      complete: function() {
        $(this).velocity({
          translateX: '100%'
        }, {
          duration: 0,
          queue: false,
          complete: fn_cloud02
        });
      }
    });
  }

  function fn_cloud03() {
    var $cloud = $('.cloud:nth-child(3)');

    $cloud.velocity({
      translateZ: '0',
      translateX: ['-100%', '100%']
    }, {
      duration: 45000,
      easing: 'linear',
      queue: false,
      complete: function() {
        $(this).velocity({
          translateX: '100%'
        }, {
          duration: 0,
          queue: false,
          complete: fn_cloud03
        });
      }
    });
  }

  function fn_siteBgParallaxStar() {
    var $siteBgEffect = $('.site-bg-effect');

    if ($siteBgEffect.length) {
      $siteBgEffect.append(
        '<div class="star"></div>' +
        '<div class="star"></div>' +
        '<div class="star"></div>'
      )

      $body.addClass('is-site-bg-parallax-star');

      fn_star01();
      fn_star02();
      fn_star03();

      $siteBgEffect.velocity({
        translateZ: '0',
        opacity: [_parallax_star_opacity, '0'],
      }, {
        display: 'block',
        duration: 3000
      });
    }
    $(document).trigger('is-bg-animation-loaded');
  }

  function fn_star01() {
    var $star = $('.star:nth-child(1)');

    $star.velocity({
      translateZ: '0',
      translateY: ['-2000px', '0']
    }, {
      duration: 50000,
      easing: 'linear',
      queue: false,
      complete: function() {
        $(this).velocity({
          translateY: '0'
        }, {
          duration: 0,
          queue: false,
          complete: fn_star01
        });
      }
    });
  }

  function fn_star02() {
    var $star = $('.star:nth-child(2)');

    $star.velocity({
      translateZ: '0',
      translateY: ['-2000px', '0']
    }, {
      duration: 100000,
      easing: 'linear',
      queue: false,
      complete: function() {
        $(this).velocity({
          translateY: '0'
        }, {
          duration: 0,
          queue: false,
          complete: fn_star02
        });
      }
    });
  }

  function fn_star03() {
    var $star = $('.star:nth-child(3)');

    $star.velocity({
      translateZ: '0',
      translateY: ['-2000px', '0']
    }, {
      duration: 150000,
      easing: 'linear',
      queue: false,
      complete: function() {
        $(this).velocity({
          translateY: '0'
        }, {
          duration: 0,
          queue: false,
          complete: fn_star03
        });
      }
    });
  }

  function fn_siteBgStar() {
    $body.addClass('is-site-bg-star');
    $('.site-bg-effect').remove();

    particlesJS("siteBg", {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 3
          },
          "image": {
            "src": "",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": _star_opacity,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 2,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": false,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": _star_direction,
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "repulse"
          },
          "onclick": {
            "enable": false,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
    $(document).trigger('is-bg-animation-loaded');
  }

  function fn_siteBgBubble() {
    $body.addClass('is-site-bg-bubble');
    $('.site-bg-effect').remove();

    particlesJS("siteBg", {
      "particles": {
        "number": {
          "value": 6,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#fff"
        },
        "shape": {
          "type": "polygon",
          "stroke": {
            "width": 0,
            "color": "#000"
          },
          "polygon": {
            "nb_sides": 6
          },
          "image": {
            "src": "",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": _bubble_opacity,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 160,
          "random": false,
          "anim": {
            "enable": true,
            "speed": 10,
            "size_min": 40,
            "sync": false
          }
        },
        "line_linked": {
          "enable": false,
          "distance": 200,
          "color": "#ffffff",
          "opacity": 1,
          "width": 2
        },
        "move": {
          "enable": true,
          "speed": 8,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "grab"
          },
          "onclick": {
            "enable": false,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
    $(document).trigger('is-bg-animation-loaded');
  }

  function fn_siteBgSnow() {
    $body.addClass('is-site-bg-snow');
    $('.site-bg-effect').remove();

    particlesJS("siteBg", {
      "particles": {
        "number": {
          "value": 200,
          "density": {
            "enable": true,
            "value_area": 1000
          }
        },
        "color": {
          "value": "#fff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.84,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 5,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": false,
          "distance": 500,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 2
        },
        "move": {
          "enable": true,
          "speed": _snow_speed,
          "direction": "bottom",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "bubble"
          },
          "onclick": {
            "enable": false,
            "mode": "repulse"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 0.5
            }
          },
          "bubble": {
            "distance": 400,
            "size": 4,
            "duration": 0.3,
            "opacity": 1,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
    $(document).trigger('is-bg-animation-loaded');
  }

  function fn_siteBgParticles() {
    $body.addClass('is-site-bg-particles');
    $('.site-bg-effect').remove();

    particlesJS("siteBg", {
      "particles": {
        "number": {
          "value": 60,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": _particles_opacity,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": _particles_line_opacity,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": _particles_speed,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "repulse"
          },
          "onclick": {
            "enable": false,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
    $(document).trigger('is-bg-animation-loaded');
  }
  fn_siteBgEffect();

//
// parallax
// --------------------------------------------------
//

  function fn_parallax() {
    if (_bg_animation_parallax && !isMobile && !isIE9 && _bg_effect != 0) {
      $body.addClass('is-bg-animation-parallax-on');

      $(document).one('is-bg-animation-loaded', function() {
        var $particles = $('.particles-js-canvas-el');
        var $parallax = $('.site-bg');

        $('.site-bg-effect').add($particles).each(function() {
          var $this = $(this);

          if ($this.length) {
            $this.addClass('layer').attr('data-depth', _bg_animation_parallax_depth);
          }
        });
        $parallax.parallax('enable');
      });
    }
  }
  fn_parallax();
//
// function end
// --------------------------------------------------
//

})(jQuery);