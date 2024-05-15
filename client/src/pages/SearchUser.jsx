import React from 'react'
import styled from 'styled-components'

const SearchUser = () => {
  return (
    <Container>
        <div className="search-bar">
            <input type="text" placeholder="Search for a user"/>
            <i class="fa-solid fa-magnifying-glass"></i>
        </div>
    </Container>
  )
}

const Container = styled.div`
    width:100%;
    .search-bar {
        display:flex;
        justify-content:center;
        align-items:center;
        background-color:white;
        padding:1rem;
        margin:1rem;
        border-radius:1rem;
        i {
            color:grey;
        }
        input {
            outline:none;
            border:none;
            width:100%;
        }
    }
`;

export default SearchUser