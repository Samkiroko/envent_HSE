/*
Copyright (c) 2014 Himanshu Softtech.
------------------------------------------------------------------
[Master Javascript]

Template Name: Event Management System - Perfect Day
Version: 3.0
Author: Kamleshyadav
Website: http://himanshusofttech.com/
Purchase: http://codecanyon.net/user/kamleshyadav
-------------------------------------------------------------------*/


(function($) {
	"use strict";
	// timer countdown
	$('[data-countdown]').each(function() {
	   var $this = $(this), finalDate = $(this).data('countdown'); 
	   //console.log(finalDate);
	   $this.countdown(finalDate, function(event) {
		 $this.html(event.strftime('<div class="em_counter"><span><p>%D</p> <p>days</p></span> <span><p>%H</p> <p>hours</p></span> <span><p>%M</p> <p>minutes</p></span> <span><p>%S</p> <p>seconds</p></span></div>'));
	   });
	 });

})(jQuery);

$(document).ready(function(){
$('#eci_pay_paypal,.eci_pay_paypal_logo').hide();
$('#eci_proceed_to_pay_wait').hide();
});

function book_now(eventid){
	$('#couto').addClass('hide');	
	$('#eci_pay_paypal,.eci_pay_paypal_logo').hide();
	$('#eci_proceed_to_pay_wait').hide();
	$('.em_person_sec,#eci_proceed_to_pay').show();
	$('.em_person_seats_wrapper').show();
	$('#em_person').val('1');
	$('#em_person_err').text('');
	$('.stripe_container').html(''); 
	$('#cat_left').val('');
	var basepath = $('#basepath').val();
	$.post(basepath+"home/get_event_details/",
	{
		'eventid' 		: eventid,
	},
	function(data){
		var eventDetail = $.parseJSON(data);	
		if(eventDetail[0].eci_event_list_max_user == 0 && eventDetail[0].eci_event_list_noofcat !=''){
					 
			$('#cattable,#hiden').removeClass('hide');
			$('.withoutcat,#em_seats_left').addClass('hide');
			$('#myModalLabel').text(eventDetail[0].eci_event_list_name);
			$('#cattable').html(eventDetail['tableData']);
			//$('#hiden').html(eventDetail['hidd']);
			$('#event_id').val(eventDetail[0].eci_event_list_sno);
			$('#cat_count').val(eventDetail[0].eci_event_list_noofcat);
			$('#eci_event_membership_type').val(eventDetail[0].eci_event_membership_type);
					
			$('#em_booknow_popup').modal('show');
			return false;
		}else{
			
			$('#cattable,#hiden').addClass('hide');
			$('#cat_count').val(0);
			$('.withoutcat,#em_seats_left').removeClass('hide');
			$('#myModalLabel').text(eventDetail[0].eci_event_list_name);
			var em_seats_left = eventDetail[0].eci_event_list_max_user - eventDetail[1].tot_count;
			$('#em_seats_left').text(em_seats_left + ' Seats Left');
			if(em_seats_left == 0)
			{
				$('.em_person_sec,#eci_proceed_to_pay').hide();
			}
			else
			{
				$('#event_id').val(eventDetail[0].eci_event_list_sno);
				$('#max_users').val(eventDetail[0].eci_event_list_max_user);
				$('#total_count').val(eventDetail[1].tot_count);
				$('#eci_event_membership_type').val(eventDetail[0].eci_event_membership_type);
				
			}
			$('#em_booknow_popup').modal('show');
			return false;
		}
	});

}


