/*
Build a simple address book application using HTML, CSS, JavaScript and jQuery. It is a single page, that opens in the browser, where the user can create new contacts, find existing contacts, or delete them. Each contact should have a name, surname, phone number, and address. The data doesn’t need to be persisted when the browser page is closed.
*/

/*
Data type to store address info - tick
Search Function to search contacts - tick
Function to append address to div
function to store new contacts
function to delete contact
regex to capture correct data input
*/


//Object holding contact data that is appended via the contact constructor function
    let contactArray = [{
    name: 'Tony',
    surname: 'Stark',
    address: '1001 Miami Avenue',
    number:'07770770945'
    },{
    name: 'Black',
    surname: 'Widow',
    address: 'The School For The Gifted',
    number: '079912300123'
    },{
    name: 'Bruce',
    surname: 'Banner',
    address: '001 Smash Avenue',
    number: '07770770945'
    },{
    name: 'Hawk',
    surname: 'Eye',
    address: '13 Psyhic Ville',
    number: '07123171231'
    },{
    name: 'Steven',
    surname: 'Rodgers',
    address: '78 Upper Manhattan',
    number: '07734322123'
    },{
    name: 'Peter',
    surname: 'Parker',
    address: '1230 Lower New York',
    number: '07710023211'
    }];

//###############
//Object constructor function
//Passing in the new contact details in order - name / surname / address / number
    function Contacts (name, surname, address, number){
    this.name = name;
    this.surname = surname;
    this.address = address;
    this.number = number;
    }
    const addContact = () => {
    let name = $('#name').val();
    let surname = $('#surname').val();
    let address = $('#address').val();
    let number = $('#number').val();
    return createContact(name,surname,address,number);
    }
//###############
//###############
//Search function - on key input capture text
    $("#search").on("keyup", function(){
      //variable to capture input - make lowerCase for text matching
      var value = $(this).val().toLowerCase();
      //Reduce the set of matched elements to those that match the selector or pass the function's test.
      $(`#contacts p`).filter(function(){
        //this - becomes the DOM elements with id contacts p
        //check if the contents of value is present in the data stored in elements with the p tag
        //return -1 if not found and toggle display:off
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
//##############
//##############
//Function to reval div that contains the input fields
//also checks if the input boxes are visible and will close if double clicked
      const contactReval = () => {
          let concAdd = document.querySelector('#addContact');
        if(concAdd.style.display == 'none'){
            $('#addContact').show();
          }else {
            $('#addContact').hide();
      }
    }
//############
//############
//Sort function to order contactArray alphabetically
    const sortContacts = (contactArray) => {
      contactArray.sort(function (a,b){
        if (a.name < b.name){
          return -1;
        }else if (a.name > b.name){
          return 1;
        }
      });
      return contactBuilder();
    }
//###########
//###########
    const contactBuilder = () => {
    for (let i=0; i<contactArray.length; i++){
      $('#contacts').append(`
    <p id='contactList'>Name: ${contactArray[i].name} ${contactArray[i].surname} <br> Address: ${contactArray[i].address} <br> Contact Number: ${contactArray[i].number}</p>
    <span id='delete' style="display: none;" onclick='deleteContact(${i})'><i class="material-icons" style="font-size:20px" >delete</i></span>
      <span id='update' style="display: none;" onclick='updateContact(${i})'><i class="material-icons" style="font-size:19px">note_add</i></span>
    `);
    }
     $('#addContact').hide();
    }
//###########
//###########
const createContact = (name,surname,address,number) =>{
   $('#addContact').hide();
  let contactNew = new Contacts (name,surname,address,number);
  contactArray.push(contactNew);
  $('#contacts').empty();
  return sortContacts(contactArray);
}
//##########
//##########
const updateContact = (current) =>{
  let updateGrab = document.querySelectorAll('#update')[current];
  $(updateGrab).hide();
  $(`<div id='updatePop'>
  <input id='nameUpdate' type="text" placeholder="${contactArray[current].name}">
    <input id='surnameUpdate' type="text" placeholder="${contactArray[current].surname}">
      <input id='addressUpdate' type="text" placeholder="${contactArray[current].address}">
        <input id='numberUpdate' type="text" placeholder="${contactArray[current].number}">
          <button onclick='changeContact(${current});'>submit</button> </div> `).insertAfter(updateGrab);

}
//##########
const changeContact = (current) =>{
  let name = $('#nameUpdate').val();
  let surname = $('#surnameUpdate').val();
  let address = $('#addressUpdate').val();
  let number = $('#numberUpdate').val();
  if(name.length > 0 ){
    contactArray[current].name = name;
  }else if (surname.length > 0){
    contactArray[current].surname = surname;
  }else if (address.length > 0 ){
    contactArray[current].address = address;
  }else if (number.length > 0){
    contactArray[current].number = number;
  }else {
    let deleteGrab = document.querySelectorAll('#delete')[current];
    let updateGrab = document.querySelectorAll('#update')[current];
    $(deleteGrab).hide();
    $(updateGrab).hide();
    $('#updatePop').remove();
    return;
  }
return sortContacts(contactArray);
}


//##########
  $('#outer').mouseenter(function(){
    let contactGrab = document.querySelectorAll('#contactList');
    let deleteGrab = document.querySelectorAll('#delete');
    let updateGrab = document.querySelectorAll('#update');
      for(let i=0; i<contactGrab.length; i++){
      $(contactGrab[i]).click(function(){
      if(deleteGrab[i].style.display == 'none'){
      $(updateGrab[i]).show();
      $(deleteGrab[i]).show();
    }else {
      $(updateGrab[i]).hide();
      $(deleteGrab[i]).hide();
    }
    });
  }
});
//##########
//##########
const deleteContact = (i) =>{
  let deleteCheck = prompt('Enter "Yes" if you want to delete contact').toLowerCase();
  if(deleteCheck == 'yes'){
   contactArray.splice(i,1);
    $('#contacts').empty();
    return sortContacts(contactArray);
  }else {
    return;
  }
  return;
}
//##########

sortContacts(contactArray);
