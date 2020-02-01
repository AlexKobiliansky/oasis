$(document).ready(function(){
    /**
     * mobile-mnu customization
     */
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */

    $('#intro-slider').owlCarousel({
        loop:true,
        nav: true,
        items: 1,
        margin: 30,
        dots: false,
        autoHeight: false,
        autoplay: true,
        autoplayTimeout: 8000,
        navText: ["", ""],
        autoplaySpeed: 600,
        navSpeed: 600
    });

    $('.category-slider').owlCarousel({
        loop:true,
        nav: true,
        margin: 18,
        dots: false,
        autoHeight: false,
        navText: ["", ""],
        responsive:{
            0:{
                items:1,
            },
            480:{
                items:2,
            },
            768: {
                items: 3
            },
            992: {
                items:4,
            },
            1200:{
                items:5,
                loop:false
            }
        }
    });

    $('.comments-slider').owlCarousel({
        loop:true,
        nav: true,
        dots: false,
        autoHeight: true,
        navText: ["", ""],
        responsive:{
            0:{
                items:1,
            },
            768: {
                items: 1,
                margin: 18
            },
            1200: {
                items: 2,
                margin: 60
            }
        }
    });


    $('.product-slider').owlCarousel({
        loop:false,
        nav:false,
        autoHeight: true,
        items: 1,
        thumbs: true,
        dots: true,
        thumbsPrerendered: true,
        thumbItemClass: 'product-nav',
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        mouseDrag: false,
    });

    $('.product-slider').photoswipe({
        showAnimationDuration: 0,
        hideAnimationDuration: 0
    });


    $('.spinner-amount').on('click', 'button', function(e){

        var parent = $(this).parents('.spinner-amount');
        var input = parent.find('.amount');
        var amount = input.val();
        var btn = parent.siblings('.btn');

        if (!$(this).is('.down')) {
            amount++
        } else {
            if (amount > 1) amount--
        }

        input.val(amount).attr('value', amount);
    });


    function heightses() {

        if ($(window).width()>=480) {
            $('.category-slider').each(function(){
                $(this).find('.prod-item-title').equalHeights();
            });

            $('.comments-wrap .comment-item-name').height('auto').equalHeights();

        }

        $('.catalog-wrap .prod-item-title').height('auto').equalHeights();
    }

    $(window).resize(function() {
        heightses();
    });

    heightses();

    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    $('.preloader').fadeOut();

    $('.comment-item .roll').on('click', function(){
       var th = $(this);
       var item = th.parents('.comment-item');

        th.text(function(i, text){
            return text === "Читать дальше" ? "Свернуть" : "Читать дальше";
        });

        item.toggleClass('rolled');
    });

    //FORMS
    $('input[type="checkbox"]').styler();

    $('#check-all').change( function(){
        if(this.checked) {
            $('.cart-item').each(function(){
                $(this).find('.cart-item-check .jq-checkbox').addClass('checked');
                $(this).find('.cart-item-check input').prop('checked', true);
            })
        } else {
            $('.cart-item').each(function(){
                $(this).find('.cart-item-check .jq-checkbox').removeClass('checked');
                $(this).find('.cart-item-check input').prop('checked', false);
            })
        }
    });

    $('.pay-var').on('click', function(){
        var th = $(this);

       if(!th.hasClass('chosen')) {
           var pay = th.data('val');
           $('#pay').val(pay);
           th.addClass('chosen');
           th.siblings('.pay-var').removeClass('chosen');
       }
    });

    var uPhone = $('.user-phone');
    uPhone.mask("+7 (999) 999-99-99",{autoclear: false});

    uPhone.on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(4,4);
        needelem.focus();
    });

    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });

    $(function() {
        $(".btn-popup").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "my-mfp-zoom-in"
        })
    });

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);
        th.find(".btn").prop("disabled", "disabled").addClass("disabled");

        if (th.hasClass('cart-form')) {
            var k = 1;
            $('#cart .cart-item').each(function () {
                var name = $(this).find('.cart-item-title').text().replace("\"", '&#171;').replace("\"", '&#187;');;
                var code = $(this).find('.amount').val();
                var price = $(this).find('.product-price span').text();

                $('#cart-form').append('<input type="hidden" name="Заказанный товар '+k+'" value="'+name+'. Количество: ['+code+ 'шт.] . Стоимость ['+price+' руб.]">');
                k++;

            });

            var totalPrice = $('#total-price').text();
            $('#cart-form').append('<input type="hidden" name="Общая сумма заказа" value="'+totalPrice+' руб.">');
        };


        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

            $.magnificPopup.open({
                items: {
                    src: '#greeting'
                },
                type: 'inline',

                fixedContentPos: false,
                fixedBgPos: true,

                overflowY: 'auto',

                closeBtnInside: true,
                preloader: false,

                midClick: true,
                removalDelay: 300,
                mainClass: 'my-mfp-zoom-request'
            }, 0);


            setTimeout(function() {
                th.find(".btn").removeAttr('disabled').removeClass("disabled");
                th.trigger("reset");
                $.magnificPopup.close();
            }, 3000);

        });
        return false;
    });
});
