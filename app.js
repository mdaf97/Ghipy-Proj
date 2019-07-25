(function () {
  function giphySearch(keyword) {
    return fetch(`http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${GIPHY_KEY}&limit=10`)
      .then(response => response.json());
  }
 
  function appendImage(img) {
    let $div = $('<div class="img-wrapper"></div>');
    $('<div class="inner"></div>').append(img).appendTo($div);
    $('#thumbs').append($div)
  }

  function showLoader() {
    $('.loader-wrapper').addClass('shown');
  }

  function hideLoader() {
    $('.loader-wrapper').removeClass('shown');
  }

  function onImgLoad(img) {
    return new Promise((resolve, reject) => {
      img.onload = resolve;
    });
  }

  (function listenOnFormSubmit() {
    $('#searchForm').submit(async (ev) => {
      ev.preventDefault();

      let $input = $('#searchInput');

      main($input.val());
    });
  })();

  async function main(keyword) {
    const result = await giphySearch(keyword);
    $('#thumbs').html('');
    showLoader();
    // let loadedImageCount = 0;
    let promises = [];
    result.data.forEach(gif => {
      let img = new Image();
      img.src = gif.images.original.url;
      promises.push(onImgLoad(img));
      // img.onload = () => {
      //   loadedImageCount++;
      //   if (loadedImageCount === result.data.length){
      //     hideLoader()
      //   }
      // };
      appendImage(img);
    });

    await Promise.all(promises);
    hideLoader();
  }
})();

window.onload=function getTrendingData() {
  var url =
    "https://api.giphy.com/v1/gifs/trending?api_key=y4h5ShwxLHh3XvkZBKAl0NVd7BH7tBuC";

  fetch(url)
    .then(data => data.json())
    .then(res => {
      console.log(res);
      var _outputHTML = ""
      var _tenGifs = document.getElementById("tenGifs");
    //  document.querySelector("#gif1").setAttribute("src", giphyLink);
      if (res.data.length < 10) return; // if not ten quit for now
      for(let i=0; i< 10 ;i++) {
        // add 10 gifs by appending new elements to the div #tenGifs
        var node = document.getElementById("gif~"+i);      
        node.setAttribute("src", res.data[i].images.fixed_width.url);
        _tenGifs.appendChild(node);  
        
      }
      
      
    });
}
