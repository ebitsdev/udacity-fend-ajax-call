(function () {

    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText = '';
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {

        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        const imgRequest = new XMLHttpRequest();

        // imgRequest.onload = addImage;
        // imgRequest.onerror = function (err) {
        //     requestError(err, 'image');
        // };

        // imgRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        // imgRequest.onload = addImage;
        // imgRequest.setRequestHeader('Authorization', 'Client-ID 6f1eab3edac7063a3a62a7607d9c6523692bb401f126e49d6ae15cab6070daaa');
        // imgRequest.send();
        // Replace the above with jQuery
        // $.ajax({
        //     url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
        //     headers: {
        //         Authorization: 'Client-ID 6f1eab3edac7063a3a62a7607d9c6523692bb401f126e49d6ae15cab6070daaa'
        //     }
        // }).done(addImage).fail(function (err) {
        //     requestError(err, 'image');
        // });
        // Replace the above with fetch request
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            headers: {
                Authorization: 'Client-ID 6f1eab3edac7063a3a62a7607d9c6523692bb401f126e49d6ae15cab6070daaa'
            }
        }).then(response => response.json()).then(addImage).catch(e => requestError(e, 'image'));

        function requestError(e, part) {
            console.log(e);
            responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
        }
        // const articleRequest = new XMLHttpRequest();
        // articleRequest.onload = addArticles;
        // articleRequest.onerror = function (err) {
        //     requestError(err, 'article');
        // };
        // articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=68e7211c4ea04aaf8c68ed14af95b49c`);
        // articleRequest.send();

        // Replace the above with jQuery
        // $.ajax({
        //     url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=68e7211c4ea04aaf8c68ed14af95b49c`,
        //     // headers: {
        //     //     Authorization: 'Client-ID 6f1eab3edac7063a3a62a7607d9c6523692bb401f126e49d6ae15cab6070daaa'
        //     // }
        // }).done(addArticles).fail(function (err) {
        //     requestError(err, 'article');
        // });

        // Replace the above with fetch request
        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=68e7211c4ea04aaf8c68ed14af95b49c`)
            .then(response => response.json()).then(addArticles).catch(e => requestError(e, 'article'));

        function addImage(images) {
            let htmlContent = '';
            // const data = JSON.parse(this.responseText);

            const firstImage = images.results[0];
            // Make sure that there are images returned, otherwhise make sure that there are no images
            if (firstImage) {
                htmlContent = `<figure>
        <img src="${firstImage.urls.regular}" alt="${searchedForText}">
        <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`;
            } else {
                htmlContent = '<div class="error-no-image">No images were found.</div>';
            }
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }

        function addArticles(articles) {

            let htmlContent = '';
            // const data = JSON.parse(this.responseText);
            const firstArticle = articles.response.docs;

            if (firstArticle.length > 1) {
                htmlContent = '<ul>' + firstArticle.map(article => `<li classe="article">
            <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
            <p>${article.snippet}</p>
            </li>`).join('') + '</ul>';
            } else {
                htmlContent = '<div class="error-no-article">No articles are available.</div>';
            }
            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }
    });
})();
