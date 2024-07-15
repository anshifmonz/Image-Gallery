const searchQuery = $("#search");
const searchBtn = $("#search-btn");
const searchForm = $("#user-input");
const resultImg = $("#images");
const showMore = $("#show-more");
const accessKey = 'access_key';
let page = 1;

searchForm.submit((event) => {
    event.preventDefault(); 
    getImages('searchBtn')
});

async function getImages(whereCall) {
    if (searchQuery) {
        const apiUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${searchQuery.val()}&per_page=15&client_id=${accessKey}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            const results = data.results;
            if (whereCall === 'searchBtn') {
                resultImg.html("")
            }
            results.forEach(result => {
                const imageLink = result.urls.small;
                const img = $("<img>").attr("src", imageLink);

                const urlToWeb =  result.links.html
                const anchor = $("<a>").attr("href", urlToWeb).attr("target", "_blank");

                anchor.append(img)
                resultImg.append(anchor);
            });
            showMore.css("display", "block")
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
};
$(window).scroll(() => {
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
        page++;
        getImages('scroll');
    }
});