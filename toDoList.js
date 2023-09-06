// When the plus button is pressed, reveal the input element and hide the plus button
var edit = false;
var pointer;
$('.all').addClass('clicked');

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
$('.container-content-left').on('click','.checkbox-container', function(){
    checkedToDoItem($(this));
});

// When the remove button is clicked
$(document).on('click','.close-button', function(){
    removeToDoItem($(this));
});

// When the text container is clicked
$(document).on('click','.container-content-left', function(){
    checkedToDoItem($(this).children('.checkbox-container'));
});

// When edit is clicked
$(document).on('click','.edit-button', function(){
    editToDoItem($(this));
});

$('.all').click(function(event){
    $('.all').addClass('clicked');
    $('.pending').removeClass('clicked');
    $('.done').removeClass('clicked');
    $('li').each(function(){
        $(this).show();
    })
});

$('.pending').click(function(event){
    $('.all').removeClass('clicked');
    $('.pending').addClass('clicked');
    $('.done').removeClass('clicked');
    $('li').each(function(){
        if (!$(this).hasClass('checked')){
            $(this).show();
        }else{
            $(this).hide();
        }
    })
});

$('.done').click(function(event){
    $('.all').removeClass('clicked');
    $('.pending').removeClass('clicked');
    $('.done').addClass('clicked');
    $('li').each(function(){
        if ($(this).hasClass('checked')){
            $(this).show();
        }else{
            $(this).hide();
        }
    })
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
    event.parent().parent().parent().toggleClass('checked'); 
}

function removeToDoItem(event) {
    event.parent().parent().parent().hide('fast', function(){ event.parent().parent().parent().remove();});
}

function editToDoItem(event) {
    edit = true;
    $('.input-new-item').val(event.parent().siblings('.container-content-left').children('.text-container').children('.text').text());
    // $('.input-new-item').val(event.parent().siblings('.container-content-left').children('.text-container .text').text());
    clickedPlusButton();
    pointer = event.parent().siblings('.container-content-left').children('.text-container').children('.text');
    // addNewToDoItem(event.parent().siblings('.container-content-left').children('.text-container').children('.text'));
    // edit = false;
}

function addNewToDoItem() {
    if (edit){
        var editText = $('.input-new-item').val();
        if ($.trim(editText) !== ''){
            pointer.text(editText)
        }else{
            return;
        }
        edit = false;
        clickedAddButton();
    }else{
        var addText = $('.input-new-item').val();
        if ($.trim(addText) !== ''){
            $('ul').append('<li class="list">' + 
                                '<div class="to-do-list-container">' +
                                    '<div class="container-content-left">' +
                                        '<div class="checkbox-container">' + '</div>' +
                                        '<div class="text-container">' +
                                            '<p class="text">' + addText  + '</p>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="container-content-right">' +
                                        '<button class="edit-button">' + '<i class="fa fa-pencil"></i>' + '</button>' +
                                        '<button class="close-button">' + '<i class="fa fa-trash-o"></i>' + '</button>' +
                                    '</div>' +
                                '</div>' +
                            '</li>');
        }else{
            return;
        }
    }
}
