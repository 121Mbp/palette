import { useState } from 'react'
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
`
const Ratio = styled.div`
    padding: 0 1rem;
    font-size: 4.5rem;
`
const Name = styled.div`
    font-size: 3rem;
`

function Header({ textHex, backgroundHex }) {
    const [contrast, setContrast] = useState(0)

    console.log(textHex, backgroundHex)
    

    return (
        <Headers style={{ color: `#${textHex` }}>
            <Text>Aa</Text>
            <Ratio> 1.25</Ratio>
            <Name>AA Large</Name>
        </Headers>
    )
}

export default Header