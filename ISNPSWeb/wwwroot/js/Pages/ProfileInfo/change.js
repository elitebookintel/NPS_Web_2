function onSubmitClick(e) {
	
	e.event.preventDefault();
	var $form = $('form[name="changePassword"]');
	var url = $form.attr('action');
	var modal = "#changePassword";
	var gridId = null;
	ISNPS.ajaxPOST(url, $form, modal, gridId, false)
}
