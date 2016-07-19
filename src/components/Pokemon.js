import React from "react";
import { Link } from "react-router";
// var Link = require( "react-router" ).Link;

import { getAllPokemon } from "../services/pokeService";

export default class Pokemon extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			pokemon: []
		};
	}

	componentWillMount() {
		new Promise( ( resolve, reject ) => {
			getAllPokemon( resolve, reject );
		} ).then( ( res, err ) => {
			if ( err ) {
				return console.error( err );
			}
			console.log( res );
			this.setState( { pokemon: res.body.results } );
		} );
	}

	render() {
		const pokemon = this.state.pokemon.map( ( pokemon ) => (
			<Link key={ pokemon.name } to={ `/pokemon/${ pokemon.name }` } >
				<li>{ pokemon.name }</li>
			</Link>
		) );

		return (
			<div>
				<h1>Pokemon</h1>
				{ this.state.pokemon.length
					?
						<ul>
							{ pokemon }
						</ul>
					:
						<h3>Loading...</h3>
				}
			</div>
		);
	}
}
