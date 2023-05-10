import React from "react";
import Web3 from 'web3';
import ABI from '../ABI/ABI';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { useEffect, useState } from "react";

const ApprovedPatch = () => {
    let [account, setAccount] = useState("");
    let [contractdata, setContractdata] = useState({});
    let [data, setData] = useState([]);
    let { ethereum } = window;

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
                return val.check == "Approved" && val.deploy == 'not'
            });
            console.log(temp, "Approved");
            setData(temp);
            $(function () {
                $('#Approved-Table').DataTable();
            })
        }
        Connection();

    }, []);

    async function handledeploy(name) {
        const timestamp = new Date();
        const Time = timestamp.toString();
        // deploybutton.innerHTML = Time;
        if (account == '0x47fb4385f5c205b59033d72330cd9e795626904c') {
            await window.contract.methods.SetDeploy(name, Time).send({ from: account });
            //location.reload();
            console.log('Transcation Successful');
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

    if (data.length == 0) {
        return (
            <div>
                No data to be displayed;
            </div>
        );
    }
    else {
        return (
            <div className="container">
                <table className="table table-light table-striped mt-3 table-hover" id="Approved-Table">
                    <thead className="table-primary">
                        <tr>
                            <th scope="col" style={{ width: "5%" }}>S.No</th>
                            <th scope="col" style={{ width: "10%" }}>Patch Name</th>
                            <th scope="col" style={{ width: "35%" }}>Bug & Feature</th>
                            <th scope="col" style={{ width: "15%" }}>Approved Patch</th>
                            <th scope="col" style={{ width: "15%" }}>Approved Date</th>
                            <th scope="col" style={{ width: "20%" }}>Deploy Patch</th>
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
                                    <td>
                                        <button className="btn btn-primary mt-2" onClick={() => {
                                            handledownload(val.patch_file)
                                        }}>
                                            Download
                                        </button>
                                    </td>
                                    <td>{val.apprejtime}</td>
                                    <td>
                                        <button className="btn btn-success mt-3" onClick={() => {
                                            handledeploy(val.patch_name)
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

}

export default ApprovedPatch;