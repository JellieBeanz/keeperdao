import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import { abi } from './abi'

import Posts from './components/Posts/Posts';
import TableHead from './components/TableHead/TableHead';
import Pagination from './components/Pagination/Pagination'




const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
const contractAddress = '0xEB7e15B4E38CbEE57a98204D05999C3230d36348'
export const contractInstance = new web3.eth.Contract(abi, contractAddress)
console.log(contractInstance);

function App() {
  const [resourceType, setResourceType] = useState('deposits')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);


  useEffect(() => {
    const fetchPosts = async () => {
      if (resourceType === 'deposits') {
        setLoading(true);
        await contractInstance.events.Deposited({fromBlock: 106}).on('data', async function (event) {
          var res =[event.returnValues[0],event.returnValues[1],event.returnValues[2],event.returnValues[3]]
          setPosts(res)
          setLoading(false);      
        });
        
      }else if (resourceType === 'withdrawls') {
        setLoading(true);
        await contractInstance.events.Withdrew({fromBlock: 106}).on('data', async function (event) {
          var res =[event.returnValues[0],event.returnValues[1],event.returnValues[2],event.returnValues[3],event.returnValues[4]]
          setPosts(res) 
          setLoading(false);         
        });
       
      }if (resourceType === 'borrow') {
        setLoading(true);
        await contractInstance.events.Borrowed({fromBlock: 106}).on('data', async function (event) {
          var res =[event.returnValues[0],event.returnValues[1],event.returnValues[2],event.returnValues[3]]
          setPosts(res)  
          setLoading(false);        
        });
        
      }
    }

    fetchPosts()
  }, [resourceType])

  //get Current Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <>
      <div>
        <button onClick={() => setResourceType('deposits')}>deposits</button>
        <button onClick={() => setResourceType('withdrawls')}>withdrawls</button>
        <button onClick={() => setResourceType('borrow')}>borrow</button>
      </div>
      <h1>{resourceType}</h1>
      <table className='table'>
        <thead>
          <tr>
          <TableHead resourceType = {resourceType}></TableHead>
          </tr>
        </thead>
        <tbody>
          <tr>
          <Posts posts={currentPosts} loading={loading} resourceType={resourceType}></Posts>
          </tr>
        </tbody>
      </table>
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}></Pagination>
      
    </>
  );
}


export default App;
