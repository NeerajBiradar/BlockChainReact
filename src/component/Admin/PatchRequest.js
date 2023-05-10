import React from 'react';
import Web3 from 'web3';
import ABI from "../ABI/ABI"
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';


const PatchRequestForm = () => {
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
    ReadBugReport();
  }

  let FeatCount = 1;
  const Featindex = [];
  const ReadFeatureReport = async () => {
    const data = await window.contract.methods.SendFeatureReport().call();
    console.log(data);
    const table = document.getElementById('Feature-Table');
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].priority != 'default' && data[i].labelfeatures == 0) {
        const newRow = table.insertRow();
        const cell1 = newRow.insertCell(0);
        cell1.innerHTML = FeatCount;
        const cell2 = newRow.insertCell(1);
        cell2.innerHTML = data[i].feat_title;
        const cell3 = newRow.insertCell(2);
        cell3.innerHTML = data[i].priority;
        const cell4 = newRow.insertCell(3);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('name', 'myCheckbox');
        checkbox.setAttribute('id', 'checkbox-f-' + FeatCount);
        Featindex.push(i);
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.classList.add('d-flex', 'justify-content-center', 'mt-1');
        checkboxWrapper.appendChild(checkbox);
        cell4.appendChild(checkboxWrapper);
        FeatCount = FeatCount + 1;
      }
    }
  }

  let BugCount = 1;
  const Bugindex = [];
  const ReadBugReport = async () => {
    const data = await window.contract.methods.SendBugReport().call();
    console.log(data);
    const table = document.getElementById('Bug-Table');
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].priority != 'default' && data[i].labelbugs == 0) {
        const newRow = table.insertRow();
        const cell1 = newRow.insertCell(0);
        cell1.innerHTML = BugCount;
        const cell2 = newRow.insertCell(1);
        cell2.innerHTML = data[i].bug_title;
        const cell3 = newRow.insertCell(2);
        cell3.innerHTML = data[i].priority;
        const cell4 = newRow.insertCell(3);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('name', 'myCheckbox');
        checkbox.setAttribute('id', 'checkbox-b-' + BugCount);
        Bugindex.push(i);
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.classList.add('d-flex', 'justify-content-center', 'mt-1');
        checkboxWrapper.appendChild(checkbox);
        cell4.appendChild(checkboxWrapper);
        BugCount = BugCount + 1;
      }
    }
  }
  const BugArr = [];
  const FeatArr = [];
  const SendTeamBugReport = async () => {
    const bug_data = await window.contract.methods.SendBugReport().call();
    const feat_data = await window.contract.methods.SendFeatureReport().call();
    for (let i = 1; i < BugCount; i++) {
      const checkbox = document.getElementById('checkbox-b-' + i);
      if (checkbox.checked) {
        let temp = Bugindex[i - 1];
        BugArr.push(bug_data[temp].bug_title);
      }
    }
    for (let i = 1; i < FeatCount; i++) {
      const checkbox = document.getElementById('checkbox-f-' + i);
      if (checkbox.checked) {
        let temp = Featindex[i - 1];
        FeatArr.push(feat_data[temp].feat_title);
      }
    }
    const patch_name = document.getElementById('Patch-Name').value;
    const deadline = document.getElementById('deadline').value;
    console.log(BugArr, FeatArr, patch_name, deadline);
    if (account.toLowerCase() == '0x47fb4385f5c205b59033d72330cd9e795626904c') {
      await window.contract.methods.SetPatch(BugArr, FeatArr, patch_name, deadline).send({ from: account });
      //location.reload();
      console.log('Transcation Successful');
    }
    else {
      console.log('Transcation Unsuccessful! Admin account does not match');
    }

  }
  return (
    < div className='container' >
      <div className="row">
        <div className="col-md-6">
          <table className="table table-light table-striped mt-3" id="Bug-Table">
            <thead className="table-primary">
              <tr>
                <th scope="col" style={{ width: '10%' }}>S.No</th>
                <th scope="col" style={{ width: '50%' }}>Bugs Title</th>
                <th scope="col" style={{ width: '30%' }}>Bugs Priority</th>
                <th scope="col" style={{ width: '10%' }}>Select</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr></tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <table className="table table-light table-striped mt-3" id="Feature-Table">
            <thead className="table-primary">
              <tr>
                <th scope="col" style={{ width: '10%' }}>S.No</th>
                <th scope="col" style={{ width: '50%' }}>Feature Title</th>
                <th scope="col" style={{ width: '30%' }}>Feature Priority</th>
                <th scope="col" style={{ width: '10%' }}>Select</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
      <form action="#" method="POST">
        <div className="form-group mt-3" style={{ width: '50%' }}>
          <label htmlFor="Patch-Name">
            <h6>Patch Name</h6>
          </label>
          <input
            id="Patch-Name"
            type="text"
            className="form-control mt-1"
            name="bug-title"
            required
          />
        </div>
      </form>
      <div className="form-group mt-3" style={{ width: '50%' }}>
        <label htmlFor="deadline">
          <h6>Deadline:</h6>
        </label>
        <div className="input-group date" id="datetimepicker" data-target-input="nearest">
          <input
            type="date"
            className="form-control datetimepicker-input"
            id="deadline"
            data-target="#datetimepicker"
            placeholder="Select deadline"
          />
          <div className="input-group-text">
            <i className="fa fa-calendar"></i>
          </div>
        </div>
      </div>
      <input className="btn btn-primary mt-3" type="submit" value="Request a Patch" onClick={SendTeamBugReport} />
    </div >
  );
}

export default PatchRequestForm;
