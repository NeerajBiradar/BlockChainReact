import React from "react";
import Web3 from 'web3';
import ABI from '../ABI/ABI';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { useEffect, useState } from "react";

const Verify = () => {

    let [account, setAccount] = useState("");
    let [contractdata, setContractdata] = useState({});
    let [data, setData] = useState([]);
    let [transactionHash, setTransactionHash] = useState("");
    let { ethereum } = window;

    useEffect(() => {
        async function Connection() {
            let accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setAccount(accounts[0]);
            const web3 = new Web3(window.ethereum);
            const Address = "0xC73b335Daeb32f4df2635aA821A4B8532a18EC9c";
            let contract = new web3.eth.Contract(ABI, Address);
            setContractdata(contract);
            let temp = await contract.methods.Developer().call();
            temp = temp.filter((val, ind) => {
                return val.check === "None"
            });
            console.log(temp, "Verify");
            setData(temp);
            $(function () {
                $('#Verify-Table').DataTable();
            })
        }
        Connection();

    }, []);
    async function handledeploy(name, Status) {
        const timestamp = new Date();
        const Time = timestamp.toString();
        console.log(name, Time, Status);
        // deploybutton.innerHTML = Time;  
        if (account === '0x47fb4385f5c205b59033d72330cd9e795626904c') {
            const result = await contractdata.methods.SetPatchcheck(name, Status, Time).send({ from: account });
            setTransactionHash(result.transactionHash);
            alert('Transcation Successful');
        }
        else {
            console.log('Transcation Unsuccessful! Admin account does not match');
        }
    }

    function handledownload(varible) {
        const fileBlob = new Blob([new Uint8Array(Web3.utils.hexToBytes(varible))], { type: 'application/octet-stream' });
        const fileUrl = URL.createObjectURL(fileBlob);

        // Create a new anchor element and set its attributes
        const downloadLink = document.createElement('a');
        downloadLink.href = fileUrl;
        downloadLink.download = 'Patch.exe';

        // Simulate a click on the download link
        downloadLink.click();
    }



    return (
        <div className="container table-responsive">
            <table className="table table-light table-striped table-hover mt-3" id="Verify-Table">
                <thead className="table-dark">
                    <tr>
                        <th scope="col" style={{ width: '5%' }}>S.No</th>
                        <th scope="col" style={{ width: '10%' }}>Patch Name</th>
                        <th scope="col" style={{ width: '25%' }}>Bug & Feature</th>
                        <th scope="col" style={{ width: '20%' }}>Uploaded Date</th>
                        <th scope="col" style={{ width: '20%' }}>Download Patch to Verify</th>
                        <th scope="col" style={{ width: '20%' }}>Approve/Reject</th>
                    </tr>
                </thead>
                <tbody>
                    {data.reverse().map((val, ind) => {
                        return (
                            <tr key={ind}>
                                <td>{ind + 1}</td>
                                <td>{val.patch_name}</td>
                                <td>
                                    <ul>
                                        {val.bugs.map((bug, index) => (
                                            <li key={`bug-${index}`}>{bug}<br /></li>
                                        ))}
                                        {val.features.map((feature, index) => (
                                            <li key={`feature-${index}`}>{feature}<br /></li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{val.uploadtime}</td>
                                <td>
                                    <button className="btn btn-primary mt-2" onClick={() => {
                                        handledownload(val.patch_file)
                                    }}>
                                        Download
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-success mt-3" onClick={() => {
                                        handledeploy(val.patch_name, 'Approved')
                                    }}>
                                        Approve
                                    </button>
                                    <button className="btn btn-danger mt-3 mx-3 " onClick={() => {
                                        handledeploy(val.patch_name, 'Rejected')
                                    }}>
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {transactionHash && (
                <div className="row mt-5">
                    <div className="col-12">
                        <h2>Transaction Details</h2>
                        <p>Transaction Hash: {transactionHash}</p>
                        <button type="submit" className="btn btn-primary mt-2"onClick={() => {
              window.location.reload(true);
              setTransactionHash("");
            }}>New Verify</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Verify;