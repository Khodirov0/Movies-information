const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWY2NDJhOTllYTNiNWZhYjUxMTJmYTc2MDg3YzgwNyIsIm5iZiI6MTczMjk2MDc4NS4xMjksInN1YiI6IjY3NGFlMjExM2Q5MjU0MjNkOWYyN2Y0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cXvv4ZRghfxIIJzV6cStE9D4v7mX_hzFdrTIvMOalh4"
const imgUrlFull = 'https://image.tmdb.org/t/p/original'
const imgUrl = 'https://image.tmdb.org/t/p/w500'
const baseUrl = "https://api.themoviedb.org/3";
const lang = "en-US";
const header_def={
    Authorization:`Bearer ${apiKey}`,
    accept: 'application.json',
  };

export {imgUrlFull ,imgUrl, baseUrl ,lang,header_def}