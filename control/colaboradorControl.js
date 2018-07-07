var app = angular.module('colaboradorModule',[]);

app.controller('colaboradorControl',function($scope,$http){
	
	var url = 'http://localhost:8080/ControlProf/rs/colaborador';
	
	$scope.pesquisar = function(){
		 $http.get(url).success(function (colaboradoresRetorno){
			$scope.colaboradores = colaboradoresRetorno;
			
		}).error(function(mensagemErro){
		        alert('Problema ao obter a lista');
				alert(mensagemErro);
		});
	}
	
	$scope.novo = function(){
		$scope.colaborador = {};
		$scope.mensagens = [];
	}
	
	$scope.montaMensagemErro = function(listaErro) {
		$scope.mensagens = [];
		$scope.mensagens.push('Falha de validação retornada do servidor');
		angular.forEach(listaErro, function(value, key){
			 $scope.mensagens.push(value.message);
		});
	}

	/*
    $scope.salvar = function() {    	
    	$scope.researcher.push($scope.reseacher);
		$scope.novo();
		$scope.mensagens.push('Pesquisador salvo com sucesso');
	}*/
	
	$scope.salvar = function() {
		
		alert('Excecutou salvar');
		if ($scope.colaborador.id == undefined || $scope.colaborador.id == '') {    		
			alert('Tentou salvar!');
			$http.post(url,$scope.colaborador).success(function(colaboradorRetornado) {				
				$scope.colaboradores.push(colaboradorRetornado);
				$scope.novo();
				$scope.mensagens.push('Colaborador salvo com sucesso');
				
			}).error(function (erro) {
				$scope.mensagens.push('Erro ao salvar o Colaborador: '+JSON.stringify(erro));
			});
		}
		
		else{
		
			alert('Método Atualizar!');
				$http.put(url,$scope.colaborador).success(function(colaborador) {
					$scope.pesquisar();
					$scope.novo();
					$scope.mensagens.push('Colaborador atualizado com sucesso');
				
				}).error(function (erro) {
				alert('Erro ao atualizar o colaborador');
			});
		
		}
	}
	
	$scope.excluir = function() {
	
		if ($scope.colaborador.id == '') {
			alert('Selecione um Colaborador');
		} else {
		    $http.delete(url+"/"+$scope.colaborador.id).success(function() {
				$scope.colaboradores.splice($scope.colaboradores.indexOf($scope.colaborador),1);
				$scope.pesquisar();
				$scope.novo();
				$scope.mensagens.push('Colaborador excluído com sucesso');
			}).error(function (erro) {
				alert("Erro ao excluir!")
			});
		}
}

	$scope.seleciona = function(colaboradorTabela) {
		$scope.colaborador = colaboradorTabela;
	}
	
	$scope.pesquisar();
	$scope.novo();
});