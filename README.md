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

//문제 발생
addEventListener가 안먹힌다.

//문제 분석
console을 확인하니 addEventListener이 문제가 있다고 한다.
테스트용 새로운 파일에 똑같이 만들어보니 역시 문제가 있었다.

//문제 해결
검색해본 결과 script가 위에 있으면 ID나 Classe값을 가져오지 못하는 것 같다.
아래로 내리니 정말 간단하게.... 해결됐다.