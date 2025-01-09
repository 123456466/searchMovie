const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWRiNDRkOTM5Mjg5NjQzYmIxYWNjNGZmYWEzZmVlNSIsIm5iZiI6MTczNjMwMTIxNC41MjE5OTk4LCJzdWIiOiI2NzdkZGE5ZTA0NGI2Y2E2NzY0ZTUwZDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Y3JFyAcvQpaHoyGBjMq7zTRCIHnr84F-93bPKgm4-Ec'
    }
};

const APIurl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc'
const title = document.querySelector('#title')

const movieMap = new Map()

fetch(APIurl, options)
    .then(res => res.json())
    .then(res => {res['results'].forEach(data => {
        movieMap.set(data)
    });})

console.log(movieMap)