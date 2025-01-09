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

//문제점
자료는 잘 가져왔지만 0번째 배열 하나만 가져왔다.

//내가 생각하는 이유유
배열을 순회하는 함수가 없다.