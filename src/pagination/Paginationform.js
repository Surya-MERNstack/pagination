
import React, { useState } from "react";
import datas from "./Datapage";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Pagination.css'

const Paginationform = () => {
  //first we the base total page like 5 it split the page with the 5 5 data
  //we need the firstPage is default it like 1 staring
  //we need that last page when the data complete
  //we need the data in var it should hold the page like 1st and last
  //the total page we need to calculate by math of record
  //we should have prev btn and nxt btn
  //and the clicking the number it should move to the page what that page have the content

  const [currentPage, setCurrentPage] = useState(1);
  const totalpages = 5;
  const firstPage = (currentPage - 1) * totalpages;
  console.log(firstPage);
  const lastPage = firstPage + totalpages;
  console.log(lastPage);
  const totalRecord = datas.slice(firstPage, lastPage);

  const totalPages = Math.ceil(datas.length / totalpages);

  const prevbtn = () => {
    setCurrentPage((pre) => (Math.max(pre -1 , 1)))
  }
 
  
  const nextbtn = () => {
    setCurrentPage((nxt) => (Math.min(nxt + 1 ,totalPages)))
  }
  const changePage = (pages) => {
    setCurrentPage(pages);
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Url</th>
            <th>ThumbnailUrl</th>
          </tr>
        </thead>
        {totalRecord.map((data) => (
          <tbody>
            <tr key={data.albumId}>
              <td>{data.id}</td>
              <td>{data.title}</td>
              <td>{data.url}</td>
              <td>{data.thumbnailUrl}</td>
            </tr>
          </tbody>
        ))}
      </table>
      <nav>
        <ul  className="pagination">
          <li className="page-item">
            <button onClick={prevbtn} className="page-link" disabled = {currentPage === 1}>prev btn</button>
          </li>
          {Array.from({ length: totalpages }, (_, index) => index + 1).map(
           (pagenumber) =>(
           <li className={`page-item ${currentPage === pagenumber ? "active" : " "}}`}>
                <button className="page-link" onClick={() =>changePage(pagenumber)}>
                     {pagenumber}
                </button>
           </li> 
           )
          )}
          <li>
            <button onClick={nextbtn} className="page-link"  disabled = {currentPage === totalPages}>
              nxt btn
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Paginationform;
