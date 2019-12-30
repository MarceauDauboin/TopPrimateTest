;(function($){

'use strict';

    $('.schedule-order-form form').on('submit', function(){

    		var orderClassId = $('.schedule-order__class option:selected').val(),
    			orderUserName = $('.schedule-order__user-name').val(),
    			orderUserTel = $('.schedule-order__user-tel').val(),
    			orderUserEmail = $('.schedule-order__user-email').val(),
                scheduleId = $('.schedule-order__id-order').val(),
    			trainerId = $('.schedule-order__id-trainer').val(),
    			dateEvent = $('.schedule-order__event-date').val(),
                error = false;

            $('.schedule-order-form select, .schedule-order-form input').removeClass('schedule-order-form__field_error');

            $('.schedule-order-form input[type="text"]').each(function() {
                if($(this).val() == ''){
                    $(this).addClass('schedule-order-form__field_error');
                    error = true;
                }
            });

            if(!error){
                
                $('.schedule-order-form__submit input').attr('disabled', 'disabled').addClass('schedule-order-form__submit_disable');

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: pnchr_client_sch_script.url,
                    data: {
                    	action: 'pnchr_order_schedule',
                        nonce: pnchr_client_sch_script.nonce,
                        order_class_id: orderClassId,
                        order_user_name: orderUserName,
                        order_user_tel: orderUserTel,
                        order_user_email: orderUserEmail,
                        schedule_id: scheduleId,
                        trainer_id: trainerId,
                        date_event: dateEvent,
                    },
                    success: function(res){ 
                        
                        if(res != 0){
                            var currentButton = $("a[data-schedule-id='"+scheduleId+"']");
                            currentButton.css('display', 'none').next('.schedule__check').removeClass('schedule__check_disable');
                            currentButton.closest('.js-data-schedule-table-hours').addClass('schedule-table-hours_checked');
                            $('.schedule-order-form-wrapp').removeClass('schedule-order-form_show');
                            $('body').css('overflow-y', 'auto');
                            $('.schedule-order-form__submit input').prop('disabled', false).removeClass('schedule-order-form__submit_disable');
                        }

                    }
                });

            }
        $(this).css('pointer-events', 'auto');
        return false;

    });

    $('.js-order-form-close').on('click', function () {
        $('.schedule-order-form-wrapp').removeClass('schedule-order-form_show');
        $('body').css('overflow-y', 'auto');
    });

    $(document).on('click', function(e){
        var elem = $('.schedule-order-form');
        if(e.target!=elem[0] && !elem.has(e.target).length){
            $('.schedule-order-form-wrapp').removeClass('schedule-order-form_show');
            $('body').css('overflow-y', 'auto');
        }
    });

    function filterDigit(val){
        var intArray = val.match(/\d+/g);
        if(intArray && Array.isArray(intArray)){
           return intArray.join('');
        }
        return false;
    } 

    $('.schedule-order__user-tel').on('keyup', function(){
        var filterVal = filterDigit($(this).val());
        if(filterVal){
            $(this).val(filterVal);
        }else{
             $(this).val('');
        }
    });

    $('.js-schedule-submit').on('click', function(){
        $('.header-bottom').removeClass('sticky-menu_visible');
        $('.schedule-order-form-wrapp').addClass('schedule-order-form_show');
        $('body').css('overflow-y', 'hidden');
    	var scheduleId = $(this).data('schedule-id'),
            trainerId = $(this).data('trainer-id'),
            eventDate = $(this).closest('.js-data-schedule-table-hours').data('event-date'),
            eventDateData = $(this).closest('.js-data-schedule-table-hours').data('event-date-day'),
    		eventDateTime = $(this).closest('.js-data-schedule-table-hours').data('event-date-time');

        $('.js-order-date-calendar-val').text(eventDateData);
        $('.js-order-date-time-val').text(eventDateTime);
    	$('.schedule-order-form .schedule-order__event-date').val(eventDate);
        $('.schedule-order-form .schedule-order__id-order').val(scheduleId);
    	$('.schedule-order-form .schedule-order__id-trainer').val(trainerId);
    	return false;
    });

    $('.js-schedule-toggle-nav__link').on('click', function(){
            
        var classId = $(this).data('class-id');
        
        $('.js-schedule-toggle-nav__link').removeClass('schedule-toggle-nav__link-active');
        $(this).addClass('schedule-toggle-nav__link-active');
    
        if(window.innerWidth > 1099){
            $('.schedule-table-hours').each(function(){
                if(classId != 'all'){    
                    $(this).find('.js-schedule-table-hours').addClass('schedule-table-hours_disable');
                }
                else{
                    $(this).find('.js-schedule-table-hours').addClass('schedule-table-hours_active');
                    $(this).find('.js-schedule-table-hours').removeClass('schedule-table-hours_disable');
                }
            });
            
             $('.class-id-'+classId).find('.js-schedule-table-hours').addClass('schedule-table-hours_active');
             $('.class-id-'+classId).find('.js-schedule-table-hours').removeClass('schedule-table-hours_disable');
        }
        else{
 
            if(classId != 'all'){    
                $('.schedule-small .schedule-small__data').addClass('schedule-small-hours_disable');
                $('.schedule-small .schedule-small__data-row').addClass('schedule-small-hours_disable');

                $('.schedule-small .schedule-small__data').removeClass('schedule-small-hours_active');
                $('.schedule-small .schedule-small__data-row').removeClass('schedule-small-hours_active');

                
                $('.schedule-small .class-id-'+classId).addClass('schedule-small-hours_active');
                $('.schedule-small .class-id-'+classId).closest('.schedule-small__data').addClass('schedule-small-hours_active'); 

                $('.schedule-small .class-id-'+classId).removeClass('schedule-small-hours_disable')
                $('.schedule-small .class-id-'+classId).closest('.schedule-small__data').removeClass('schedule-small-hours_disable');
            }
            else{
                $('.schedule-small .schedule-small__data').addClass('schedule-small-hours_active')
                $('.schedule-small .schedule-small__data-row').addClass('schedule-small-hours_active')

                $('.schedule-small .schedule-small__data').removeClass('schedule-small-hours_disable');
                $('.schedule-small .schedule-small__data-row').removeClass('schedule-small-hours_disable');
            }
        }

        return false;
    });

})(jQuery);