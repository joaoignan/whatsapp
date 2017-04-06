app.controller('UsuarioListaCtrl', function($scope, UsuarioService, $state, $ionicUser){

    var lista = UsuarioService.readAll();
    $scope.usuarios = UsuarioService.readAll();

    $scope.delete = function(id){
        UsuarioService.delete(id);
    }

    $scope.showCreate = function(){
        $state.go('usuario-create');
    }

    $scope.update = function(id){
        $state.go('usuario-update', {id: id}) //passando o id que vem da view como parametro
    }

});

//Criando o controller de create
app.controller('UsuarioCreateCtrl', function($scope, UsuarioService, $ionicHistory){
    $scope.usuario = {
        id:null,
        nome: '',
        email: '',
        senha: ''
    };

    $scope.salvar = function(usuario){ //o salvar() é chamado no submit do form da view
        UsuarioService.create(usuario); //o create() é chamado no service de usuarios
        //$state.go('usuario-lista');
        $ionicHistory.goBack(-1); //msm coisa q o state.go (volta 1 tela)
    }
});

//Criando o controller de update
app.controller('UsuarioUpdateCtrl', function($scope, UsuarioService, $ionicHistory, $stateParams){

    var id = $stateParams.id;

    $scope.usuario = UsuarioService.read(id);

    $scope.update = function(usuario){
        UsuarioService.update(usuario);
        $ionicHistory.goBack(-1);
    }
});

app.controller('RegistroCtrl', function($scope, $ionicAuth, $ionicPopup){

    $scope.salvar = function(usuario) {

        $ionicAuth.signup(usuario).then(
            function() {
                alert('cadastrado');

            },
            function(error) {
                if (error.details[0] == "required_email")
                {
                    $ionicPopup.alert({
                        title: 'Falha no registro',
                        template: 'Email não preenchido'
                    });
                }
            }
        );
    }

});

app.controller('LoginCtrl', function($scope, $state, $ionicAuth, $ionicUser){

    if($ionicAuth.isAuthenticated()){
        $state.go('tabs.perfil');
    }

    $scope.login = function(usuario){

        $ionicAuth.login('basic', usuario).then(function(user){
            $ionicUser.set('data', new Date().toISOString());
            $ionicUser.save();
            $state.go('tabs.perfil');

        });
    }

});

app.controller("TabsCtrl", function($scope){


});

app.controller("PerfilCtrl", function($scope, $ionicUser){
    $scope.usuario = $ionicUser;
    $scope.salvar = function(usuario){
        $ionicUser = usuario;
        $ionicUser.save();
    }

});
