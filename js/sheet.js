

    var api_key='AIzaSyCbUYf0QIevZMDVR-eOkkFOBfvjars6DVY';
    var sheet_id='1E4Srt_E8PzTv1t8UwXc10JLviEzTjCi9qttqMQ2e1Fo';
    var tab_name='All_Values';
   
    var contentRepoURL='https://sheets.googleapis.com/v4/spreadsheets/'
    +sheet_id+'/values/'
    +tab_name+'?alt=json&key='
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
    