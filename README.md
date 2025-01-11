# searchMovie

async를 모르기 전 map을 이용해 api 값을 복제함

 const movieMap = new Map()

 fetch(APIurl, options)
     .then(res => res.json())
     .then(res => {
         res['results'].forEach((data, index) => {
             movieMap.set(index, data)
         });
     })

async를 이용 한 후
const fetchMovies = async function () {
    const response = await fetch(APIurl, options)
        .then(res => res.json())
        .then(res => res['results'])
    response.forEach((value) => {
        let img = value['poster_path']
        let title = value['title']
        let content = value['overview']
        let marks = value['vote_average']

        let tampHTML = `
        <div id="movieCard">
            <img id="movieimg" src="https://image.tmdb.org/t/p/w200${img}">
            <p id="title">${title}</p>
            <p id="content">${content}</p>
            <p id="marks">${marks}</p>
            </div>
        `
        document.querySelector('main').innerHTML = tampHTML;
    })
}

fetchMovies()