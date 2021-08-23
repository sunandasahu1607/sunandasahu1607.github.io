
    var baseUrl='https://sheets.googleapis.com/v4/spreadsheets/';
    var api_key='AIzaSyCbUYf0QIevZMDVR-eOkkFOBfvjars6DVY';
    var sheet_id='1E4Srt_E8PzTv1t8UwXc10JLviEzTjCi9qttqMQ2e1Fo';

    var values_tab_name='All_Values';
    var images_tab_name='image_list';
   
    var contentRepoURL=baseUrl
    +sheet_id+'/values/'
    +values_tab_name+'?alt=json&key='
    +api_key;

    


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
    document.getElementById('my_name').innerHTML=data.name;
    document.getElementById('greeting').innerHTML=data.greeting;
    document.getElementById('my_title').innerHTML=data.title;
    document.getElementById('my_intro').innerHTML=data.intro;
    document.getElementById('phone').innerHTML=data.phone;
    document.getElementById('my_email').innerHTML=data.email;
    document.getElementById('address').innerHTML=data.address;

    // for (var i = 0; i < data.length; i++) {
    //     var div = document.createElement("div");
    //     div.innerHTML = 'Name: ' + data[i].firstName + ' ' + data[i].lastName;
    //     mainContainer.appendChild(div);
    // }
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
        var baseImageUrl='https://drive.google.com/uc?export=view&id='
        document.getElementById("profile_pic").src = baseImageUrl + data.profile_pic;

      
    
        // for (var i = 0; i < data.length; i++) {
        //     var div = document.createElement("div");
        //     div.innerHTML = 'Name: ' + data[i].firstName + ' ' + data[i].lastName;
        //     mainContainer.appendChild(div);
        // }
    }