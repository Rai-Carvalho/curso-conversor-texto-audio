const selecaoVoz = document.querySelector('#selecao-voz')
const entradaTexto = document.querySelector('#entrada-texto')
const botaoOuvir = document.querySelector('#ouvir-btn')
const botaoBaixarTexto = document.querySelector('#baixar-texto')
const uploadArquivo = document.querySelector('#upload-arquivo')

const fala = new SpeechSynthesisUtterance()

let vozesDisponiveis = []

const atualizarValores = () => {
    vozesDisponiveis = window.speechSynthesis.getVoices()
    
    fala.voice = vozesDisponiveis[0]

    vozesDisponiveis.forEach((voz, index) => {
        const opcao = document.createElement('option')
        opcao.value = index
        opcao.textContent = voz.name
        selecaoVoz.appendChild(opcao)
    })
}

window.speechSynthesis.onvoiceschanged = atualizarValores

selecaoVoz.addEventListener('change', () => {
    fala.voice = vozesDisponiveis[selecaoVoz.value]
})

botaoOuvir.addEventListener('click', () => {
    fala.text = entradaTexto.value
    window.speechSynthesis.speak(fala)
})

botaoBaixarTexto.addEventListener('click', () => {
    const texto = entradaTexto.value
    const blob = new Blob([texto], {type: 'text/plain'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'texto.txt'
    a.click()
    URL.revokeObjectURL(url)
})

uploadArquivo.addEventListener('change', (event) => {
    const arquivo = event.target.files[0]

    if(arquivo) {
        const leitor = new FileReader()
        
        leitor.onload = (e) => {
            entradaTexto.value = e.target.result
        }

        leitor.readAsText(arquivo)
    }
})