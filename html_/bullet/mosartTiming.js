/*
Copyright (c) 2016 Vizrt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

(MIT License)

*/

var tc_in;
var tc_out;

function onMosartChanged(value) {
	if (value == null) {
		value = "";
	}
	
	var fields = value.split("|");
	
	if (fields.length > 1) {
		if(fields[1] == "M") {
			$(".select_tc_in").parents('.dropdown').find('.dropdown-toggle .selected').html("Manual");
			tc_in = "M";			
			$(".tc_in").hide();			
		}
		else {
			$(".select_tc_in").parents('.dropdown').find('.dropdown-toggle .selected').html("Auto");
			tc_in = "auto";
			var in_values = fields[1].split(":");
			if (in_values.length == 2) {
				$("#tc_in_mm").val(in_values[0]);
				$("#tc_in_ss").val(in_values[1]);
			}
			else {
				$("#tc_in_mm").val("");
				$("#tc_in_ss").val("");
			}			
			
			$(".tc_in").show();
		}
	}
	else {
		$(".select_tc_in").parents('.dropdown').find('.dropdown-toggle .selected').html("Auto");
		tc_in = "auto";
		$("#tc_in_mm").val("");
		$("#tc_in_ss").val("");		
		$(".tc_in").show();
	}
	if (fields.length > 2) {		
		if (fields[2].indexOf(':') != -1) {
			$(".select_tc_out").parents('.dropdown').find('.dropdown-toggle .selected').html("Time code");
			tc_out = "timecode";
			var out_values = fields[2].split(":");
			if (out_values.length == 2) {
				$("#tc_out_mm").val(out_values[0]);
				$("#tc_out_ss").val(out_values[1]);
			}
			else {
				$("#tc_out_mm").val("");
				$("#tc_out_ss").val("");
			}
			
			$(".tc_out").show();
		}
		else if(fields[2] == "") {
			$(".select_tc_out").parents('.dropdown').find('.dropdown-toggle .selected').html("Time code");
			tc_out = "timecode";
			$("#tc_out_mm").val("");
			$("#tc_out_ss").val("");
			$(".tc_out").show();
		}
		else {
			$(".select_tc_out li").each(function(index, element) {
				if ($(element).data("value") == fields[2]) {
					$(".select_tc_out").parents('.dropdown').find('.dropdown-toggle .selected').html($(element).text());
					return false;
				}
			});
			
			tc_out = fields[2];
			$(".tc_out").hide();
		}
	}
	else {
		$(".select_tc_out").parents('.dropdown').find('.dropdown-toggle .selected').html("Time code");
		tc_out = "timecode";
		$("#tc_out_mm").val("");
		$("#tc_out_ss").val("");
		$(".tc_out").show();
	}
}

function notifyHost(host) {
	fields = [""];	
	if (tc_in == "auto") {
		var in_mm = $("#tc_in_mm").val();
		var in_ss = $("#tc_in_ss").val();
		if (in_mm == "" && in_ss == "") {
			fields.push("");
		}
		else {
			var in_value = in_mm + ":" + in_ss;
			fields.push(in_value);
		}		
	}
	else {
		fields.push(tc_in);
	}
	
	if (tc_out == "timecode") {
		var out_mm = $("#tc_out_mm").val();
		var out_ss = $("#tc_out_ss").val();
		if (out_mm == "" && out_ss == "") {
			fields.push("");
		}
		else {
			var out_value = out_mm + ":" + out_ss;
			fields.push(out_value);
		}		
	}
	else {
		fields.push(tc_out);
	}
	
	host.setFieldText("mosart", fields.join("|"));
}

function getText(element, index, array, value) {
	if (value == element.getAttribute("data-value")) {
		return element.text();
	}
}

function initializeDropDowns(host) {
	onMosartChanged(host.getFieldText("mosart"));
}

$(document).ready(function() {
	var pl = vizrt.payloadhosting;
	pl.initialize(function() {
		initializeDropDowns(pl);
	});
	
	pl.setFieldValueCallbacks({ "mosart": onMosartChanged });	
	
	$(".input").on('blur', function() {
		var in_mm = $("#tc_in_mm").val();
		var in_ss = $("#tc_in_ss").val();
		if (isNaN(in_mm) || isNaN(in_ss) || in_mm < 0 || in_mm > 59 || in_ss < 0 || in_ss > 59) {
			$("#tc_in_mm").parent(".form-group").addClass("has-error");
			$("#tc_out_mm").parent(".form-group").addClass("has-error");
			return;
		}
		
		var out_mm = $("#tc_out_mm").val();
		var out_ss = $("#tc_out_ss").val();
		if (isNaN(out_mm) || isNaN(out_ss) || out_mm < 0 || out_mm > 59 || out_ss < 0 || out_ss > 59) {
			$("#tc_in_mm").parent(".form-group").addClass("has-error");
			$("#tc_out_mm").parent(".form-group").addClass("has-error");
			return;
		}
		
		if (out_mm == "" && out_ss == "" && in_mm == "" && in_ss == "") {
			$("#tc_in_mm").parent(".form-group").removeClass("has-error");
			$("#tc_out_mm").parent(".form-group").removeClass("has-error");			
			notifyHost(pl);	
		}
		else if (out_mm == "" || out_ss == "" || in_mm == "" || in_ss == "") {
			$("#tc_in_mm").parent(".form-group").addClass("has-error");
			$("#tc_out_mm").parent(".form-group").addClass("has-error");
			return;
		}
		
		$("#tc_in_mm").parent(".form-group").removeClass("has-error");
		$("#tc_out_mm").parent(".form-group").removeClass("has-error");		
		notifyHost(pl);		
	});
	
	$(".select_tc_in").on('click', 'li', function() {		
		$(this).parents('.dropdown').find('.dropdown-toggle .selected').html($(this).text());
				
		tc_in = $(this).data("value");		
		if (tc_in == "auto") {
			$(".tc_in").show();
		}
		else {
			$(".tc_in").hide();		
		}
		notifyHost(pl);
	});
	
	$(".select_tc_out").on('click', 'li', function() {
		$(this).parents('.dropdown').find('.dropdown-toggle .selected').html($(this).text());
		
		tc_out = $(this).data("value");		
		if (tc_out== "timecode") {
			$(".tc_out").show();
		}
		else {
			$(".tc_out").hide();
		}
		notifyHost(pl);
	});	
});