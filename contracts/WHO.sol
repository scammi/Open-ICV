pragma solidity ^0.5.0;

contract WHO {
    uint public vaccinesId;

    struct Vaccine {
        string name;
        string date;
        bool applied;
    }

    mapping (address => bool) public docPermition;
    mapping (uint => Vaccine ) public vaccines;

    function vaccinate(string memory _name, string memory _date, bool _applied) public {
        vaccinesId++;
        vaccines[vaccinesId].name = _name;
        vaccines[vaccinesId].date = _date;
        vaccines[vaccinesId].applied = _applied;
    }

    function addDoc(address _docAdress) public {
        docPermition[_docAdress] = true;
    }

    function removePermit (address _docAdress) public {
        docPermition[_docAdress] = false;
    }
}
