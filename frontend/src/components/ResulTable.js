import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import { getServerData } from '../helper/helper';

const ResulTable = () => {
    
    const [data,setData] =useState([]);
    useEffect(() => {
        getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`, (res) => {
            setData(res)
        })
    })

  return (
    <div>
        <Table>
            <TableHeader>
                <tr>
                    <td>Name</td>
                    <td>Attemps</td>
                    <td>Earn Points</td>
                    <td>Result</td>
                </tr>
            </TableHeader>
            <tbody> 
                {!data?? <div>No data Found</div>}{
                    data.map((v,i)=>(
                        <TableBody key={i}>
                    <td>{v?.username||''}</td>
                    <td>{v?.attempts||''}</td>
                    <td>{v?.points || 0}</td>
                    <td>{v?.achived || ""}</td>
                </TableBody>
                    ))
                }
            </tbody>
        </Table>
    </div>
  )
}

export default ResulTable

const TableHeader = styled.thead`
color: #cecece;
    font-size: 1.1em;
    text-align: center;
    background: #212121;
    padding: 18px 0;
`
const TableBody = styled.tr`
font-size: 1.1em;
text-align: center;
background: #d8d8d8;
padding: 18px 0;
`

const Table = styled.table`
width: 100%;
`
