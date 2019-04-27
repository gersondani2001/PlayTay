 var config = {
    apiKey: "AIzaSyBwAI0_DRgawkK6ZoMSpmYAyhYiWZXt9u0",
    authDomain: "playtay-496de.firebaseapp.com",
    databaseURL: "https://playtay-496de.firebaseio.com",
    projectId: "playtay-496de",
    storageBucket: "playtay-496de.appspot.com",
    messagingSenderId: "842696532825"
  };
  firebase.initializeApp(config);

  var storage = firebase.storage();
 

angular.module('starter.controllers', [])
.controller("loginRes",function($scope,$state,$timeout){

  firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});

  $scope.usuario={}

 $scope.func = function(x){

    $scope.usuario = x

    console.log($scope.usuario.name)
    console.log($scope.usuario.pass)

    firebase.auth().signInWithEmailAndPassword($scope.usuario.name, $scope.usuario.pass).then(function(y){
      console.log("correcto")
      $timeout(function(){
        $state.go("inicio")
      },1000)
     
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.code)
      console.log(error.message)
    });

 } 

})
.controller("inicioS",function($scope){
  console.log("Entra inicio");

  $scope.variableP;
  $scope.cargar;


   function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    console.log(files[0].name);
    $scope.variableP = files;
    console.log($scope.variableP);
    $scope.cargar = files[0].name;
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  
  $scope.img = function(){

    /*    var storageRef = storage.ref();
    var file = files; // use the Blob or File API
    ref.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    })*/

    //console.log($scope.cargar);

    var myImage = new Image();
    myImage.src = $scope.cargar;
    var cargarImagen = myImage

    
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var file = cargarImagen; // use the Blob or File API
    storageRef.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    })


  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
})




.controller("regist",function($scope,$state,$timeout){


  firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});


  $scope.reg = {}

  $scope.func2 = function(y){
    $scope.reg = y 

    console.log($scope.reg)
    firebase.auth().createUserWithEmailAndPassword($scope.reg.email, $scope.reg.password).then(function(m){
      console.log(m.user.uid)
      firebase.database().ref('users/' + m.user.uid).set({
      username: $scope.reg.user,
      email: $scope.reg.email,
      biografia: $scope.reg.bio,
      informacion: $scope.reg.info
  })
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      console.log(errorCode)
      var errorMessage = error.message;
      console.log(errorMessage)
      $timeout(function(){
        $state.go("login")
      })
      // ...
    });


  }
})









