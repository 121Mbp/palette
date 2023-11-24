import { useState } from 'react'
import styled from 'styled-components'
import { DefaultCopyField } from '@eisberg-labs/mui-copy-field'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import Snackbar from '@mui/material/Snackbar'
import Tooltip from '@mui/material/Tooltip'
import axios from 'axios'

const BoxStyled = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
    width: 100%;
    @media screen and (max-width: 576px) {
        margin: 0;
    }
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
            @media screen and (max-width: 1200px) {
                font-size: 3rem;
            }
            @media screen and (max-width: 576px) {
                font-size: 2.6rem;
            }
            @media screen and (max-width: 472px) {
                font-size: 2.2rem;
            }
        }
    `}
    + span {
        display: block;
        top: -.2rem;
    }
    > button {
        position: absolute;
        top: 42%;
        right: 10%;
        color: ${ props=>props.iconColor };
        @media screen and (max-width: 472px) {
            top: 38%;
            right: 16%;
        }
    }
`
const Input = styled(DefaultCopyField)`
    display: block;
    width: 100%;
    color: inherit;
    font-size: 4.5rem;
    @media screen and (max-width: 1200px) {
        font-size: 3rem;
    }
    @media screen and (max-width: 576px) {
        font-size: 2.6rem;
    }
    @media screen and (max-width: 472px) {
        font-size: 2.2rem;
    }
    div {
        font-size: inherit;
        font-family: inherit;
        color: inherit;
        border-radius: 0;
        padding: 0;
    }
    svg {
        color: ${ props=>props.placeholderTextColor };
    }
    fieldset {
        border: 0;
    }
    input {
        height: 100%;
        padding: 0;
        padding-left: 3.4rem;
        @media screen and (max-width: 1200px) {
            padding-left: 2.6rem;
        }
        @media screen and (max-width: 576px) {
            padding-left: 2.1rem;
        }
        @media screen and (max-width: 472px) {
            padding-left: 1.8rem;
        }
        &::-webkit-input-placeholder {
            color: ${ props=>props.placeholderTextColor };
        }
    }    
`
const Controller = styled.div`
    margin-bottom: .6rem;
`

const convert = require('color-convert')
function Fraction({ name, origin, color, textHex, backgroundHex, db, addLocalStrage, setSave }) {
    const [textName, setTextName] = useState('')
    const [backgroundName, setBackgroundName] = useState('')
    const [range, setRange] = useState(origin)
    const [hex, setHex] = useState(convert.hsl.hex(origin))
    const [state, setState] = useState({
        vertical: 'top',
        horizontal: 'right',
        open: false,
        message: '',
    })

    const { vertical, horizontal } = state;

    function fetchData() {
        if(textHex !== '' && backgroundHex !== '') {
            axios.all([
                axios.get(`https://www.thecolorapi.com/id?hex=${textHex}`),
                axios.get(`https://www.thecolorapi.com/id?hex=${backgroundHex}`)
            ]).then(axios.spread((text, background) => {
                setTextName(text.data.name.value);
                setBackgroundName(background.data.name.value)
            }))
        }
    }
    
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
        setRange(arr)
        setHex(convert.hsl.hex(arr))
    }

    const handleInput = (e) => {
        const hexToHsl = convert.hex.hsl(e.target.value)
        color(range)
        setHex(e.target.value)
        setRange(hexToHsl)
        if(e.target.value.length === 0 || e.target.value.length === 3 || e.target.value.length === 6) {
            fetchData()
        } 
    }

    const committed = () => {
        fetchData()
    }

    const onBookmarkAdd = () => {
        if(hex.length < 6){
            return setState({ ...state, open: true, message: '6자리로 입력해 주세요.' })
        }
        axios.get(`https://www.thecolorapi.com/id?hex=${hex}`)
        .then(response => {
            const res = [...db, response.data]
            const ref = res !== 0 && res.filter((item, i) => item !== null);
            const result = ref.reduce((acc, i) => {
                return acc.find(x => x.hex.clean === i.hex.clean) ? acc : [...acc, i]
            }, [])
            if (ref.length === result.length){
                setState({ ...state, open: true, message: '저장 되었습니다.' })
                setSave(true)
            } else {
                setState({ ...state, open: true, message: '이미 등록되어 있습니다.' })
            }
            addLocalStrage(result)
            localStorage.setItem('palette', JSON.stringify(result))
        })       
    }

    const snackbarClose = () => {
        setState({ ...state, open: false, message: '' })
        setSave(false)
    }
        
    return (
        <>
            <BoxStyled style={{ color: `#${textHex}` }}>
                <Label htmlFor='text' title={ 'true' } iconColor={ `#${textHex}` }>
                    { name } - { name === 'Text' ? textName : backgroundName }
                    <Input 
                        id='text' 
                        maxLength={6}
                        value={ hex }
                        onChange={ handleInput } 
                        placeholder='000000'
                        placeholderTextColor={ `#${textHex}` }
                    />
                    <Tooltip title='Save'>
                        <IconButton size='small' onClick={ onBookmarkAdd }>
                            <AddIcon />
                        </IconButton>    
                    </Tooltip>
                </Label>
                <Controller>
                    <Label>Hue { range[0] }°</Label>
                    <Slider
                        value={ range[0] }
                        min={ 0 }
                        max={ 360 }
                        onChange={ handleChange } 
                        name='x' 
                        style={{ color: `#${textHex}` }}
                        onChangeCommitted={ committed }
                    />
                </Controller>
                <Controller>
                    <Label>Saturation { range[1] / 100 }</Label>
                    <Slider 
                        value={ range[1] }
                        onChange={ handleChange } 
                        name='y' 
                        style={{ color: `#${textHex}` }}
                        onChangeCommitted={ committed }
                    />
                </Controller>
                <Controller>
                    <Label>Lightness { range[2] / 100 }</Label>
                    <Slider 
                        value={ range[2] }
                        onChange={ handleChange } 
                        name='z' 
                        style={{ color: `#${textHex}` }}
                        onChangeCommitted={ committed }
                    />
                </Controller>
            </BoxStyled>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={ state.open }
                onClose={ snackbarClose }
                message= { state.message }
            />
        </>
    )
}

export default Fraction