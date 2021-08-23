

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
       // appendData(data);
       var value_array = data.values;
       var p=new Object();

       for(var i=0; i<value_array.length;i=i+1)
       {
          
           var small_array=value_array[i];
           var label=small_array[0];
           var value=small_array[1];
           p.label=value;

           
       }
       console.log(p);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });


    
function appendData(data) {
    var mainContainer = document.getElementById("myData");
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = 'Name: ' + data[i].firstName + ' ' + data[i].lastName;
        mainContainer.appendChild(div);
    }
}
    