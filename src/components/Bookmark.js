import { useState } from 'react'
import styled from 'styled-components'
import { DefaultCopyField } from '@eisberg-labs/mui-copy-field'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Snackbar from '@mui/material/Snackbar'
import DataObjectIcon from '@mui/icons-material/DataObject'
import Tooltip from '@mui/material/Tooltip'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Aside = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 88px;
    border-right: 1px solid;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    @media screen and (max-width: 576px) {
        width: 60px;
    }
`
const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: .8rem 0;
    @media screen and (max-width: 576px) {
        padding: .4rem 0;
    }
    svg {
        width: 3rem;
        height: 3rem;
        @media screen and (max-width: 576px) {
            width: 2rem;
            height: 2rem;
        }
    }
    &.active {
        animation: bounce 1s ease infinite;
    }
    @keyframes bounce {
        30% { transform: scale(1.2); }
        40%, 60% { transform: rotate(-20deg) scale(1.2); }
        50% { transform: rotate(20deg) scale(1.2); }
        70% { transform: rotate(0deg) scale(1.2); }
        100% { transform: scale(1); }
    }
`
const Inner = styled.div`
    display: flex;
    align-items: start;
    justify-content: center;
    padding: .4rem 0 1rem;
    overflow-y: auto;
`
const ColorList = styled.div`
    display: flex;
    flex-direction: column-reverse;
`
const ColorItem = styled.div`
    position: relative;
    cursor: pointer;
    text-align: center;
    > button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -72%);
        @media screen and (max-width: 576px) {
            transform: translate(-50%, -84%);
        }
    }
`
const Img = styled.div`
    position: relative;
    width: 48px;
    height: 48px;
    margin: 1.2rem 0 .8rem .6rem;
    border-radius: .6rem;
    transform: rotate(38deg);
    border: .2rem solid;
    transition: opacity .4s;
    z-index: 1;
    @media screen and (max-width: 576px) {
        width: 2rem;
        height: 2rem;
        margin: .8rem;
        border-width: .14rem;
    }
    &:hover {
        opacity: 0;
    }
`
const HexCode = styled.p`
    position: relative;
    font-size: .7rem;
    font-weight: bold;
    @media screen and (max-width: 576px) {
        transform: scale(.8);
    }
    > div {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        height: auto;
        > div {
            display: block;
            width: 100%;
            height: 100%;
            padding: 0;
            > div {
                position: relative;
                height: 100%;
                max-height: none;
                display: block;
                font-size: 0;
                line-height: 0;
            }
        }
        input { width: 0; height: 0; padding: 0;}
        button {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            padding: 0;
            svg {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }
    fieldset {
        width: 0;
        height: 0;
        border: 0;
    }
`
const Naming = styled.div`
    font-size: .6rem;
    line-height: 1;
    font-weight: bold;
    @media screen and (max-width: 576px) {
        transform: scale(.9);
    }
`

function Bookmark({ db, textHex, backgroundHex, addLocalStrage, save }) {
    const [state, setState] = useState({
        vertical: 'top',
        horizontal: 'right',
        open: false,
        message: '',
    })

    const styleColorGuide = db.map((item, i) => {
        return `\n$${(item.name.value).replace(' ', '')}: ${item.hex.value};`
    }).join('')

    const onClipboard = () => {
        setState({ ...state, open: true, message: '복사되었습니다.' })
    }

    const snackbarClose = () => {
        setState({ ...state, open: false })
    }
    
    return (
        <Aside style={{ borderColor: `#${textHex}` }}>
            <Logo className={ save ? 'active' : '' }>
                <Tooltip title='{ }'>
                    <IconButton 
                        size='small' 
                        style={{ color: `#${textHex}` }} 
                    >
                        <CopyToClipboard text={ styleColorGuide } onCopy={ onClipboard }>
                            <DataObjectIcon />
                        </CopyToClipboard>
                    </IconButton> 
                </Tooltip>
            </Logo>
            <Inner>
                <ColorList>
                    {db !== null && db.map((item, i) => (
                        <BookmarkList 
                            key={i} 
                            db={ db }
                            item={ item } 
                            textHex={ textHex }
                            backgroundHex={ backgroundHex }
                            addLocalStrage={ addLocalStrage }
                            state={ state }
                            setState={ setState }
                            snackbarClose={ snackbarClose }
                        />
                    ))}
                </ColorList>
            </Inner>
        </Aside>
    )
}

function BookmarkList({ db, item, textHex, backgroundHex, addLocalStrage, state, setState, snackbarClose }) {
    const { vertical, horizontal } = state;

    const removed = () => {
        const result = db.filter((acc, i) => acc.hex.clean !== item.hex.clean);
        setState({ ...state, open: true, message: '삭제 되었습니다.' })
        addLocalStrage(result)
        localStorage.removeItem('palette')
        localStorage.setItem('palette', JSON.stringify(result))
    }
        
    return (
        <>
            <ColorItem>
                <Img onClick={ removed } style={{ backgroundColor: item.hex.value, borderColor: `#${textHex}` }} />
                <HexCode style={{ color: `#${textHex}` }}>{ item.hex.value }
                    <DefaultCopyField value={ `#${textHex}` }/>
                </HexCode>
                <Naming style={{ color: `#${textHex}` }}>{ item.name.value }</Naming>
                <IconButton 
                    size='small' 
                    style={{ color: `#${textHex}` }} 
                >
                    <DeleteOutlineIcon  />
                </IconButton>  
            </ColorItem>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={ state.open }
                onClose={ snackbarClose }
                message= { state.message }
            />
        </>
    )
}

export default Bookmark