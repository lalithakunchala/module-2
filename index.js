function get_countries_list(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://calendarific.com/api/v2/countries?api_key=06931fd6a916a48ea884efedfd3b90ee83d199e5');
  xhr.send();
  xhr.onload = function(){
    if(xhr.status == 200){
        console.log(JSON.parse(xhr.response));
        show_countries(JSON.parse(xhr.response));
    }
    else{
        console.log("Error Code is:" + xhr.status)
    }
  }
}


function show_countries(data){
  var country = document.getElementById("country");
  for(var i=0; i<data['response']['countries'].length; i++){
    var option = document.createElement('option');
    option.setAttribute('id',data['response']['countries'][i]['iso-3166'])
    option.value = data['response']['countries'][i]['iso-3166'];
    option.name = data['response']['countries'][i]['country_name'];
    option.text = data['response']['countries'][i]['country_name'];
    country.appendChild(option);
  }
}


function get_holidays(){
  
  var xhr = new XMLHttpRequest();
  var selected_value = document.getElementById("country").value;
  
  var day = document.getElementById("day").value;
  var year = document.getElementById("year").value;
  var month = document.getElementById("month").value;
 if(month=='month'){
   month='0';
 }
  
  if(day=='day'){
    day='0';
  }
  
  if(year=='year'){
    alert("Select year");
  }
  else{
  
  
  xhr.open('GET', 'https://calendarific.com/api/v2/holidays?api_key=06931fd6a916a48ea884efedfd3b90ee83d199e5&country='+selected_value +'&year='+year +'&month='+month +'&day='+day);
  xhr.send();
  xhr.onload = function(){
    if(xhr.status == 200){
        console.log(JSON.parse(xhr.response));
        show_holidays(JSON.parse(xhr.response));
    }
    else{
        console.log("Error Code is:" + xhr.status)
    }
  }
  }
}

function show_holidays(data){
  var display = document.getElementById('display');
  display.textContent = "";
  var head = document.getElementById('head')
  head.textContent = "";
  var cap = document.getElementById("cap");
  cap.innerText = "";
  if(data['response']['holidays'].length==0){
    alert("No Holidays");
  }
  else{
    
  cap.innerText = data['response']['holidays'][0]['country']['name'] ;
  
  
  
  var row = document.createElement('tr');
  var td1 = document.createElement('td');
  td1.textContent = "Holiday";
  var td2 = document.createElement('td');
  td2.textContent = "Name";
  var td3 = document.createElement('td');
  td3.textContent = "Type";
  row.appendChild(td1);
  row.appendChild(td2)
  row.appendChild(td3)
  head.appendChild(row);
  for(var i=0; i<data['response']['holidays'].length; i++){
    var tr_row = document.createElement('tr');
    var td_1 = document.createElement('td');
    td_1.textContent = data['response']['holidays'][i]['date']['iso']
    var td_2 = document.createElement('td');
    td_2.textContent = data['response']['holidays'][i]['name'];
    var td_3 = document.createElement('td');
    td_3.textContent = data['response']['holidays'][i]['type'];
    tr_row.appendChild(td_1);
    tr_row.appendChild(td_2);
    tr_row.appendChild(td_3);
    display.appendChild(tr_row);
    console.log(tr_row);
  }
  }
  
}



function show_year_day(){
  var year = document.getElementById("year");
  var day = document.getElementById("day");
  for(var i=2014; i<2049; i++){
    var option = document.createElement('option');
    option.value = i;
    option.text = i;
    year.appendChild(option);
  }
  for(var i=1; i<=31; i++){
    var option = document.createElement('option');
    option.value = i;
    option.text = i;
    day.appendChild(option);
  }
}

get_countries_list();
show_year_day();
