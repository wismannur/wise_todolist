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
                            <td><button id="editTask" class="btn btn-warning btn-left" data-id="${result[i].id}" onclick="editTask(${i+1})">Edit</button>
                            <button id="deleteTask" class="btn btn-danger btn-right" data-toggle="modal" data-target="#modalDeleteTask" data-id="${result[i].id}" onclick="deleteTask(${i+1})">Delete</button></td></tr>`
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

    function addNewTask(obj) {
        let a = obj;
        console.log(a)
        $.ajax({
            url: '../' + window.API + 'run_sql_post.php',
            type: 'POST',
            data : {
                sql : "INSERT INTO todo_item (id_todo_master, name_todo_item, time, status, category) VALUES ('"+ a.id_todo_master +"', '"+ a.name_todo_item +"', '"+ a.time +"', '"+ a.status +"', '"+ a.category +"')"
            },
            success: function(data) {
                $('.spinner_req').show();
                if (data == 'true') {
                    console.log('data berhasil di simpan');
                    $('#collapsible').click();
                    $('body').removeClass('loaded');
                    populateNullItem()
                    getFirstData()
                } else {
                    console.log(data)
                }
            }
    
        })
    }

    $('#addNewTask').on('click', function() {
        var obj = {
            id_todo_master: window.localStorage.id_detail_todolist,
            name_todo_item: $('#nameTask').val(),
            time: $('#time').val(),
            description: "yaaah",
            status : $('#statusForm').val(),
            category: $('#categoryForm').val()
        }

        addNewTask(obj)
    })

    function fixDeleteTask(id) {
        $.ajax({
            url: '../' + window.API + 'run_sql_post.php',
            type: 'POST',
            data : {
                sql : "DELETE FROM todo_item WHERE id='"+ id +"'"
            },
            success: function(data) {
                $('.spinner_req').show();
                if (data == 'true') {
                    console.log('data berhasil di hapus');
                    $('.close').click()
                    $('body').removeClass('loaded');
                    getFirstData()
                    toastr.success("Delete Task Success");
                } else {
                    console.log('error')
                }
            }
    
        })
    }

    window.deleteTask = function(eq) {
        let parent = $('tr').eq(eq)
        let id = parent.find('td').eq(5).find('#deleteTask').attr('data-id')
        $('#fixDeleteTask').attr('data-id', id)
    }

    $('#fixDeleteTask').on('click', function() {
        let id = $(this).attr('data-id')
        fixDeleteTask(id)
    })

    function updateTask(obj) {
        let a = obj;
        $.ajax({
            url: '../' + window.API + 'run_sql_post.php',
            type: 'POST',
            data : {
                sql : "UPDATE todo_item SET name_todo_item='"+ a.name_todo_item +"', time='"+ a.time +"', category='"+ a.category +"', status='"+ a.status +"' WHERE id='"+ a.id +"'"
            },
            success: function(data) {
                $('.spinner_req').show();
                if (data == 'true') {
                    console.log('data berhasil di update');
                    $('#collapsible').click();
                    $('body').removeClass('loaded');
                    populateNullItem()
                    getFirstData()
                    $('#collapsible').html("Add New ToDoList")
                    $('#updateTask').hide();
                    $('.spinner_req').hide();
                    $('#addNewTask').show();
                    toastr.success("Update ToDoList Success");
                } else {
                    console.log('error')
                }
            }
    
        })
    }

    $('#updateTask').on('click', function() {
        var obj = {
            id : $('#collapsible').attr('data-id'),
            id_todo_master: window.localStorage.id_detail_todolist,
            name_todo_item: $('#nameTask').val(),
            time: $('#time').val(),
            description: "yaaah",
            status : $('#statusForm').val(),
            category: $('#categoryForm').val()
        }

        updateTask(obj)
    })

    window.editTask = function(eq) {
        let parent = $('tr').eq(eq)
        let time = parent.find('td').eq(1).text()
        let name_todo_item = parent.find('td').eq(2).text()
        let category = parent.find('td').eq(3).text()
        let status = parent.find('td').eq(4).text()
        let id = parent.find('td').eq(5).find('#editTask').attr('data-id')
        $('#collapsible').attr('data-id', id)
        $('#nameTask').val(name_todo_item)
        $('#time').val(time)
        $('#categoryForm').val(category)
        $('#statusForm').val(status)
        $('#collapsible').html("Edit Task")
        $('#updateTask').show();
        $('#addNewTask').hide();
        $('#collapsible').click()
        $("html, body").animate({scrollTop: 0}, 400);
        console.log(id)
    }

    getFirstData()
})