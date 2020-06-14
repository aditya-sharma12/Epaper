function getPagesByDate(dateText, edition){
  unSlick();
  $(".toggle").slideDown(500);
  $("#pagelist").empty();
  var dd = dateText.substr(0, 2);
  var mm = dateText.substr(3, 2);
  var yy = dateText.substr(6, 4);
  var dir = "ePaper_images/" + edition + "/" + yy +"/"+ mm +"/"+ dd + "/";
  var m = new Array();
  for(var i=1;i<=6;i++) {
      var path = dir + "/img" + i + ".jpg";
      m.push(path);
      pagelist(path, i);
  }
    carouselInit(m);
    slickInit();
    setupURL(dir + "/img1.jpg");
}

function getPagesOnLoad (editionName) {
  $(".toggle").slideDown(500);
  $("#pagelist").empty();
  var CurrDate = new Date();
  var dd = CurrDate.getDate();
  var mm = CurrDate.getMonth() + 1;
  var yy = CurrDate.getFullYear();

  if(dd < 10) {
      dd = '0' + dd;
  }
  if(mm < 10) {
      mm = '0' + mm;
  }

  $("#datepicker").val(dd + "/" + mm + "/" + yy);
  var dir = "ePaper_images/" + editionName + "/" + yy + "/" + mm + "/" + dd;
  var m = new Array();
  for(var i=1;i<=6;i++) {
      var path = dir + "/img" + i + ".jpg";
      pagelist(path, i);
      m.push(path);
  }
  carouselInit(m);
  slickInit();
  setupURL(dir + "/img1.jpg");
}

function carouselInit(m) {
  $("#page").html("Page 1");
  $("#slides").empty();
    for(var i=0 ; i< m.length ; i++) {
      var slide = document.createElement("div");
      if(i==0){
        $(slide).addClass("carousel-item active");
      }
      else {
        $(slide).addClass("carousel-item");
      }

        var img = document.createElement("img");
        $(img).addClass("d-block w-100");
        $(img).attr("src", m[i]);

        $(img).attr("page", "Page " + (i + 1) );
        $(img).on("error", function(){
          $(this).parent("div").remove();     //or use parent <-> closest
        });
          $(slide).append(img);
          //$(slide).append(img).append(download);
          $("#slides").append(slide);
  }
}

function pagelist(path, i) {
  var slide = document.createElement("div");
  $(slide).addClass("column");
  $(slide).attr("pageno", i-1);
  var img = document.createElement("img");
  $(img).attr("src", path);
    $(img).css({
      "width": "80px",
    });
    $(img).on("error", function(){
      $(this).parent("div").remove();
    });

  $(slide).append(img);

  $(slide).on('click', function () {
    $(".toggle").slideToggle(500);
    var pageno = $(this).attr("pageno");
    $("#slider").carousel(parseInt(pageno));
    var path = $(this).children("img").attr("src");

    $("#slider").on('slid.bs.carousel', function(){
      $("#page").html($(".carousel-item.active").children().attr("page") );
      setupURL($(".carousel-item.active").children().attr("src"));
    });
  });

  $("#pagelist").append(slide);

}

function unSlick(){
  $('#pagelist').slick('unslick');
}

function slickInit(){
  $('#pagelist').slick({
    infinite: false,
    slidesToShow: 10,
    slidesToScroll: 4,
    variableWidth: true,
    prevArrow: '<span class="ic ic_oc_prev"><i class="fas fa-arrow-left"></i></span>',
    nextArrow: '<span class="ic ic_oc_next"><i class="fas fa-arrow-right"></i></span>',
  });
}

function setupURL(url) {
    $("#download").attr("href", url);
}
