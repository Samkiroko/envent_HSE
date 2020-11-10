( function ( $ ) {
    'use strict';
	
    $( document ).ready( function () {
     

	$('#remember_me').click(function(){
		if($('#remember_me').is(':checked'))
			var remember=1;
		else
			var remember=0;
		
		$('#rem_inp').val(remember);
	});
	
	
	});
	
	
	}( jQuery ) )
	
	/****************login form validation starts ****************/


/**************** login form validation ends ****************/

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}
// register user
	function check_user_register(){
        var name=$('#reci_uname').val();
		var email=$('#reci_uemail').val();
		var password=$('#reci_upassword').val();
		var cpassword=$('#reci_ucpassword').val();
     
      if($.trim(name)==""){
		toastr.error('Username required');
		$('#reci_uname').focus();
		return false;
	}
	if($.trim(email)==""){
      	toastr.error('Email required');
		$('#reci_uemail').focus();
		return false;
	}
	if(!isValidEmailAddress($.trim(email))){
		toastr.error('Please enter valid email');
		$('#reci_uemail').focus();
		return false;
	}
	if($.trim(password)==""){
      	toastr.error('Password is required');
		$('#reci_upassword').focus();
		return false;
	}
	if($.trim(password).length<6){
		toastr.error('Password should be six character long');
		$('#reci_upassword').focus();
		return false;
	 }
	if($.trim(cpassword)==""){
      	toastr.error('Confirm password is required');
		$('#reci_ucpassword').focus();
		return false;
	}
	if($.trim(password) != $.trim(cpassword) ){
		toastr.error('Password and confirm password should be same');
		$('#reci_ucpassword').focus();
		return false;
	 }
}

 // check login
 
 function check_admin_login(){
	var uemail=$('#eci_uemail').val();
	var pwd=$('#eci_password').val();
	if($.trim(uemail) == "") {
	$('#eci_email_err').html('Plaese enter email');
		toastr.error('Please enter email');
		$('#eci_uemail').focus();
        return false;
  }
  if($.trim(pwd) === "") {
		toastr.error('Please enter password');
		$('#eci_password').focus();
        return false;
  }
}

// forget password
function check_forget_password(){
	var uemail=$('#eci_uemail').val();
	if($.trim(uemail) == "") {
	toastr.error('Please enter Email');
		$('#eci_uemail').focus();
        return false;
  }
  if(!isValidEmailAddress($.trim(uemail))){
		toastr.error('Please enter valid email');
		$('#eci_uemail').focus();
		return false;
	}
}

 // reset password
	function check_reset_password(){
        var resetcode=$('#eci_resetcode').val();
		var email=$('#eci_uemail').val();
		var password=$('#eci_upassword').val();
		var cpassword=$('#eci_ucpassword').val();
     
      if($.trim(resetcode)==""){
      	toastr.error('Resest code is required');
		$('#eci_resetcode').focus();
		return false;
	}
	
	if($.trim(password)==""){
      	toastr.error('Password is required');
		$('#eci_upassword').focus();
		return false;
	}
	if($.trim(password).length<6){
		toastr.error('Password should be six character long');
		$('#eci_upassword').focus();
		return false;
	}
	 if($.trim(cpassword)==""){
      	toastr.error('Confirm password is required');
		$('#eci_ucpassword').focus();
		return false;
	}
	if($.trim(password) != $.trim(cpassword) ){
		toastr.error('Password and confirm password must be same');
		$('#eci_ucpassword').focus();
		return false;
	   }
}