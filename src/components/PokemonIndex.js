import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      pokemons: [],
      filterPokemon: "",
      filterHeight: true
    }
  }
  // fetch pokemon
  fetchPokemon = () => {
    return fetch("http://localhost:3000/pokemon")
      .then(resp => resp.json())
      .then(pokemon => this.setState({pokemons: pokemon}))
  }
  // filter pokemons
  filterPokemons = (filter) => {
    const copyPokemons = [...this.state.pokemons]
    let filteredPokemons = copyPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(filter.toLowerCase()))

    return this.state.filterPokemon === "" ? this.state.pokemons 
    :
    filteredPokemons
  }
  // fetchs pokemon on launch
  componentDidMount() {
    this.fetchPokemon()
  }
  // filter search
  filterSearch = (element) => {
    this.setState({filterPokemon: element.target.value})
  }
  // needed a way to change state of the app from the form
  changeState = (pokemon) => {
    const newPokemons = [...this.state.pokemons]
    newPokemons.push(pokemon)
    this.setState({pokemons: newPokemons})
  }

  // write a function to sort pokemon by value
  sortByHeight = () => {
    this.setState({filterHeight: !this.state.filterHeight})
    const newPokemons = [...this.state.pokemons]
    this.state.filterHeight ? 
    this.setState({pokemons: newPokemons.sort((a,b) => b.height - a.height)})
      : 
    this.setState({pokemons: newPokemons.sort((a, b) => a.height - b.height) })
  }


  render() {
    return (
      <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ9PhSACrHV-LBS1sNFZE72-pYgcYAnZ65Mea6anTSzbm2vIJC5w" />
        <br />

        <Search onSearchChange={(element) => this.filterSearch(element)} showNoResults={false} />
          <br></br>
        <button className="ui primary basic button" onClick={this.sortByHeight}>Sort By Height</button>

        {/* <Search onSearchChange={_.debounce(() => console.log(""), 500)} showNoResults={false} /> */}
        <br />
        <PokemonForm changeState={this.changeState} />
        <br />
        <PokemonCollection pokemons={this.filterPokemons(this.state.filterPokemon)} />

      </div>
    )
  }
}

export default PokemonPage
