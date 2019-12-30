;(function($){

    'use strict';

  /**
   * Show/Hide Header Search
   */
  var headerBottom = $('.header-bottom'),
      headerSearchBlock = $('.header-search');

  $('.js-search-toggle').on('click', function(){
         
        if(headerBottom.hasClass('sticky-menu_visible')){
            headerBottom.toggleClass('sticky-menu_indent');
        }

        headerSearchBlock.toggleClass('header-search_active');
  });

  $('.js-header-search-close').on('click', function(){
        headerSearchBlock.removeClass('header-search_active');
        headerBottom.removeClass('sticky-menu_indent');
        return false;
  });

  /**
   * Show/Hide Mobile Menu
   */
  $('.js-toggle-mob-menu').on('click', function(){

        var headerBottomMenu = $('.header-bottom-menu');

      if(headerBottomMenu.is(':visible')){
        headerBottomMenu.slideUp();
        $(this).addClass('menu_close');
        $(this).removeClass('menu_open');
      }else{
        headerBottomMenu.slideDown();
        $(this).addClass('menu_open');
        $(this).removeClass('menu_close');
      }
        
  });

  /**
   * Show/Hide Child Menu Item
   */
  $('.js-has-child').on('click', function(e){
    
       e.stopPropagation();

    var menuItemId = $(this).attr('id'),
        subMenu = $('#'+menuItemId+' > .sub-menu'),
        icon = $(this).find('> a .fa');

    $(this).toggleClass('sub-menu_open');

    if(subMenu.is(':visible')){
        subMenu.slideUp();
        icon.addClass('fa-angle-right');
        icon.removeClass('fa-angle-down');
      }else{
        subMenu.slideDown();
        icon.addClass('fa-angle-down');
        icon.removeClass('fa-angle-right');
      }

  });

  /**
   * Back To Top
   */
  $(window).on('scroll', function () {
        if ($(this).scrollTop() > 600) {
            $('.back-to-top').addClass('back-to-top_visible');
        } else {
            $('.back-to-top').removeClass('back-to-top_visible');
        }
    });

    $('.back-to-top').on('click', function () {
       $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

  /**
   * Responsive Video Background
   */
  var headVideo = $('.headline-video');
  var headVideoWidthOr = 1280;
  var headVideoHeightOr = 720;

  $(window).on('resize', function(){
    
    var blockParentWidth = headVideo.parent().width();
    var blockParentHeight = headVideo.parent().height();
    
    var scaleWidth = blockParentWidth / headVideoWidthOr;
    var scaleHeight = blockParentHeight / headVideoHeightOr;
    var scale = scaleWidth > scaleHeight ? scaleWidth : scaleHeight;
    
    headVideo.width(scale * headVideoWidthOr);
    headVideo.height(scale * headVideoHeightOr);
    
  });
  
  $(window).trigger('resize');

  /**
   * Preloader
   */
  $(window).on('load', function (){
    $('.body-wrapper').removeClass('blank-loder');
    $('.blank-loader').css('display', 'none');
  });

  /**
   * Smooth Scrolling
   */
   $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .on('click', function(event) {
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
        && 
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            var $target = $(target);
            $target.on('focus');
            if ($target.is(':focus')) {
              return false;
            } else {
              $target.attr('tabindex','-1');
              $target.on('focus');
            };
          });
        }
      }
    });

})(jQuery);