import React from "react";
import Web3 from 'web3';
import ABI from "../ABI/ABI";

let account;
const web3 = new Web3(window.ethereum);
web3.eth.requestAccounts().then(accounts => {
    account = accounts[0];
    console.log(account.toLowerCase());
    connectContract();
});

const connectContract = async () => {
    const Address = "0xC73b335Daeb32f4df2635aA821A4B8532a18EC9c";
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    QC();
}

const QC = async () => {
    const data = await window.contract.methods.Developer().call();
    console.log(data);
    const table = document.getElementById('Verify-Table');
    let j=0;
    for (let i=data.length-1 ; i>=0 ; i--){
        if(data[i].check == 'None'){
            const newRow = table.insertRow();
            const cell1 = newRow.insertCell(0);
            cell1.innerHTML = j+1;
            j=j+1;
            const cell2 = newRow.insertCell(1);
            cell2.innerHTML = data[i].patch_name;
            const cell3 = newRow.insertCell(2);
            cell3.innerHTML = '<ul><li>' + data[i].bugs.join('</li><li>') + '</li><li>' + data[i].features.join('</li><li>') + '</li></ul>';
            const cell8 = newRow.insertCell(3);
            cell8.innerHTML = data[i].uploadtime;

            const cell4 = newRow.insertCell(4);
            const button = document.createElement('button');
            button.classList.add('btn','btn-primary','mt-3');
            button.innerHTML = 'Download';
            button.onclick = () => {
                const fileBlob = new Blob([new Uint8Array(web3.utils.hexToBytes(data[i].patch_file))], { type: 'application/octet-stream'});
                const fileUrl = URL.createObjectURL(fileBlob);
                const downloadLink = document.createElement('a');
                downloadLink.href = fileUrl;
                downloadLink.download = 'Patch.exe';
                downloadLink.click();
            }
            cell4.appendChild(button);
            const cell5 = newRow.insertCell(5);
            const buttonContainer = document.createElement('div');
            
            const approveButton = document.createElement('button');
            approveButton.classList.add('btn', 'btn-success', 'mt-2');
            approveButton.innerHTML = 'Approve';
            approveButton.onclick = async () => {
                const timestamp = new Date();
                const Time = timestamp.toString();
                approveButton.innerHTML = Time;
                rejectButton.disabled = true;

                const s = 'Approved';
                console.log(data[i].patch_name,s)
                await window.contract.methods.SetPatchcheck(data[i].patch_name,s,Time).send({ from: account });
            };
            
            const rejectButton = document.createElement('button');
            rejectButton.classList.add('btn', 'btn-danger', 'mt-3','m-2');
            rejectButton.innerHTML = 'Reject';
            rejectButton.onclick = async () => {
                const timestamp = new Date();
                const Time = timestamp.toString();
            // Code for rejecting the patch
                rejectButton.innerHTML = Time;
                approveButton.disabled = true;

                const s = 'Rejected';
                console.log(data[i].time,s)
                await window.contract.methods.SetPatchcheck(data[i].patch_name,s,Time).send({ from: account });
            };
            buttonContainer.appendChild(approveButton);
            buttonContainer.appendChild(rejectButton);
            cell5.appendChild(buttonContainer);
        }
    }
}


const Verify = () => {
    return (
        <div className="container">
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
                    <tr></tr>
                </tbody>
            </table>
        </div>
    );
}

export default Verify;