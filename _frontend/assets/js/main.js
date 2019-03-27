$(document).ready(function() {
    window.API = '../_backend/';
    window.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    function myFilterTable() {
        var input, filter, table, tr, td, i, txtValue, fil;
        input = document.getElementById("myInputFilter");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        fil = $('#filterTable').val();
        for (i = 0; i < tr.length; i++) {
            if (fil == "easy" || fil == "difficult") {
                td = tr[i].getElementsByTagName("td")[3];
            } else if (fil == "done" || fil == "not done") {
                td = tr[i].getElementsByTagName("td")[4];
            } else if (fil == "all")  {
                $(tr[i]).show()
            }

            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase() == fil.toUpperCase()) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                    $(tr[i]).hide()
                }
            }       
        }
    }

    function searchByName() {
        // Declare variables 
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInputFilter");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
      
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[2];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          } 
        }
      }

    window.convertDate = function(date, month, year) {
        if (month.slice(0,1) == 0) {
            month = month.slice(1) - 1
        } else if (month.slice(0,1) == 1) {
            month = month - 1
        }

        let d = date
        let m = monthNames[month];
        let y = year
        var hasil = d + " - " + m + " - " + y;
        return hasil;
    }

    window.currentDate = function(condition) {
        var currentDate = new Date();

        var date = currentDate.getDate();
        var month = currentDate.getMonth(); //Be careful! January is 0 not 1
        var year = currentDate.getFullYear();

        var h = currentDate.getHours();
        var m = currentDate.getMinutes();
        var s = currentDate.getSeconds();

        if (condition == "date") {
            return  year + "-" +(month + 1) + "-" + date;
        } else if (condition == "time" ) {
            return h + ":" + m + ":" + s;
        } else if (condition == "date time") {
            return year + "-" +(month + 1) + "-" + date + " " + h + ":" + m + ":" + s;
        }

    }

    window.populateNullMaster = function() {
        $('#nameToDo').val("");
        $('#forDate').val("");
        $('#descriptionToDo').val("");
    }

    window.populateNullItem = function() {
        $('#nameTask').val("")
        $('#time').val("")
        $('#categoryForm').val("")
        $('#statusForm').val("")
    }

    $('#myInputFilter').on('keyup', function() {
        searchByName()
    })

    $('#filterTable').on('change', function(){
        myFilterTable()
    })

    $('#collapsible').on("click", function() {
        $(this).toggleClass("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        } 
    });

    $('#cancelToDo').on('click', function() {
        $('#collapsible').html("Add New ToDoList")
        $('#collapsible').click()
        $('#updateToDo').hide()
        $('#addNewToDo').show();
        populateNullMaster()
    })

    $('#cancelTask').on('click', function() {
        $('#collapsible').html("Add New Task")
        $('#collapsible').click()
        $('#updateTask').hide()
        $('#addNewTask').show();
        populateNullItem()
    })

    $('#forDate').datetimepicker({
        format : 'YYYY-MM-DD',
    })

    $('#time').datetimepicker({
        format : 'HH:mm:ss',
    })

    // setTimeout(function() {
    //     $('body').addClass('loaded');
    // }, 3000)
})