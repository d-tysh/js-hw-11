function createMarkup({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) {
    return `
        <div class='gallery__item-wrapper'>
            <a href=${largeImageURL} class='gallery__image-link'>
                <img src=${webformatURL} alt=${tags} loading="lazy" class='gallery__image'/>
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    <span>${likes}</span>
                </p>
                <p class="info-item">
                    <b>Views</b>
                    <span>${views}</span>
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    <span>${comments}</span>
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    <span>${downloads}</span>
                </p>
            </div>
        </div>
    `;
}

export {createMarkup};