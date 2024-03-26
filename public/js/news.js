newsInit()

function newsInit(){
    const id =  parseInt(window.location.href.split('/')
        [window.location.href.split('/').indexOf('profile') + 1], 10)
    $.get(`/api/profile/${id}/news`, data => {
        data = data.newsList
        const newsContainer = $('#newsContainer');
        data.forEach(function(item) {
            const name = item[1]
            const date = item[0].date;
            const text = item[0].text;
            const newsBlock = $('<div>').addClass('newsBlock');
            newsBlock.append($('<div>').text(name).addClass('name'));
            newsBlock.append($('<div>').text(date).addClass('date'));
            newsBlock.append($('<p>').text(text).addClass('content'));
            newsContainer.append(newsBlock);
        });
    })
}
