$(document).ready(function() {
    window.API = '../_backend/';
    window.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    function myFilterTable() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
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

    $('#myInputFilter').on('keyup', function() {
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

    $('#forDate').datetimepicker({
        format : 'YYYY-MM-DD',
    })

    // setTimeout(function() {
    //     $('body').addClass('loaded');
    // }, 3000)
})