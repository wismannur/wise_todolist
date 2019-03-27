$(document).ready(function() {
    function getFirstData() {
        $.ajax({
            url: window.API + 'run_sql_get.php',
            type: 'GET',
            data : {
                as : 'json',
                sql : 'SELECT * FROM todo_master'
            },
            success: function(data) {
                $('#myTable').find('tbody > .data-list').remove()
                let result = JSON.parse(data)
                for (let i = 0; i < result.length; i++) {
                    let for_date = result[i].for_date.split('-');
                    let convert_for_date = convertDate( for_date[2], for_date[1], for_date[0] )

                    console.log(for_date)
                    
                    var tr = `<tr class="data-list">
                        <td>${i+1}</td>
                        <td>${result[i].name_todo}</td>
                        <td class="for_date" data-date= "${result[i].for_date}">${convert_for_date}</td>
                        <td>${result[i].description}</td>
                        <td><button id="detailTodo" class="btn btn-primary btn-left" data-id="${result[i].id}">Detail</button>
                        <button id="editTodo" class="btn btn-warning btn-center" data-id="${result[i].id}">Edit</button>
                        <button id="deleteTodo" class="btn btn-danger btn-right" data-id="${result[i].id}">Delete</button></td></tr>`
                    $('#myTable').find('tbody').append(tr)
                }
    
                console.log(result)
                $('.spinner_req').hide();
                $('body').addClass('loaded');
            }
    
        })
    }

    function populateNull() {
        $('#nameToDo').val("");
        $('#forDate').val("");
        $('#descriptionToDo').val("");
    }

    function addNewToDo(obj) {
        var a = obj;
        $.ajax({
            url: window.API + 'run_sql_post.php',
            type: 'POST',
            data : {
                sql : "INSERT INTO todo_master (name_todo, for_date, created_at, updated_at, description) VALUES ('"+ a.name_todo +"', '"+ a.for_date +"', '"+ a.created_at +"', '"+ a.updated_at +"', '"+ a.description +"')"
            },
            success: function(data) {
                $('.spinner_req').show();
                if (data == 'true') {
                    console.log('data berhasil di simpan');
                    $('#collapsible').click();
                    $('body').removeClass('loaded');
                    populateNull()
                    getFirstData()
                } else {
                    console.log('error')
                }
            }
    
        })
    }

    $('#addNewToDo').on('click', function() {
        var obj = {
            name_todo: $('#nameToDo').val(),
            for_date: $('#forDate').val(),
            created_at: currentDate("date time"),
            updated_at: currentDate("date time"),
            description: $('#descriptionToDo').val()
        }

        addNewToDo(obj)
    })



    getFirstData()

});