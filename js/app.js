(function () {
  function giphySearch(keyword) {
	document.getElementById("backb").style.visibility = "visible";
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
	document.getElementById("backb").style.visibility = "visible";
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
    let promises = [];
    result.data.forEach(gif => {
      let img = new Image();
      img.src = gif.images.original.url;
      promises.push(onImgLoad(img));
      appendImage(img);
    });

    await Promise.all(promises);
    hideLoader();
  }
})();

window.onload=function getTrendingData() {
  document.getElementById("backb").style.visibility = "hidden";
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
      for(let i=0; i< 12 ;i++) {
        // add 10 gifs by appending new elements to the div #tenGifs
        var node = document.getElementById("gif~"+i);      
        node.setAttribute("src", res.data[i].images.fixed_width.url);
        _tenGifs.appendChild(node);  
        
      }
      
      
    });
}

// ===== Scroll to Top ==== 
$(window).scroll(function() {
    if ($(this).scrollTop() >= 10) {       // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
});

// ===== Removes trending gifs after search ==== 
function myFunction() {
  document.getElementById("tenGifs").style.visibility = "hidden";
}

function refreshPage(){
    window.location.reload();
	document.getElementById("backb").style.visibility = "hidden";
} 
