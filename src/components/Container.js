import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from './Header'
import Fraction from './Fraction'

const Description = styled.div`
    max-width: 32em;
    margin: calc(4/3 * 1em) 0;
    line-height: calc(16/9 * 1em);
`
const Contrast = styled.div`
    display: flex;
`
const convert = require('color-convert')
const textArr = [ 200, 100, 20 ]
const backgroundArr = [ 158, 100, 50 ]
function Container() {
    const [text, setText] = useState(textArr)
    const [background, setBackground] = useState(backgroundArr)
    const [textHex, setTextHex] = useState('')
    const [backgroundHex, setBackgroundHex] = useState('')
    useEffect(()=>{
        setTextHex(hslToHex(text));
        setBackgroundHex(hslToHex(background));
        document.body.style.backgroundColor = `#${backgroundHex}`
    }, [text, background, backgroundHex])
    const textChange = (value) => {
        setText(value)
        setTextHex(hslToHex(value));
    }
    const backgroundChange = (value) => {
        setBackground(value)
        setBackgroundHex(hslToHex(value));
        document.body.style.backgroundColor = `#${hslToHex(value)}`
    }
    function hslToHex(value) {
        return convert.hsl.hex(value);
    }
    return (
        <>
            <Header textHex={ textHex } backgroundHex={ backgroundHex } />
            <Description style={{ color: textHex }}>
                Contrast is the difference in luminance or color that makes an object (or its representation in an image or display) distinguishable. In visual perception of the real world, contrast is determined by the difference in the color and brightness of the object and other objects within the same field of view.
            </Description>
            <Contrast>
                <Fraction name={ 'Text' } origin={ text } textHex={ textHex } init={ textArr } color={ textChange } />
                <Fraction name={ 'Background' } origin={ background } backgroundHex={ backgroundHex } textHex={ textHex } init={ backgroundArr } color={ backgroundChange } />
            </Contrast>
        </>
    )
}

export default Container