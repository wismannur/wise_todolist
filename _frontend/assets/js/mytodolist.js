$(document).ready(function() {
    $('body').addClass('loaded');
    function getFirstData() {
        $.ajax({
            url: '../' + window.API + 'run_sql_get.php',
            type: 'GET',
            data : {
                as : 'json',
                sql : 'SELECT * FROM todo_item WHERE id_todo_master='+ window.localStorage.id_detail_todolist +''
            },
            success: function(data) {
                $('#myTable').find('tbody > .data-list').remove()
                if (data != "0 results") {
                    let result = JSON.parse(data)
                    for (let i = 0; i < result.length; i++) {
                        let tr = `<tr class="data-list">
                            <td>${i+1}</td>
                            <td class="time">${result[i].time}</td>
                            <td>${result[i].name_todo_item}</td>
                            <td class="category">${result[i].category}</td>
                            <td class="status">${result[i].status}</td>
                            <td><button id="editTodo" class="btn btn-warning btn-left" data-id="${result[i].id}" onclick="editTodo(${i+1})">Edit</button>
                            <button id="deleteTodo" class="btn btn-danger btn-right" data-toggle="modal" data-target="#modalDeleteToDo" data-id="${result[i].id}" onclick="deleteTodo(${i+1})">Delete</button></td></tr>`
                        $('#myTable').find('tbody').append(tr)
                    }
        
                    console.log(result)
                    // $('.spinner_req').hide();
                } else {
                    let tr = `<tr class="data-list">
                        <td></td>
                        <td style="text-align:center;" >No Data ToDoList</td>
                        <td class="for_date">Please</td>
                        <td style="text-align:center;" >Add New ToDoList</td>
                        <td></td>
                        <td></td>
                        </tr>`
                    $('#myTable').find('tbody').append(tr)
                }
                $('body').addClass('loaded');
            }
    
        })
    }

    function addNewToDo(obj) {
        let a = obj;
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
})