function send_contact_query(){
 var valid=checkRequire('contactusform');
 if(valid!=0){
	 return false;
 }
var basepath = $('#basepath').val();
	var em_name=$('#em_name').val();
	var em_email=$('#em_email').val();
	var em_subject=$('#em_subject').val();
	var em_msg=$('#em_msg').val();
	var event_name=$('#event_name').val();
	$.ajax({
			type: "POST",
			url: basepath+"home/send_contact_query/",
			data: {
				'em_name':em_name,
				'em_email':em_email,
				'em_subject':em_subject,
				'em_msg':em_msg,
				'event_name':event_name,
				},
			success: function(msg) {
				var full_msg=msg.split("#");
				if(full_msg[0]=='1')
				{
					$('#em_name').val("");
					$('#em_email').val("");
					$('#em_subject').val("");
					$('#em_msg').val("");
					$('#contact_return_msg').html( full_msg[1] );
				}
				else
				{
					$('#em_name').val(em_name);
					$('#em_email').val(em_email);
					$('#em_subject').val(em_subject);
					$('#em_msg').val(em_msg);
					$('#contact_return_msg').html( full_msg[1] );
					toastr.success(full_msg[1] , 'Success');
				}
			}
		});
		return false;
}
// share email
 function share_email(){
	var dataArr = {}; 
	var share_email=$('#share_email').val().trim();
		 if(share_email==""){
			 toastr.error('You missed out some fields' , 'Error');
			 $('#share_email').focus();
			return false;
	     }
    var emRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,15}(?:\.[a-z]{2})?)$/i;
		if(!emRegex.test(share_email)) {
			toastr.error('Please enter valid email' , 'Error');
			 $('#share_email').focus();
			return false;  
		}
	var basepath = $('#basepath').val();	
	dataArr['share_email']=share_email;
	$.post(basepath+"ajax/share_email",dataArr,function(data, status) {
	if(data == 1){
		toastr.success('Thank you for sharing email with us ,we will shortly contact with you ','','');
		$('#share_email').val('');	   
	}
	else if(data ==2){
		toastr.error('This email is already subscribed','','');
	}else{
	    toastr.error('Opps Please try later after sometime','','');	
	}
  });
  }

function proceed_to_pay(){
	var book = {};
	$('#fullpayment #total').text('');
	$('#coupon_submit').text('Apply');
	$('#coupon_submit').attr('disabled',false);
	$('#coupon .couponResult').html('');
	$('#couponcode').val('');
	$('#em_invoice_name').val('');
	$('#em_invoice_email').val('');
	var em_person = $('#em_person').val();

	$('#couto').removeClass('hide');
	$('#em_person_err').text('');
	basepath = $('#basepath').val();
	event_id = $('#event_id').val();
	
	//*****************************************
	cate_count = $('#cat_count').val();
	$('#cattable').addClass('hide');
	amount= 0;
	person = 0 ;
	
	//*****************************************
	
	
	if($.trim(em_person) != "" && $.isNumeric( em_person ) && $.trim( em_person )!='0') 
	{ 
		if($.trim(cate_count) !=0 && $.trim(cate_count) !=""){
			var total = {};
			var price = {};
			var left_seats = {};
			var booked_seat =[];
			var arr_index = 0;
			for(var i=1;i<=cate_count;i++){
				catName = $('.cat_name'+i).text();
				catLeftSeat = $('.cat_left_seat'+i).text();
				catPrice = $('.cat_tic_price'+i).text();
				book_tickets = (isNaN(book_tickets = parseInt($('#noofseats_'+i).val(), 10)) ? 0 : book_tickets);
				cat_total = $('#noofseats_'+i).closest('td').attr('data-target');
				book[catName] = book_tickets;
				total[catName] = cat_total;
				price[catName] = catPrice;
				left_seats[catName] = catLeftSeat;
				booked_seat[arr_index] = catName+','+book_tickets+','+catPrice;
				arr_index++;
				if($.isNumeric(catPrice)){
					amount = amount + book_tickets * catPrice;
				} 
				person = parseInt(person) + parseInt(book_tickets);
					
				if(book_tickets > catLeftSeat)
				{
					$('#cattable').removeClass('hide');
					$('#couto').addClass('hide');
					toastr.error("Sorry, You can't book more than the number of seats left.",'error');
					$('#noofseats_'+i).focus();
					return false;
				}
			}
			 if(person =='' && person ==0 ){
					$('#cattable').removeClass('hide');
					$('#couto').addClass('hide');
					toastr.error('Enter No.Of Tickets Value','error');
					$('#noofseats_'+i).focus();
					return false;
				} 
				$('#couto').removeClass('hide');
				var eci_event_id = event_id;
				$('#event_amnt').val(amount);
				$('#total').html(amount);
				$('#totalseat').html(person);
				$('#noofperson').val(person);
				$('#em_ini').val(amount);
				$('#cat_left').val(JSON.stringify(booked_seat));
				 
				
				
				var booking_person="";
				var c=0;
				var p=0;
				for(c=0;c<person;c++){
					p++;
					 //booking_person+='<input type="text" class="form-control" name="person['+c+']" placeholder="'+stringifyNumber(c)+' Person Name">';
					 booking_person+='<input type="text" class="form-control" name="person[]" placeholder="'+p+' (Person Name)">';
				}
				$('.person-info').html(booking_person);
				$('#em_invoice_eventid').val(event_id);
				$('#em_invoice_ticketcount').val(person);
				$('#event_uniqueid').val('ev'+event_id+'ent'+person);
				$('#eci_proceed_to_pay,#eci_proceed_to_pay_wait,.em_person_sec').hide();
				$('#eci_pay_paypal,.eci_pay_paypal_logo').show();
				$('.em_person_seats_wrapper').hide();
				
					
				  
		}else{
		
			var  count_seats_left = $('#max_users').val() - $('#total_count').val();
			if(count_seats_left > em_person || count_seats_left == em_person)
			{
				$('#eci_proceed_to_pay_wait').show();
				$.post(basepath+"home/get_event_details/",
				{
					'eventid' 		: event_id,
				},
				  function(data){
					
					var eventDetail = $.parseJSON(data);
					var eci_event_maxusers = eventDetail[0].eci_event_list_max_user;
					var eci_event_bookedusers = eventDetail[1].tot_count;
					var eci_event_bookingopen = eventDetail[0].eci_event_list_booking;
					
					if(eci_event_bookedusers != eci_event_maxusers && eci_event_bookingopen == 1 && (eci_event_maxusers - eci_event_bookedusers) != 0) {
						$('#em_seats_left').text((eci_event_maxusers - eci_event_bookedusers) + ' Seats Left');
						var eci_event_id = eventDetail[0].eci_event_list_sno;
						var eci_event_amnt = eventDetail[0].eci_event_list_amount;
						if($.isNumeric( eci_event_amnt ))
						{
					  
							$('#event_amnt').val(em_person*eci_event_amnt);
							//$('#em_invoice_amnt,#em_invoice_amnt_hidden').val('Total Amount to be Paid for '+em_person+' Seats is : '+em_person*eci_event_amnt);
							 $('#total').html(em_person*eci_event_amnt);
							 $('#totalseat').html(em_person);
							 $('#em_ini').val(eci_event_amnt);
							
						}
						else
						{
							$('#event_amnt').val(0);
							$('#em_invoice_amnt,#em_invoice_amnt_hidden').val('Total Seats : '+em_person+' and FREE of Cost.');
							$('#total').html('FREE');
							$('#totalseat').html(em_person);
							$('#em_ini').val(0);
						}
						var booking_person="";
						var c=0;
						var p=0;
						for(c=0;c<em_person;c++){
							p++;
							 //booking_person+='<input type="text" class="form-control" name="person['+c+']" placeholder="'+stringifyNumber(c)+' Person Name">';
							 booking_person+='<input type="text" class="form-control" name="person[]" placeholder="'+p+' (Person Name)">';
						}
						$('.person-info').html(booking_person);
						$('#em_invoice_eventid').val(eci_event_id);
						$('#em_invoice_ticketcount').val(em_person);
						$('#event_uniqueid').val('ev'+eci_event_id+'ent'+em_person);
						$('#eci_proceed_to_pay,#eci_proceed_to_pay_wait,.em_person_sec').hide();
						$('#eci_pay_paypal,.eci_pay_paypal_logo').show();
						$('.em_person_seats_wrapper').hide();
						
					}else
					{
						$('#eci_proceed_to_pay_wait').hide();
						$('#em_person_err').text('Booking is Over.');
					}
					
				  });
			}else
				$('#em_person_err').text("Sorry, You can't book more than the number of seats left.");
		}
	}else{
			$('#em_person_err').text('Please fill number of persons.');
		}

}
//***************** category booking ************************


