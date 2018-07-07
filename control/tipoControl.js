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
		$scope.type = {};
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
		
		if ($scope.type.id == undefined || $scope.type.id == '') {    		
			alert('Tentou salvar!');
			$http.post(url,$scope.type).success(function(tipoRetornado) {				
				$scope.tipos.push(tipoRetornado);
				$scope.novo();
				$scope.mensagens.push('Tipo salvo com sucesso');
				
			}).error(function (erro) {
				$scope.mensagens.push('Erro ao salvar o Tipo: '+JSON.stringify(erro));
			});
		}
		
		else{
		
			alert('Método Atualizar!');
				$http.put(url,$scope.type).success(function(tipo) {
					$scope.pesquisar();
					$scope.novo();
					$scope.mensagens.push('Tipo de pesquisa atualizado com sucesso');
				
				}).error(function (erro) {
				alert('Erro ao atualizar o tipo de pesquisa');
			});
		
		}
	}
	
	
	$scope.excluir = function() {
	
		if ($scope.type.id == '') {
			alert('Selecione um Tipo');
		} else {
		    $http.delete(url+"/"+$scope.type.id).success(function() {
				$scope.tipos.splice($scope.tipos.indexOf($scope.type),1);
				$scope.pesquisar();
				$scope.novo();
				$scope.mensagens.push('Tipo excluído com sucesso');
				
			}).error(function (erro) {
				alert("Erro ao excluir!")
			});
		}
	}

	$scope.seleciona = function(tipoTabela) {
		$scope.type = tipoTabela;
	}
	
	
	$scope.pesquisar();
	$scope.novo();
});