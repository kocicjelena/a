Ext.define("mega.view.SelectEditor", {
    extend: "Ext.form.Panel",
    requires: "Ext.form.FieldSet",
    alias: "widget.selecteditorview",
    config: {
        scrollable: 'vertical',
        items: [
            {
                xtype: "toolbar",
                docked: "top",
                title: "Selected",
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
                        itemId: "saveButton"
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
                        itemId: "deleteButton"
                    }
                ]
            },
            { xtype: "fieldset",
                items: [
                    {
                        xtype: 'textfield',
                        name: 'title',
                        label: 'Title',
                        required: true
                    },
                    {
                        xtype: 'textareafield',
                        name: 'narrative',
                        label: 'Narrative'
                    }
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
            }
        ],
        listeners: [
            {
                delegate: "#backButton",
                event: "tap",
                fn: "onBackButtonTap"
            },
            {
                delegate: "#saveButton",
                event: "tap",
                fn: "onSaveButtonTap"
            },
            {
                delegate: "#deleteButton",
                event: "tap",
                fn: "onDeleteButtonTap"
            },
			{
            delegate: "#optionList",
            event: "disclose",
            fn: "onSelectListDisclose"
        }
        ]
    },
    onSaveButtonTap: function () {
        console.log("saveSelectCommand");
        this.fireEvent("saveSelectCommand", this);
    },
    onDeleteButtonTap: function () {
        console.log("deleteNoteCommand");
        this.fireEvent("deleteNoteCommand", this);
    },
    onBackButtonTap: function () {
        console.log("backToHomeCommand");
        this.fireEvent("backToHomeCommand", this);
    },
	onSelectListDisclose: function (list, record, target, index, evt, options) {
        console.log("editSelectCommand");
        this.fireEvent('editSelectCommand', this, record);
    }

});

