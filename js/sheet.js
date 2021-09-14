var baseUrl = "https://sheets.googleapis.com/v4/spreadsheets/";
var api_key = "AIzaSyCbUYf0QIevZMDVR-eOkkFOBfvjars6DVY";
var sheet_id = "1E4Srt_E8PzTv1t8UwXc10JLviEzTjCi9qttqMQ2e1Fo";

var values_tab_name = "All_Values";
var images_tab_name = "image_list";
var work_ex_tab_name = "work_and_education";
var testimonial_tab_name = "testimonials";
var skills_tab='skills';
var publication_tab='publications';

var contentRepoURL =
  baseUrl +
  sheet_id +
  "/values/" +
  values_tab_name +
  "?alt=json&key=" +
  api_key;

var fade = document.querySelector(".fade");
if (fade != null) fade.style.opacity = 0;

fetch(contentRepoURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var value_array = data.values;
    var p = new Object();

    for (var i = 0; i < value_array.length; i = i + 1) {
      var small_array = value_array[i];
      let prop = small_array[0];
      p[prop] = small_array[1];
    }
    appendData(p);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });

function appendData(data) {
  // for (var i = 0; i < data.length; i++) {
  //     var div = document.createElement("div");
  //     div.innerHTML = 'Name: ' + data[i].firstName + ' ' + data[i].lastName;
  //     mainContainer.appendChild(div);
  // }

  setTimeout(function () {
    document.getElementById("phone").innerHTML = data.phone;
    document.getElementById("my_email").innerHTML = data.email;
    document.getElementById("address").innerHTML = data.address;
    document.getElementById("my_intro").innerHTML = data.intro;
    document.getElementById("my_name").innerHTML = data.name;
    document.getElementById("greeting").innerHTML = data.greeting;
    document.getElementById("my_title").innerHTML = data.title;
    document.getElementById("link_linkedin").setAttribute('href', data.linkedin_url);
    document.getElementById("link_behance").setAttribute('href', data.behance_url);
   

    // Fade in
    fade.style.opacity = 1;
  }, 200);
}

var imageRepoURL =
  baseUrl +
  sheet_id +
  "/values/" +
  images_tab_name +
  "?alt=json&key=" +
  api_key;

fetch(imageRepoURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var value_array = data.values;
    var p = new Object();

    for (var i = 0; i < value_array.length; i = i + 1) {
      var small_array = value_array[i];
      let prop = small_array[0];
      p[prop] = small_array[1];
    }
    appendImages(p);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });

function appendImages(data) {
  var driveURL = data.profile_pic_url;
  var pathArray = driveURL.split("/");

  var baseImageUrl = "https://drive.google.com/uc?export=view&id=";

  [].forEach.call(document.querySelectorAll("img[data-src]"), function (img) {
    img.setAttribute("src", img.getAttribute("data-src"));
    img.onload = function () {
      img.removeAttribute("data-src");
    };
  });

  document.getElementById("profile_pic").src = baseImageUrl + pathArray[5];
}

var workRepoURL =
  baseUrl +
  sheet_id +
  "/values/" +
  work_ex_tab_name +
  "?alt=json&key=" +
  api_key;

fetch(workRepoURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var value_array = data.values;

    var work_list = [];
    for (var i = 1; i < value_array.length; i = i + 1) {
      var p = new Object();

      var entry = value_array[i];
      p.id = entry[0];
      p.type = entry[1];
      p.company = entry[2];
      p.date = entry[3];
      p.profile = entry[4];
      p.location = entry[5];
      p.description = entry[6];
      p.image_url = entry[7];
      work_list.push(p);
    }

    appendWorkData(work_list);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });

function appendWorkData(work_list) {
  var output = "";

  for (var i = 0; i < work_list.length; i++) {
    //     output+=
    //     '<div class="column is-one-third mb-20 has-text-centered">'
    //     +
    //    ' <img src="images/experience/icon-1.png" alt="icon">'
    //    +
    //     '<p class="mb-10">'+work_list[i].date+'</p>'
    //     +
    //     '<h5 class="mb-10">'+work_list[i].profile+' ・ '+work_list[i].company+'</h5>'
    //     +
    //     '<h6 class="has-text-light">'+work_list[i].location+'</h6></div>';

    output +=
      ' <div class="column is-6 mb-80">' +
      ' <div class="media"><div class="media-left"><i class="ti-medall icon icon-light icon-bg has-background-white shadow is-rounded is-block"></i></div>' +
      ' <div class="media-content">' +
      ' <h6 class="has-text-light pb-1">' +
      work_list[i].date +
      "</h6>" +
      " <h4>" +
      work_list[i].profile +
      "</h4>" +
      " <h5 >" +
      work_list[i].company +
      "</h5>" +
      '<h6 class="has-text-light pt-1">' +
      work_list[i].location +
      "</h6>" +
      "</div></div></div>";
  }

  document.getElementById("work_list").innerHTML = output;
}

var testimonialRepoURL =
  baseUrl +
  sheet_id +
  "/values/" +
  testimonial_tab_name +
  "?alt=json&key=" +
  api_key;

fetch(testimonialRepoURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var value_array = data.values;

    var t_list = [];
    for (var i = 1; i < value_array.length; i = i + 1) {
      var p = new Object();

      var entry = value_array[i];
      p.id = entry[0];
      p.content = entry[1];
      p.title = entry[2];
      p.company = entry[3];

      t_list.push(p);
    }

    appendTestimonialData(t_list);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });

function appendTestimonialData(t_list) {
    var output = "";

    for (var i = 0; i < t_list.length; i++) {
      
      output +=
      '<div class=" testimonial-content">'
      +
      '<i class="ti-quote-right has-text-white icon mb-20 is-inline-block"></i>'
      +
    '  <p class="has-text-white mb-20">'+t_list[i].content+'</p>'
    
      +
     ' <h4 class="has-text-white">'+t_list[i].title+'</h4>'
     +
      '<h6 class="has-text-light mb-20">'+t_list[i].company+'</h6></div>'
    ;


    }
  
    document.getElementById("t_list").innerHTML = output;
}


var skillRepoURL =
  baseUrl +
  sheet_id +
  "/values/" +
  skills_tab +
  "?alt=json&key=" +
  api_key;


  fetch(skillRepoURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var value_array = data.values;

    var t_list = [];
    for (var i = 1; i < value_array.length; i = i + 1) {
      var p = new Object();

      var entry = value_array[i];
      p.skill_name = entry[0];
     

      t_list.push(p);
    }

    appendSkills(t_list);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });


function appendSkills(skills_list){
  var output='';
  for(var i=0;i<skills_list.length;i++)
  {
    output+=
    '<div class="column is-3-desktop is-6-tablet">'
    +
    '<div class="card shadow has-text-centered">'
    
      +
      '<div class="card-content has-background-white">'
      +
        '<h4>'+skills_list[i].skill_name+'</h4>'
        +
      '</div></div></div>'
   ;

   document.getElementById("skill_list").innerHTML = output;
  
  }
}

var publicationRepoURL =
  baseUrl +
  sheet_id +
  "/values/" +
  publication_tab +
  "?alt=json&key=" +
  api_key;


  fetch(publicationRepoURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var value_array = data.values;

    var t_list = [];
    for (var i = 1; i < value_array.length; i = i + 1) {
      var p = new Object();

      var entry = value_array[i];
      p.title = entry[2];
      p.subtitle = entry[3];
      p.org = entry[8];
      p.time=entry[7];
     

      t_list.push(p);
    }

    appendPublications(t_list);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });


function appendPublications(publication_list){
  var output='';
  for(var i=0;i<publication_list.length;i++)
  {
    
    output +=
    ' <div class="column is-6 mb-80">' +
    ' <div class="media"><div class="media-left"><i class="ti-write icon icon-light icon-bg has-background-white shadow is-rounded is-block"></i></div>' +
    ' <div class="media-content">' +
    ' <h6 class="has-text-light pb-1">' +
    publication_list[i].time +
    "</h6>" +
    " <h4>" +
    publication_list[i].title +
    "</h4>" +
    " <h5 >" +
    publication_list[i].subtitle +
    "</h5>" +
    '<h6 class="has-text-light pt-1">' +
    publication_list[i].org +
    "</h6>" +
    "</div></div></div>";
   document.getElementById("list_publications").innerHTML = output;
  
  }
}