function proceed_to_pay1(){

	$('#em_invoice_name').val('');
	$('#em_invoice_email').val('');
var em_person = $('#em_person').val();

$('#couto').removeClass('hide');
$('#em_person_err').text('');
if($.trim(em_person) != "" && $.isNumeric( em_person ) && $.trim( em_person )!='0') 
	{
		var basepath = $('#basepath').val();
		var  event_id = $('#event_id').val();
		var  count_seats_left = $('#max_users').val() - $('#total_count').val();
		
		if(count_seats_left > em_person || count_seats_left == em_person)
		{
		    $('#eci_proceed_to_pay_wait').show();
			$.post(basepath+"home/get_event_details/",
			{
				'eventid' 		: event_id,
			},
			  function(data){
				
				var eventDetail = $.parseJSON(data);
				//console.log(eventDetail);
				var eci_event_maxusers = eventDetail[0].eci_event_list_max_user;
				var eci_event_bookedusers = eventDetail[1].tot_count;
				var eci_event_bookingopen = eventDetail[0].eci_event_list_booking;
				if(eci_event_bookedusers != eci_event_maxusers && eci_event_bookingopen == 1 && (eci_event_maxusers - eci_event_bookedusers) != 0) {
					$('#em_seats_left').text((eci_event_maxusers - eci_event_bookedusers) + ' Seats Left');
					var eci_event_id = eventDetail[0].eci_event_list_sno;
					var eci_event_amnt = eventDetail[0].eci_event_list_amount;
					if($.isNumeric( eci_event_amnt ))
					{
                  
						$('#event_amnt').val(em_person*eci_event_amnt);
						//$('#em_invoice_amnt,#em_invoice_amnt_hidden').val('Total Amount to be Paid for '+em_person+' Seats is : '+em_person*eci_event_amnt);
					     $('#total').html(em_person*eci_event_amnt);
					     $('#totalseat').html(em_person);
					     $('#em_ini').val(eci_event_amnt);
					}
					else
					{
						$('#event_amnt').val('0');
						$('#em_invoice_amnt,#em_invoice_amnt_hidden').val('Total Seats : '+em_person+' and FREE of Cost.');
					    $('#total').html('FREE');
						$('#totalseat').html(em_person);
					    $('#em_ini').val(0);
					}
					var booking_person="";
					var c=0;
					var p=0;
					for(c=0;c<em_person;c++){
						p++;
						 //booking_person+='<input type="text" class="form-control" name="person['+c+']" placeholder="'+stringifyNumber(c)+' Person Name">';
						 booking_person+='<input type="text" class="form-control" name="person[]" placeholder="'+p+' (Person Name)">';
					}
					$('.person-info').html(booking_person);
					$('#em_invoice_eventid').val(eci_event_id);
					$('#em_invoice_ticketcount').val(em_person);
					$('#event_uniqueid').val('ev'+eci_event_id+'ent'+em_person);
					$('#eci_proceed_to_pay,#eci_proceed_to_pay_wait,.em_person_sec').hide();
					$('#eci_pay_paypal,.eci_pay_paypal_logo').show();
				$('.em_person_seats_wrapper').hide();
					
				}
				else
				{
					$('#eci_proceed_to_pay_wait').hide();
					$('#em_person_err').text('Booking is Over.');
				}
				
			  });
		}
		else
			$('#em_person_err').text("Sorry, You can't book more than the number of seats left.");
		
	}
	else
	{
		$('#em_person_err').text('Please fill number of persons.');
	}

}
//********************************************************** 

