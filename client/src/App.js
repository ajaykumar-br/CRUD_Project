import './App.css';
import {useState} from 'react'
import Axios from 'axios';
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userlist, setUserlist] = useState([]);

  const [newPassword, setNewPassword] = useState("");

  const addUser = ()=>{
    Axios.post('http://localhost:5000/create', {
      username: username, 
      password: password
    }).then(()=>{
      setUserlist([
        ...userlist,
        {
          username: username,
          password: password
        }
      ]);
    })
  };

  const getUser = () =>{
    Axios.get("http://localhost:5000/users").then((response)=>{
      setUserlist(response.data);
    });
  }

  const updateUser = (id) =>{
    Axios.put("http://localhost:5000/update", {password: newPassword, id: id}).then(
      (response)=>{
        setUserlist(
          userlist.map((key) => {
            return key.id===id?{
              id:key.id,
              username:key.username,
              password:key.newPassword
            }:key;
          })
        );
      }
    );
  };

  const deleteUser = (id) => {
    Axios.delete(`http://localhost:5000/delete/${id}`).then((response) => {
      setUserlist(
        userlist.filter((key) => {
          return key.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <h2>Login</h2>
      <br/><br/><br/><br/><br/><br/>
      <div className="form">
          <label>UserName</label>
          <input type="text" onChange = { (e) => {
            setUsername(e.target.value);
          }} 
          />
          <label>Password</label>
          <input type="text"  onChange = { (e) => {
            setPassword(e.target.value);
          }}
          />
          <button onClick={addUser}>Submit</button>
      </div>

      <div>
        <button onClick={ getUser } >Show Users</button>

        {userlist.map((key, value) => {
          return <div className='users'> 
                    <h4>ID: {key.id} </h4>
                    <h4>Username: {key.username} </h4>
                    <h4>Password: {key.password} </h4>
                    <input type="text" placeholder="newpass..." 
                    onChange = { (e) => {
                        setNewPassword(e.target.value);
                      }} />
                    <button onClick= {() => {updateUser(key.id)}} >Update</button>
                    <button onClick={() => {deleteUser(key.id);}}>Delete</button>
                 </div>
        })}
      </div>
    </div>
  );
}

export default App;
