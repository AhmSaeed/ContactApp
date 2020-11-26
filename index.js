var data = [
    {
        name: "Ahmed Saeed",
        phone: "01062197251"
    },
    {
        name: "Mina Kamal",
        phone: "01062197251"
    },
    {
        name: "Eslam Ahmed",
        phone: "01062197251"
    }
]

/*
function to create a contact item 
by send each item and return an li tag contains
details about each contact 
*/
function generateContactItem(item){
    return `
        <li class="listitem">
            <a href="#page_two">
                <img class="user_profile_pic" src="./assets/profile.png">
                <h3>${item.name}</h3>
            </a>
            <a class="call_icon" href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop"></a>
        </li>
    `;
}

/**
 * Make sure element body is empty before adding contact list
 */
$('#contactList').empty();

/**
 * Loop on each contact item and append it to element with contactList id
 */
$.each(data, function(i, item){
    $('#contactList').append(generateContactItem(item));
});