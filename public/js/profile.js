$('.editButton').click(function () {
    const container = $(this).parent()
    const value = container.find('span')

    let input
    if(value.attr('id') === 'birthDate'){
        input = $('<input type="date">')
    }else{
        input = $('<input type="text">')
        input.val(value.text())
    }

    const saveButton = $('<button>Save</button>')
    const cancelButton = $('<button>Cancel</button>')

    saveButton.click(() => {
        let inputValue = ''
        const id = window.location.href.split('/')[5]
        if(value.attr('id') === 'birthDate') {
            const dateParts = input.val().split('-')
            if (new Date(parseInt(dateParts[0], 10),
                parseInt(dateParts[1], 10) - 1,
                parseInt(dateParts[2], 10)) > new Date()) {
                return
            }
            inputValue = input.val() ? `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`: ''
        }else if(value.attr('id') === 'email'){
            if(!input.val().includes('@') || input.val().split('@').length > 2){
                return
            }
            inputValue = input.val()
        }
        else {
            inputValue = input.val()
        }
        value.text(inputValue)
        const changes = {}
        changes[value.attr('id')] = inputValue
        $.ajax({
            url: `/api/profile/${id}`,
            type: 'PUT',
            data: JSON.stringify(changes),
            contentType: "application/json"
        });
        input.remove()
        saveButton.remove()
        cancelButton.remove()
        value.show()
        $(this).show()

    });

    cancelButton.click(()=> {
        input.remove()
        saveButton.remove()
        cancelButton.remove()
        value.show()
        $(this).show()
    });

    value.hide()
    $(this).hide()
    container.append(input, saveButton, cancelButton);
});