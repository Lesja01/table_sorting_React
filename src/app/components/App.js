import React from "react";
import ReactDOM from "react-dom";
import Initialstate from "../Initialstate";
import Header from './header' ;

let Store = Initialstate;//хранилище начальных данных

//create row for table
const Row = ({id, singer, song_name, genre, date}) => (
  <div id="showRows" key={id} className={ClassName1+" "+"row"} >    
    <div key={id}>{singer}</div>
    <div>{song_name}</div>
    <div>{genre}</div>    
    <div>{date}</div>    
  </div>
);

let ClassName1 = "";




export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: Store.date,
        showRows: 0,
        showLetter: 0
    };
    
    this.compareBy.bind(this);
    this.sortBy.bind(this);
    this.choiceItem.bind(this);

  }

  // сортировкa по алфавиту таблицы
  compareBy(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }
 
  sortBy(key) {
    let arrayCopy = [...this.state.data];
    arrayCopy.sort(this.compareBy(key));
    this.setState({data: arrayCopy});
  }

  showXrow(key){
    ClassName1 = key; 
    this.setState({showRows: ClassName1}); 
  }

// фильтрация
    choiceItem(choiseGoodTipe) { 
            //записываем переменные значений ссылок
            var rsinger = this.refs.singer.value;
            var rgenre = this.refs.genre.value; 
            var rdate = this.refs.date.value;  
            let arrayCopy = [...this.state.data];

            //создаем фильтр состояния по условиям, меняем видимость элементов
        let ItemTemplate = arrayCopy.filter(function(elem, index) {  
            
                  if (choiseGoodTipe=="singer"&&(rsinger==elem.singer||rsinger=="все") )
                  { 
                    elem.temp=false;
                    return elem
                    }
                else if (choiseGoodTipe=="genre"&&(elem.genre==rgenre||rgenre=="все") )
                    {
                    elem.temp=false;
                    return elem                
                    }
                else if (choiseGoodTipe=="date"&&(elem.singer==rdate||rdate=="все"))
                    {
                    elem.temp=false;
                    return elem
                    }
                    else
                        {
                            elem.temp=true;
                            return elem
                        }
                }); 
             //обновляем состояние
            this.setState({data: ItemTemplate});   
    }


  render() {    
//create  sorting table
        const rows = this.state.data.map( (rowData) =>{
                                     if (rowData.temp==false){
                                        return (
                                        <Row {...rowData} />)};
            });
//coздаем массивы выпадающих из фильтра полей
        var singers = createNewMas(this.state.data.map((item, i) =>{ 
                return  item.singer;
            })); 
        var genres = createNewMas(this.state.data.map((item, i) =>{ 
                return  item.genre;
            })); 
        var dates = createNewMas(this.state.data.map((item, i) =>{ 
                return  item.date;
            
         }));    

    //сортируем и удалем повторы 
        function createNewMas(oldMas) {       
                return oldMas.sort().filter(function(item, pos, ary) {
                    return !pos || item != ary[pos - 1];        
                    })  
            };       

        function kreateList(mas) { 
            return mas.map((item, i) =>{                                   
                   return (
                        <option key={i} >                            
                            {item}
                        </option>
                   )
            }
        )} ;   
    //отсортированные массивы выпадающих из фильтра полей   

        let singer = kreateList(singers);
        let genre = kreateList(genres); 
        let date = kreateList(dates);   


    return (
      <div>
             <Header/>

             <div className="container-fluid">
                <div className="row">
                  <div className="table col-md-8">
                 
                    <div className="header">          
                      <div onClick={() => this.sortBy('singer')}>Исполнитель  <i className="fa fa-caret-down" aria-hidden="true"></i></div>
                      <div onClick={() => this.sortBy('song_name')}>Песня  <i className="fa fa-caret-down" aria-hidden="true"></i></div>
                      <div onClick={() => this.sortBy('genre')}>Жанр  <i className="fa fa-caret-down" aria-hidden="true"></i></div>
                      <div onClick={() => this.sortBy('date')}>Год  <i className="fa fa-caret-down" aria-hidden="true"></i></div>
                    </div>
                    <div className="body navbar-dark bg-dark showStyle">
                      {rows}
                    </div>
                    <div className="footer row">                        
                        <div className="pagination col-md-7">                   
                          <div className="pagin" onClick={()=>this.showList("prev")}>prev</div>
                          <div className="pagin" onClick={()=>this.showList("List1")}>1</div>
                          <div className="pagin" onClick={()=>this.showList("List2")}>2</div> 
                          <div className="pagin" onClick={()=>this.showList("List3")}>3</div>
                          <div className="pagin" onClick={()=>this.showList("List4")}>4</div>
                          <div className="pagin" onClick={()=>this.showList("next")}>next</div>                  
                        </div>

                        <div className="showXrow col-md-5"> 
                           <div className="pagin" onClick={()=>this.showXrow("")}>все</div> 
                          <div className="pagin" onClick={()=>this.showXrow("showfive")}>5</div>
                          <div className="pagin" onClick={()=>this.showXrow("showten")}>10</div>
                          <div className="pagin" onClick={()=>this.showXrow("showtwen")}>20</div>                  
                        </div>
                    </div>
                </div>

              <div className="ChoiceItem col-md-3">                
                            <form>
                                <h1>ФИЛЬТР</h1>
                                <div className="form-group">
                                    <label htmlFor="song">ИСПОЛНИТЕЛЬ</label>
                                    <select id="song" className="form-control" type="text" defaultValue="все" ref="singer" onChange={() => this.choiceItem("singer")}>
                                        <option>все</option>
                                        {singer}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="genre">ЖАНР</label>
                                    <select id="genre" className="form-control" type="text" defaultValue="все" ref="genre" onChange={() => this.choiceItem("genre")}>
                                        <option>все</option>
                                        {genre}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date">ГОД</label>
                                    <select id="date" className="form-control" type="text" defaultValue="все" ref="date" onChange={() => this.choiceItem("date")}>
                                        <option>все</option>
                                       {date}
                                    </select>
                                </div>                        
                            </form>               
                        </div>                       
                </div>
              </div>  
      </div>
    );
    
  }
};

