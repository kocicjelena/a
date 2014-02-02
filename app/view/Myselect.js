Ext.define('mega.view.Myselect', {
    extend : ['Ext.form.Panel', 'Ext.device.Connection', 'Ext.MessageBox'],
	alias: "widget.myselectview",
	extend: 'Ext.Panel',
    requires: [
        'Ext.Toolbar'],
    config:  {items: [{
                xtype: "toolbar",
                docked: "top",
                title: "option",
                items: [
                    {
                        xtype: "button",
                        ui: "back",
                        text: "Home",
                        itemId: "backButton"
                    },
                    { xtype: "spacer" },
                    {
                        xtype: "button",
                        ui: "action",
                        text: "Save",
                        itemId: "saveClientoption"
                    }
					//,
					//{
                      //  xtype: "button",
                      //  ui: "action",
                      //  text: "Alert",
                       // itemId: "alertClientoption"
                    //}
                ]
            },
	{ xtype: "fieldset",
	  items: [
                    {
                        xtype: 'textfield',
                        name: 'text',
                        label: 'Text',
                        required: true
                    },
                    {
                        xtype: 'textareafield',
                        name: 'value',
                        label: 'value'
                    }
                ]
            },
			{
    xtype: 'togglefield',
    docked: 'bottom',
	itemid: "toggleList",
    label: 'Toggle Listener'},
			{
        xtype: 'toolbar',
        centered: true,
        items: [
            {
                xtype: 'button',
                text: 'change from offline to online',
                flex: 1,
                handler: function() {
                    Ext.ComponentQuery.query('togglefield')[0].toggle();
                }
            }
        ]
    }],
	listeners: [{
            delegate: "#optionList",
			event: "disclose",
            fn: "onNewOptionTap"
        },
			{
                delegate: "#backButton",
                event: "tap",
                fn: "onBackButtonTapp"
            },
            {
                delegate: "#saveClientoption",
                event: "tap",
                fn: "onSaveClientoption"
            },
			//,
            //{
              //  delegate: "#alertClientoption",
               // event: "tap",
               // fn: "alertClientoption"
            //},
		{
            delegate: "#toggleList",
			event: "change",
            fn: "onToggle"
        }
]
		},
	onNewOptionTap: function (list, record, target, index, evt, options) {
        console.log("newOCommand");
		
        this.fireEvent("newOCommand", this);
    },
	onBackButtonTapp: function () {
        console.log("backHomeCommand");
        this.fireEvent("backHomeCommand", this);
    },
	//alertClientoption: function () {
	
        //console.log("alertCommand");
        //this.fireEvent("alertCommand", this);
    //},
	onSaveClientoption: function () {
        console.log("sCommand");
        this.fireEvent("sCommand", this);
    },
	onToggle: function () {
        console.log("newToggleCommand");
		
        this.fireEvent("newToggleCommand", this);
    }
});