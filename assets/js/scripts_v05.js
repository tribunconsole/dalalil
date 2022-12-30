			$(document).ready(function() {

				// On load

				// Arabic & English font sizes
				var arabicFontSize		= localStorage.getItem("arabicFontSize");
				var englishFontSize		= localStorage.getItem("englishFontSize");
				$('.arabicText').css({'font-size':arabicFontSize});
				$('.lang').not('.arabicText').css({'font-size':englishFontSize});
				$('span.arabicFontSize').html('('+arabicFontSize+')');
				$('span.englishFontSize').html('('+englishFontSize+')');

				// change the value of checkboxes
				$('.translation-checkbox').each(function(i,obj) {
					var checkbox = $(this);
					var name = checkbox.attr("id");
					var checked = false;
					//get the stored value of the checkbox
					if (localStorage.getItem(name) !== null) {
						checked = JSON.parse(localStorage.getItem(name));
					}
					checkbox.prop('checked',checked);
					var cls = checkbox.data('classes');
					// If the checkbox is checked, display the output text
					if (checked) {
						$('.'+cls).show();
					}
				});

				/// change the value of font style radio buttons for the text style
				var font = localStorage.getItem('font');
            
				// if font not saved (i.e. new user) then save it as 'Islamic'
				if (font === null) {font = "Islamic"}
          
				$('.changeArabicFont').each(function(i,obj) {
					if ($(this).val() == font) {
						$(this).prop('checked',true);
					}
				});

				// change the font to the saved style
				$('.arabicText').css("font-family", font);

				// Functions

				// Lannguage Settings (Modal)
				$('.langSettings').click(function() {
					$('.langSettingsModal').show();
				});
				
				$('.langSettingsModal .close').click(function() {
					$('.langSettingsModal').hide();
				});
				
				$('.langSettingsModal').mouseup(function(e) {
					var container = $(".langSettingsModal .modal-content");

					// if the target of the click isn't the container nor a descendant of the container
					if (!container.is(e.target) && container.has(e.target).length === 0) {
						$('.langSettingsModal').hide();
					}
				});

				$('.accordion').click(function() {
					var panel = $(this).next();
					$(this).toggleClass('active');
					if (parseInt(panel.css("maxHeight")) > 7) {
						panel.css("maxHeight", "7px");
					} else {
						panel.css("maxHeight", panel.get(0).scrollHeight + 'px');
					}					
				});

				// When a translation checkbox is toggled
				$('.translation-checkbox').change(function() {
					var checkbox = $(this);
					var name = checkbox.attr("id");
					var cls = checkbox.data('classes');
					// If the checkbox is checked, display the output text, otherwise hide
					$('.'+cls).toggle();
					//store the value of the checkbox
					localStorage.setItem(name, checkbox.is(':checked'));
				});
				
				$('.changeFontSize').click(function() {
					var btn = $(this);
					if ((btn.data('lang')) && (btn.data('increment'))) {
						if (btn.data('lang') == "Arabic") {
							var elements = $('.arabicText');
							var storageName = "arabicFontSize";
						} else {
							var elements = $('.lang').not('.arabicText');
							var storageName = "englishFontSize";
						}
						var fontSize = parseInt(elements.css("font-size"));
						if (btn.data('increment') == "minus") {
							if (fontSize >= 8) {
								fontSize = fontSize - 1 + "px";
							}
						} else if (btn.data('increment') == "plus") {
							if (fontSize <= 50) {
								fontSize = fontSize + 1 + "px";
							}
						}
						elements.css({'font-size':fontSize});
						btn.parents('.row').find('span.fontSize').html('('+fontSize+')');
						localStorage.setItem(storageName, fontSize);
					}
				});
				
				$('.changeArabicFont').click(function() {
					var font = $(this).val();
					if (font != "") {
						$('.arabicText').css("font-family", font);
						localStorage.setItem('font', font);
					}
				});
			});