var notes = [],
    $addNote = $('#add-note'),
    addNoteForm = $addNote.find('.header-form'),
    $notes = $('.notes'),
    notesContainer = $notes.find('.container'),
    note_title = addNoteForm.find('input[name="note_title"]'),
    note_content = addNoteForm.find('textarea[name="note_content"]');

var d = new Date(),
    cnt = d.getTime() + Math.random();

function appendSingleNote(data) {
    var content = data.content, title = data.title, count = data.id;
    
    var html = '<div style="border-radius: 10px" class="note" id="' + count + '">' +
                    '<table> <tr> <td> <p class="note-title">' + title + 
                    '</p> </td> ' + 
                    '<td> <input type="image" src="https://cdn3.iconfinder.com/data/icons/interface/100/close_button_1-512.png" style="height: 16px; width: 16px" onclick="removeNote(' + count + ')"> </input> </td>' +
                    '</tr> </table>' + 
                    '<p class="note-content">' +
                    content + 
                    '</p>' + 
                '</div>';
    
    notesContainer.append(html);
}

function storeNote(data) {
    notes.push(data);
    window.localStorage.setItem('notes', JSON.stringify(notes));
    
    appendSingleNote(data);
}

function init() {
    if (!!window.localStorage.getItem('notes')) {
        notes = JSON.parse(window.localStorage.getItem('notes'));
    } else {
        notes = [];
    }
    
    var i;
    for (i = 0; i < notes.length; i++) {
        appendSingleNote(notes[i]);
    }
}

addNoteForm.on('submit', function(e) {
    e.preventDefault();
    var data = {title: note_title.val(), content: note_content.val(), id: cnt};    
    
    storeNote(data);
})

init();

function removeNote(id) {
    notes = notes.filter(function(e) {
        return e.id !== id;
    });
    window.localStorage.setItem('notes', JSON.stringify(notes));
    
    var parent = document.getElementById('notes_all');
    var child = document.getElementById(id);
    parent.removeChild(child);
}