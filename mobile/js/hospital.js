
//表单验证
$(function() {
	var hosName = false;
	var Loca = false;
	var aName = false;
	var ph = false;
	var EMail = false;
	$("#TuoLa_Form .tuola-input").focus(function() {
		//      $(this).css("border","1px solid #66AFE9");
		//      $(this).css("color","#131313");
		//      if($(this).val()==this.defaultValue){
		//          $(this).val("");
		//      }      

	}).blur(function() {
		if($(this).val() == '') {
			$(this).val(this.defaultValue);
		}

		if($(this).is("#hospitalName")) {
			var par = /^[\u4e00-\u9fa5]{1,50}$/;

			if($("#hospitalName").val() != "") {
				if(!(par.test($("#hospitalName").val()))) {
					$(this).parent().css("border", "1px solid red");
					$(this).css("color", "red");

					hosName = false;

				} else if(par) {
					$("#hospitalName").parent().css("border", " 1px solid #ccc");
					$("#hospitalName").css("color", " #131313");
					hosName = true;
				}
			}

		}

		if($(this).is("#hpLocation")) {
			var where = /^[\u4e00-\u9fa5]{1,20}$/;
			if($("#hpLocation").val() != "") {
				if(!(where.test($("#hpLocation").val()))) {
					$(this).parent().css("border", "1px solid red");
					$(this).css("color", "red");

					Loca = false;
				} else if(where) {
					$("#hpLocation").parent().css("border", " 1px solid #ccc");
					$("#hpLocation").css("color", " #131313");

					Loca = true;
				}
			}
		}

		if($(this).is("#applyName")) {
			var appN = /^ +| +$/;
			if($("#applyName").val() != "") {
				if((appN.test($("#applyName").val()))) {
					$(this).parent().css("border", "1px solid red");
					$(this).css("color", "red");

					aName = false;
				} else if(appN) {
					$("#applyName").parent().css("border", " 1px solid #ccc");
					$("#applyName").css("color", " #131313");
					aName = true;
				}
			}
		}
		if($(this).is("#phoneNum")) {
			//var tel = /^(0\d{2}-\d{8}(-\d{1,4})?)|(0\d{3}-\d{7,8}(-\d{1,4})?)$/;//座机号（支持分机）
			var phone = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/; //手机
			if($("#phoneNum").val() != "") {
				if(!(phone.test($("#phoneNum").val()))) {
					$(this).parent().css("border", "1px solid red");

					$(this).css("color", "red");

					ph = false;

				} else if(phone) {
					$("#phoneNum").parent().css("border", " 1px solid #ccc");
					$("#phoneNum").css("color", " #131313");

					ph = true;
				}
			}

		}
		if($(this).is("#email")) {
			var email = /^\s*\w+(?:\.{0,1}[\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$/;
			if($("#email").val() != "") {
				if(!(email.test($("#email").val()))) {
					$(this).parent().css("border", "1px solid red");

					$(this).css("color", "red");

					EMail = false;
				} else if(email) {
					$("#email").parent().css("border", " 1px solid #ccc");
					$("#email").css("color", " #131313");

					EMail = true;
				}
			}
		}

	})

	closeMen = function() {
		$(".modal").hide();
		window.location.reload();
	}
	$(".tuola-submit").click(function() {
		if($("#hospitalName").val() == "") {

			$("#hospitalName").parent().css("border", "1px solid red");
			hosName=false;

		} else if($("#hpLocation ").val() == "") {

			$("#hpLocation").parent().css("border", "1px solid red");
			Loca=false;
			
		} else if($("#applyName").val() == "") {

			$("#applyName").parent().css("border", "1px solid red");
			aName=false;
		} else if($("#phoneNum").val() == "") {

			$("#phoneNum").parent().css("border", "1px solid red");
			ph=false;
		} else if($("#email").val() == "") {
			$("#email").parent().css("border", "1px solid red");
			EMail=false;
		}

		var Formdata = {
			"name": $("#hospitalName").val(),
			"location": $("#hpLocation").val(),
			"contact_name": $("#applyName").val(),
			"contact_tel": $("#phoneNum").val(),
			"contact_email": $("#email").val()
		};
		if(hosName & Loca & aName & ph & EMail) {
			$.ajax({
//				url: document.URL.substring(0, document.URL.indexOf("/BaoXianFormProject")) + "/BaoXianFormProject/fpHospital/save",
				url:"http://" + "ipidb.tuolaleasing.com" + "/fpHospital/save",
				type: "post",
				data: $("#TuoLa_Form").serialize(),
				success: function(data) {
					if(data.errorMsg != '' && data.errorMsg != null && data.errorMsg != "undefined") {
						//ajax发送成功，出现弹框；
						$('#popUp').show();
						$('#popShade').show();
					} else { /*galert("您的申请已提交");*/
						$(".modal").show();
						$(".modal-content").show();

					}

				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
					
				}

			})

		}

	})
	//点击弹框的X和确认关闭弹框
	$('#closeBtn').click(function(){
		$('#popUp').hide();
		$('#popShade').hide();
	})
	$('#affirmBtn').click(function(){
		$('#popUp').hide();
		$('#popShade').hide();
	})
})
