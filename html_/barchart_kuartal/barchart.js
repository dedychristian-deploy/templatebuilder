$(document).ready(function() {

console.log("Script by: Graphic CNBC INDONESIA-2021");
			var data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13;
			var bulan1, bulan2, bulan3, bulan4, bulan5, bulan6, bulan7, bulan8, bulan9, bulan10, bulan11, bulan12, bulan13;
			var tahun1, tahun2, tahun3, tahun4, tahun5, tahun6, tahun7, tahun8, tahun9, tahun10, tahun11, tahun12, tahun13;
			const data  = [];
			var jumlahdata;

			var pl = vizrt.payloadhosting;

			// Will be called when the field with id "01" changes
			function ondataChanged(value) {
				notifyHost2(pl);
				//console.log(value);
			}

			function onlabelChanged(value) {
				notifyHostLabel(pl);
				//console.log(value);
			}

			function ontahunChanged(value) {
				notifyHostYear(pl);
				//console.log(value);
			}

			function onBarChanged(value) {
				jumlahdata = value;

				console.log(value);
				notifyHost(pl);
				notifyHostLabel(pl);
				//notifyHostYear(pl);
			}

			    // Will be called when the field with id "choice" changes
				function onBarsChanged(value) {
				//var myField = $("#myfield");
					//myField.text(value);
					//var conceptValue = $(this).data("text");

					if (value == "F") {
					//vizrt.payloadhosting.setFieldVisibility("A1", true);
					//vizrt.payloadhosting.setFieldVisibility("02-PENAMBAHAN-KASUS", false);
					vizrt.payloadhosting.setFieldText("choice2", "FULLFRAME");
					vizrt.payloadhosting.setFieldText("-vizlayer-FF_X", "FF_BARCHART_GENERICS_LABEL14");
					//vizrt.payloadhosting.setFieldVisibility("A3", false);
				//=====================================================//
					//vizrt.payloadhosting.setFieldVisibility("Q1", true);
					//vizrt.payloadhosting.setFieldVisibility("Q2", false);
					//vizrt.payloadhosting.setFieldVisibility("Q3", false);

					//pl.setFieldText("text", "IMMERSIVE_INSTA_1TANYA");

				// pl.setFieldText("-vizlayer-IMMERSIVE4", "IMMERSIVE_SMARTPHONE_OPPO1_QUEST_OK");
				} 

				if (value == "S") {
					//vizrt.payloadhosting.setFieldVisibility("A1", true);
					//vizrt.payloadhosting.setFieldVisibility("02-PENAMBAHAN-KASUS", true);
					//vizrt.payloadhosting.setFieldVisibility("A3", false);
				//=====================================================//
					//vizrt.payloadhosting.setFieldVisibility("Q1", true);
					//vizrt.payloadhosting.setFieldVisibility("Q2", false);
					//vizrt.payloadhosting.setFieldVisibility("Q3", false);

					//pl.setFieldText("text", "IMMERSIVE_INSTA_1TANYA");
					vizrt.payloadhosting.setFieldText("choice2", "SPLIT");
					vizrt.payloadhosting.setFieldText("-vizlayer-FF_X", "FF_SPLIT_BARCHART_GENERICS_LABEL16");
				// pl.setFieldText("-vizlayer-IMMERSIVE4", "IMMERSIVE_SMARTPHONE_OPPO1_QUEST_OK");
				} 
					}

			function notifyHost(host) {	
			const data  = [];
			data[1] = host.getFieldText("data1");
			data[2] = host.getFieldText("data2");
			data[3] = host.getFieldText("data3");
			data[4] = host.getFieldText("data4");
			data[5] = host.getFieldText("data5");
			data[6] = host.getFieldText("data6");
			data[7] = host.getFieldText("data7");
			data[8] = host.getFieldText("data8");
			data[9] = host.getFieldText("data9");
			data[10] = host.getFieldText("data10");
			data[11] = host.getFieldText("data11");
			data[12] = host.getFieldText("data12");
			data[13] = host.getFieldText("data13");
			
			//console.log(data[0]);
				//host.setFieldText("01", data1 + ";" + data2+ ";" + data3+ ";" + data4+ ";" + data5+ ";" + data6+ ";" + data7+ ";" + data8+ ";" + data9+ ";" + data10+ ";" + data11+ ";" + data12+ ";" + data13);
				console.log(vizrt.payloadhosting.getListFieldLength('13'));
			    var jumlahrosw = vizrt.payloadhosting.getListFieldLength('13');
				for (let i = -1; i < jumlahrosw-1; i++) {
				vizrt.payloadhosting.removeListFieldItem("13");
						}

				//hide all row
				for (let i = 1; i < 14; i++) {
				$("#row" + (i)).hide();
						}
				for (let j = 0; j < jumlahdata; j++) {
				vizrt.payloadhosting.addListFieldItem("13",j);
				vizrt.payloadhosting.setFieldText("13/#" + j + "/Y",data[j+1]);
				$("#row" + (j+1)).show();
						}
				vizrt.payloadhosting.setFieldText("003-CATEGORY",jumlahdata);
				//vizrt.payloadhosting.setFieldText("001-HIGH",data[jumlahdata]);	
					
        
            }

			function notifyHost2(host) {	
			const data_a  = [];
			data_a[1] = host.getFieldText("data1");
			data_a[2] = host.getFieldText("data2");
			data_a[3] = host.getFieldText("data3");
			data_a[4] = host.getFieldText("data4");
			data_a[5] = host.getFieldText("data5");
			data_a[6] = host.getFieldText("data6");
			data_a[7] = host.getFieldText("data7");
			data_a[8] = host.getFieldText("data8");
			data_a[9] = host.getFieldText("data9");
			data_a[10] = host.getFieldText("data10");
			data_a[11] = host.getFieldText("data11");
			data_a[12] = host.getFieldText("data12");
			data_a[13] = host.getFieldText("data13");

				fielddata = host.getFieldText("003-JUMLAH-DATA");
				console.log("text diubah " + fielddata);

			
					
				var jumlahrosw = vizrt.payloadhosting.getListFieldLength('13');
				for (let i = -1; i < jumlahrosw-1; i++) {
				vizrt.payloadhosting.removeListFieldItem("13");
						}
				fielddata = host.getFieldText("003-JUMLAH-DATA");
				console.log("isi text 003-JUMLAH-DATA " + fielddata);
				//hide all row
				//for (let i = 1; i < 14; i++) {
				//$("#row" + (i)).hide();
				//		}
				for (let j = 0; j < fielddata; j++) {
				vizrt.payloadhosting.addListFieldItem("13",j);
				vizrt.payloadhosting.setFieldText("13/#" + j + "/Y",data_a[j+1]);
				//$("#row" + (j+1)).show();
						}
				vizrt.payloadhosting.setFieldText("003-CATEGORY",jumlahdata);	

				console.log("DEDY");	
            }

			function notifyHostLabel(host) {	
				const label  = [];
			label[1] = host.getFieldText("label1");
			label[2] = host.getFieldText("label2");
			label[3] = host.getFieldText("label3");
			label[4] = host.getFieldText("label4");
			label[5] = host.getFieldText("label5");
			label[6] = host.getFieldText("label6");
			label[7] = host.getFieldText("label7");
			label[8] = host.getFieldText("label8");
			label[9] = host.getFieldText("label9");
			label[10] = host.getFieldText("label10");
			label[11] = host.getFieldText("label11");
			label[12] = host.getFieldText("label12");
			label[13] = host.getFieldText("label13");

			
				//host.setFieldText("03", bulan1 + ";" + bulan2+ ";" + bulan3+ ";" + bulan4+ ";" + bulan5+ ";" + bulan6+ ";" + bulan7+ ";" + bulan8+ ";" + bulan9+ ";" + bulan10+ ";" + bulan11+ ";" + bulan12+ ";" + bulan13);
				//host.setFieldText("01", data1 + ";" + data2+ ";" + data3+ ";" + data4+ ";" + data5+ ";" + data6+ ";" + data7+ ";" + data8+ ";" + data9+ ";" + data10+ ";" + data11+ ";" + data12+ ";" + data13);
				//console.log(vizrt.payloadhosting.getListFieldLength('002'));
			    //var jumlahrosw = vizrt.payloadhosting.getListFieldLength('01-LABELS');
				//for (let i = -1; i < jumlahrosw-1; i++) {
				//vizrt.payloadhosting.removeListFieldItem("01-LABELS");
				//		}
				
				//for (let j = 0; j < jumlahdata; j++) {
				//vizrt.payloadhosting.addListFieldItem("01-LABELS",j);
				//vizrt.payloadhosting.setFieldText("01-LABELS/#" + j + "/Y",label[j+1]);
				//console.log(data[j]);
				//		}			
			
			
		}

			function notifyHostYear(host) {	
			const tahun = [];
			tahun[1] = host.getFieldText("tahun1");
			tahun[2] = host.getFieldText("tahun2");
			tahun[3] = host.getFieldText("tahun3");
			tahun[4] = host.getFieldText("tahun4");
			tahun[5] = host.getFieldText("tahun5");
			tahun[6] = host.getFieldText("tahun6");
			tahun[7] = host.getFieldText("tahun7");
			tahun[8] = host.getFieldText("tahun8");
			tahun[9] = host.getFieldText("tahun9");
			tahun[10] = host.getFieldText("tahun10");
			tahun[11] = host.getFieldText("tahun11");
			tahun[12] = host.getFieldText("tahun12");
			tahun[13] = host.getFieldText("tahun13");

			
				//host.setFieldText("02", tahun1 + ";" + tahun2+ ";" + tahun3+ ";" + tahun4+ ";" + tahun5+ ";" + tahun6+ ";" + tahun7+ ";" + tahun8+ ";" + tahun9+ ";" + tahun10+ ";" + tahun11+ ";" + tahun12+ ";" + tahun13);
				//console.log(vizrt.payloadhosting.getListFieldLength('004'));
			    var jumlahrosw = vizrt.payloadhosting.getListFieldLength('004');
				for (let i = -1; i < jumlahrosw-1; i++) {
				vizrt.payloadhosting.removeListFieldItem("004");
						}
				
				for (let j = 0; j < jumlahdata; j++) {
				vizrt.payloadhosting.addListFieldItem("004",j);
				vizrt.payloadhosting.setFieldText("004/#" + j + "/Y","'" + tahun[j+1]);
				//console.log(data[j]);
						}	
	
		}

            pl.initialize();
            pl.setFieldValueCallbacks({ "data1": ondataChanged, "data2": ondataChanged, "data3": ondataChanged, "data4": ondataChanged, "data5": ondataChanged, "data6": ondataChanged, "data7": ondataChanged, 
			"data8": ondataChanged, "data9": ondataChanged, "data10": ondataChanged, "data11": ondataChanged, "data12": ondataChanged, "data13": ondataChanged,
			"label1": onlabelChanged, "label2": onlabelChanged, "label3": onlabelChanged, "label4": onlabelChanged, "label5": onlabelChanged, "label6": onlabelChanged, "label7": onlabelChanged, 
			"label8": onlabelChanged, "label9": onlabelChanged, "label10": onlabelChanged, "label11": onlabelChanged, "label12": onlabelChanged, "label13": onlabelChanged,
			"003-JUMLAH-DATA": onBarChanged, "choice": onBarsChanged
		});
	});