function pay_via_invoice_check(){
 $('#em_person_err').text("");
	var em_invoice_amnt = $('#em_invoice_amnt').val();
	var em_invoice_amnt_hidden = $('#em_invoice_amnt_hidden').val();
	
	if($('#em_invoice_name').length == 1)
		var em_invoice_name = $('#em_invoice_name').val();
	else
		var em_invoice_name = 'na';
	
	if($('#em_invoice_email').length == 1)
		var em_invoice_email = $('#em_invoice_email').val();
	else
		var em_invoice_email = 'na@hsoft.com';
	
	if($('#em_invoice_cntct').length == 1)
		var em_invoice_cntct = $('#em_invoice_cntct').val();
	else
		var em_invoice_cntct = 'na';
	
	if($('#em_invoice_add').length == 1)
		var em_invoice_add = $('#em_invoice_add').val();
	else
		var em_invoice_add = 'na';
	
	if($.trim(em_invoice_add) != "" && $.trim(em_invoice_name) != "" && $.trim(em_invoice_cntct) != "" && $.trim(em_invoice_email) != "")
	{

		var atpos = em_invoice_email.indexOf("@");
		var dotpos = em_invoice_email.lastIndexOf(".");
		if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=em_invoice_email.length) {
			$('#em_person_err').text("Email should be valid.");
			return false;
		}
		else
		{

			return true;
		}
	}
	else
	{
		
		$('#em_person_err').text("Please enter valid details.");
		return false;
	}
		
	
}

/******************** increase / decrease no. of persons***********************/

function em_decrease_per(){
var em_person = $('#em_person').val();
if(em_person > 1)
	{
		em_person = parseInt(em_person)-1;
		$('#em_person').val(em_person);
	}
}

