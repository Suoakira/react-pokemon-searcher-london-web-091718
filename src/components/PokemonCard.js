import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    spriteView: true
  }

  getStat = (pokemon) => {
    // can use find or filter, if you use filter must open the array with [0]
    const pokemonStat = pokemon.stats.find(stat => stat.name == "hp")
    // returns the stat object, you can then extra the value information
    return pokemonStat.value
  }

  // can do the mouse over an mouse out all on one line
  render() {
    const { getStat } = this
    const { pokemon } = this.props
    
    return (
      <Card>
        <div>
          <div className="image"  >
                {
              this.state.spriteView  ? 
                <img src={pokemon.sprites.front} onMouseOver={() => this.setState({ spriteView: false })} alt="" /> 
                : 
                <img src={pokemon.sprites.back} onMouseOut={() => this.setState({ spriteView: true })}  alt="" />
                }
          </div>
          <div className="content">
            <div className="header">{pokemon.name}</div>
          </div>
          <br></br>
          <div className="extra content">
            
            <p>Height: {pokemon.height} meters</p>
            <span>
              <i className="icon heartbeat red" />
              Health: {getStat(pokemon)}
              
            
              
      
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
