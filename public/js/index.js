// noinspection JSJQueryEfficiency

$(document).ready(function() {
    initTable()
    $("#loadingSpinner").hide()
    $('#profilesTable').show()
    $(document).on('change', 'select', function(){
        let changes = {}
        const id = parseInt($(this).attr('id').match(/\d+/)[0], 10)
        console.log(id)
        changes[$(this).find("option:selected").parent().attr('class')] = $(this).find("option:selected").val()
        $.ajax({
            url: `/api/profile/${id}`,
            type: 'PUT',
            data: JSON.stringify(changes),
            contentType: "application/json"
        });
    })
})


function initTable(){
    $.get('api/profile_list', data => {
        console.log(data)
        for(let key in data) {
            const roleSelector = createSelect(`roleSelector${key}`, 'role', data[key].role)
            const statusSelector = createSelect(`statusSelector${key}`, 'status', data[key].status)
            $("#profilesTableBody").append(
                $("<tr>").append($("<td>").text(`${data[key].name}`))
                    .append($("<td>").text(`${data[key].email}`)).append($("<td>").append(roleSelector))
                    .append($("<td>").append(statusSelector))
                    .append($("<td>").append($("<a>").attr("href", `/admin/profile/${key}`)
                        .append($("<i>").attr("class", "fa-solid fa-user"))))
            )
        }
    })
}

function createSelect(id, className, value) {
    let options = []
    if(className === 'role'){
        options = ['user', 'admin']
    } else if(className === 'status'){
        options = ['verified', 'not verified', 'blocked']
    }
    let selectElement = $("<select>").attr("id", id).attr('class', className);
    options.forEach(function(option) {
        selectElement.append($("<option>").attr("value", option).text(option));
    });
    selectElement.val(value)
    return selectElement;
}