function em_increase_per(){
var em_person = $('#em_person').val();
em_person = parseInt(em_person)+1;
$('#em_person').val(em_person);

}
var special = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelvth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
var deca = ['twent', 'thirt', 'fourt', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

function stringifyNumber(n) {
  if (n < 20) return special[n];
  if (n%10 === 0) return deca[Math.floor(n/10)-2] + 'ieth';
  return deca[Math.floor(n/10)-2] + 'y-' + special[n%10];
}

function check_coupon(){
	$('.couponResult').html('');
	$('#offlinebookingform #em_invoice_coupon_code').val('');
	code=$('#couponcode').val();
	var cat = $('#cat_count').val();
	
	var em_person =$('#em_person').val();
    var em_ini=$('#em_ini').val();
    var initial_total = em_person*em_ini;
	if(cat !=''){
		initial_total = em_ini;
	}
	var event_id = $('#event_id').val();
	if(code==""){
		$('.couponResult').html('Please Enter Code');
		return false;
	}
	var basepath = $('#basepath').val();
    $.ajax({
            type:'POST',
            url: basepath+"ajax/check_coupon_code/",
            dataType: "json",
			data: { code: code, eventid: event_id },
            success: function(data) {
               var msg=data.msg;
               var type=data.type;
               var discount=data.discount;
               if (msg === 'Wrong_Code') {
                    $('#coupon .couponResult').html('Coupon not found');
                    $('#couponcode').val('');
                     $('#fullpayment #total').text(initial_total);
                } else if(msg === 'expired') {
                $('#coupon .couponResult').html('Coupon has been expired');
                $('#couponcode').val('');
                 $('#fullpayment #total').text(initial_total);
                } else {
                    
                    if(type=="flat"){
                    	new_total=initial_total-discount;
              
                    }
                    if(type=="commision"){
                    	deduct_amount=(discount/100)*initial_total;
                    	new_total=initial_total-deduct_amount;
                       
                    }
            
                    $('#fullpayment #total').text(new_total);
                    $('#coupon_submit').text('Applied');
                    $('#coupon_submit').attr('disabled',true);
					$('#coupon .couponResult').html('Coupon ' + code + ' has been applied');
					$('#offlinebookingform #em_invoice_coupon_code').val(code);
                }

            }
        });
}

$('.book').click(function(){

	var checkvalidation = pay_via_invoice_check();
	if(checkvalidation==false){
   		return false;
	}
	var personsnames= document.getElementsByName("person[]");
	var count = personsnames.length;
	for(var s=0;s<count;s++){
		if(personsnames[s].value==""){
           $('#em_person_err').html("All field are required");
           return false;
        }
    }
   $(this).find('.loader').removeClass('hide');
   $(this).css('pointer-events','none');
   $(this).removeAttr('style');
   var person_name = [];
  $(".person-info .form-control").each(function() {
    person_name.push($(this).val());
    });
	var bookingtype=$(this).attr("data-type");
	var eventid=$('#event_id').val();
	var cat = $('#cat_count').val();
	var cat_person = $('#noofperson').val();
    var em_person =$('#em_person').val();
	var cat_total_amount = $('#em_ini').val();
	var cat_left_seats ='null';
	if(cat !=0){
		var em_person = $('#noofperson').val();
		var cat_total_amount = $('#em_ini').val();
		var cat_left_seats = $('#cat_left').val();
	}
    var couponcode=$('#couponcode').val();
    var basepath = $('#basepath').val();

    $.ajax({
            type:'POST',
            url: basepath+"ajax/do_booking/",
            dataType: "json",
            data:'couponcode='+ couponcode+
            '&eventid='+eventid+
            '&em_person='+em_person+
            '&bookingtype='+bookingtype+
            '&person_name='+person_name+
			'&cat_amount='+cat_total_amount+
			'&cat_Sleft='+cat_left_seats,
			success: function(res) {				
			 if(bookingtype=='stripe'){
				$('.stripe_container').html(res.stripe_form); 
			 }else{
              $('#offlinebookingform #event_amnt').val(res.event_amount);
              $('#offlinebookingform #em_invoice_event_id').val(res.event_id);
              $('#offlinebookingform #em_invoice_ticket_count').val(res.ticket_count);
			  $('#offlinebookingform #em_invoice_cat_seat_left').val(res.cat_seat_left); 
              $('#onlinebookingform #event_amnt').val(res.event_amount);
              $('#onlinebookingform #paypal_custom').val(res.paypal_custom);
              $('#onlinebookingform #event_uniqueid').val('ev'+eventid+'ent'+em_person);
			 }
                if(bookingtype=='offline'){
                      $('#offlinebookingform').submit();
                      $('.loader').addClass('hide');
                      $('.book').removeAttr('style');
                }
                if(bookingtype=='online'){
 						  $('#onlinebookingform').submit();
 						  $('.loader').addClass('hide');
 						  $('.book').removeAttr('style');
                }
				if(bookingtype=='stripe'){
 						$('.loader').addClass('hide');
						$('.book').removeAttr('style');
                }
			}
               
        });
})

 
  

