/* eslint-disable no-undef  */
// Check the CKEDITOR.dialog.definition:
// http://docs.ckeditor.com/#!/api/CKEDITOR.dialog.definition
CKEDITOR.dialog.add('abbrDialog', function (editor) {
	return {
		title: 'Abbreviation Properties',
		minWidth: 400,
		minHeight: 200,

		// To learn more about the type of contents you can add to your dialog:
		// http://docs.ckeditor.com/#!/api/CKEDITOR.dialog.definition-property-contents
		contents: [
			{
				id: 'tab-basic',
				label: 'Basic Settings',
				elements: [{
					type: 'text',
					id: 'abbr',
					label: 'Abbreviation',
					validate: CKEDITOR.dialog.validate.notEmpty('Abbreviation field cannot be empty.'),
					// called on this.setupContent()
					setup: function (element) {
						this.setValue(element.getText());
					},
					// called on onOk's dialog.commitContent
					commit: function (element) {
						element.setText(this.getValue());
					}
				}, {
					type: 'text',
					id: 'title',
					label: 'Explanation',
					validate: CKEDITOR.dialog.validate.notEmpty('Explanation field cannot be empty.'),
					// called on this.setupContent()
					setup: function (element) {
						this.setValue(element.getAttribute('title'));
					},
					// called on onOk's dialog.commitContent
					commit: function (element) {
						element.setAttribute('title', this.getValue());
					}
				}]
			},
			{
				id: 'tab-adv',
				label: 'Advanced Settings',
				elements: [
					{
						type: 'text',
						id: 'id',
						label: 'Id',
						// called on this.setupContent()
						setup: function (element) {
							this.setValue(element.getAttribute('id'));
						},
						// called on onOk's dialog.commitContent
						commit: function (element) {
							var id = this.getValue();
							if (id) {
								element.setAttribute('id', id);
							} else if (!this.insertMode) {
								element.removeAttribute('id');
							}
						}
					}
				]
			}
		],
		onShow: function () {
			// The code that will be executed when a dialog window is loaded.

			// get the element that is selected by the user (either highlighted or just having the caret inside)
			var selection = editor.getSelection();

			// We will also use the selection.getStartElement method to get the element in which the selection starts,
			// and assign it to the element variable:
			var element = selection.getStartElement();

			// Still our dialog window must work both to ADD and to EDIT <abbr> elements. Because of this, we introduce
			// some startup logic that identifies the proper case:
			if (element) {
				element = element.getAscendant('abbr', true);
			}

			// To differentiate between adding a new element and editing an existing one, we will create a new insertMode flag.
			// It will be set to true in the "add new element" scenario. If an <abbr> element already exists,
			// the insertMode flag will be set to false.
			this.insertMode = false;

			if (!element || element.getName() !== 'abbr') {
				element = editor.document.createElement('abbr');
				this.insertMode = true;
			}

			// We will now store a reference to the <abbr> element in the element variable since we will need to
			// access it in the onOK function later.
			this.element = element;

			// The onShow function will finish with a call to the setupContent method that will invoke the setup
			// functions for the element. Each parameter that will be passed on to the setupContent function will also
			// be passed on to the setup functions.
			if (!this.insertMode) {
				this.setupContent(element);
			}
		},
		onOk: function () {
			var dialog = this;
			var abbr = dialog.element;

			dialog.commitContent(abbr);

			if (dialog.insertMode) {
				editor.insertElement(abbr);
			}
		}
	};
});
