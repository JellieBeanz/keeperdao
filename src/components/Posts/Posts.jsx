import React from 'react';
import { render } from '@testing-library/react';

const Posts = ({ posts, loading, resourceType}) => {
    if(loading){
        return <h1>Loading....</h1>
    }
    if(resourceType === 'deposits'){
        return(
            <>
                <td>{posts[0]}</td>
                <td>{posts[1]}</td>
                <td>{posts[2]}</td>
                <td>{posts[3]}</td>
            </>
            )
        
    }else if(resourceType === 'withdrawls'){
        return(
            <>
                <td>{posts[0]}</td>
                <td>{posts[1]}</td>
                <td>{posts[2]}</td>
                <td>{posts[3]}</td>
                <td>{posts[4]}</td>
            </>
            )
    }else if(resourceType === 'borrow'){
        return(
            <>
                <td>{posts[0]}</td>
                <td>{posts[1]}</td>
                <td>{posts[2]}</td>
                <td>{posts[3]}</td>
            </>
            )
    }
   

    

   
};

export default Posts