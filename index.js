var data = [
    {
        name: "Ahmed Saeed",
        phone: "01062197251",
        email: "ahmedsaeed@gmail.com",
        gender: "male",
        image: null
    },
    {
        name: "Mina Kamal",
        phone: "01062197251",
        email: "minakamal@gmail.com",
        gender: "male",
        image: null
    },
    {
        name: "Eslam Ahmed",
        phone: "01062197251",
        email: "eslamahmed@gmail.com",
        gender: "male",
        image: null
    }
]
var contactListObject = {
    itemID : null
}
var AddContactForm = {
    name: '',
}

jQuery.validator.setDefaults({
    errorPlacement: function(error, element) {
        error.appendTo(element.parent().parent().after());
    }
});

/*
function to create a contact item 
by send each item and return an li tag contains
details about each contact 
*/
function generateContactItem(id, item){
    return `
        <li class="listitem">
            <a href="#ContactDetailsScreen" id="${id}">
                <img class="user_profile_pic" src="./assets/profile.png">
                <h3>${item.name}</h3>
            </a>
            <a class="call_icon" href="tel:${item.phone}" data-rel="popup" data-position-to="window" data-transition="pop"></a>
        </li>
    `;
}

function appendContactListToHome(){
    /**
     * Make sure element body is empty before adding contact list
     */
    $('#contactList').empty();

    /**
     * Loop on each contact item and append it to element with contactList id
     */
    $.each(data, function(i, item){
        $('#contactList').append(generateContactItem(i, item));
    });
    $('#contactList').listview().listview('refresh');
}

appendContactListToHome();

/**
 * We get each anchor id by looping through li and access anchor tag
 * attribute "id" then assign it to elementID
 */
$(document).on('pagebeforeshow', '#HomeScreen', function(){       
    $('#contactList li a').each(function(){
        var elementID = $(this).attr('id');      
        $(document).on('click', '#'+elementID, function(event){  
            if(event.handled !== true) // This will prevent event triggering more then once
            {
                contactListObject.itemID = elementID; // Save li id into an object, localstorage can also be used, find more about it here: http://stackoverflow.com/questions/14468659/jquery-mobile-document-ready-vs-page-events
                $.mobile.changePage( "#ContactDetailsScreen", { transition: "slide"} );
                event.handled = true;
            }              
        });
    });
});

/**
 * Before page load, we access content like header title, phone, email, ...etc  
 * then assign new values from data to it 
 */
$(document).on('pagebeforeshow', '#ContactDetailsScreen', function(){
    $("#contactDetailsHeaderTitle").html(data[contactListObject.itemID].name);
    $("#phoneData").html(data[contactListObject.itemID].phone);
    $("#emailData").html(data[contactListObject.itemID].email);
    $("#genderData").html(data[contactListObject.itemID].gender);
    //Add phone call feature
    $("#phoneIcon").attr('href', `tel:${data[contactListObject.itemID].phone}`);
});

/**
 * Get data from array by using serializeArray()
 * Get contact data from array then add it to addFormObject
 * Add data to array of data
 * then call append to refresh Home screen
 * then navigate to Home screen
 */
function onSubmit(e){
    //get the event so we can prevent
    e.preventDefault();
    if($('#addContactForm').valid()){
        var addFormArray = $('#addContactForm').serializeArray();
        var i;
        var addFormObject = {};
        for(i = 0; i < addFormArray.length; i++){
            addFormObject = {
                ...addFormObject,
                [addFormArray[i].name]: addFormArray[i].value
            }
        }
        data = [
            ...data,
            addFormObject
        ];
        console.log(data);
        appendContactListToHome();
        $.mobile.changePage( "#HomeScreen");
    };
}