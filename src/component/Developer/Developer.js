import React from "react";
import Web3 from 'web3';
import ABI from '../ABI/ABI';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// let account;
// const web3 = new Web3(window.ethereum);
// web3.eth.requestAccounts().then(accounts => {
//   account = accounts[0];
//   console.log(account.toLowerCase());
//   connectContract();
// });

// const connectContract = async () => {
//   const Address = "0xC73b335Daeb32f4df2635aA821A4B8532a18EC9c";
//   window.web3 = await new Web3(window.ethereum);
//   window.contract = await new window.web3.eth.Contract(ABI, Address);
//   DeveloperRecive();
// }

// const DeveloperRecive = async () => {
//   const data = await window.contract.methods.Developer().call();
//   console.log(data);
//   const table = document.getElementById('Developer-Table');
//   let j = 0;
//   for (let i = data.length - 1; i >= 0; i--) {
//     const fileBlob = new Blob([new Uint8Array(web3.utils.hexToBytes(data[i].patch_file))], { type: 'application/octet-stream' });
//     const fileUrl = URL.createObjectURL(fileBlob);
//     if (data[i].patch_file == "0x64656661756c74") {
//       const newRow = table.insertRow();
//       const cell1 = newRow.insertCell(0);
//       cell1.innerHTML = j + 1;
//       j = j + 1;
//       const cell2 = newRow.insertCell(1);
//       cell2.innerHTML = data[i].patch_name;
//       const cell3 = newRow.insertCell(2);
//       cell3.innerHTML = '<ul><li>' + data[i].bugs.join('</li><li>') + '</li><li>' + data[i].features.join('</li><li>') + '</li></ul>';
//       const cell4 = newRow.insertCell(3);
//       cell4.innerHTML = data[i].deadline;
//       const cell5 = newRow.insertCell(4);
//       const buttonTag = document.createElement('button');
//       buttonTag.classList.add('btn', 'btn-primary')
//       buttonTag.innerHTML = 'Upload'
//       buttonTag.onclick = () => {
//         localStorage.setItem("object", JSON.stringify(data[i]));
//         window.open('UploadPatch.html');
//       };
//       cell5.appendChild(buttonTag);
//     }
//   }
// }

function DeveloperTable() {
  let [account, setAccount] = useState("");
  let [contractdata, setContractdata] = useState({});
  let [data, setData] = useState([]);
  let { ethereum } = window;
  const navigate = useNavigate();

  useEffect(() => {
    async function Connection() {
      let accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      const web3 = new Web3(window.ethereum);
      const Address = "0xC73b335Daeb32f4df2635aA821A4B8532a18EC9c";
      let contract = new web3.eth.Contract(ABI, Address);
      setContractdata(contract);
      let temp = await window.contract.methods.Developer().call();
      temp = temp.filter((val, ind) => {
        return val.patch_file == "0x64656661756c74"
      });
      console.log(temp, "Developer");
      setData(temp);
      $(function () {
        $('#Developer-Table').DataTable();
      })
    }
    Connection();

  }, []);
  return (


    <div className="container">
      <table className="table table-light table-striped mt-3 table-hover" id="Developer-Table">
        <thead className="table-dark">
          <tr>
            <th scope="col" style={{ width: "10%" }}>S.No</th>
            <th scope="col" style={{ width: "20%" }}>Patch Name</th>
            <th scope="col" style={{ width: "40%" }}>Bug &amp; Feature</th>
            <th scope="col" style={{ width: "15%" }}>Deadline</th>
            <th scope="col" style={{ width: "15%" }}>Upload Patch</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {data.map((val, ind) => {
            return (
              <tr key={ind}>
                <td>{ind + 1}</td>
                <td>{val.patch_name}</td>
                <td>
                  <ul>
                    <li>{val.bugs.join('\n')}</li>
                    <li>{val.features.join('\n')}</li>
                  </ul>
                </td>
                <td>{val.deadline}</td>
                <td>
                  <button className="btn btn-success mt-3" onClick={() => {
                    localStorage.setItem("object", JSON.stringify(val));
                    navigate('/Upload')
                  }}>
                    Deploy
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DeveloperTable;
