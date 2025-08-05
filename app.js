
// Array que vai guardar os números de já foram sorteados aleatoriamente
let listaDeNumerosSorteados = [];
// Variável que indica a quantidade máxima n de números do jogo (1 até n)
let numeroLimite = 50;
// Variável que vai guardar o resultado da função degeração de número 
// aleatório
let numeroSecreto = gerarNumeroAleatorio();
// Variável que vai guardar o valor incremental de vezes que foram
// efetuadas tentativas até acertar o numero sereto
let tentativas = 1;

/*
let titulo = document.querySelector('h1');
titulo.innerHTML = 'Jogo do Número Secreto';

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
*/

//Maneira profissional e simplificado do que esta comantedo acima
//Função de preenchiemento por texto das tags <h1> e <p>
function exibirTextoNaTela(tag, texto) {
    // document - significa que o javascript esta buscando algo no HTML
    // .querySelection() - está informado qual é o elemento solicitado no HTML
    // tag - é o elemento que esta sendo apontado
    let campo = document.querySelector(tag);
    // .innerHTML - Irá definir o que será incerido nas tags apontadas
    campo.innerHTML = texto;
    // Linha 7 do HTML importa uma biblioteca externa que permide adicionar
    // uma voz para narrar o texto que sesejar. Uma forma de implementar 
    // tecnologia e acessibilidade.
    // responsiveVoice - é o nome da biblioteca importada
    // .speak - método de solicitação de fala
    // texto - o que queremos que seja narrado/falado
    // Brazilian Portuguese Female - idioma e genero da voz
    // (mais opções de idiomas no site da biblioteca - https://responsivevoice.org/)
    // {rate: 1.2} - velocidade de pronuncia da voz
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate: 1.2});
    /*// código alternativo para substituir o que o responsiveVoice faz
    // Se usar este código, apagar a linha 7 do HTML onde importa o ResponsiveVoice
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
    */
}
//Execução da função de preencimento por texto das tags <h1> e <p>
function exibirMensagemInicial(){
    // Esta fornecendo a tag a ser modifiada e o texto que será incerido
    // no lugar do que houver lá.
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 50');
}
// Execução da função exibirMendagemInicial() no inicio do jogo.
exibirMensagemInicial();
//Função de verificação de click no botão Chutar
function verificarChute() {
    // document - significa que o javascript esta buscando algo no HTML
    // .querySelection() - está informado qual é o elemento solicitado no HTML
    // input - é o elemento que esta sendo solicitado
    // Informação do value informado no campo imput
    let chute = document.querySelector('input').value;
    // Comparando o número chute com o número aleatório secreto
    // If - caso positivo, exibirTextoNaTela() irá mudar o texto das tags h1 e p
    // Irá comarar (op. ternário) se houve 1 ou mais tentativas até acertar
    // document.getLemenetById() - método que irá ativar o botão Novo Jogo no HTML
    // document - significa que o javascript esta buscando algo no HTML
    // .getElementById() - método para encontrar um elemento pelo ID informado
    // dentro do documento HTML
    // .removeAttribute() - método que irá eliminar o atributo disabled no buttom do HTML
    // Else if & else - irão verificar se o número chute é maios ou menor que o númeor 
    // secreto sorteado aleatoriamente
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute > numeroSecreto){
        exibirTextoNaTela('p', 'O número secreto é menor');
    } else {
        exibirTextoNaTela('p', 'O número secreto é maior');
    }
    // Incremento das tentativas até acertar o número secreto
    tentativas++;
    // Execução da função de limpar campo de inserção do número chute
    limparCampo();
}

//Funcão de geração de número aleatório
function gerarNumeroAleatorio() {
    // Variavel que sorteará um número aleatório
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    // Este let e if de quantidade... serve para esvaziar o array quando
    // completar com todas as possibilidades devinidas.
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    // Verificação se o número sorteado já esta incluido dentro da
    // array dos números escolhidos
    // If - Caso positivo irá gerar outro número aleatório que não
    // esteja incluso no array de números escolhidos
    // Else - Irá incluir o número aleatório que ainda não esta 
    // incluido dentro no array de números escolhidos 
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}
// Função que irá limpar o campo, caso o número não seja o secreto
function limparCampo() {
    // document - significa que o javascript esta buscando algo no HTML
    // .querySelection() - está informado qual é o elemento solicitado no HTML
    // input - é o elemento que esta sendo solicitado
    chute = document.querySelector('input');
    chute.value = '';
}
//Fução que irá resetar para as configurações iniciais do jogo sem
// limpar os elementos do array.
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    //comando que irá voltar a desativar o botão Novo Jogo no HTML
    // document - significa que o javascript esta buscando algo no HTML
    // .getElementById() - método para encontrar um elemento pelo ID informado
    // dentro do documento HTML
    // .setAttribute() - método que irá reabilitar atributo no botão no HTML
    document.getElementById('reiniciar').setAttribute('disabled', true);
}