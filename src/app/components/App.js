import React from "react";
import ReactDOM from "react-dom";
import Initialstate from "../Initialstate";
import Header from './header' ;
import Pagination from './Pagination' ;

let Store = Initialstate;//хранилище начальных данных

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: Store.data,
      showRows: 10,
      initialstate: Store.data,
      exampleItems: Store.data,
      pageOfItems: []

    };
    
    this.compareBy.bind(this);
    this.sortBy.bind(this);
    this.choiceItem.bind(this);
    this.onChangePage = this.onChangePage.bind(this);

  }

onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
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
    var Class = key; 
    this.setState({showRows: Class});
    //обновляем состояние таблицы    
    const data = [...this.state.data];
    this.setState( {data: data} );
}

// фильтрация таблицы:
    choiceItem(choiseGoodTipe) { 
            //записываем переменные значений ссылок
            var rsinger = this.refs.singer.value;
            var rgenre = this.refs.genre.value; 
            var rdate = this.refs.date.value;  
            let arrayCopy = this.state.initialstate;

            //создаем фильтр состояния по условиям
            let ItemTemplate = arrayCopy.filter(function(elem, index) {  
                
                      if (choiseGoodTipe=="singer"&&(elem.singer==rsinger||rsinger=="все") )
                      { return elem}
                    else if (choiseGoodTipe=="genre"&&(elem.genre==rgenre||rgenre=="все") )
                        {return elem}
                    else if (choiseGoodTipe=="date"&&(elem.date==rdate||rdate=="все"))
                        {return elem}
                        else
                            {return}
                    }); 
                 //обновляем состояние таблицы
            this.setState({data: ItemTemplate});   
    }


  render() {    
        //create  sorting table
        console.log(this.state);

    //coздаем массивы выпадающих из фильтра полей...
        var singers = createNewMas(this.state.initialstate.map((item, i) =>{ 
                return  item.singer;
            })); 
        var genres = createNewMas(this.state.initialstate.map((item, i) =>{ 
                return  item.genre;
            })); 
        var dates = createNewMas(this.state.initialstate.map((item, i) =>{ 
                return  item.date;
            
         }));    

    //...сортируем эти массивы и удаляем повторы 
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
    //...отсортированные массивы выпадающих из фильтра полей   

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
                       {this.state.pageOfItems.map(item =>
                            <div id="showRows" key={item.id+1} className="row">
                                <div key={item.id}>{item.singer}</div>                            
                                <div>{item.song_name}</div>
                                <div>{item.genre}</div>    
                                <div>{item.date}</div>
                            </div>
                        )}
                    </div>
                    <div className="footer row">                        
                        <div className="pagination col-md-7">
                            <Pagination items={this.state.data} onChangePage={this.onChangePage} showRows={this.state.showRows}/>                  
                        </div>

                        <div className="showXrow col-md-5"> 
                            <div className={this.state.showRows === 3000 ? 'pagin active' : 'pagin'} onClick={()=>this.showXrow(3000)}>все</div> 
                            <div className={this.state.showRows === 5 ? 'pagin active' : 'pagin'} onClick={()=>this.showXrow(5)}>5</div>
                            <div className={this.state.showRows === 10 ? 'pagin active' : 'pagin'} onClick={()=>this.showXrow(10)}>10</div>
                            <div className={this.state.showRows === 20 ? 'pagin active' : 'pagin'} onClick={()=>this.showXrow(20)}>20</div>                  
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

