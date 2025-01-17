const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWRiNDRkOTM5Mjg5NjQzYmIxYWNjNGZmYWEzZmVlNSIsIm5iZiI6MTczNjMwMTIxNC41MjE5OTk4LCJzdWIiOiI2NzdkZGE5ZTA0NGI2Y2E2NzY0ZTUwZDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Y3JFyAcvQpaHoyGBjMq7zTRCIHnr84F-93bPKgm4-Ec'
    }
};

const APIurl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc'

const makeCard = function (response) {
    response.forEach((value) => {
        let img = value['poster_path']
        let title = value['title']
        let marks = value['vote_average']
        let id = value['id']

        let tempHTML = `
        <div class="movieCard" onclick="modal(this)" data-id="${id}">
            <img class="movieimg" src="https://image.tmdb.org/t/p/w200${img}">
            <h4 class="title">${title}</h4>
            <p class="marks">평점:${marks}</p>
            </div>
        `
        document.querySelector('main').innerHTML += tempHTML;
    })
}

const fetchMovies = async function () {
    const response = await fetch(APIurl, options)
        .then(res => res.json())
        .then(res => res['results'])
        .catch(err => console.error(err));
    makeCard(response)
}

const searchAPI = async function () {
    const searchText = document.querySelector('#search').value
    const searchAPIURL = `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=ko-KR&page=1`

    if (searchText === '') {
        fetchMovies()
    } else {
        const response = await fetch(searchAPIURL, options)
            .then(res => res.json())
            .then(res => res['results'])
            .catch(err => console.error(err));
        makeCard(response)
    }
}

fetchMovies()

document.querySelector('#searchBtn').addEventListener('click', async function () {
    document.querySelector('main').innerHTML = ''
    searchAPI()
})

const modal = async function (detail) {
    const id = detail.dataset.id
    const modalMovie = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`
    const response = await fetch(modalMovie, options)
        .then(res => res.json())
        .catch(err => console.error(err));

    let img = response['poster_path']
    let title = response['title']
    let tagline = response['tagline']
    let content = response['overview']
    document.querySelector('#modalimg').src = `https://image.tmdb.org/t/p/w400${img}`
    document.querySelector('#modalTitle').innerHTML = title
    if (tagline === '') {
        document.querySelector('#modalCatchPhrase').innerHTML = ''
    } else {
        document.querySelector('#modalCatchPhrase').innerHTML = `"${tagline}"`
    }

    if (content === '') {
        document.querySelector('#modalComment').innerHTML = `"정보가 없습니다."`
    } else {
        document.querySelector('#modalComment').innerHTML = content
    }

    document.querySelector('#modal').style.display = 'flex'
}

document.querySelector('#modal').addEventListener('click', function () {
    document.querySelector('#modal').style.display = 'none'
})