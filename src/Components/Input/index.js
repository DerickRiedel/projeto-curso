import React, {useState} from 'react';
import List from '../List/index.js'
import './input.css'

const Input = () => {

    const [user,setUser] = useState({name:'', email:'', city:''});

    return(
        <>
            <form className="form">
                <input className="input" onChange={e => setUser({...user,name: e.target.value})} placeholder="Nome" type="text" value={user.name}></input>
                <input className="input" onChange={e => setUser({...user,email: e.target.value})} placeholder="Email" type="text" value={user.email}></input>
                <input className="input" onChange={e => setUser({...user,city: e.target.value})} placeholder="Cidade" type="text" value={user.city}></input><br/>
                <br/>
                <br/>
            </form>
            <List newUser={{name: user.name ,email:user.email,city:user.city}}/>
        </>
    );        
}

export default Input;