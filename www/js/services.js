app.factory('UsuarioService', function() {

    const collection = 'usuarios';

    var usuarios = JSON.parse(window.localStorage.getItem('collection') || '[]' );
    var persistir = function() {
        window.localStorage.setItem('collection', JSON.stringify(usuarios));

    };

    return { //retorna json
        
        //Método retorna usuarios
        readAll: function(){
            return usuarios;
        },

        //Método retorna user por id
        read: function(id){
            for(var i=0; i<usuarios.length;i++){
                if(usuarios[i].id == id){
                    return angular.copy(usuarios[i]);
                }
            }
        },

        delete: function(id){
            for(var i=0; i<usuarios.length; i++){
                if(usuarios[i].id == id){
                    usuarios.splice(i, 1);
                    persistir();
                    return;
                }
            }
        },

        create: function(usuario){
            usuario.id = new Date().getTime(); //gera id na gambiarra p/testes
            usuarios.push(usuario); //insere o usuario na lista
            persistir();
        },

        update: function(usuario){
            for(var i=0; i<usuarios.length;i++){
                if(usuarios[i].id == usuario.id){
                    usuarios[i] = usuario;
                    persistir();
                    return;
                }
            }
        }
    }
});

