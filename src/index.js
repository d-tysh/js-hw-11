import { Notify } from "notiflix";
import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

import { getImages } from "./getImages";
import { createMarkup } from "./createMarkup";

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('div.gallery');
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.style.display = 'none';

let searchQuery = '';

let page = null;
let per_page = null;
let totalQueryImages = 1;

let lightbox = null;

searchForm.addEventListener('submit', onSearch);

loadMoreBtn.addEventListener('click', loadImages);

function onSearch(event) {
    event.preventDefault();
    
    searchQuery = searchForm.elements.searchQuery.value;
    
    if (!searchQuery) {
        Notify.info('Enter search query.')
        return;
    }

    gallery.innerHTML = '';

    getImages(searchQuery, page, per_page)
        .then(({hits, totalHits}) => {
            if (!totalHits) {
                Notify.info("Sorry, there are no images matching your search query. Please try again.");
                return;
            }

            page = 1;
            per_page = 20;
            totalQueryImages = page * per_page;

            Notify.success(`Hooray! We found ${totalHits} images.`)

            hits.map(item => {
                gallery.insertAdjacentHTML('beforeend', createMarkup(item));
            });
            
            lightbox = new SimpleLightbox('.gallery a');
            createGallery(lightbox);
            
            loadMoreBtn.style.display = 'block';
    
            return searchQuery, page, per_page, lightbox;
        })
        .catch(error => Notify.failure(error));
}

function loadImages() {
    lightbox.destroy();
    page += 1;
    per_page = 40;
    totalQueryImages = (page - 1) * per_page + 20;
    
    getImages(searchQuery, page, per_page)
        .then(({hits, totalHits}) => {
            hits.map(item => {
                gallery.insertAdjacentHTML('beforeend', createMarkup(item))
            });

            lightbox = new SimpleLightbox('.gallery a');
            createGallery(lightbox);

            if (totalQueryImages >= totalHits) {
                loadMoreBtn.style.display = 'none';
                Notify.info("We're sorry, but you've reached the end of search results.");
            }

            return lightbox;
        })

    return page, per_page;
}

function createGallery(lightbox) {
    const handleClick = (event) => {
        event.preventDefault();

        if (!event.target.classList.contains('gallery__image')) {
            return;
        }
        lightbox.next();
    }
    gallery.addEventListener('click', handleClick);
}
