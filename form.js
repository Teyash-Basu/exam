const state = {
    xmlDocObj:null,
    nodes:['Student Name','University Name']
  }
  
  
  const loadXml = () => {
    let xhttp;
    if(window.XMLHttpRequest){
        xhttp = new XMLHttpRequest();
    }else{
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4 && xhttp.status == 200){
            showTable(xhttp.responseXML)
        }
    }
  
    xhttp.open('GET','CoffeeHouse.xml',true);
    xhttp.send();
  }
  
  const showTable = (xmlRes) => {
    if(!xmlRes){return;}
    state.xmlDocObj = xmlRes;
    let table;
    table = `<tr style='background:#36304a;color:#fff;'>
        <th>Name</th>
        <th>Phonenum</th>
        <th>Emailid</th>
        <th>Username</th>
        <th>Total-Amount</th>
        <th>Payment-Type</th>
        <th>Actions</th>
        </tr>`;
    const x = xmlRes.getElementsByTagName("Customer");
    for(let i=0;i<x.length;i++){
        table += `<form onsubmit="submitFormHandler()">
        <tr>
            <td>${xmlRes.getElementsByTagName("Name")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("Phonenum")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("Emailid")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("Username")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("Total-Amount")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("Payment-Type")[i].childNodes[0].nodeValue}</td>
            <td id='edit_delete_cont_${i}'>
                <ion-icon name="pencil-outline" class="edit_icon" onclick="changeNode(${i})"></ion-icon>
                <ion-icon onclick="removeNode(${i})" name="trash-outline" class="delete_icon"></ion-icon>
            </td>
            <td id='submit_cancel_cont_${i}' class='hide'>
                <input type=submit><ion-icon type='submit' name="arrow-forward-circle-outline" class="edit_icon" style="color:green;"></ion-icon></submit>
                
                <ion-icon class="delete_icon" name="close-circle-outline"></ion-icon>
            </td>
            </tr>
        </form>`;
    }
    document.getElementById("member_table").innerHTML = table;
  }
  
  const removeNode = (id) => {
    if(id == null){return}
    let child = state.xmlDocObj.getElementsByTagName('Customer')[id];
    state.xmlDocObj.documentElement.removeChild(child);
    showTable(state.xmlDocObj)
  }
  
  const changeNode = (id) => {
    if(id == null){return}
    document.getElementById("form_cont").classList.toggle('hide');
    const form = document.getElementById("changeForm");
    let formElem = `
    <input disabled class='input_fields' type='text' placeholder='Name' value='${state.xmlDocObj.getElementsByTagName("Name")[id].childNodes[0].nodeValue}'/>
    <input disabled class='input_fields' type='text' placeholder='Phonenum' value='${state.xmlDocObj.getElementsByTagName("Phonenum")[id].childNodes[0].nodeValue}'/>
    <input class='input_fields' type='text' placeholder='Emailid' value='${state.xmlDocObj.getElementsByTagName("Emailid")[id].childNodes[0].nodeValue}'/>
    <input class='input_fields' type='text' placeholder='Username' value='${state.xmlDocObj.getElementsByTagName("Username")[id].childNodes[0].nodeValue}'/>
    <input class='input_fields' type='text' placeholder='Total-Amount' value='${state.xmlDocObj.getElementsByTagName("Total-Amount")[id].childNodes[0].nodeValue}'/>
    <input class='input_fields' type='text' placeholder='Payment-Type' value='${state.xmlDocObj.getElementsByTagName("Payment-Type")[id].childNodes[0].nodeValue}'/>
    <div class='btn_cont'>
        <button class='submit_btn' type='submit' onclick='submitFormHandler(${id})'>Submit</button>
        <button class='cancel_btn' onclick='cancelFormHandler()'>Cancel</button>
    </div>
    `;
  
    form.innerHTML = formElem;
    
  }
  
  
  
  const submitFormHandler = (id) => {
    event.preventDefault();
    const inputFields = document.getElementsByClassName("input_fields");
    state.xmlDocObj.getElementsByTagName("Name")[id].childNodes[0].nodeValue = inputFields[0].value;
    state.xmlDocObj.getElementsByTagName("Phonenum")[id].childNodes[0].nodeValue = inputFields[1].value;
    state.xmlDocObj.getElementsByTagName("Emailid")[id].childNodes[0].nodeValue = inputFields[2].value;
    state.xmlDocObj.getElementsByTagName("Username")[id].childNodes[0].nodeValue = inputFields[3].value;
    state.xmlDocObj.getElementsByTagName("Total-Amount")[id].childNodes[0].nodeValue = inputFields[4].value;
    state.xmlDocObj.getElementsByTagName("Payment-Type")[id].childNodes[0].nodeValue = inputFields[5].value;
    console.log(inputFields[0].value)
    showTable(state.xmlDocObj)
    cancelFormHandler();
  }
  
  const cancelFormHandler = () => {
    event.preventDefault();
    document.getElementById("form_cont").classList.toggle('hide');
  
  }
  
  const addNewFormHandler = () => {
    event.preventDefault();
    document.getElementById("form_cont").classList.toggle('hide');
    document.getElementById("form_heading").innerHTML = "Add new node"
    const form = document.getElementById("changeForm");
    let formElem = `
    <input class='input_fields' type='text' placeholder='Name' value=''/>
    <input class='input_fields' type='text' placeholder='Phonenum' value=''/>
    <input class='input_fields' type='text' placeholder='Emailid' value=''/>
    <input class='input_fields' type='text' placeholder='Username' value=''/>
    <input class='input_fields' type='text' placeholder='Total-Amount' value=''/>
    <input class='input_fields' type='text' placeholder='Payment-Type' value=''/>
    <div class='btn_cont'>
        <button class='submit_btn' type='submit' onclick='addNewNodeHandler()'>Submit</button>
        <button class='cancel_btn' onclick='cancelFormHandler()'>Cancel</button>
    </div>
    `;
  
    form.innerHTML = formElem;
  }
  
  const addNewNodeHandler = () => {
    event.preventDefault();
    const inputFields = document.getElementsByClassName("input_fields");
    const newnode = state.xmlDocObj.createElement("Customer")
    state.nodes.map((el,i) => {
        let newTitle = state.xmlDocObj.createElement(el)
        let newText = state.xmlDocObj.createTextNode(inputFields[i].value)
        newTitle.appendChild(newText)
        newnode.appendChild(newTitle);
    });
  
    state.xmlDocObj.documentElement.insertBefore(newnode,null)
    showTable(state.xmlDocObj)
    cancelFormHandler()
  }
  
  loadXml();
  
  
  
  