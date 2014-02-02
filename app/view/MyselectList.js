Ext.define("mega.view.MyselectList", {
    extend: "Ext.Container",
    requires:["Ext.dataview.List", "Ext.MessageBox"],
    alias: "widget.myselectlistview",

    config: {
	    scrollable: 'vertical',
        layout: {
            type: 'fit'
        },
        items: [{
            xtype: "toolbar",
            title: "Demand of client",
            docked: "top",
            items: [
			    {xtype: "button",
                        ui: "back",
                        text: "Home",
                        itemId: "backButton"
                    },
                { xtype: 'spacer' },
                {
                    xtype: "button",
                    text: 'New for client',
                    ui: 'action',
                    itemId: "newButton"
                }
            ]
        },
            {
                xtype: "toolbar",
                docked: "bottom",
                items: [
				    {
                        xtype: "button",
                        iconCls: "trash",
                        iconMask: true,
                        itemId: "deleteOption"
                    },
                    { xtype: "spacer" },
                    {
                        xtype: "button",
                        //ui: "action",
                        text: "send",
                        itemId: "OptionButton",
						listeners: {
        tap: function() {
            alert('You are currently connected via + Ext.device.Connection.getType()');
        }
    }
                    }
                ]
            },{
            xtype: "selectfield",
			title: 'Select',
            store: "Options",
            itemId:"optionsList",
            loadingText: "Loading Notes...",
            emptyText: "<div class=\"notes-list-empty-text\">No notes found.</div>",
            onItemDisclosure: true,
            grouped: true,
            itemTpl: "<div class=\"list-item-title\">{text}</div><div class=\"list-item-narrative\">{value}</div>"       
        },
		{
            xtype: "list",
            store: "Notes",
            itemId:"notesList",
            loadingText: "Loading Notes...",
            emptyText: "<div class=\"notes-list-empty-text\">No notes found.</div>",
            onItemDisclosure: true,
            grouped: true,
            itemTpl: "<div class=\"list-item-title\">{title}</div><div class=\"list-item-narrative\">{narrative}</div>"       
        }],
        listeners: [
            {
                delegate: "#deleteOption",
                event: "tap",
                fn: "onDeleteButton"
            },
		    {
                delegate: "#backButton",
                event: "tap",
                fn: "onBaButtonTap"
            },
			{
            delegate: "#newButton",
            event: "tap",
            fn: "onNewButtonTap"
        }, 
		{
           delegate: "#optonsList",
           event: "disclose",
           fn: "onOptsListDisclose"
        }
		//, 
		//{
           // delegate: "#OptionButton",
           // event: "tap",
           // fn: "onOptionTap"
        //}
		]
    },
    onBaButtonTap: function () {
        console.log("baCommand");
        this.fireEvent("baCommand", this);
    },    
    onNewButtonTap: function () {
        console.log("newB");
        this.fireEvent("newB", this);
    },
    onOptsListDisclose: function (list, record, target, index, evt, options) {
        console.log("optsCommand");
        this.fireEvent('optsCommand', this, record);
    },
	onDeleteButton: function () {
        console.log("onDeleteOptionCommand");
        this.fireEvent("onDeleteOptionCommand", this);
    }
	//onOptionTap: function () {
      //  console.log("newC");
      //  this.fireEvent("newC", this);
    //}
});