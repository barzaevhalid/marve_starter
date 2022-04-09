import './charList.scss';
import MarvelService from '../../services/MarvelServices';
import { Component } from 'react/cjs/react.production.min';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class CharList extends Component  {
    
    state = {
        characters: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,

    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();

    }
   
    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
        .then(data => this.onCharactersLoaded(data))
        .catch(this.onError)

    }
    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }
    onCharactersLoaded(newCharacters) {
       this.setState(({offset,characters}) => ({
            characters: [...characters, ...newCharacters ],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,

       }))
    }
    onError =  () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderItems(arr) {
        const items = arr.map((item) => {
            let imgStyle = {'objectFit': 'cover'};
            if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : "unset"}
            }
            return (
                <li className='char__item'
                key={item.id}
                onClick={() => this.props.onCharSelected(item.id)}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className='char__name'>{item.name}</div>
                    
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    render(){
        const {characters, loading, error, offset,newItemLoading} = this.state;

        const items = this.renderItems(characters);
        const errorMesage = error ? <ErrorMessage/>: null;
        const spinner = loading ? <Spinner/>: null;
        const content = !(loading || spinner) ? items : null
        return (
            <div className="char__list">
                {errorMesage}
                {spinner}
                {content}
                <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
 
}

export default CharList;