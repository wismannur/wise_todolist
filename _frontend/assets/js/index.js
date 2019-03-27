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
                console.log(data)
                if (data != "0 results") {
                    let result = JSON.parse(data)
                    for (let i = 0; i < result.length; i++) {
                        let for_date = result[i].for_date.split('-');
                        let convert_for_date = convertDate( for_date[2], for_date[1], for_date[0] )
    
                        let tr = `<tr class="data-list">
                            <td>${i+1}</td>
                            <td>${result[i].name_todo}</td>
                            <td class="for_date" data-date= "${result[i].for_date}">${convert_for_date}</td>
                            <td>${result[i].description}</td>
                            <td><button id="detailTodo" class="btn btn-primary btn-left" data-id="${result[i].id}" onclick="detailTodo(${i+1})">Detail</button>
                            <button id="editTodo" class="btn btn-warning btn-center" data-id="${result[i].id}" onclick="editTodo(${i+1})">Edit</button>
                            <button id="deleteTodo" class="btn btn-danger btn-right" data-toggle="modal" data-target="#modalDeleteToDo" data-id="${result[i].id}" onclick="deleteTodo(${i+1})">Delete</button></td></tr>`
                        $('#myTable').find('tbody').append(tr)
                    }
        
                    console.log(result)
                    $('.spinner_req').hide();
                } else {
                    let tr = `<tr class="data-list">
                        <td></td>
                        <td style="text-align:center;" >No Data ToDoList</td>
                        <td class="for_date">Please</td>
                        <td style="text-align:center;" >Add New ToDoList</td>
                        <td></td></tr>`
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
                    populateNullMaster()
                    getFirstData()
                } else {
                    console.log('error')
                }
            }
    
        })
    }

    function updateToDo(obj) {
        let a = obj;
        $.ajax({
            url: window.API + 'run_sql_post.php',
            type: 'POST',
            data : {
                sql : "UPDATE todo_master SET name_todo='"+ a.name_todo +"', for_date='"+ a.for_date +"', updated_at='"+ a.updated_at +"', description='"+ a.description +"' WHERE id='"+ a.id +"'"
            },
            success: function(data) {
                $('.spinner_req').show();
                if (data == 'true') {
                    console.log('data berhasil di update');
                    $('#collapsible').click();
                    $('body').removeClass('loaded');
                    populateNullMaster()
                    getFirstData()
                    $('#collapsible').html("Add New ToDoList")
                    $('#updateToDo').hide()
                    $('#addNewToDo').show();
                    toastr.success("Update ToDoList Success");
                } else {
                    console.log('error')
                }
            }
    
        })
    }

    function fixDeleteToDo(id) {
        $.ajax({
            url: window.API + 'run_sql_post.php',
            type: 'POST',
            data : {
                sql : "DELETE FROM todo_master WHERE id='"+ id +"'"
            },
            success: function(data) {
                $('.spinner_req').show();
                if (data == 'true') {
                    console.log('data berhasil di hapus');
                    $('.close').click()
                    $('body').removeClass('loaded');
                    getFirstData()
                    toastr.success("Delete ToDoList Success");
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

    $('#updateToDo').on('click', function() {
        var obj = {
            id : $('#collapsible').attr('data-id'),
            name_todo: $('#nameToDo').val(),
            for_date: $('#forDate').val(),
            created_at: currentDate("date time"),
            updated_at: currentDate("date time"),
            description: $('#descriptionToDo').val()
        }

        updateToDo(obj)
    })


    window.editTodo = function(eq) {
        let parent = $('tr').eq(eq)
        let name_todo = parent.find('td').eq(1).text()
        let for_date = parent.find('td').eq(2).attr('data-date')
        let description = parent.find('td').eq(3).text()
        let id = parent.find('td').eq(4).find('#editTodo').attr('data-id')
        debugger
        $('#collapsible').attr('data-id', id)
        $('#nameToDo').val(name_todo)
        $('#forDate').val(for_date)
        $('#descriptionToDo').val(description)
        $('#collapsible').html("Edit ToDoList")
        $('#updateToDo').show();
        $('#addNewToDo').hide();
        $('#collapsible').click()
        $("html, body").animate({scrollTop: 0}, 400);
        console.log(id)
    }

    window.deleteTodo = function(eq) {
        let parent = $('tr').eq(eq)
        let id = parent.find('td').eq(4).find('#deleteTodo').attr('data-id')
        $('#fixDeleteToDo').attr('data-id', id)
    }

    $('#fixDeleteToDo').on('click', function() {
        let id = $(this).attr('data-id')
        fixDeleteToDo(id)
    })

    window.detailTodo = function(eq) {
        let parent = $('tr').eq(eq)
        let id = parent.find('td').eq(4).find('#detailTodo').attr('data-id')
        window.localStorage.setItem('id_detail_todolist', id)
        window.location.replace( window.location.origin + '/wise_todolist/_frontend/detail' )
    }


    getFirstData()

});