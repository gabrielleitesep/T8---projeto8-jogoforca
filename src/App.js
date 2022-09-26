import React from "react"
import palavras from "./palavras"
import forca0 from "./assets/forca0.png"
import forca1 from "./assets/forca1.png"
import forca2 from "./assets/forca2.png"
import forca3 from "./assets/forca3.png"
import forca4 from "./assets/forca4.png"
import forca5 from "./assets/forca5.png"
import forca6 from "./assets/forca6.png"

const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

export default function App() {

    const [venceu, setVenceu] = React.useState(true)
    const [resposta, setResposta] = React.useState("")
    const [mostrador, setMostrador] = React.useState([])
    const [botao, setBotao] = React.useState([])
    const [erro, setErro] = React.useState(0)
    const [enforcado, setEnforcado] = React.useState(forca0)


    function inicio() {

        setBotao([])
        setErro(0)
        setEnforcado(forca0)
        geraPalavra()
        setFimDeJogo(false)

    }

    function geraPalavra() {

        let answer = palavras[Math.floor(Math.random() * palavras.length)]
        setResposta(answer)

        let underscore = []
        for (let i in answer) {
            underscore.push("_")
        }

        setMostrador(underscore)
    }

    function cliqueLetra(Letra) {

        if (resposta !== "") {
            setBotao([...botao, Letra])
            verificaLetra(Letra)
        }
    }

    function verificaLetra(Letra) {

        if (resposta.includes(Letra)) {
            estadoPalavra(Letra)
        } else {
            setErro(erro + 1)
            estadoForca()
        }

    }


    function estadoForca() {

        const forcaImage = [forca0, forca1, forca2, forca3, forca4, forca5, forca6]
        setEnforcado(forcaImage[erro + 1])
        perder()
    }


    function verificaUnderscore(elemento, array) {

        let indexes = []
        let idx = array.indexOf(elemento)
        while (idx !== -1) {
            indexes.push(idx)
            idx = array.indexOf(elemento, idx + 1)
        }

        return indexes

    }

    function estadoPalavra(Letra) {

        let indexCorreto = verificaUnderscore(Letra, resposta)
        let indexExibido = verificaUnderscore("_", mostrador)
        let teste = mostrador

        for (let idx in indexExibido) {
            if (indexCorreto.includes(indexExibido[idx])) {
                teste[indexExibido[idx]] = resposta[indexExibido[idx]]
            }
        }

        setMostrador(teste)
        vencer()

    }

    const [fimDeJogo, setFimDeJogo] = React.useState(false)

    function vencer() {
        if (mostrador.join("") === resposta) {
            alert("Você ganhou!!!")
            setMostrador(resposta)
            setBotao(alfabeto)
            setFimDeJogo(true)
            setVenceu(true)
        }
    }

    function perder() {
        if (erro + 1 > 5) {
            alert("Você perdeu :(")
            setMostrador(resposta)
            setBotao(alfabeto)
            setFimDeJogo(true)
            setVenceu(false)
        }
    }

    return (
        <div className="display">
            <div className="jogo">
                <img src={enforcado} alt="imagem forca" />
                <button onClick={inicio}>Escolher Palavra</button>
                <div>
                <div className={`palavra ${fimDeJogo? (venceu?"acerto":"erro") :""}`}>
                        <p>{!fimDeJogo? mostrador.join(" "):resposta}</p>
                    </div>
                </div>
            </div>
            <div className="teclado">
                {alfabeto.map((i, idx) => <button className={`${botao.includes(i) ? "clicado" : ""}`} key={idx} onClick={() => !botao.includes(i) ? (cliqueLetra(i)) : ""}>{i.toUpperCase()}</button>)}
            </div>
            <div className="chute">
                <p>Já sei a palavra!</p>
                <input></input>
                <button>chutar</button>
            </div>
        </div>
    )
}