var app = angular.module('whatsapp', ['ionic', 'ionic.cloud']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider, $urlRouterProvider, $ionicCloudProvider){

  $ionicCloudProvider.init({

    "core": {
      "app_id": "fb57075d"
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state('usuario-lista',{ //define um nome para o estado "state"
    url:'/usuario-lista', //em geral a view tem o mesmo nome do estado "state"
    templateUrl: 'templates/usuario-lista.html', //qual arquivo html usa de template pra view
    controller: 'UsuarioListaCtrl' //qual controller tem ação sobre a view.
  });

  $stateProvider.state('usuario-create',{
    url: '/usuario-create',
    templateUrl: 'templates/usuario-create.html',
    controller: 'UsuarioCreateCtrl'
  });

  $stateProvider.state('usuario-update',{
    url: '/usuario-update/:id', //aqui temos o parametro id do update.
    templateUrl: 'templates/usuario-update.html',
    controller: 'UsuarioUpdateCtrl'
  });

  $stateProvider.state('registro',{
    url: '/registro',
    templateUrl: 'templates/registro.html',
    controller: 'RegistroCtrl'
  });

    $stateProvider.state('login',{
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  });

   $stateProvider.state('tabs',{
     abstract: true,
    url: '/tabs',
    templateUrl: 'templates/tabs.html',
    controller: 'TabsCtrl'
  });

     $stateProvider.state('tab.perfil',{
    url: '/perfil',
    views:{
      "tab-perfil" :{
          templateUrl: 'templates/perfil.html',
          controller: 'PerfilCtrl'
      }
    }
  });

     $stateProvider.state('tab.mensagens',{
    url: '/mensagens',
    views:{
      "tab-mensagens" :{
          templateUrl: 'templates/mensagens.html'
      }
    }
  });




  $urlRouterProvider.otherwise('/login');
});
