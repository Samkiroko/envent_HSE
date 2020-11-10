function message(msg , type){
	var cls = (type == 'error')? 'error' : ((type == 'notice')?'notice':'success');
	if($('#myMessage').length){ $('#myMessage').remove(); } 
		
	$('head').after('<div id="myMessage" class="myMsgWrp '+cls+'"><a href="javascript:;" onclick="$('+"'#myMessage'"+').remove()" title="Remove">&times;</a><h4>'+cls+'</h4><p class="notificationText">'+msg+'</p></div>');
}


function checkRequire(formId){
	if($('#myMessage').length){ $('#myMessage').remove(); } 
	var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;	 
	var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
	var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
	var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
	var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
	var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
	var google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
	var check = 0;
	$('#er_msg').remove();
	var target = (typeof formId == 'object')? $(formId):$('#'+formId);
	target.find('input , textarea').each(function(){
		if($(this).hasClass('require')){
			if($(this).val().trim() == ''){
				check = 1;
				toastr.error('You missed out some fields' , 'Error');
				$(this).parent().addClass('error');
				$(this).focus();
				return false; 
			}else{
				$(this).parent().removeClass('error');
			} 
		}   
		
		
		if($(this).val().trim() != ''){
			var valid = $(this).attr('data-valid'); 
			if(typeof valid != 'undefined'){
				if(!eval(valid).test($(this).val().trim())){
					toastr.error($(this).attr('data-error') , 'Error');
					$(this).parent().addClass('error');	
					check = 1;
					$(this).focus();
					return false; 
				}else{
					$(this).parent().removeClass('error');
				}
			}
		}
	});
	return check;
}