/* eslint-disable no-undef  */
//
// All CKEditor plugins are created by using the CKEDITOR.plugins.add function.
// This function should contain the plugin name — 'abbr' — and the plugin logic
// placed inside the CKEDITOR.pluginDefinition.init function that is called upon
// the initialization of the editor instance.
//
CKEDITOR.plugins.add('abbr', {
	// If you are making a toolbar plugin, you need to supply an icon
	// Important: icon file must match the button name, in lowercase
	icons: 'abbr',
	init: function (editor) {
		// We want our plugin to have a dialog window, so we need to define an editor
		// command that opens a new dialog window. To do this, we will need to use the
		// editor.addCommand function to register the abbr command.
		// This command opens the abbrDialog dialog.

		editor.addCommand('abbr', new CKEDITOR.dialogCommand('abbrDialog'));

		// The plugin dialog window is to be opened by using a toolbar button. To this end,
		// we need to define a button that will be associated with the dialog window.
		//
		// The below CKEDITOR.ui.addButton function call creates a
		// button named 'Abbr' with the following properties:
		//
		// label – the textual part of the button (if visible) and its tooltip.
		// command – the command to be executed once the button is activated (command created in the previous step)
		// toolbar – the toolbar group into which the button will be added.
		//
		// Please note that you can influence the position of the button in
		// the toolbar group by providing an optional index, for example: toolbar: 'insert,0'
		//
		// The exact position depends on the indexes defined by other buttons available in your toolbar, so it may take
		// some experimenting with index values to create a perfect button sequence within a group.

		editor.ui.addButton('Abbr', {
			label: 'Insert Abbreviation',
			command: 'abbr',
			toolbar: 'insert'
		});

		// Tell the editor to load the dialog from the dialogs/abbr.js file when the button is clicked.
		CKEDITOR.dialog.add('abbrDialog', this.path + 'dialogs/abbr.js');

		// If you want to have a context menu
		// (a way to bring the dialog back up with the ability to edit the relevant content)
		// Use the `if` statement to ensure the editor supports contextMenu
		if (editor.contextMenu) {
			// separate your context menu from others by putting it in its own group
			editor.addMenuGroup('abbrGroup');
			// Using the editor.addMenuItem function we can now register a new menu item that
			// will belong to the newly created group.
			editor.addMenuItem('abbrItem', {
				// The label and icon properties let us set the context menu item name and its icon, respectively.
				label: 'Edit Abbreviation',
				icon: this.path + 'icons/abbr.png',
				// To make the context menu item open the Abbreviation Properties dialog window,
				// we need to set the command property to use the abbr command.
				command: 'abbr',
				group: 'abbrGroup'
			});

			// However, when we reload the CKEditor instance and add an abbreviation, the context menu does not contain
			// the newly created Edit Abbreviation item. We now need to enable the Abbreviation context menu for each
			// selected <abbr> element.
			//
			// By using the addListener method we will add an event listener function that will be called whenever
			// the context menu is fired.
			editor.contextMenu.addListener(function (element) {
				if (element.getAscendant('abbr', true)) {
					// At this point we just check if the current element, or any of its parents, is an <abbr>.
					// If this is true, we simply return the menu item to activate (abbrItem) saying that it is
					// enabled but not in the "selected state" (CKEDITOR.TRISTATE_OFF).
					// http://docs.ckeditor.com/#!/api/CKEDITOR-property-TRISTATE_OFF
					return {abbrItem: CKEDITOR.TRISTATE_OFF};
				}
			});

			// The Edit Abbreviation item is now visible in the context menu of an <abbr> element. Once selected,
			// it opens the Abbreviation Properties dialog window due to the use of the abbr command.
		}

		// Plugin logic goes here...
	}
});

// IMPORTANT!
// Remember to add your new plugin to your ckeditor configuration with:
// config.extraPlugins = 'abbr';

// Also, if your plugin is used to create content, to be compliant with the new Advanced Content Filtering in 4.1
// See: http://docs.ckeditor.com/#!/guide/plugin_sdk_integration_with_acf
// you need to set this in your config:
// config.allowedContent = true;

// Or Integrate your plugin with ACF
// new CKEDITOR.dialogCommand( 'abbrDialog', {
//    allowedContent: 'abbr'
// });
