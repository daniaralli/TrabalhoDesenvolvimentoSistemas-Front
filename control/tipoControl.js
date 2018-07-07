var app = angular.module('typeModule',[]);

app.controller('typeControl',function($scope,$http){
	
	var url = 'http://localhost:8080/ControlProf/rs/tipoProjeto';
	
	$scope.pesquisar = function(){
		 $http.get(url).success(function (tiposRetorno){
			$scope.tipos = tiposRetorno;
		}).error(function(mensagemErro){
		        alert('Problema ao obter a lista');
				alert(mensagemErro);
		});
	}
	
	$scope.novo = function(){
		$scope.researcher = {};
		$scope.researcher.telefones = [];
		$scope.mensagens = [];
	}
	
	$scope.montaMensagemErro = function(listaErro) {
		$scope.mensagens = [];
		$scope.mensagens.push('Falha de validação retornada do servidor');
		angular.forEach(listaErro, function(value, key){
			 $scope.mensagens.push(value.message);
		});
	}

	
    $scope.salvar = function() {    	
    	$scope.researcher.push($scope.reseacher);
		$scope.novo();
		$scope.mensagens.push('Pesquisador salvo com sucesso');
	}
	
	$scope.excluir = function() {
		if ($scope.researcher.codigo == '') {
			alert('Selecione um Pesquisador');
		} else {
			$scope.pesquisadores.splice($scope.pesquisadores.indexOf($scope.researcher),1);
			$scope.pesquisar();
			$scope.novo();
			$scope.mensagens.push('Pesquisador excluído com sucesso');
		}
	}

	$scope.seleciona = function(tipoTabela) {
		$scope.type = tipoTabela;
	}
	
	
	$scope.pesquisar();
	$scope.novo();
});