;(function($){

    'use strict';

    /**
     * Set Extra Field Value in Package Style 1
     */
    $('.pnchr-package input[type=checkbox]').on('change', function(){

        var eFieldValSel1 = $(this).closest('.pnchr-package').find('.extra-field-1-target'),
            eFieldValSel2 = $(this).closest('.pnchr-package').find('.extra-field-2-target'),
            eFieldValDefText1 = eFieldValSel1.data('extra-field-1-def'),
            eFieldValDefText2 = eFieldValSel2.data('extra-field-2-def');

        if($(this).prop("checked")){
            var eFieldNewVal1 = $(this).data('extra-field-1-value'),
                eFieldNewVal2 = $(this).data('extra-field-2-value');

            if(eFieldNewVal1 != ''){
                eFieldValSel1.text(eFieldNewVal1);
            }

            if(eFieldNewVal2 != ''){
                eFieldValSel2.text(eFieldNewVal2);
            }
        }
        else{
            eFieldValSel1.text(eFieldValDefText1);
            eFieldValSel2.text(eFieldValDefText2);
        }
    });

    /**
     * Carusel Toggle Position
     */
    $(window).on('load', function(){
        $('.carusel-toggle').each(function(){
           var togglePosition = $(this).offset().top;
           var owlNav = $(this).closest('.js-carusel-wrapp').find('.owl-nav');
           var owlNavPosition = ( ($(this).height()  - 30 ) / 2 ) + togglePosition; //30 height nav block
           owlNav.offset({top:owlNavPosition});
        });
    });

})(jQuery);