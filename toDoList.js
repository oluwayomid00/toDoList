var edit = false;
var pointer;
var userId = 11;

$(document).ready(function () {
    // Initial GET request to fetch existing to-do items
    fetchToDoItems();

    // When + button is clicked
    $('.new-list').click(function(){
        clickedPlusButton();
    });
    
    // When the Add button is clicked check if its a new entry or an edited task
    $('.add-new-item').click(function(){
        isEdit();
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
        moveTextToInputForm($(this));
    });

    $('.sort div').each((i,e) => {
        $(e).click(() => {
            $('div.clicked').removeClass('clicked');
            $(e).addClass('clicked');
            filterToDoItems($(e).text().toLowerCase());
        });
    });
});

function isEdit() {
    if (edit){
        editToDoItem();
        edit = false;
    }else{
        addNewToDoItem();
    }
}

function moveTextToInputForm(event){
    edit = true;
    pointer = event.parents('.list').find('.text');
    $('.input-new-item').val(pointer.text());
    clickedPlusButton();
}

function editToDoItem() {
    var editText = $('.input-new-item').val();
        if ($.trim(editText) !== ''){
            pointer.text(editText)
        }else{
            return;
        }
        var listItem = pointer.parents('.list');
        var todoId = listItem.data("todoid");
    
        var updatedData = {
            title: editText
        };
    
        // Use the PUT method to update the to-do item
        // updateToDoItem(todoId, updatedData);
}

function fetchToDoItems() {
    // fetch('https://jsonplaceholder.typicode.com/todos')
    fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
        .then((response) => response.json())
        .then((data)=>{
            data.forEach((item)=>{
                addListItem(item);
            });
        })
}

function addListItem(item) {
    addItem(item.title);
    if (item.completed) {
        $('li').last().find('.checkbox-container').click();
    }
}

function addItem(event){
    $('ul').append('<li class="list" data-todoid="' + '">' +
                        '<div class="to-do-list-container">' +
                            '<div class="container-content-left">' +
                                '<div class="checkbox-container">' + '</div>' +
                                '<div class="text-container">' +
                                    '<p class="text">' + event + '</p>' +
                                '</div>' +
                            '</div>' +
                            '<div class="container-content-right">' +
                                '<button class="edit-button">' + '<i class="fa fa-pencil"></i>' + '</button>' +
                                '<button class="close-button">' + '<i class="fa fa-trash-o"></i>' + '</button>' +
                            '</div>' +
                        '</div>' +
                    '</li>');
}

function filterToDoItems(filterType) {
    $('li').each(function () {
        var listItem = $(this);
        var isChecked = listItem.hasClass('checked');

        if (filterType === 'all') {
            listItem.show();
        } else if (filterType === 'pending' && !isChecked) {
            listItem.show();
        } else if (filterType === 'done' && isChecked) {
            listItem.show();
        } else {
            listItem.hide();
        }
    });
}

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
    var listItem = event.parents('.list');
    var todoId = listItem.data("todoid");
    var isChecked = !listItem.hasClass('checked');

    // updateToDoItem(todoId, {
    //     completed: isChecked
    // });

    event.toggleClass('checked-checkbox'); 
    listItem.find('.text').toggleClass('checked-text'); 
    listItem.toggleClass('checked'); 

    // Sort and display the list immediately after toggling the checkbox
    var filterType = $('.sort div.clicked').text().toLowerCase();
    filterToDoItems(filterType);
}

function removeToDoItem(event) {
    event.parents(".list").hide('fast', function(){ event.parents(".list").remove();});
    var todoId = event.parents('.list').data("todoid");

    // Use the DELETE method to remove the to-do item
    deleteToDoItem(todoId);
}



// function addNewToDoItem() {
//     var addText = $('.input-new-item').val();
//     if ($.trim(addText) !== '') {
//         // $('.all').click();
//         fetch('https://jsonplaceholder.typicode.com/todos', {
//             method: 'POST',
//             body: JSON.stringify({
//                 userId: userId,
//                 title: addText,
//                 completed: false
//             }),
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//             },
//         })
//         .then((response) => response.json())
//         .then((json) => {
//             console.log(json);
//             $('ul').append('<li class="list" data-todoid="' + json.id + '">' +
//                                 '<div class="to-do-list-container">' +
//                                     '<div class="container-content-left">' +
//                                         '<div class="checkbox-container">' + '</div>' +
//                                         '<div class="text-container">' +
//                                             '<p class="text">' + addText + '</p>' +
//                                         '</div>' +
//                                     '</div>' +
//                                     '<div class="container-content-right">' +
//                                         '<button class="edit-button">' + '<i class="fa fa-pencil"></i>' + '</button>' +
//                                         '<button class="close-button">' + '<i class="fa fa-trash-o"></i>' + '</button>' +
//                                     '</div>' +
//                                 '</div>' +
//                             '</li>');
//             // Sort and display the list immediately after toggling the checkbox
//             var filterType = $('.sort div.clicked').text().toLowerCase();
//             filterToDoItems(filterType);
//         });
//     } else {
//         return;
//     }
// } 
function addNewToDoItem() {
    var addText = $('.input-new-item').val();
    if ($.trim(addText) !== '') {
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify({
                userId: userId,
                title: addText,
                completed: false
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json());
        addItem(addText);
        // Sort and display the list immediately after toggling the checkbox
        var filterType = $('.sort div.clicked').text().toLowerCase();
        filterToDoItems(filterType);
    } else {
        return;
    }
}

function updateToDoItem(todoId, updatedData) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
    });
}

function deleteToDoItem(todoId) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: 'DELETE',
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((json) => {
        console.log(json);
    });
}