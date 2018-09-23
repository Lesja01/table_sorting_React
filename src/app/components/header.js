import React from 'react';
import ReactDOM from 'react-dom';


 class Header extends React.Component {

    //отрисовка компонента
    render() {  
                
          return (
                    <div className="row header">
                        
                        <nav className="col-md-12 navbar navbar-expand-lg navbar-dark bg-dark">
                          <a className="navbar-brand" href="#">ПЛЕЙЛИСТ</a>
                          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                          </button>

                          <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                              <li className="nav-item active">
                                <a className="nav-link" href="#">Главная <span className="sr-only">(current)</span></a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link" href="#">О сервисе</a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link" href="#">Регистрация</a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link" href="#">Мой профиль</a>
                              </li>
                           </ul>
                          </div>
                          
                        </nav>                       
                    </div>
                    );                            
            }            
         };

export default Header;    