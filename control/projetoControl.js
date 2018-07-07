var app = angular.module('projectModule',[]);

app.controller('projectControl',function($scope,$http){
	
	var url = 'http://localhost:8080/ControlProf/rs/Projeto';
	
	$scope.pesquisar = function(){
		 $http.get(url).success(function (projetosRetorno){
			$scope.projetos = projetosRetorno;
		}).error(function(mensagemErro){
		        alert('Problema ao obter a lista');
				alert(mensagemErro);
		});
	}
	
	$scope.novo = function(){
		$scope.projeto = {};
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
		
		if ($scope.projeto.id == undefined || $scope.projeto.id == '') {
		
			alert('Tentou salvar!');
			$http.post(url,$scope.projeto).success(function(projetoRetornado) {				
				$scope.projetos.push(projetoRetornado);
				$scope.novo();
				$scope.mensagens.push('Projeto salvo com sucesso');
				
			}).error(function (erro) {
				$scope.mensagens.push('Erro ao salvar o Projeto: '+JSON.stringify(erro));
			});
		}
		
		
		else{
		
			alert('Método Atualizar!');
				$http.put(url,$scope.projeto).success(function(projeto) {
					$scope.pesquisar();
					$scope.novo();
					$scope.mensagens.push('Projeto atualizado com sucesso');
				
				}).error(function (erro) {
				alert('Erro ao atualizar o projeto');
			});
		
		}
	}
	
	$scope.excluir = function() {
	
		if ($scope.projeto.id == '') {
			alert('Selecione um Projeto');
		} else {
		    $http.delete(url+"/"+$scope.projeto.id).success(function() {
				$scope.projetos.splice($scope.projetos.indexOf($scope.projeto),1);
				$scope.pesquisar();
				$scope.novo();
				$scope.mensagens.push('Projeto excluído com sucesso');
				
			}).error(function (erro) {
				alert("Erro ao excluir!")
			});
		}
	}

	$scope.seleciona = function(projetoTabela) {
		$scope.projeto = projetoTabela;
	}
	
	
	$scope.pesquisar();
	$scope.novo();
});