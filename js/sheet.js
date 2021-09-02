
    var baseUrl='https://sheets.googleapis.com/v4/spreadsheets/';
    var api_key='AIzaSyCbUYf0QIevZMDVR-eOkkFOBfvjars6DVY';
    var sheet_id='1E4Srt_E8PzTv1t8UwXc10JLviEzTjCi9qttqMQ2e1Fo';

    var values_tab_name='All_Values';
    var images_tab_name='image_list';
    var work_ex_tab_name='work_and_education';
   
    var contentRepoURL=baseUrl
    +sheet_id+'/values/'
    +values_tab_name+'?alt=json&key='
    +api_key;

    
    var fade = document.querySelector('.fade');
   if(fade!=null) fade.style.opacity = 0;

    fetch(contentRepoURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
       
       var value_array = data.values;
       var p=new Object();
    
       for(var i=0; i<value_array.length;i=i+1)
       {
          
           var small_array=value_array[i];
            let prop=small_array[0];
            p[prop]=small_array[1];
           
       }
       appendData(p);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });


    
function appendData(data) {
    
    

    // for (var i = 0; i < data.length; i++) {
    //     var div = document.createElement("div");
    //     div.innerHTML = 'Name: ' + data[i].firstName + ' ' + data[i].lastName;
    //     mainContainer.appendChild(div);
    // }
   

    setTimeout(function(){ 
        document.getElementById('phone').innerHTML=data.phone;
        document.getElementById('my_email').innerHTML=data.email;
        document.getElementById('address').innerHTML=data.address;
        document.getElementById('my_name').innerHTML=data.name;
        document.getElementById('greeting').innerHTML=data.greeting;
        document.getElementById('my_title').innerHTML=data.title;
        document.getElementById('my_intro').innerHTML=data.intro;
        
      
        // Fade in
        fade.style.opacity = 1;
    },200);
}
    

var imageRepoURL=baseUrl
    +sheet_id+'/values/'
    +images_tab_name+'?alt=json&key='
    +api_key;

    fetch(imageRepoURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
       
       var value_array = data.values;
       var p=new Object();
    
       for(var i=0; i<value_array.length;i=i+1)
       {
          
           var small_array=value_array[i];
            let prop=small_array[0];
            p[prop]=small_array[1];
           
       }
       appendImages(p);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

    function appendImages(data) {
        
        var driveURL=data.profile_pic_url;
        var pathArray = driveURL.split( '/' );

        var baseImageUrl='https://drive.google.com/uc?export=view&id=';
      
        [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.onload = function() {
                img.removeAttribute('data-src');
            };
        });

        document.getElementById("profile_pic").src =  baseImageUrl + pathArray[5];

       
      
    }


    var workRepoURL=baseUrl
    +sheet_id+'/values/'
    +work_ex_tab_name+'?alt=json&key='
    +api_key;

    fetch(workRepoURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var value_array = data.values;
       
        var work_list = [];
        for(var i=1; i<value_array.length;i=i+1)
       {  var p=new Object();
          
           var entry=value_array[i];
            p.id=entry[0];
            p.type=entry[1];
            p.company=entry[2];
            p.date=entry[3];
            p.profile=entry[4];
            p.location=entry[5];
            p.description=entry[6];
            p.image_url=entry[7];
            work_list.push(p);
           
       }

       appendWorkData(work_list);

    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

    function appendWorkData(work_list)
    {
        var output='';

        for(var i=0;i<work_list.length;i++)
        {
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

            output+=
           ' <div class="column is-6 mb-80">'
           +
           ' <div class="media"><div class="media-left"><i class="ti-medall icon icon-light icon-bg has-background-white shadow is-rounded is-block"></i></div>'
           +
          ' <div class="media-content">'
          +
               ' <h6 class="has-text-light pb-1">'+work_list[i].date+'</h6>'
               +
               ' <h4>'+work_list[i].profile+'</h4>'
               +
               ' <h5 >'+work_list[i].company+'</h5>'
           
                +
                '<h6 class="has-text-light pt-1">'+work_list[i].location+'</h6>'
                +
                '</div></div></div>';
   ;
            
          
        }

        document.getElementById('work_list').innerHTML=output;
    }