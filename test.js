var edit = false;
var pointer;
var userId = 11;

$(document).ready(function () {
    // Initial GET request to fetch existing to-do items
    // fetchToDoItems();

    // When + button is clicked
    $('.new-list').click(function () {
        clickedPlusButton();
    });

    // When the Add button is clicked
    $('.add-new-item').click(function () {
        if (edit) {
            editToDoItem();
            edit = false;
        } else {
            addNewToDoItem();
        }

        // Sort and display the list immediately after adding a new item
        var filterType = $('.sort div.clicked').text().toLowerCase();
        filterToDoItems(filterType);
        clickedAddButton();
    });

    // If Enter key is pressed, it will be the same as pressing the Add button
    $('.input-new-item').keyup(function (event) {
        enterKeyIsAddButton(event);
    });

    // When the checkbox is clicked
    $('.container-content-left').on('click', '.checkbox-container', function () {
        checkedToDoItem($(this));
    });

    // When the remove button is clicked
    $(document).on('click', '.close-button', function () {
        removeToDoItem($(this));
    });

    // When the text container is clicked
    $(document).on('click', '.container-content-left', function () {
        checkedToDoItem($(this).children('.checkbox-container'));
    });

    // When edit is clicked
    $(document).on('click', '.edit-button', function () {
        edit = true;
        pointer = $(this).parents('.list').find('.text');
        $('.input-new-item').val($(this).parents('.list').find('.text').text());
        clickedPlusButton();
    });

    $('.sort div').each((i, e) => {
        $(e).click(() => {
            $('div.clicked').removeClass('clicked');
            $(e).addClass('clicked');
            filterToDoItems($(e).text().toLowerCase());
        });
    });
});

function editToDoItem() {
    var editText = $('.input-new-item').val();
    if ($.trim(editText) !== '') {
        pointer.text(editText);
    } else {
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
    fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function (data) {
            data.forEach(function (item) {
                addListItem(item);
            });
        })
        .catch(function (error) {
            console.log('Error fetching to-do items:', error);
        });
}

function addListItem(item) {
    var listItem = $('<li class="list">').appendTo('ul');
    var toDoListContainer = $('<div class="to-do-list-container">').appendTo(listItem);
    var containerContentLeft = $('<div class="container-content-left">').appendTo(toDoListContainer);
    $('<div class="checkbox-container">').appendTo(containerContentLeft);
    var textContainer = $('<div class="text-container">').appendTo(containerContentLeft);
    $('<p class="text">').text(item.title).appendTo(textContainer);

    var containerContentRight = $('<div class="container-content-right">').appendTo(toDoListContainer);
    $('<button class="edit-button">').html('<i class="fa fa-pencil"></i>').appendTo(containerContentRight);
    $('<button class="close-button">').html('<i class="fa fa-trash-o"></i>').appendTo(containerContentRight);

    if (item.completed) {
        $('li').last().find('.checkbox-container').click();
    }
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
    $('.input-new-item').val('');
}

function enterKeyIsAddButton(event) {
    if (event.keyCode === 13) {
        $('.add-new-item').click();
    }
}

function checkedToDoItem(event) {
    var listItem = event.parents('.list');
    var todoId = listItem.data("todoid");
    var isChecked = !listItem.hasClass('checked');

    var updatedData = {
        completed: isChecked
    };

    // Use the PUT method to update the to-do item
    // updateToDoItem(todoId, updatedData);

    event.toggleClass('checked-checkbox');
    listItem.find('.text').toggleClass('checked-text');
    listItem.toggleClass('checked');

    // Sort and display the list immediately after toggling the checkbox
    var filterType = $('.sort div.clicked').text().toLowerCase();
    filterToDoItems(filterType);
}

function removeToDoItem(event) {
    var listItem = event.parents('.list');
    var todoId = listItem.data("todoid");

    // Use the DELETE method to remove the to-do item
    deleteToDoItem(todoId);

    listItem.hide('fast', function () {
        listItem.remove();
    });
}

function addNewToDoItem() {
    var addText = $('.input-new-item').val();
    if ($.trim(addText) !== '') {
        var newData = {
            userId: userId,
            title: addText,
            completed: false
        };

        // Use the POST method to create a new to-do item
        createToDoItem(newData);
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

function createToDoItem(newData) {
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(newData),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        // Add the new item to the list and sort it
        addListItem(json);
        var filterType = $('.sort div.clicked').text().toLowerCase();
        filterToDoItems(filterType);
    });
}











































   // if ($.trim(addText) !== ''){
    //     $('.all').click();
    //     $('ul').append('<li class="list">' + 
    //                         '<div class="to-do-list-container">' +
    //                             '<div class="container-content-left">' +
    //                                 '<div class="checkbox-container">' + '</div>' +
    //                                 '<div class="text-container">' +
    //                                     '<p class="text">' + addText  + '</p>' +
    //                                 '</div>' +
    //                             '</div>' +
    //                             '<div class="container-content-right">' +
    //                                 '<button class="edit-button">' + '<i class="fa fa-pencil"></i>' + '</button>' +
    //                                 '<button class="close-button">' + '<i class="fa fa-trash-o"></i>' + '</button>' +
    //                             '</div>' +
    //                         '</div>' +
    //                     '</li>');

    // }else{
    //     return;
    // }






// function editToDoItem(event) {
//     edit = true;
//     $('.input-new-item').val(event.parents('.list').find('.text').text());
//     clickedPlusButton();
//     pointer = event.parents('.list').find('.text');
// }

