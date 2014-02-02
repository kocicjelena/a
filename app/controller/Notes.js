Ext.define("mega.controller.Notes", {

    extend: "Ext.app.Controller",
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            notesListView: "noteslistview",
            noteEditorView: "noteeditorview",
			selectEditorView: "selecteditorview",
			myselectView: "myselectview",
			myselectListView: "myselectlistview",
            notesList: "#notesList",
			optionList: "#optionList"
        },
        control: {
            notesListView: {
                // The commands fired by the notes list container.
                newNoteCommand: "onNewNoteCommand",
                editNoteCommand: "onEditNoteCommand",
				newCommand: "onNewCommand"
            },
            noteEditorView: {
                // The commands fired by the note editor.
                saveNoteCommand: "onSaveNoteCommand",
                deleteNoteCommand: "onDeleteNoteCommand",
                backToHomeCommand: "onBackToHomeCommand",
                selectCommand: "onSelectCommand",
				selectSaveCommand: "onselectSaveCommand"
            },
            selectEditorView: {
                // The commands fired by the note editor.
                editSelectCommand: "onEditSelectCommand",
				saveSelectCommand: "onSaveSelectCommand",
                deleteNoteCommand: "onDeleteNoteCommand",
                backToHomeCommand: "onBackToHomeCommand"
            },
            myselectView: {
                // The commands fired by the note editor.
                newOCommand: "onNewOptionCommand",
				newToggleCommand: "onNewToggleCommand",
				backHomeCommand: "onBackCommand",
				sCommand: "onsCommand",
				alertCommand: "onalertCommand"
            },
			myselectListView: {
                // The commands fired by the note editor.
                baCommand: "onBaCommand",
				newC: "onNewC",
				optsCommand: "onOptsCommand",
				newB: "onNewB",
				onDeleteOptionCommand: "onDeleteOptionCommand"
            }

        }
    },
    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    // Helper functions
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    activateNoteEditor: function (record) {

        var noteEditorView = this.getNoteEditorView();
        noteEditorView.setRecord(record); // load() is deprecated.
        Ext.Viewport.animateActiveItem(noteEditorView, this.slideLeftTransition);
    },
	activateSelectEditor: function (record) {

        var selectEditorView = this.getSelectEditorView();
        selectEditorView.setRecord(record); // load() is deprecated.
        Ext.Viewport.animateActiveItem(selectEditorView, this.slideLeftTransition);
    },
    activateNotesList: function () {
        Ext.Viewport.animateActiveItem(this.getNotesListView(), this.slideRightTransition);
    },
	activateMyselectList: function () {
        Ext.Viewport.animateActiveItem(this.getMyselectListView(), this.slideRightTransition);
    },
    activateMyselect: function (record) {
	    var myselectView = this.getMyselectView();
        myselectView.setRecord(record);
        Ext.Viewport.animateActiveItem(this.getMyselectView(), this.slideRightTransition);
    },
    //addOptionList: function() {
        //this.getOptionList().add({
           // text: 'Logout'
        //});
		//this.activateMyselect();
    //}
    // Commands.
	onNewToggleCommand: function(field, thumb, enabled) {
	        
      
            if (enabled) {
                
                Ext.Msg.alert('Selected!');
            } else {
                pass
               //getMyselectView.setText('Listener Disabled');
           }
			this.activateMyselect();
        },
	onNewB: function() {
		console.log("onCommand");

        var now = new Date();
        var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

        var newO = Ext.create("mega.model.Option", {
            id: noteId,
            dateCreated: now,
            text: "",
            value: ""
        });

        this.activateMyselect(newO);
            
        },
	onalertCommand: function (list, record) {
	   console.log("onalertCommand");
		 Ext.Msg.alert(
            record.get('name') // the title of the alert
         // "The age of this person is: " + record.get('age') the message of the alert
        );
		this.activateMyselect(record);
            
        },
    onNewNoteCommand: function () {

        console.log("onNewNoteCommand");

        var now = new Date();
        var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

        var newNote = Ext.create("mega.model.Note", {
            id: noteId,
            dateCreated: now,
            title: "",
            narrative: ""
        });

        this.activateNoteEditor(newNote);

    },
	onNewOptionCommand: function (list, record) {
	    console.log("onNewOCommand");
        //var prom = this.getOptionList().add({
            //text: 'Logout'
        //});
	    this.activateMyselect(record);
	},
	onNewCommand: function () {
	    console.log("onNewOCommand");
        //var prom = this.getOptionList().add({
            //text: 'Logout'
        //});
	    this.activateMyselectList();
	},
    onEditNoteCommand: function (list, record) {

        console.log("onEditNoteCommand");

        this.activateNoteEditor(record);
    },
	onEditSelectCommand: function (list, record) {

        console.log("onEditSelectCommand");

        this.activateSelectEditor(record);
    },
	onselectSaveCommand: function () {
        console.log("onselectsaveCommand");
		var noteEditorView = this.getNoteEditorView();

        var currentNote = noteEditorView.getRecord();
        var newValues = noteEditorView.getValues();
		var now = new Date();
        var selectId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

        var newSelect = Ext.create("mega.model.Option", {
            id: selectId,
            dateCreated: now,
            text: "",
            value: ""
        });
        // Update the current note's fields with form values.
        newSelect.set("text", newValues.title);
        newSelect.set("value", newValues.narrative);

        var optionsStore = Ext.getStore("Options");
        optionsStore.add(newSelect);
        
        optionsStore.sync();

        optionsStore.sort([{ property: 'dateCreated', direction: 'DESC'}]);
     
        this.activateMyselectList();
	},
	onsCommand: function (list, record) {

        console.log("onSCommand");
        var mV = this.getMyselectView();
        var curren = mV.getRecord();
        var newV = mV.getValues();
		var now = new Date();
        var selectId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

        var current = Ext.create("mega.model.Option", {
            id: selectId,
            dateCreated: now,
            text: "",
            value: ""
        });
		current.set("text", newV.text);
        current.set("value", newV.value);
        var optionsStore = Ext.getStore("Options");

        optionsStore.add(current);

        optionsStore.sync();

        optionsStore.sort([{ property: 'dateCreated', direction: 'DESC'}]);

        this.activateMyselect(current);
    },
    onSaveNoteCommand: function () {

        console.log("onSaveNoteCommand");

        var noteEditorView = this.getNoteEditorView();

        var currentNote = noteEditorView.getRecord();
        var newValues = noteEditorView.getValues();

        // Update the current note's fields with form values.
        currentNote.set("title", newValues.title);
        currentNote.set("narrative", newValues.narrative);

        var errors = currentNote.validate();

        if (!errors.isValid()) {
            Ext.Msg.alert('Wait!', errors.getByField("title")[0].getMessage(), Ext.emptyFn);
            currentNote.reject();
            return;
        }

        var notesStore = Ext.getStore("Notes");

        if (null == notesStore.findRecord('id', currentNote.data.id)) {
            notesStore.add(currentNote);
        }

        notesStore.sync();

        notesStore.sort([{ property: 'dateCreated', direction: 'DESC'}]);

        this.activateNotesList();
    },
	onSelectCommand: function () {

        console.log("onselectCommand");
		var noteEditorView = this.getNoteEditorView();

        var currentNote = noteEditorView.getRecord();
        var newValues = noteEditorView.getValues();
		var now = new Date();
        var selectId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

        var newSelect = Ext.create("mega.model.Option", {
            id: selectId,
            dateCreated: now,
            text: "",
            value: ""
        });
        // Update the current note's fields with form values.
        newSelect.set("text", newValues.title);
        newSelect.set("value", newValues.narrative);

        var optionsStore = Ext.getStore("Options");
        optionsStore.add(newSelect);
        
        optionsStore.sync();

        optionsStore.sort([{ property: 'dateCreated', direction: 'DESC'}]);
     
        this.activateSelectEditor(newSelect);

    },
	onSaveSelectCommand: function () {
        console.log("onSelectCommand");
		
        var sEV = this.getSelectEditorView();
        var currentSelected = sEV.getRecord();
        var newSelected = sEV.getValues();
		var now = new Date();
        var selectId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();
        var newSelectopt = Ext.create("mega.model.Option", {
            id: selectId,
            dateCreated: now,
            text: "",
            value: ""
        });
        // Update the current note's fields with form values.
        newSelectopt.set("text", newSelected.text);
        newSelectopt.set("value", newSelected.value);

        var optionsStore = Ext.getStore("Options");
        optionsStore.add(newSelectopt);
        
        optionsStore.sync();

        optionsStore.sort([{ property: 'dateCreated', direction: 'DESC'}]);
     
        this.activateMyselectList();
    },
    onDeleteNoteCommand: function () {

        console.log("onDeleteNoteCommand");

        var noteEditorView = this.getNoteEditorView();
        var currentNote = noteEditorView.getRecord();
        var notesStore = Ext.getStore("Notes");

        notesStore.remove(currentNote);
        notesStore.sync();

        this.activateNotesList();
    },
	onDeleteOptionCommand: function () {

        console.log("onDeleteOptionCommand");

        var sV = this.getMyselectView();
        var currentO = sV.getRecord();
        var optionsStore = Ext.getStore("Options");

        optionsStore.remove(currentO);
        optionsStore.sync();

        this.activateMyselectList();
    },
    onBackToHomeCommand: function () {

        console.log("onBackToHomeCommand");
        this.activateNotesList();
    },
    onBackCommand: function () {

        console.log("onBackHomeCommand");
        this.activateNotesList();
    },
	onBaCommand: function () {

        console.log("onBackHomeCommand");
        this.activateNotesList();
    },
	onNewC: function () {

        
		Ext.Msg.alert('Your connection type is:  + Ext.device.Connection.getType()');
       
    },
	
    // Base Class functions.
    launch: function () {
        this.callParent(arguments);
        var notesStore = Ext.getStore("Notes");
        notesStore.load();
		var optionsStore = Ext.getStore("Options");
        optionsStore.load();
        console.log("launch");
    },
    init: function () {
        this.callParent(arguments);
        console.log("init");
    }
});