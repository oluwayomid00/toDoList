// When the plus button is pressed, reveal the input element and hide the plus button
$('.new-list').click(function(){
    clickedPlusButton();
});

// When the Add button is clicked
$('.add-new-item').click(function(){
    addNewToDoItem();
    clickedAddButton();
});

// If Enter key is pressed, it will be the same as pressing the Add button
$('.input-new-item').keyup(function(event){
    enterKeyIsAddButton(event)
});

// When the checkbox is clicked
$(document).on('click','.checkbox-container', function(){
    checkedToDoItem($(this));
});

// When the remove button is clicked
$(document).on('click','.close-button', function(){
    removeToDoItem($(this));
});




























































function clickedPlusButton() {
    $('.input-list').css('bottom', '10px');
    $('.new-list-button').css('right', '-100%');
}

function clickedAddButton() {
    $('.input-list').css('bottom', '-100%');
    $('.new-list-button').css('right', '10px');
    $('.input-new-item').val('')
}

function enterKeyIsAddButton(event) {
    if(event.keyCode === 13){
        $('.add-new-item').click();
    }
}

function checkedToDoItem(event) {
    event.toggleClass('checked-checkbox'); 
    event.parent().toggleClass('checked-text'); 
}

function removeToDoItem(event) {
    event.parent().parent().parent().hide('fast', function(){ event.parent().parent().parent().remove();})
}

function addNewToDoItem() {
    var addText = $('.input-new-item').val();
    if (addText !== ''){
        $('ul').append('<li class="list">' + 
                            '<div class="to-do-list-container">' +
                                '<div class="container-content-left">' +
                                    '<div class="checkbox-container">' + '</div>' +
                                    '<div class="text-container">' +
                                        '<p class="text">' + addText  + '</p>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="container-content-right">' +
                                    '<button class="close-button">' + 'x' + '</button>' +
                                '</div>' +
                            '</div>' +
                        '</li>');
    }else{
        return;
    }
}
