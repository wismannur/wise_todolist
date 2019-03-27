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
                console.log(data)
                if (data != "0 results") {
                    let result = JSON.parse(data)
                    // for (let i = 0; i < result.length; i++) {
                    //     let for_date = result[i].for_date.split('-');
                    //     let convert_for_date = convertDate( for_date[2], for_date[1], for_date[0] )
    
                    //     let tr = `<tr class="data-list">
                    //         <td>${i+1}</td>
                    //         <td>${result[i].name_todo}</td>
                    //         <td class="for_date" data-date= "${result[i].for_date}">${convert_for_date}</td>
                    //         <td>${result[i].description}</td>
                    //         <td><button id="detailTodo" class="btn btn-primary btn-left" data-id="${result[i].id}" onclick="detailTodo(${i+1})">Detail</button>
                    //         <button id="editTodo" class="btn btn-warning btn-center" data-id="${result[i].id}" onclick="editTodo(${i+1})">Edit</button>
                    //         <button id="deleteTodo" class="btn btn-danger btn-right" data-toggle="modal" data-target="#modalDeleteToDo" data-id="${result[i].id}" onclick="deleteTodo(${i+1})">Delete</button></td></tr>`
                    //     $('#myTable').find('tbody').append(tr)
                    // }
        
                    console.log(result)
                    // $('.spinner_req').hide();
                } else {
                    // let tr = `<tr class="data-list">
                    //     <td></td>
                    //     <td style="text-align:center;" >No Data ToDoList</td>
                    //     <td class="for_date">Please</td>
                    //     <td style="text-align:center;" >Add New ToDoList</td>
                    //     <td></td></tr>`
                    // $('#myTable').find('tbody').append(tr)
                }
                $('body').addClass('loaded');
            }
    
        })
    }

    getFirstData()
})