// function addNewToDoItem(addText) {
//     if (edit){
//         var editText = $('.input-new-item').val();
//         if ($.trim(editText) !== ''){
//             pointer.text(editText)
//         }else{
//             return;
//         }
//         edit = false;
//         clickedAddButton();
//     }else{
//         if ($('.input-new-item').val() !== ''){
//             addText = $('.input-new-item').val();

//         }
//         if ($.trim(addText) !== ''){
//             $('.all').click();
//             $('ul').append('<li class="list">' + 
//                                 '<div class="to-do-list-container">' +
//                                     '<div class="container-content-left">' +
//                                         '<div class="checkbox-container">' + '</div>' +
//                                         '<div class="text-container">' +
//                                             '<p class="text">' + addText  + '</p>' +
//                                         '</div>' +
//                                     '</div>' +
//                                     '<div class="container-content-right">' +
//                                         '<button class="edit-button">' + '<i class="fa fa-pencil"></i>' + '</button>' +
//                                         '<button class="close-button">' + '<i class="fa fa-trash-o"></i>' + '</button>' +
//                                     '</div>' +
//                                 '</div>' +
//                             '</li>');

//         }else{
//             return;
//         }
//     }
// }





// fetch('https://jsonplaceholder.typicode.com/todos', {
//     method: 'POST',
//     headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//     },
//     body: JSON.stringify({
//         "userId": userId,
//         "title": addText,
//         "completed": false
//     }),
// })
// .then(function (response) {
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return response.json();
// })
// .catch(function (error) {
//     console.log('Error adding a new to-do item:', error);
// });





















// // When the plus button is pressed, reveal the input element and hide the plus button
// var edit = false;
// var pointer;
// var userId = 11;


// $('.new-list').click(function(){
//     clickedPlusButton();
// });

// // When the Add button is clicked
// $('.add-new-item').click(function(){
//     addNewToDoItem();
//     clickedAddButton();
// });

// // If Enter key is pressed, it will be the same as pressing the Add button
// $('.input-new-item').keyup(function(event){
//     enterKeyIsAddButton(event)
// });

// // When the checkbox is clicked
// $('.container-content-left').on('click','.checkbox-container', function(){
//     checkedToDoItem($(this));
// });

// // When the remove button is clicked
// $(document).on('click','.close-button', function(){
//     removeToDoItem($(this));
// });

// // When the text container is clicked
// $(document).on('click','.container-content-left', function(){
//     checkedToDoItem($(this).children('.checkbox-container'));
// });

// // When edit is clicked
// $(document).on('click','.edit-button', function(){
//     editToDoItem($(this));
// });

// $('.sort div').each((i,e) => {
//     $(e).click(() => {
//         $('div.clicked').removeClass('clicked');
//         $(e).addClass('clicked');
//     });
// });

// $('.all').click(function(event){
//     $('li').each(function(){
//         $(this).show();
//     })
// });

// $('.pending').click(function(event){
//     $('li').each(function(){
//         if (!$(this).hasClass('checked')){
//             $(this).show();
//         }else{
//             $(this).hide();
//         }
//     })
// });

// $('.done').click(function(event){
//     $('li').each(function(){
//         if ($(this).hasClass('checked')){
//             $(this).show();
//         }else{
//             $(this).hide();
//         }
//     })
// });









































// function clickedPlusButton() {
//     $('.input-list').css('bottom', '10px');
//     $('.new-list-button').css('right', '-100%');
// }

// function clickedAddButton() {
//     $('.input-list').css('bottom', '-100%');
//     $('.new-list-button').css('right', '10px');
//     $('.input-new-item').val('')
// }

// function enterKeyIsAddButton(event) {
//     if(event.keyCode === 13){
//         $('.add-new-item').click();
//     }
// }

// function checkedToDoItem(event) {
//     event.toggleClass('checked-checkbox'); 
//     event.parent().toggleClass('checked-text'); 
//     event.parents(".list").toggleClass('checked'); 
// }

// function removeToDoItem(event) {
//     event.parents(".list").hide('fast', function(){ event.parents(".list").remove();});
// }

// function editToDoItem(event) {
//     edit = true;
//     $('.input-new-item').val(event.parents('.list').find('.text').text());
//     clickedPlusButton();
//     pointer = event.parents('.list').find('.text');
// }

// function addNewToDoItem() {
//     if (edit){
//         var editText = $('.input-new-item').val();
//         if ($.trim(editText) !== ''){
//             pointer.text(editText)
//         }else{
//             return;
//         }
//         edit = false;
//         clickedAddButton();
//     }else{
//         var addText = $('.input-new-item').val();
//         if ($.trim(addText) !== ''){
//             $('.all').click();
//             $('ul').append('<li class="list">' + 
//                                 '<div class="to-do-list-container">' +
//                                     '<div class="container-content-left">' +
//                                         '<div class="checkbox-container">' + '</div>' +
//                                         '<div class="text-container">' +
//                                             '<p class="text">' + addText  + '</p>' +
//                                         '</div>' +
//                                     '</div>' +
//                                     '<div class="container-content-right">' +
//                                         '<button class="edit-button">' + '<i class="fa fa-pencil"></i>' + '</button>' +
//                                         '<button class="close-button">' + '<i class="fa fa-trash-o"></i>' + '</button>' +
//                                     '</div>' +
//                                 '</div>' +
//                             '</li>');

//         }else{
//             return;
//         }
//     }
// }
