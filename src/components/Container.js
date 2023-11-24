import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from './Header'
import Fraction from './Fraction'
import Bookmark from './Bookmark'

const Description = styled.div`
    max-width: 32em;
    margin: calc(4/3 * 1em) 0;
    line-height: calc(16/9 * 1em);
    @media screen and (max-width: 576px) {
        font-size: 1rem;
    }
`
const Backwards = styled.div`
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 576px) {
        margin-top: 2rem;
        flex-direction: column-reverse;
    }
`
const Contrast = styled.div`
    display: flex;
    justify-content: space-around;
    max-width: 1400px;
    @media screen and (max-width: 992px) {
        flex-direction: column;
    }
`
const Reverse = styled.button`
    margin: 2rem 0;
    padding: .5rem;
    font-family: inherit;
    font-size: 1rem;
    border-radius: .2rem;
`
const Footers = styled.div`
    margin-top: 8rem;
    font-size: .9rem;
    font-weight: bold;
    @media screen and (max-width: 576px) {
        margin-top: 4rem;
    }
`
const Dominic = styled.a`
    display: inline-block;
    margin-right: 1rem;
    text-decoration: underline;
    cursor: pointer
`

const convert = require('color-convert')
const textArr = [ 200, 100, 20 ]
const backgroundArr = [ 158, 100, 50 ]
function Container() {
    const [text, setText] = useState(textArr)
    const [background, setBackground] = useState(backgroundArr)
    const [textHex, setTextHex] = useState('')
    const [backgroundHex, setBackgroundHex] = useState('')
    const [db, setDB] = useState(JSON.parse(localStorage.getItem('palette')) || [])
    
    useEffect(() => {
        setTextHex(hslToHex(text))
        setBackgroundHex(hslToHex(background))
        document.body.style.backgroundColor = `#${backgroundHex}`
    }, [text, background, backgroundHex]);
    
    const textChange = (value) => {
        setText(value)
        setTextHex(hslToHex(value))
    }
    
    const backgroundChange = (value) => {
        setBackground(value)
        setBackgroundHex(hslToHex(value))
        document.body.style.backgroundColor = `#${hslToHex(value)}`
    }
    function hslToHex(value) {
        return convert.hsl.hex(value)
    }
    const addLocalStrage = (value) => {
        setDB(value)
    }
    
    return (
        <>
            <Header textHex={ textHex } backgroundHex={ backgroundHex } />
            <Backwards>
                <Description style={{ color: `#${textHex}` }}>
                대비 또는 콘트라스트(contrast)는 물체를 다른 물체와 배경과 구별할 수 있게 만들어 주는 시각적인 특성의 차이를 말한다. 실생활의 시각에서 대비는 같은 시야 속에서 한 물체와 다른 물체의 색과 밝기의 차이로 결정된다. 인간의 시각 체계는 절대 휘도보다 대비에 더 민감하므로 장소나 낮의 빛 세기의 큰 변화에 관계 없이 세상을 비슷하게 지각할 수 있다.
                </Description>
                <Contrast>
                    <Fraction 
                        name={ 'Text' }
                        origin={ text } 
                        textHex={ textHex } 
                        color={ textChange } 
                        addLocalStrage={ addLocalStrage }
                        db={ db }
                    />
                    <Fraction 
                        name={ 'Background' }
                        origin={ background } 
                        textHex={ textHex } 
                        backgroundHex={ backgroundHex } 
                        color={ backgroundChange } 
                        addLocalStrage={ addLocalStrage }
                        db={ db }
                    />
                </Contrast>
            </Backwards>
            <Bookmark 
                db={ db } 
                addLocalStrage={ addLocalStrage }
                textHex={ textHex } 
                backgroundHex={ backgroundHex } 
            />
            <Footers>
                <Dominic style={{ color: `#${textHex}` }} onClick={()=>{
                    window.open('https://github.com/121Mbp', '_blank')
                }}>GitHub</Dominic>
                <Dominic style={{ color: `#${textHex}` }} onClick={()=>{
                    window.open('https://www.w3.org/TR/WCAG21/', '_blank')
                }}>WCAG</Dominic>
            </Footers>
        </>
    )
}

export default Container