import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

const BoxStyled = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: 0 .8rem;
`

const Label = styled.label`
    position: relative;
    margin: .4rem;
    font-weight: bold;
    font-size: .8rem;
    ${props => props.title && `
        font-weight: normal;
        &::before {
            content: '#';
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            font-size: 4.5rem;
            display: flex;
            align-items: end;
            line-height: 1.2;
        }
    `}
    + span {
        display: block;
        top: -.2rem;
    }
`

const Input = styled.input`
    display: block;
    width: 100%;
    color: inherit;
    font-size: 4.5rem;
    padding-left: 3rem;
`

const Controller = styled.div`
    margin-bottom: .6rem;
`

function Fraction({ name, origin, color, textHex, backgroundHex, init }) {
    const handleChange = (e, value) => {
        let arr = [...origin]
        if(e.target.name === 'x'){
            arr[0] = value
        } else if(e.target.name === 'y') {
            arr[1] = value
        } else if(e.target.name === 'z') {
            arr[2] = value
        }
        color(arr)
    }
    const handleHex = (e) => {
        // hex(e.target.value)
    }
        
    return (
        <>
            <BoxStyled style={{ color: `#${textHex}` }}>
                <Label htmlFor='text' title={ 'true' }>{ name }
                    <Input id='text' value={ name === 'Text' ? textHex : backgroundHex } onChange={ handleHex } />
                </Label>
                <Controller>
                    <Label>Hue { origin[0] }°</Label>
                    <Slider 
                        defaultValue={ init[0] }
                        min={ 0 }
                        max={ 360 }
                        onChange={ handleChange } 
                        name='x' 
                        style={{ color: `#${textHex}` }}
                    />
                </Controller>
                <Controller>
                    <Label>Saturation { origin[1] / 100 }</Label>
                    <Slider 
                        defaultValue={ init[1] } 
                        onChange={ handleChange } 
                        name='y' 
                        style={{ color: `#${textHex}` }}
                    />
                </Controller>
                <Controller>
                    <Label>Lightness { origin[2] / 100 }</Label>
                    <Slider 
                        defaultValue={ init[2] } 
                        onChange={ handleChange } 
                        name='z' 
                        style={{ color: `#${textHex}` }}
                    />
                </Controller>
            </BoxStyled>
        </>
    )
}

export default Fraction