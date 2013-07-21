function init(){
  window.scrollTo(0,1);
  SC.initialize({
    client_id: '45e1f7e473518eccbcb6bc27ecac7c44'
  });
  $.scPlayer.defaults.onDomReady = null;
  $('#disconnect').click(function(){
    SC.disconnect();
    $('#loggedin').css('display','none');
    $('#loggedout').css('display','block');
  });
  $("#refresh").click(function(){
    getUserFollowings(_uid);
  });
}

function getUserFollowings(curUserId){
  SC.get("/users/"+curUserId+"/followings", function(data){
    if (data > 0){
      //TODO: account for duplicate tracks
      getFollowersFavs(data);
    }
  });
}

function getFavTracks(data){
    SC.get("/users/"+followerid+"/favorites", function(data){
      if(data.length > 0) {
        getFavTrack(data);
      }
  });
}

// function hasFaves(data){
//   var count = 0;
//   for (var i=0; i < data.length; i++) {
//     count += data[i].public_favorites_count;
//   }
//   if(count < 11){
//     return false;
//   }
//   else{
//     return true;
//   }
// }

