var app = angular.module('pessoaModule',[]);

app.controller('pessoaControl',function($scope){
	
	$scope.pessoas = [{'codigo':'1','nome':'carlos'},
	{'codigo':'2','nome':'marcos'}]
	
	$scope.pesquisar = function(){
		 
	}
	
	$scope.novo = function(){
		$scope.pessoa = {};
		$scope.pessoa.telefones = [];
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
    	$scope.pessoas.push($scope.pessoa);
		$scope.novo();
		$scope.mensagens.push('pessoa salvo com sucesso');
	}
	
	$scope.excluir = function() {
		if ($scope.pessoa.codigo == '') {
			alert('Selecione um pessoa');
		} else {
			$scope.pessoas.splice($scope.pessoas.indexOf($scope.pessoa),1);
			$scope.pesquisar();
				$scope.novo();
				$scope.mensagens.push('pessoa excluído com sucesso');
		}
	}
	
	$scope.seleciona = function(pessoaTabela) {
		$scope.pessoa = pessoaTabela;
	}
	
	$scope.pesquisar();
	$scope.novo();
});