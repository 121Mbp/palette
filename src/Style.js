import styled, { createGlobalStyle } from 'styled-components'

const Reset = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        border-radius: 0;
        border: 0;
    }

    ul, li {list-style: none;}

    input {
        -webkit-appearance: none;
        appearance: none;
        background-color: transparent;
        outline: none;
    }

    body {
        font-size: 1.125rem;
        font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans KR', sans-serif;
        line-height: calc(4/3);
    }
`
const Wrap = styled.div`
    
`
const Layout = styled.div`
    min-height: 100vh;
    padding: 48px 48px 48px 120px;
    transition: background-color 0.1s ease-out 0s;
    @media screen and (max-width: 576px) {
        padding: 24px 24px 24px 80px;
    }
`

export { 
    Reset,  
    Wrap, 
    Layout
}