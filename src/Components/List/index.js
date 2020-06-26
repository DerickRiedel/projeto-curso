import React, {Component, useLayoutEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './list.css'

class List extends Component{

    constructor(props){
        super(props);
        this.state = {listUsers: new Array({name: '', email: '', city: ''})}; // Estado dos usuários na lista
    }

    async componentDidMount(){
        try{ // Pegar os dados de uma lista de usuários url seguinte
            var res = await fetch('https://jsonplaceholder.typicode.com/users');
            var json = await res.json();

            const items = json.map(item => ({name:item.name,email:item.email,city:item.address.city}))

            this.setState({listUsers:items})
        }catch(err){
            console.log(err)
        }
    }

    addUser = () => { // Adicionar usuário
        var newItem = this.props.newUser;
        var{name,email,city} = newItem;
        
        const result = this.state.listUsers.find(element => ( // Procurar um usuário igual ao que foi passado como props
            element.name == name &&
            element.email == email))
            
            if(name == '' || email == '' || city == ''){ // Verificar se o campo está vaazio
                this.notifyError('Campo obrigatório')
            }else if(result == null){ 
                this.setState({listUsers:[...this.state.listUsers,{name,email,city}]})
                this.notify('Novo Inscrito!');
            }
            else{ // Verificar se já há um usuário na lista
                this.notifyError('Usuário já existente!')
            }
        
    }
    
    notify = message =>{ // Toast para notificar uma Informação
        toast.configure();
        toast.info(message);
    }

    notifyError = message =>{ // Toast para notificar um erro
        toast.configure();
        toast.error(message);
    }

    render(){
        return(
            <>
                <button className="button" type="button" onClick={this.addUser.bind(this)}>Inscrever</button>
                <ul className="list">
                    <div className="inscritos">Inscritos</div>
                    <li className="listHeader">
                        <div className="nome">Nome</div>
                        <div className="cidade">Cidade</div>
                    </li>
                    <br/>
                    <br/>
                    <br/>
                {
                    this.state.listUsers.map((item,index) => // Mapear os itens na Lista de usuários no State atual
                    <li className="listItem" key={index}>
                        <div className="itemName">{item.name}</div><br/>
                        <div className="itemCity">{item.city}</div><br/>
                    </li>)
                }
                </ul>
            </>
        );
    }
}

export default List;