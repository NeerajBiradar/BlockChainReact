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
    ReadFeatureReport();
}

let FeatCount = 1;
const Featindex = [];
const ReadFeatureReport = async () => {
    const data = await window.contract.methods.SendFeatureReport().call();
    console.log(data);
    const table = document.getElementById('Features-Label-Table');
    for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].priority == 'default') {
            const newRow = table.insertRow();
            const cell1 = newRow.insertCell(0);
            cell1.innerHTML = FeatCount;

            const cell2 = newRow.insertCell(1);
            cell2.innerHTML = data[i].feat_title;
            const cell3 = newRow.insertCell(2);
            cell3.innerHTML = data[i].feat_description.replace(/\n/g, '<br>');
            const cell4 = newRow.insertCell(3);
            const prioritySelect = document.createElement('select');
            prioritySelect.setAttribute('class', 'form-select mt-1');
            prioritySelect.setAttribute('id', 'feat-priority-' + FeatCount);
            Featindex.push(i);
            prioritySelect.setAttribute('name', 'feat-priority-' + i);
            prioritySelect.setAttribute('required', '');
            const priorityOption1 = document.createElement('option');
            priorityOption1.setAttribute('value', '');
            priorityOption1.textContent = 'Select Priority';
            const priorityOption3 = document.createElement('option');
            priorityOption3.setAttribute('value', 'High');
            priorityOption3.textContent = 'High';
            const priorityOption4 = document.createElement('option');
            priorityOption4.setAttribute('value', 'Medium');
            priorityOption4.textContent = 'Medium';
            const priorityOption5 = document.createElement('option');
            priorityOption5.setAttribute('value', 'Low');
            priorityOption5.textContent = 'Low';
            prioritySelect.appendChild(priorityOption1);
            prioritySelect.appendChild(priorityOption3);
            prioritySelect.appendChild(priorityOption4);
            prioritySelect.appendChild(priorityOption5);
            cell4.appendChild(prioritySelect);
            FeatCount = FeatCount + 1;
        }
    }
}


const FeatArr = [];
const Featpriority =[];

const SendFeatureReport = async () => {
    const data = await window.contract.methods.SendFeatureReport().call();
    for(let i=1 ; i<FeatCount; i++){
        const priority_value = document.getElementById('feat-priority-' + i).value;
        if(priority_value != ''){
            let temp=Featindex[i-1];
            FeatArr.push(data[temp].feat_title);
            Featpriority.push(priority_value);
        }
    }
    await window.contract.methods.SetPriorityFeature(FeatArr,Featpriority).send({ from: account });
    //location.reload();
}

const FeatureLabel = () => {
    return (
        <div className="container">
            <table className="table table-light table-hover table-striped mt-3" id="Features-Label-Table">
                <thead className="table-dark">
                    <tr>
                        <th scope="col" style={{ width: '10%' }}>S.No</th>
                        <th scope="col" style={{ width: '20%' }}>Feature Name</th>
                        <th scope="col" style={{ width: '50%' }}>Feature Description</th>
                        <th scope="col" style={{ width: '20%' }}>Set Priority</th>
                    </tr>
                </thead>
                <tbody>
                    <tr></tr>
                </tbody>
            </table>
            <input className="btn btn-primary m-2" type="submit" value="Feature Priority" onClick={SendFeatureReport} />
        </div>
    );
}

export default FeatureLabel;