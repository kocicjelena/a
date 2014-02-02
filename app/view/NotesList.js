Ext.define("mega.view.NotesList", {
    extend: "Ext.Container",
    requires:"Ext.dataview.List",
    alias: "widget.noteslistview",

    config: {
        layout: {
            type: 'fit'
        },
        items: [{
            xtype: "toolbar",
            title: "My Notes",
            docked: "top",
            items: [
                { xtype: 'spacer' },
                {
                    xtype: "button",
                    text: 'New',
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
                        ui: "action",
                        text: "OptionSelect",
                        itemId: "OptionButton"
                    }
                ]
            }, {
            xtype: "list",
            store: "Notes",
            itemId:"notesList",
            loadingText: "Loading Notes...",
            emptyText: "<div class=\"notes-list-empty-text\">No notes found.</div>",
            onItemDisclosure: true,
            grouped: true,
            itemTpl: "<div class=\"list-item-title\">{title}</div><div class=\"list-item-narrative\">{narrative}</div>"       
        }],
        listeners: [{
            delegate: "#newButton",
            event: "tap",
            fn: "onNewButtonTap"
        }, {
            delegate: "#notesList",
            event: "disclose",
            fn: "onNotesListDisclose"
        }, {
            delegate: "#OptionButton",
            event: "tap",
            fn: "onOptionTap"
        }]
    },    
    onNewButtonTap: function () {
        console.log("newNoteCommand");
        this.fireEvent("newNoteCommand", this);
    },
    onNotesListDisclose: function (list, record, target, index, evt, options) {
        console.log("editNoteCommand");
        this.fireEvent('editNoteCommand', this, record);
    },
	onOptionTap: function () {
        console.log("newCommand");
        this.fireEvent("newCommand", this);
    }
});