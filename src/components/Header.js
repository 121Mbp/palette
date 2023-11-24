import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Headers = styled.div`
    display: flex;    
    flex-wrap: wrap;
    align-items: baseline;
    margin-bottom: 4px;
    font-weight: bold;
`
const Text = styled.div`
    font-size: 12rem;
    @media screen and (max-width: 576px) {
        font-size: 7.2rem;
    }
`
const Ratio = styled.div`
    padding: 0 1rem;
    font-size: 4.5rem;
    @media screen and (max-width: 576px) {
        font-size: 3.2rem;
    }
`
const Name = styled.div`
    font-size: 3rem;
`

function Header({ textHex, backgroundHex }) {
    const [contrast, setContrast] = useState('')
    const [score, setScore] = useState()

    function getsRGB(c) {
        c = parseInt(c, 16) / 255
        return c <= 0.03928 ? c / 12.92 : Math.pow(((c + 0.055) / 1.055), 2.4)
    }

    function getL(c) {
        return (
            0.2126 * getsRGB(c.substr(1, 2)) + 
            0.7152 * getsRGB(c.substr(3, 2)) + 
            0.0722 * getsRGB(c.substr(-2))
        )
    }

    useEffect(() => {
        const L1 = getL('#'+ textHex)
        const L2 = getL('#'+ backgroundHex)
        const newContrast = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
        setContrast(newContrast)

        if (contrast >= 7) {
            return setScore('AAA')
        }
        if (contrast >= 4.5) {
            return setScore('AA')
        }
        if (contrast >= 3) {
            return setScore('AA Large')
        }

        return setScore('Fail')
        
    }, [ textHex, backgroundHex, contrast, score ])
    
    return (
        <Headers style={{ color: `#${textHex}` }}>
            <Text>가</Text>
            <Ratio> { ((contrast * 100) / 100).toFixed(2) }</Ratio>
            <Name>{ score }</Name>
        </Headers>
    )
}

export default Header